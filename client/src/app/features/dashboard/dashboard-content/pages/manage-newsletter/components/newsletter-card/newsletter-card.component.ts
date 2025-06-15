import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../../../../../../../shared/ui/icon/icon.component';
import { CommonModule } from '@angular/common';
import { NewsletterStatusBadgeComponent } from '../newsletter-status-badge/newsletter-status-badge.component';


@Component({
  selector: 'app-newsletter-card',
  imports: [IconComponent,CommonModule,NewsletterStatusBadgeComponent],
  templateUrl: './newsletter-card.component.html',
  styleUrl: './newsletter-card.component.scss'
})
export class NewsletterCardComponent {
  @Input() newsletter: any;
  @Output() select = new EventEmitter<string>();
  @Output() send = new EventEmitter<{ id: string; event: Event }>();
  @Output() delete = new EventEmitter<{ id: string; event: Event }>();

  onSelect() {
    this.select.emit(this.newsletter._id);
  }

  onSend(event: Event) {
    event.stopPropagation();
    this.send.emit({ id: this.newsletter._id, event });
  }

  onDelete(event: Event) {
    event.stopPropagation();
    this.delete.emit({ id: this.newsletter._id, event });
  }
}
