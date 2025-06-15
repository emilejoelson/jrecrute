import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../../../../../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-newsletter-pagination',
  imports: [IconComponent],
  templateUrl: './newsletter-pagination.component.html',
  styleUrl: './newsletter-pagination.component.scss',
})
export class NewsletterPaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
