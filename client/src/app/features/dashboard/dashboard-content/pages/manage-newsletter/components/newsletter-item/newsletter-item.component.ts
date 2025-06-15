import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsletterContent } from '../../../../../../newsletter/data-access/models/newsletter-content';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newsletter-item',
  imports: [CommonModule],
  templateUrl: './newsletter-item.component.html',
  styleUrl: './newsletter-item.component.scss',
})
export class NewsletterItemComponent {
  @Input() newsletter!: NewsletterContent;
  @Output() onSelect = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<Event>();
  @Output() onSend = new EventEmitter<Event>();
}
