import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsletterEmptyStateComponent } from '../newsletter-empty-state/newsletter-empty-state.component';
import { NewsletterCardComponent } from '../newsletter-card/newsletter-card.component';
import { NewsletterPaginationComponent } from '../newsletter-pagination/newsletter-pagination.component';
import { NewsletterContent } from '../../../../../../newsletter/data-access/models/newsletter-content';

@Component({
  selector: 'app-newsletter-list',
  imports: [
    NewsletterEmptyStateComponent,
    NewsletterCardComponent,
    NewsletterPaginationComponent,
  ],
  templateUrl: './newsletter-list.component.html',
  styleUrl: './newsletter-list.component.scss',
})
export class NewsletterListComponent {
  @Input() newsletters: NewsletterContent[] | null = [];
  @Input() loading: boolean | null = false;
  @Input() error: any = null;
  @Input() pagination: any = null;
  @Input() currentPage: number = 1;

  @Output() select = new EventEmitter<string>();
  @Output() send = new EventEmitter<{ id: string; event: Event }>();
  @Output() delete = new EventEmitter<{ id: string; event: Event }>();
  @Output() create = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<number>();

  onSelect(id: string) {
    this.select.emit(id);
  }

  onSend(data: { id: string; event: Event }) {
    this.send.emit(data);
  }

  onDelete(data: { id: string; event: Event }) {
    this.delete.emit(data);
  }

  onCreate() {
    this.create.emit();
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
