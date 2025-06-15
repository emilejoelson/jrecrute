import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '../../../../../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-newsletter-analytics',
  imports: [CommonModule,IconComponent],
  templateUrl: './newsletter-analytics.component.html',
  styleUrl: './newsletter-analytics.component.scss'
})
export class NewsletterAnalyticsComponent {
  @Input() analytics: any;
}
