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
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
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

@Component({
  selector: 'app-manage-newsletter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NewsletterItemComponent,
    NewsletterDetailComponent,
    ModalComponent,
    EditorComponent,
    RouterModule,
    FilterNotNullPipe,
    IconComponent,
  ],
  templateUrl: './manage-newsletter.component.html',
  styleUrl: './manage-newsletter.component.scss',
})
export class ManageNewsletterComponent implements OnInit, OnDestroy {
  @ViewChild('modalBody') modalBodyRef!: ElementRef;
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  showSendConfirmation = false;
  newsletterToSend: string | null = null;
  newsletterRecipientsCount = 0;
  sendLoading$ = this.store.select(selectSendLoading);
  sendSuccess$ = this.store.select(selectSendSuccess);

  newsletters$: Observable<NewsletterContent[]> = this.store
    .select(selectNewsletters)
    .pipe(map((newsletters) => newsletters || []));

  safeNewsletters$ = this.newsletters$.pipe(
    map((newsletters) => newsletters || [])
  );
  pagination$ = this.store.select(selectPagination);
  loading$ = this.store.select(selectNewslettersLoading);
  error$ = this.store.select(selectNewslettersError);
  analytics$: Observable<NewsletterAnalytics | null> =
    this.store.select(selectAnalytics);
  analyticsLoading$ = this.store.select(selectAnalyticsLoading);
  createLoading$ = this.store.select(selectCreateLoading);
  createSuccess$ = this.store.select(selectCreateSuccess);
  createError$ = this.store.select(selectCreateError);
  deleteLoading$ = this.store.select(selectDeleteLoading);
  deleteSuccess$ = this.store.select(selectDeleteSuccess);

  currentPage = 1;
  pageSize = 10;
  selectedFilter: NewsletterStatus | null = null;
  showCreateModal = false;
  showDeleteConfirmation = false;
  newsletterToDelete: string | null = null;
  selectedNewsletterId: string | null = null;
  newsletterForm!: FormGroup;
  imageFile: File | null = null;
  imagePreview: string | null = null;

  publishFrequencyOptions: { value: PublishFrequency; label: string }[] = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
  ];

  ngOnInit() {
    this.loadNewsletters();
    this.loadAnalytics();
    this.initForm();

    this.createSuccess$.pipe(takeUntil(this.destroy$)).subscribe((success) => {
      this.resetForm();
      if (success) {
        this.closeCreateModal();
        this.loadNewsletters();
        this.store.dispatch(NewsletterContentActions.resetCreateStatus());
      }
    });

    this.deleteSuccess$.pipe(takeUntil(this.destroy$)).subscribe((success) => {
      if (success) {
        this.loadNewsletters();
        this.loadAnalytics();
        this.showDeleteConfirmation = false;
        this.newsletterToDelete = null;
        this.store.dispatch(NewsletterContentActions.resetDeleteStatus());
      }
    });

    this.sendSuccess$.pipe(takeUntil(this.destroy$)).subscribe((success) => {
      if (success) {
        // Make sure to set the flag to false first
        this.showSendConfirmation = false;
        this.newsletterToSend = null;

        // Then load data and reset the status
        this.loadNewsletters();
        this.loadAnalytics();
        this.store.dispatch(NewsletterContentActions.resetSendStatus());
      }
    });
  }

 openSendConfirmation(id?: string, event?: Event): void {
  if (!id) return;
  
  // If an event was passed, prevent propagation
  if (event) {
    event.stopPropagation();
  }
  
  this.newsletterToSend = id;

  this.newsletters$
    .pipe(
      take(1), 
      map((newsletters) => newsletters.find((n) => n._id === id))
    )
    .subscribe((newsletter) => {
      if (newsletter) {
        this.newsletterRecipientsCount = newsletter.recipientCount || 0;
      }
      this.showSendConfirmation = true;
    });
}

closeSendConfirmation() {
  this.showSendConfirmation = false;
  this.newsletterToSend = null;
  this.newsletterRecipientsCount = 0;
}

  confirmSend(): void {
    if (this.newsletterToSend) {
      this.store.dispatch(
        NewsletterContentActions.sendNewsletter({ id: this.newsletterToSend })
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  resetForm() {
    this.newsletterForm.reset({
      title: '',
      description: '',
      publishFrequency: '',
      content: '',
      status: '',
    });

    this.imagePreview = null;
  }
  initForm(): void {
    this.newsletterForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      publishFrequency: ['weekly', Validators.required],
      content: ['', Validators.required],
      status: ['draft'],
    });
  }

  loadNewsletters(): void {
    this.store.dispatch(
      NewsletterContentActions.loadNewsletters({
        page: this.currentPage,
        limit: this.pageSize,
        status: this.selectedFilter || undefined,
      })
    );
  }

  loadAnalytics(): void {
    this.store.dispatch(NewsletterContentActions.loadAnalytics());
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadNewsletters();
  }

  onFilterChange(status: NewsletterStatus | null): void {
    this.selectedFilter = status;
    this.currentPage = 1;
    this.loadNewsletters();
  }

  onNewsletterSelect(id: string): void {
    this.selectedNewsletterId = id;
    this.router.navigate(['/dashboard/newsletter', id]);
  }

  openCreateModal() {
    this.initForm();
    this.imageFile = null;
    this.imagePreview = null;
    this.showCreateModal = true;
    window.scrollTo(0, 0);

    // Wait for Angular to render the modal
    setTimeout(() => {
      // Find the scrollable content in the modal and scroll to top
      const modalBody = document.querySelector('.overflow-auto');
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
    }, 10);
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.newsletterForm.reset({
      status: 'draft',
      publishFrequency: 'weekly',
    });
  }

  openDeleteConfirmation(id: string | undefined, event: Event): void {
    if (!id) return;
    event.stopPropagation();
    this.newsletterToDelete = id;
    this.showDeleteConfirmation = true;
  }
  closeDeleteConfirmation(): void {
    this.showDeleteConfirmation = false;
    this.newsletterToDelete = null;
  }

  confirmDelete(): void {
    if (this.newsletterToDelete) {
      this.store.dispatch(
        NewsletterContentActions.deleteNewsletter({
          id: this.newsletterToDelete,
        })
      );
    }
  }

  onImageChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.imageFile = element.files[0];

      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  removeImage(): void {
    this.imageFile = null;
    this.imagePreview = null;
  }

  onEditorContentChange(content: string): void {
    this.newsletterForm.patchValue({ content });
  }

  submitForm() {
    if (this.newsletterForm.valid) {
      const imagePathValue = this.imagePreview;

      const request: CreateNewsletterContentRequest = {
        title: this.newsletterForm.value.title,
        description: this.newsletterForm.value.description,
        publishFrequency: this.newsletterForm.value.publishFrequency,
        content: this.newsletterForm.value.content,
        status: this.newsletterForm.value.status,
        image: imagePathValue,
      };

      this.store.dispatch(
        NewsletterContentActions.createNewsletter({ request })
      );
    } else {
      Object.keys(this.newsletterForm.controls).forEach((key) => {
        const control = this.newsletterForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
