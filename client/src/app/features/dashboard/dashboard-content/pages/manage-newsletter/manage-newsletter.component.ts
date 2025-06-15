import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

import { RouterModule, Router } from '@angular/router';
import {
  selectAnalytics,
  selectAnalyticsLoading,
  selectCreateError,
  selectCreateLoading,
  selectCreateSuccess,
  selectDeleteLoading,
  selectDeleteSuccess,
  selectNewsletters,
  selectNewslettersError,
  selectNewslettersLoading,
  selectPagination,
  selectSendLoading,
  selectSendSuccess,
  selectSendToSelectedSubscribersLoading,
  selectSendToSelectedSubscribersSuccess,
  selectSendToSelectedUsersWithCvLoading,
  selectSendToSelectedUsersWithCvSuccess,
} from '../../../../newsletter/data-access/store/selectors/newsletter-content.selectors';
import { NewsletterItemComponent } from './components/newsletter-item/newsletter-item.component';
import { NewsletterDetailComponent } from './components/newsletter-detail/newsletter-detail.component';
import { ModalComponent } from './shared/modal/modal.component';
import { EditorComponent } from './shared/editor/editor.component';
import {
  CreateNewsletterContentRequest,
  NewsletterAnalytics,
  NewsletterContent,
  NewsletterStatus,
  PublishFrequency,
} from '../../../../newsletter/data-access/models/newsletter-content';
import { NewsletterContentActions } from '../../../../newsletter/data-access/store/actions/newsletter-content.actions';
import { FilterNotNullPipe } from '../../../../../core/pipes/filter-not-null.pipe';
import { title } from 'process';
import { IconComponent } from '../../../../../shared/ui/icon/icon.component';
import { NewsletterAnalyticsComponent } from './components/newsletter-analytics/newsletter-analytics.component';
import { NewsletterFilterComponent } from './components/newsletter-filter/newsletter-filter.component';
import { NewsletterListComponent } from './components/newsletter-list/newsletter-list.component';
import { NewsletterCreationModalComponent } from './components/newsletter-creation-modal/newsletter-creation-modal.component';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { SendConfirmationModalComponent } from './components/send-confirmation-modal/send-confirmation-modal.component';
import { RecipientSelectionModalComponent } from './components/recipient-selection-modal/recipient-selection-modal.component';
import { SubscriberSelectionComponent } from './components/subscriber-selection/subscriber-selection.component';



@Component({
  selector: 'app-manage-newsletter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    IconComponent,
    NewsletterAnalyticsComponent,
    NewsletterFilterComponent,
    NewsletterListComponent,
    NewsletterCreationModalComponent,
    DeleteConfirmationComponent,
    SendConfirmationModalComponent,
    RecipientSelectionModalComponent,
  ],
  templateUrl: './manage-newsletter.component.html',
  styleUrl: './manage-newsletter.component.scss',
})
// manage-newsletter.component.ts - Updated portions
export class ManageNewsletterComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  // Properties used in HTML template
  showCreateModal = false;
  showDeleteConfirmation = false;
  showRecipientSelection = false;
  
  // Updated properties for enhanced modal
  selectedNewsletterIdForSending: string | null = null;
  
  currentPage = 1;
  selectedFilter: NewsletterStatus | null = null;

  // Observables used in HTML template
  newsletters$: Observable<NewsletterContent[]> = this.store
    .select(selectNewsletters)
    .pipe(map((newsletters) => newsletters || []));
  
  loading$ = this.store.select(selectNewslettersLoading);
  error$ = this.store.select(selectNewslettersError);
  pagination$ = this.store.select(selectPagination);
  analytics$: Observable<NewsletterAnalytics | null> = this.store.select(selectAnalytics);
  createLoading$ = this.store.select(selectCreateLoading);
  deleteLoading$ = this.store.select(selectDeleteLoading);
  
  // Loading observables for different send operations
  sendToSelectedSubscribersLoading$ = this.store.select(selectSendToSelectedSubscribersLoading);
  sendToSelectedUsersWithCvLoading$ = this.store.select(selectSendToSelectedUsersWithCvLoading);

  ngOnInit() {
    this.loadNewsletters();
    this.loadAnalytics();
    this.setupSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSubscriptions(): void {
    // Success subscriptions for UI updates
    this.store.select(selectCreateSuccess)
      .pipe(takeUntil(this.destroy$))
      .subscribe((success) => {
        if (success) {
          this.closeCreateModal();
          this.loadNewsletters();
          this.store.dispatch(NewsletterContentActions.resetCreateStatus());
        }
      });

    this.store.select(selectDeleteSuccess)
      .pipe(takeUntil(this.destroy$))
      .subscribe((success) => {
        if (success) {
          this.loadNewsletters();
          this.loadAnalytics();
          this.showDeleteConfirmation = false;
          this.store.dispatch(NewsletterContentActions.resetDeleteStatus());
        }
      });

    this.store.select(selectSendToSelectedSubscribersSuccess)
      .pipe(takeUntil(this.destroy$))
      .subscribe((success) => {
        if (success) {
          this.closeAllSendModals();
          this.loadNewsletters();
          this.loadAnalytics();
          this.store.dispatch(NewsletterContentActions.resetSendToSelectedSubscribersStatus());
        }
      });

    this.store.select(selectSendToSelectedUsersWithCvSuccess)
      .pipe(takeUntil(this.destroy$))
      .subscribe((success) => {
        if (success) {
          this.closeAllSendModals();
          this.loadNewsletters();
          this.loadAnalytics();
          this.store.dispatch(NewsletterContentActions.resetSendToSelectedUsersWithCvStatus());
        }
      });
  }

  // Methods called from HTML template
  openCreateModal(): void {
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
  }

  onNewsletterCreate(request: CreateNewsletterContentRequest): void {
    this.store.dispatch(NewsletterContentActions.createNewsletter({ request }));
  }

  onFilterChange(status: NewsletterStatus | null): void {
    this.selectedFilter = status;
    this.currentPage = 1;
    this.loadNewsletters();
  }

  onNewsletterSelect(id: string): void {
    // Navigate to newsletter detail or perform selection logic
    console.log('Newsletter selected:', id);
  }

  // Updated method to store newsletter ID for sending
  openSendConfirmation(id?: string, event?: Event): void {
    if (!id) return;
    
    if (event) {
      event.stopPropagation();
    }
    
    this.selectedNewsletterIdForSending = id;
    this.showRecipientSelection = true;
  }

  openDeleteConfirmation(id: string | undefined, event: Event): void {
    if (!id) return;
    event.stopPropagation();
    this.showDeleteConfirmation = true;
    // Store the newsletter ID for deletion
  }

  closeDeleteConfirmation(): void {
    this.showDeleteConfirmation = false;
  }

  confirmDelete(): void {
    // Implement delete logic with stored newsletter ID
    this.store.dispatch(NewsletterContentActions.deleteNewsletter({ id: 'newsletterIdToDelete' }));
  }

  // Updated method to close recipient selection
  closeRecipientSelection(): void {
    this.showRecipientSelection = false;
    this.selectedNewsletterIdForSending = null;
  }

  // New method to handle newsletter sending
  onSendNewsletter(event: { newsletterId: string; recipientType: 'subscribers' | 'users'; recipientIds: string[] }): void {
    const { newsletterId, recipientType, recipientIds } = event;
    
    if (recipientType === 'subscribers') {
      this.store.dispatch(NewsletterContentActions.sendNewsletterToSelectedSubscribers({
        id: newsletterId,
        subscriberIds: recipientIds
      }));
    } else if (recipientType === 'users') {
      this.store.dispatch(NewsletterContentActions.sendNewsletterToSelectedUsersWithCv({
        id: newsletterId,
        userIds: recipientIds
      }));
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadNewsletters();
  }

  private closeAllSendModals(): void {
    this.showRecipientSelection = false;
    this.selectedNewsletterIdForSending = null;
  }

  private loadNewsletters(): void {
    this.store.dispatch(
      NewsletterContentActions.loadNewsletters({
        page: this.currentPage,
        limit: 10, // Default page size
        status: this.selectedFilter || undefined,
      })
    );
  }

  private loadAnalytics(): void {
    this.store.dispatch(NewsletterContentActions.loadAnalytics());
  }
}