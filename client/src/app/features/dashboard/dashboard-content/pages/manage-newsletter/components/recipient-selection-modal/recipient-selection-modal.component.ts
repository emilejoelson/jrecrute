import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  ModalStep,
  RecipientType,
  Subscriber,
  User,
} from '../../../../../../newsletter/data-access/models/newsletter.types';
import { ModalComponent } from '../../shared/modal/modal.component';
import { IconComponent } from '../../../../../../../shared/ui/icon/icon.component';
import { Store } from '@ngrx/store';
import { State } from '../../../../../../../state/root.state';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  selectAllSubscribersNewsletter,
  selectSubscribersLoading,
  selectUsersLoading,
  selectUsersWithCv,
} from '../../../../../../newsletter/data-access/store/selectors/newsletter.selectors';
import { NewsletterActions } from '../../../../../../newsletter/data-access/store/actions/newsletter.actions';
import { NewsletterContentActions } from '../../../../../../newsletter/data-access/store/actions/newsletter-content.actions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { selectSendToSelectedSubscribersLoading, selectSendToSelectedSubscribersSuccess, selectSendToSelectedUsersWithCvLoading, selectSendToSelectedUsersWithCvSuccess } from '../../../../../../newsletter/data-access/store/selectors/newsletter-content.selectors';

@Component({
  selector: 'app-recipient-selection-modal',
  imports: [ModalComponent, IconComponent, CommonModule,ReactiveFormsModule,FormsModule,],
  templateUrl: './recipient-selection-modal.component.html',
  styleUrl: './recipient-selection-modal.component.scss',
})

export class RecipientSelectionModalComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  @Input() show = false;
  @Input() newsletterId: string | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() sendNewsletter = new EventEmitter<{
    newsletterId: string;
    recipientType: RecipientType;
    recipientIds: string[];
  }>();

  // Modal state
  currentStep: ModalStep = 'select-type';
  selectedRecipientType: RecipientType | null = null;
  selectedRecipientIds: string[] = [];

  // Data observables
  subscribers$: Observable<Subscriber[]>;
  usersWithCv$: Observable<User[]>;
  subscribersLoading$: Observable<boolean>;
  usersLoading$: Observable<boolean>;

  // Local data for selection
  subscribers: Subscriber[] = [];
  usersWithCv: User[] = [];
  allSelected = false;

  // NEW: Send loading state observables
  sendToSubscribersLoading$: Observable<boolean>;
  sendToUsersWithCvLoading$: Observable<boolean>;
  sendToSubscribersSuccess$: Observable<boolean>;
  sendToUsersWithCvSuccess$: Observable<boolean>;

  // Loading state tracking
  isLoadingSubscribers = false;
  isLoadingUsers = false;
  isSendingNewsletter = false;
  // Pagination and filtering
  searchTerm = '';
  statusFilter: 'all' | 'confirmed' | 'unconfirmed' = 'all';
  currentPage = 1;
  pageSize = 20;
  filteredRecipients: (Subscriber | User)[] = [];
  paginatedRecipients: (Subscriber | User)[] = [];

  constructor() {
    this.subscribers$ = this.store.select(selectAllSubscribersNewsletter);
    this.usersWithCv$ = this.store.select(selectUsersWithCv);
    this.subscribersLoading$ = this.store.select(selectSubscribersLoading);
    this.usersLoading$ = this.store.select(selectUsersLoading);

    this.sendToSubscribersLoading$ = this.store.select(selectSendToSelectedSubscribersLoading);
    this.sendToUsersWithCvLoading$ = this.store.select(selectSendToSelectedUsersWithCvLoading);
    this.sendToSubscribersSuccess$ = this.store.select(selectSendToSelectedSubscribersSuccess);
    this.sendToUsersWithCvSuccess$ = this.store.select(selectSendToSelectedUsersWithCvSuccess);
  }

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

   private setupSubscriptions(): void {
    // Subscribe to data
    this.subscribers$
      .pipe(takeUntil(this.destroy$))
      .subscribe((subscribers) => {
        console.log('Subscribers loaded:', subscribers);
        this.subscribers = subscribers || [];
        this.applyFiltersAndPagination();
      });

    this.usersWithCv$.pipe(takeUntil(this.destroy$)).subscribe((users) => {
      console.log('Users with CV loaded:', users);
      this.usersWithCv = users || [];
      this.applyFiltersAndPagination();
    });

    // Subscribe to loading states
    this.subscribersLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.isLoadingSubscribers = loading;
      });

    this.usersLoading$.pipe(takeUntil(this.destroy$)).subscribe((loading) => {
      this.isLoadingUsers = loading;
    });

    // NEW: Subscribe to send loading states
    this.sendToSubscribersLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        if (this.selectedRecipientType === 'subscribers') {
          this.isSendingNewsletter = loading;
        }
      });

    this.sendToUsersWithCvLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        if (this.selectedRecipientType === 'users') {
          this.isSendingNewsletter = loading;
        }
      });

    // NEW: Subscribe to success states to close modal when done
    this.sendToSubscribersSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter(success => success === true)
      )
      .subscribe(() => {
        if (this.selectedRecipientType === 'subscribers') {
          this.handleSendSuccess();
        }
      });

    this.sendToUsersWithCvSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter(success => success === true)
      )
      .subscribe(() => {
        if (this.selectedRecipientType === 'users') {
          this.handleSendSuccess();
        }
      });
  }

  private handleSendSuccess(): void {
    this.isSendingNewsletter = false;
    // Optional: Add a small delay to show success state before closing
    setTimeout(() => {
      this.onClose();
    }, 1000);
  }


  // Modal control methods
  onClose(): void {
    this.resetModal();
    this.close.emit();
  }

  private resetModal(): void {
    this.currentStep = 'select-type';
    this.selectedRecipientType = null;
    this.selectedRecipientIds = [];
    this.allSelected = false;
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.currentPage = 1;
    this.filteredRecipients = [];
    this.paginatedRecipients = [];
    this.isSendingNewsletter = false;
  }

  // Step 1: Recipient type selection
  onSelectRecipientType(type: RecipientType): void {
    this.selectedRecipientType = type;
    this.selectedRecipientIds = [];
    this.allSelected = false;
    this.resetFilters();
  }

  onNext(): void {
    if (this.currentStep === 'select-type' && this.selectedRecipientType) {
      this.currentStep = 'select-recipients';
      this.loadRecipients();
    }
  }

  // Step 2: Individual recipient selection
  loadRecipients(): void {
    console.log('Loading recipients for type:', this.selectedRecipientType);

    if (this.selectedRecipientType === 'subscribers') {
      this.store.dispatch(NewsletterActions.loadAllSubscribers());
    } else if (this.selectedRecipientType === 'users') {
      this.store.dispatch(NewsletterActions.loadUsersWithCv());
    }
  }

  onPrevious(): void {
    if (this.currentStep === 'select-recipients') {
      this.currentStep = 'select-type';
      this.selectedRecipientIds = [];
      this.allSelected = false;
      this.resetFilters();
    }
  }

  // Filtering and search methods
  onSearch(): void {
    this.currentPage = 1;
    this.applyFiltersAndPagination();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.applyFiltersAndPagination();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.currentPage = 1;
    this.applyFiltersAndPagination();
  }

  private resetFilters(): void {
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.currentPage = 1;
  }

  private applyFiltersAndPagination(): void {
    let recipients = this.currentRecipients;

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      recipients = recipients.filter(recipient => {
        const name = this.getRecipientDisplayName(recipient).toLowerCase();
        const email = this.getRecipientEmail(recipient).toLowerCase();
        return name.includes(searchLower) || email.includes(searchLower);
      });
    }

    // Apply status filter (only for subscribers)
    if (this.selectedRecipientType === 'subscribers' && this.statusFilter !== 'all') {
      recipients = recipients.filter(recipient => {
        const isConfirmed = this.isSubscriberConfirmed(recipient);
        return this.statusFilter === 'confirmed' ? isConfirmed : !isConfirmed;
      });
    }

    this.filteredRecipients = recipients;

    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRecipients = this.filteredRecipients.slice(startIndex, endIndex);

    // Update selection states
    this.updateAllSelectedState();
  }

  // Pagination methods
  onPageSizeChange(): void {
    this.currentPage = 1;
    this.applyFiltersAndPagination();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFiltersAndPagination();
    }
  }

  getVisiblePages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: (number | string)[] = [];

    if (total <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current > 4) {
        pages.push('...');
      }

      // Show pages around current
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 3) {
        pages.push('...');
      }

      // Always show last page
      if (total > 1) {
        pages.push(total);
      }
    }

    return pages;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredRecipients.length / this.pageSize);
  }

  // Recipient selection methods
  onRecipientToggle(recipientId: string): void {
    const index = this.selectedRecipientIds.indexOf(recipientId);
    if (index > -1) {
      this.selectedRecipientIds.splice(index, 1);
    } else {
      this.selectedRecipientIds.push(recipientId);
    }
    this.updateAllSelectedState();
  }

  isRecipientSelected(recipientId: string): boolean {
    return this.selectedRecipientIds.includes(recipientId);
  }

  onSelectAllFiltered(): void {
    const currentPageIds = this.paginatedRecipients.map(r => r._id);
    
    if (this.allFilteredSelected) {
      // Deselect all on current page
      this.selectedRecipientIds = this.selectedRecipientIds.filter(
        id => !currentPageIds.includes(id)
      );
    } else {
      // Select all on current page
      currentPageIds.forEach(id => {
        if (!this.selectedRecipientIds.includes(id)) {
          this.selectedRecipientIds.push(id);
        }
      });
    }
    this.updateAllSelectedState();
  }

  clearAllSelections(): void {
    this.selectedRecipientIds = [];
    this.updateAllSelectedState();
  }

  private updateAllSelectedState(): void {
    if (!this.selectedRecipientType || this.paginatedRecipients.length === 0) {
      this.allSelected = false;
      return;
    }

    const currentPageIds = this.paginatedRecipients.map(r => r._id);
    const selectedOnPage = currentPageIds.filter(id => 
      this.selectedRecipientIds.includes(id)
    );

    this.allSelected = selectedOnPage.length === currentPageIds.length;
  }

  get allFilteredSelected(): boolean {
    if (this.paginatedRecipients.length === 0) return false;
    const currentPageIds = this.paginatedRecipients.map(r => r._id);
    return currentPageIds.every(id => this.selectedRecipientIds.includes(id));
  }

  // Send newsletter
  onSendNewsletter(): void {
    if (
      this.newsletterId &&
      this.selectedRecipientType &&
      this.selectedRecipientIds.length > 0
    ) {
      if (this.selectedRecipientType === 'subscribers') {
        this.store.dispatch(
          NewsletterContentActions.sendNewsletterToSelectedSubscribers({
            id: this.newsletterId,
            subscriberIds: this.selectedRecipientIds,
          })
        );
      } else if (this.selectedRecipientType === 'users') {
        this.store.dispatch(
          NewsletterContentActions.sendNewsletterToSelectedUsersWithCv({
            id: this.newsletterId,
            userIds: this.selectedRecipientIds,
          })
        );
      }

      this.sendNewsletter.emit({
        newsletterId: this.newsletterId,
        recipientType: this.selectedRecipientType,
        recipientIds: this.selectedRecipientIds,
      });
    }
  }

    
  get canSendNewsletter(): boolean {
    return this.canProceed && !this.isSendingNewsletter;
  }

  get sendButtonText(): string {
    if (this.isSendingNewsletter) {
      return 'Sending...';
    }
    return `Send Newsletter (${this.selectedRecipientIds.length})`;
  }


  // Helper methods for template - FIXED
  get currentRecipients(): (Subscriber | User)[] {
    if (!this.selectedRecipientType) {
      return [];
    }

    const recipients =
      this.selectedRecipientType === 'subscribers'
        ? this.subscribers
        : this.usersWithCv;

    console.log('Current recipients getter called:', {
      selectedType: this.selectedRecipientType,
      subscribersLength: this.subscribers.length,
      usersLength: this.usersWithCv.length,
      recipientsLength: recipients.length,
      recipients: recipients,
    });

    return recipients;
  }

  // FIXED: Proper loading state check
  get isCurrentlyLoading(): boolean {
    if (this.selectedRecipientType === 'subscribers') {
      return this.isLoadingSubscribers;
    } else if (this.selectedRecipientType === 'users') {
      return this.isLoadingUsers;
    }
    return false;
  }

  get canProceed(): boolean {
    if (this.currentStep === 'select-type') {
      return !!this.selectedRecipientType;
    }
    return this.selectedRecipientIds.length > 0;
  }

  get stepTitle(): string {
    if (this.currentStep === 'select-type') {
      return 'Choose Recipients';
    }
    return `Select ${
      this.selectedRecipientType === 'subscribers' ? 'Subscribers' : 'Users'
    }`;
  }

  getRecipientDisplayName(recipient: Subscriber | User): string {
    if ('personalInfo' in recipient) {
      return `${recipient.personalInfo.firstName} ${recipient.personalInfo.lastName}`;
    }
    return recipient.email;
  }

  getRecipientEmail(recipient: Subscriber | User): string {
    if ('personalInfo' in recipient) {
      return recipient.personalInfo.email;
    }
    return recipient.email;
  }

  isSubscriberConfirmed(recipient: Subscriber | User): boolean {
    return 'isConfirmed' in recipient && (recipient as Subscriber).isConfirmed;
  }

  get isIndeterminate(): boolean {
    const totalRecipients =
      this.selectedRecipientType === 'subscribers'
        ? this.subscribers.length
        : this.usersWithCv.length;

    return (
      this.selectedRecipientIds.length > 0 &&
      this.selectedRecipientIds.length < totalRecipients
    );
  }
}

