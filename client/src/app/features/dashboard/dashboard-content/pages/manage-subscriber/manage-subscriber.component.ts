import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Newsletter } from '../../../../newsletter/data-access/models/newsletter';
import {
  map,
  Observable,
  combineLatest,
  Subject,
  BehaviorSubject,
  takeUntil,
  startWith,
} from 'rxjs';
import { State } from '../../../../../state/root.state';
import { Store } from '@ngrx/store';
import {
  selectAllSubscribers,
  selectConfirmedCount,
  selectConfirmedSubscribers,
  selectNewsletterError,
  selectNewsletterLoading,
  selectSubscribersCount,
  selectUnconfirmedCount,
  selectUnconfirmedSubscribers,
} from '../../../../newsletter/data-access/store/selectors/newsletter.selectors';

import { NewsletterActions } from '../../../../newsletter/data-access/store/actions/newsletter.actions';
import { CommonModule } from '@angular/common';
import { PaginationInfo } from '../../../../../common/model/pagination';
import { IconComponent } from '../../../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-manage-subscriber',
  imports: [CommonModule,IconComponent],
  templateUrl: './manage-subscriber.component.html',
  styleUrl: './manage-subscriber.component.scss',
})
export class ManageSubscriberComponent implements OnInit, OnDestroy {
  private store = inject(Store<State>);
  private destroy$ = new Subject<void>();

  subscribers$: Observable<Newsletter[]> = this.store
    .select(selectAllSubscribers)
    .pipe(map((newsletters) => newsletters || []));

  loading$ = this.store.select(selectNewsletterLoading);
  error$ = this.store.select(selectNewsletterError);
  confirmedSubscribers$ = this.store.select(selectConfirmedSubscribers);
  unconfirmedSubscribers$ = this.store.select(selectUnconfirmedSubscribers);
  totalCount$ = this.store.select(selectSubscribersCount);
  confirmedCount$ = this.store.select(selectConfirmedCount);
  unconfirmedCount$ = this.store.select(selectUnconfirmedCount);

  // Pagination properties
  itemsPerPage = 10;
  itemsPerPageOptions = [5, 10, 25, 50, 100];

  // Reactive form controls using BehaviorSubject
  private searchTerm$ = new BehaviorSubject<string>('');
  private filterType$ = new BehaviorSubject<
    'all' | 'confirmed' | 'unconfirmed'
  >('all');
  private sortBy$ = new BehaviorSubject<'email' | 'createdAt' | 'isConfirmed'>(
    'createdAt'
  );
  private sortOrder$ = new BehaviorSubject<'asc' | 'desc'>('desc');
  private currentPage$ = new BehaviorSubject<number>(1);
  private itemsPerPage$ = new BehaviorSubject<number>(10);

  // Public getters for template access
  get searchTerm(): string {
    return this.searchTerm$.value;
  }
  get filterType(): 'all' | 'confirmed' | 'unconfirmed' {
    return this.filterType$.value;
  }
  get sortBy(): 'email' | 'createdAt' | 'isConfirmed' {
    return this.sortBy$.value;
  }
  get sortOrder(): 'asc' | 'desc' {
    return this.sortOrder$.value;
  }
  get currentPage(): number {
    return this.currentPage$.value;
  }

  // Create reactive streams for filtered and sorted subscribers
  filteredSubscribers$: Observable<Newsletter[]> = combineLatest([
    this.subscribers$,
    this.searchTerm$,
    this.filterType$,
    this.sortBy$,
    this.sortOrder$,
  ]).pipe(
    map(([subscribers, searchTerm, filterType, sortBy, sortOrder]) =>
      this.getFilteredAndSortedSubscribers(
        subscribers,
        searchTerm,
        filterType,
        sortBy,
        sortOrder
      )
    )
  );

  // Create reactive stream for paginated subscribers
  paginatedSubscribers$: Observable<Newsletter[]> = combineLatest([
    this.filteredSubscribers$,
    this.currentPage$,
    this.itemsPerPage$,
  ]).pipe(
    map(([subscribers, currentPage, itemsPerPage]) =>
      this.getPaginatedSubscribers(subscribers, currentPage, itemsPerPage)
    )
  );

  // Create reactive stream for pagination info
  paginationInfo$: Observable<PaginationInfo> = combineLatest([
    this.filteredSubscribers$,
    this.currentPage$,
    this.itemsPerPage$,
  ]).pipe(
    map(([subscribers, currentPage, itemsPerPage]) =>
      this.getPaginationInfo(subscribers, currentPage, itemsPerPage)
    )
  );

  // Create reactive stream for checking if the list is empty
  hasNoSubscribers$: Observable<boolean> = this.filteredSubscribers$.pipe(
    map((subscribers) => subscribers.length === 0)
  );

  trackByEmail(index: number, subscriber: Newsletter): string {
    return subscriber.email;
  }

  ngOnInit(): void {
    this.loadSubscribers();

    // Set up reactive updates for pagination when filters change
    combineLatest([this.searchTerm$, this.filterType$, this.itemsPerPage$])
      .pipe(
        takeUntil(this.destroy$),
        startWith([this.searchTerm, this.filterType, this.itemsPerPage])
      )
      .subscribe(() => {
        // Reset to first page when search, filter, or items per page changes
        if (this.currentPage$.value !== 1) {
          this.currentPage$.next(1);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSubscribers(): void {
    this.store.dispatch(NewsletterActions.loadSubscribers());
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value;
    this.searchTerm$.next(searchTerm);
  }

  onFilterChange(filterType: 'all' | 'confirmed' | 'unconfirmed'): void {
    this.filterType$.next(filterType);
  }

  onSortChange(sortBy: 'email' | 'createdAt' | 'isConfirmed'): void {
    if (this.sortBy$.value === sortBy) {
      // Toggle sort order if same column
      const newOrder = this.sortOrder$.value === 'asc' ? 'desc' : 'asc';
      this.sortOrder$.next(newOrder);
    } else {
      // New column, start with ascending
      this.sortBy$.next(sortBy);
      this.sortOrder$.next('asc');
    }
  }

  onItemsPerPageChange(event: any): void {
    const itemsPerPage = parseInt(event.target.value, 10);
    this.itemsPerPage$.next(itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage$.next(page);
  }

  onPreviousPage(): void {
    const currentPage = this.currentPage$.value;
    if (currentPage > 1) {
      this.currentPage$.next(currentPage - 1);
    }
  }

  onNextPage(): void {
    // Use reactive approach instead of manual subscription
    this.paginationInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((info) => {
        const currentPage = this.currentPage$.value;
        if (currentPage < info.totalPages) {
          this.currentPage$.next(currentPage + 1);
        }
      })
      .unsubscribe(); // Immediately unsubscribe since we only need one value
  }

  private getFilteredAndSortedSubscribers(
    subscribers: Newsletter[],
    searchTerm: string,
    filterType: 'all' | 'confirmed' | 'unconfirmed',
    sortBy: 'email' | 'createdAt' | 'isConfirmed',
    sortOrder: 'asc' | 'desc'
  ): Newsletter[] {
    let filtered = [...subscribers]; // Create a copy to avoid mutating original array

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((subscriber) =>
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterType === 'confirmed') {
      filtered = filtered.filter((subscriber) => subscriber.isConfirmed);
    } else if (filterType === 'unconfirmed') {
      filtered = filtered.filter((subscriber) => !subscriber.isConfirmed);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let valueA: any, valueB: any;

      switch (sortBy) {
        case 'email':
          valueA = a.email.toLowerCase();
          valueB = b.email.toLowerCase();
          break;
        case 'createdAt':
          valueA = new Date(a.createdAt || 0).getTime();
          valueB = new Date(b.createdAt || 0).getTime();
          break;
        case 'isConfirmed':
          valueA = a.isConfirmed;
          valueB = b.isConfirmed;
          break;
        default:
          return 0;
      }

      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }

  private getPaginatedSubscribers(
    subscribers: Newsletter[],
    currentPage: number,
    itemsPerPage: number
  ): Newsletter[] {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return subscribers.slice(startIndex, endIndex);
  }

  private getPaginationInfo(
    subscribers: Newsletter[],
    currentPage: number,
    itemsPerPage: number
  ): PaginationInfo {
    const totalItems = subscribers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);

    return {
      currentPage: currentPage,
      totalPages,
      totalItems,
      itemsPerPage: itemsPerPage,
      startIndex: totalItems > 0 ? startIndex : 0,
      endIndex: totalItems > 0 ? endIndex : 0,
    };
  }

  getVisiblePages(totalPages: number): number[] {
    const maxVisible = 5;
    const current = this.currentPage$.value;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getSortIcon(column: string): string {
    if (this.sortBy$.value !== column) return '↕️';
    return this.sortOrder$.value === 'asc' ? '↑' : '↓';
  }
}
