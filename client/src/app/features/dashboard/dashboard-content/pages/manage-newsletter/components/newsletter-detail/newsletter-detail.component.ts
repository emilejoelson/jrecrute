import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import {
  NewsletterContent,
} from '../../../../../../newsletter/data-access/models/newsletter-content';
import {
  selectCreatedNewsletter,
  selectCreateLoading,
  selectSelectedNewsletter,
  selectSelectedNewsletterError,
  selectSelectedNewsletterLoading,
} from '../../../../../../newsletter/data-access/store/selectors/newsletter-content.selectors';
import { NewsletterContentActions } from '../../../../../../newsletter/data-access/store/actions/newsletter-content.actions';
import { State } from '../../../../../../../state/root.state';

@Component({
  selector: 'app-newsletter-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './newsletter-detail.component.html',
  styleUrl: './newsletter-detail.component.scss',
})
export class NewsletterDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private store = inject(Store<State>);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  newsletter$: Observable<NewsletterContent | null> = this.store.select(
    selectSelectedNewsletter
  );
  loading$: Observable<boolean> = this.store.select(
    selectSelectedNewsletterLoading
  );
  error$: Observable<any> = this.store.select(selectSelectedNewsletterError);

  ngOnInit(): void {
    // Get the newsletter ID from the route params
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = params.get('id');
      if (id) {
        // Dispatch action to load the newsletter
        this.store.dispatch(NewsletterContentActions.loadNewsletter({ id }));
      }
    });
  }

  navigateBack(): void {
    this.router.navigate(['/dashboard/newsletter']);
  }

  formatDate(date: Date | string | null | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'draft':
        return 'bg-gray-700 text-gray-300';
      case 'scheduled':
        return 'bg-yellow-900/30 text-yellow-300';
      case 'published':
        return 'bg-green-900/30 text-green-300';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  }

  getCreatorName(newsletter: NewsletterContent): string {
    if (typeof newsletter.createdBy === 'string') {
      return 'Unknown';
    }

    const personalInfo = newsletter.createdBy.personalInfo;
    if (!personalInfo) return 'Unknown';

    return `${personalInfo.firstName} ${personalInfo.lastName}`;
  }

  ngOnDestroy() {
    this.store.dispatch(NewsletterContentActions.clearSelectedNewsletter());

    this.destroy$.next();
    this.destroy$.complete();
  }
}
