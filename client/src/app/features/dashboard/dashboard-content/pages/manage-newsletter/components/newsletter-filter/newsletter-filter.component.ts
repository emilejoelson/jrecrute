import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsletterStatus } from '../../../../../../newsletter/data-access/models/newsletter-content';

@Component({
  selector: 'app-newsletter-filter',
  imports: [],
  templateUrl: './newsletter-filter.component.html',
  styleUrl: './newsletter-filter.component.scss',
})
export class NewsletterFilterComponent {
  @Input() selectedFilter: string | null = null;
  @Output() filterChange = new EventEmitter<NewsletterStatus | null>();

  filters = [
    { value: null, label: 'All' },
    { value: 'draft' as NewsletterStatus, label: 'Drafts' },
    { value: 'scheduled' as NewsletterStatus, label: 'Scheduled' },
    { value: 'published' as NewsletterStatus, label: 'Published' },
  ];

  onFilterSelect(value: NewsletterStatus | null) {
    this.filterChange.emit(value);
  }

  getFilterClass(value: string | null): string {
    return this.selectedFilter === value
      ? 'bg-purple-600 text-white'
      : 'bg-gray-700 text-gray-300';
  }
}
