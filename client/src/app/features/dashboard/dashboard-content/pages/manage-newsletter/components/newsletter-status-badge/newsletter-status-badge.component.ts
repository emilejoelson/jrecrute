import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-newsletter-status-badge',
  imports: [CommonModule],
  templateUrl: './newsletter-status-badge.component.html',
  styleUrl: './newsletter-status-badge.component.scss'
})
export class NewsletterStatusBadgeComponent {
@Input() status: string = '';

  getStatusClass(): string {
    const classes = {
      'draft': 'bg-gray-700 text-gray-300',
      'scheduled': 'bg-yellow-900/30 text-yellow-300',
      'published': 'bg-green-900/30 text-green-300'
    };
    return classes[this.status as keyof typeof classes] || 'bg-gray-700 text-gray-300';
  }
}
