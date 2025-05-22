import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface NewsletterData {
  month: string;
  subscribers: number;
  openRate: number;
  clickRate: number;
}

@Component({
  selector: 'app-newsletter-stat',
  imports: [CommonModule],
  templateUrl: './newsletter-stat.component.html',
  styleUrl: './newsletter-stat.component.scss'
})
export class NewsletterStatComponent {
newsletterData: NewsletterData[] = [
    {
      month: 'January',
      subscribers: 523,
      openRate: 27.5,
      clickRate: 15.2
    },
    {
      month: 'February',
      subscribers: 648,
      openRate: 24.8,
      clickRate: 13.7
    },
    {
      month: 'March',
      subscribers: 945,
      openRate: 26.3,
      clickRate: 12.9
    },
    {
      month: 'April',
      subscribers: 1072,
      openRate: 23.9,
      clickRate: 11.5
    },
    {
      month: 'May',
      subscribers: 1593,
      openRate: 24.6,
      clickRate: 10.7
    }
  ];
}
