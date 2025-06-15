import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  skip,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';
import { AuthUser } from './data-access/models/authenticated';
import { PaginationInfo } from '../../../../../common/model/pagination';
import {
  selectAuthUsers,
  selectAuthUsersCount,
  selectAuthUsersError,
  selectAuthUsersLoading,
  selectAuthUsersPagination,
} from './data-access/stores/selectors/manage-user.selector';
import { State } from '../../../../../state/root.state';
import { Store } from '@ngrx/store';
import { AuthUsersActions } from './data-access/stores/actions/manage-users.actions';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-manage-user',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IconComponent],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss',
})
export class ManageUserComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  authUsers$: Observable<AuthUser[]>;
  pagination$: Observable<PaginationInfo | null>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  usersCount$: Observable<number>;

  private copiedUserIds = new Set<string>();

  // Keep these for template binding
  selectedStatus = 'All';
  itemsPerPage = 10;
  itemsPerPageOptions = [5, 10, 20, 50];

  statusOptions = [
    { label: 'All', value: 'All' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  constructor(private store: Store<State>) {
    this.authUsers$ = this.store.select(selectAuthUsers);
    this.pagination$ = this.store.select(selectAuthUsersPagination);
    this.loading$ = this.store.select(selectAuthUsersLoading);
    this.error$ = this.store.select(selectAuthUsersError);
    this.usersCount$ = this.store.select(selectAuthUsersCount);
  }

  // Reactive form controls using BehaviorSubject
  private searchTerm$ = new BehaviorSubject<string>('');
  private filterType$ = new BehaviorSubject<'all' | 'active' | 'inactive'>(
    'all'
  );
  private currentPage$ = new BehaviorSubject<number>(1);
  private itemsPerPage$ = new BehaviorSubject<number>(10);

  // Public getters for template access
  get searchTerm(): string {
    return this.searchTerm$.value;
  }

  get filterType(): 'active' | 'inactive' | 'all' {
    return this.filterType$.value;
  }

  get currentPage(): number {
    return this.currentPage$.value;
  }

  // Add this method to your ManageUserComponent class
  copyUserId(userId: string, userRecordId: string): void {
    if (navigator.clipboard && window.isSecureContext) {
      // Use the modern Clipboard API if available
      navigator.clipboard
        .writeText(userId)
        .then(() => {
          console.log('User ID copied to clipboard:', userId);
          this.showCopySuccessMessage(userRecordId);
        })
        .catch((err) => {
          console.error('Failed to copy user ID:', err);
          // Fallback to the older method
          this.fallbackCopyToClipboard(userId, userRecordId);
        });
    } else {
      // Fallback for older browsers or non-secure contexts
      this.fallbackCopyToClipboard(userId, userRecordId);
    }
  }

  private fallbackCopyToClipboard(text: string, userRecordId: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      console.log('User ID copied to clipboard (fallback):', text);
      this.showCopySuccessMessage(userRecordId);
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }

    document.body.removeChild(textArea);
  }

  private showCopySuccessMessage(userRecordId: string): void {
    // Add the user ID to the copied set to show success state
    this.copiedUserIds.add(userRecordId);

    console.log('✓ User ID copied successfully!');

    // Reset the success state after 2 seconds
    setTimeout(() => {
      this.copiedUserIds.delete(userRecordId);
    }, 2000);
  }

  // Helper methods for template
  isCopied(userRecordId: string): boolean {
    return this.copiedUserIds.has(userRecordId);
  }

  getCopyButtonClass(userRecordId: string): string {
    const baseClasses = 'transition-colors duration-200 p-1 rounded';

    if (this.isCopied(userRecordId)) {
      return `${baseClasses} text-green-400 bg-green-500/20`;
    }

    return `${baseClasses} text-slate-400 hover:text-blue-400 hover:bg-slate-700/50`;
  }

  getCopyButtonTitle(userRecordId: string): string {
    return this.isCopied(userRecordId) ? 'Copied!' : 'Copy User ID';
  }

  ngOnInit(): void {
    // Initial load
    this.loadUsers();

    // Set up reactive subscriptions
    combineLatest([
      this.searchTerm$.pipe(debounceTime(300)), // Add debounce for search
      this.filterType$,
      this.itemsPerPage$,
      this.currentPage$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        skip(1) // Skip the initial emission since we already called loadUsers()
      )
      .subscribe(() => {
        this.loadUsers();
      });

    // Reset to first page when search, filter, or items per page changes
    combineLatest([this.searchTerm$, this.filterType$, this.itemsPerPage$])
      .pipe(
        takeUntil(this.destroy$),
        skip(1) // Skip initial emission
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

  onSearch(event: any): void {
    const searchTerm = event.target.value;
    console.log('Search term entered:', searchTerm); // Debug log
    this.searchTerm$.next(searchTerm);
  }

  loadUsers(): void {
    const queryParams: any = {
      page: this.currentPage$.value,
      limit: this.itemsPerPage$.value,
    };

    const searchTerm = this.searchTerm$.value?.trim();
    if (searchTerm) {
      queryParams.search = searchTerm;
      console.log('Sending search query:', queryParams); // Debug log
    }

    // Update to use the reactive filter value
    const filterValue = this.filterType$.value;
    if (filterValue !== 'all') {
      queryParams.status = filterValue;
    }

    console.log('Final query params:', queryParams); // Debug log
    this.store.dispatch(AuthUsersActions.loadAuthUsers({ queryParams }));
  }

  onStatusChange(): void {
    // Map selectedStatus to filterType$ and update
    const filterValue =
      this.selectedStatus === 'All'
        ? 'all'
        : this.selectedStatus === 'active'
        ? 'active'
        : 'inactive';
    console.log('Status changed to:', filterValue); // Debug log
    this.filterType$.next(filterValue);
  }

  onPageChange(page: number): void {
    console.log('Page changed to:', page); // Debug log
    this.currentPage$.next(page);
  }

  onItemsPerPageChange(): void {
    console.log('Items per page changed to:', this.itemsPerPage); // Debug log
    this.itemsPerPage$.next(this.itemsPerPage);
  }

  onAddUser(): void {
    // Navigate to add user form or open modal
    console.log('Add new user');
  }

  onEditUser(user: AuthUser): void {
    // Navigate to edit user form or open modal
    console.log('Edit user:', user);
  }

  onViewUser(user: AuthUser): void {
    // Navigate to user details or open modal
    console.log('View user:', user);
  }

  onDeleteUser(user: AuthUser): void {
    // Show confirmation dialog and delete user
    console.log('Delete user:', user);
  }

  getUserDisplayName(user: AuthUser): string {
    if (
      user.userId?.personalInfo?.firstName &&
      user.userId?.personalInfo?.lastName
    ) {
      return `${user.userId.personalInfo.firstName} ${user.userId.personalInfo.lastName}`;
    }
    return user.email;
  }

  getUserInitials(user: AuthUser): string {
    if (
      user.userId?.personalInfo?.firstName &&
      user.userId?.personalInfo?.lastName
    ) {
      return `${user.userId.personalInfo.firstName.charAt(
        0
      )}${user.userId.personalInfo.lastName.charAt(0)}`.toUpperCase();
    }
    return user.email.charAt(0).toUpperCase();
  }

  getRoleNames(user: AuthUser): string {
    return (
      user.roles?.map((role) => role.name).join(', ') || user.role || 'No Role'
    );
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getStatusColor(isActive: boolean): string {
    return isActive ? 'bg-green-500' : 'bg-yellow-500';
  }

  getStatusText(isActive: boolean): string {
    return isActive ? 'Active' : 'Inactive';
  }

  trackByUserId(index: number, user: AuthUser): string {
    return user._id;
  }

  getPaginationPages(pagination: PaginationInfo): number[] {
    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;
    const pages: number[] = [];

    // Show max 5 pages at a time
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  // Expose Math.min to template
  Math = Math;
}
