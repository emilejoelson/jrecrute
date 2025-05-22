import { Component, inject, OnInit } from '@angular/core';
import { Newsletter } from '../../../../newsletter/data-access/models/newsletter';
import { map, Observable, combineLatest } from 'rxjs';
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
import { HttpErrorResponse } from '@angular/common/http';
import { NewsletterActions } from '../../../../newsletter/data-access/store/actions/newsletter.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-subscriber',
  imports: [CommonModule],
  templateUrl: './manage-subscriber.component.html',
  styleUrl: './manage-subscriber.component.scss',
})
export class ManageSubscriberComponent implements OnInit {
  private store = inject(Store<State>);

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

  // Create an observable for filtered and sorted subscribers
  filteredSubscribers$: Observable<Newsletter[]> = this.subscribers$.pipe(
    map(subscribers => this.getFilteredAndSortedSubscribers(subscribers))
  );

  // Create an observable for checking if the list is empty
  hasNoSubscribers$: Observable<boolean> = this.filteredSubscribers$.pipe(
    map(subscribers => subscribers.length === 0)
  );

  searchTerm = '';
  filterType: 'all' | 'confirmed' | 'unconfirmed' = 'all';
  sortBy: 'email' | 'createdAt' | 'isConfirmed' = 'createdAt';
  sortOrder: 'asc' | 'desc' = 'desc';

  trackByEmail(index: number, subscriber: Newsletter): string {
    return subscriber.email;
  }

  ngOnInit(): void {
    this.loadSubscribers();
  }

  loadSubscribers(): void {
    this.store.dispatch(NewsletterActions.loadSubscribers());
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value;
    this.updateFilteredSubscribers();
  }

  onFilterChange(filterType: 'all' | 'confirmed' | 'unconfirmed'): void {
    this.filterType = filterType;
    this.updateFilteredSubscribers();
  }

  onSortChange(sortBy: 'email' | 'createdAt' | 'isConfirmed'): void {
    if (this.sortBy === sortBy) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortBy;
      this.sortOrder = 'asc';
    }
    this.updateFilteredSubscribers();
  }

  private updateFilteredSubscribers(): void {
    this.filteredSubscribers$ = this.subscribers$.pipe(
      map(subscribers => this.getFilteredAndSortedSubscribers(subscribers))
    );
    
    this.hasNoSubscribers$ = this.filteredSubscribers$.pipe(
      map(subscribers => subscribers.length === 0)
    );
  }

  getFilteredAndSortedSubscribers(subscribers: Newsletter[]): Newsletter[] {
    let filtered = subscribers;

    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter((subscriber) =>
        subscriber.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (this.filterType === 'confirmed') {
      filtered = filtered.filter((subscriber) => subscriber.isConfirmed);
    } else if (this.filterType === 'unconfirmed') {
      filtered = filtered.filter((subscriber) => !subscriber.isConfirmed);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let valueA: any, valueB: any;

      switch (this.sortBy) {
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

      if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
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
    if (this.sortBy !== column) return '↕️';
    return this.sortOrder === 'asc' ? '↑' : '↓';
  }
}