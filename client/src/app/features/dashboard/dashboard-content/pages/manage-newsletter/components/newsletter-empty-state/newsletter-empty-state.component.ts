import { Component, EventEmitter, Output } from '@angular/core';
import { IconComponent } from '../../../../../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-newsletter-empty-state',
  imports: [IconComponent],
  templateUrl: './newsletter-empty-state.component.html',
  styleUrl: './newsletter-empty-state.component.scss',
})
export class NewsletterEmptyStateComponent {
  @Output() createNewsletter = new EventEmitter<void>();

  onCreate() {
    this.createNewsletter.emit();
  }
}
