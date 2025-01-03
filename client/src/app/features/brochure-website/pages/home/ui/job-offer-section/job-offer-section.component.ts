import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-offer-section',
  standalone: true,
  templateUrl: './job-offer-section.component.html',
  styleUrl: './job-offer-section.component.scss',
})
export class JobOfferSectionComponent implements AfterViewInit {
  isVisible = false;
  jobOffers = [
    {
      company: 'Consult Collab',
      title: 'Commercial',
      location: '',
      type: 'Télétravail en temps plein',
      time: 'Publiée il y a moins de 24h',
      logo: '→',
    },
    {
      company: 'Consult Collab',
      title: 'Secrétaire',
      location: '',
      type: 'Télétravail en temps plein',
      time: 'Publiée il y a moins de 24h',
      logo: '→',
    },
    {
      company: 'Consult Collab',
      title: 'Développeur web',
      location: '',
      type: 'Télétravail en temps plein',
      time: 'Publiée il y a moins de 24h',
      logo: '→',
    },
    {
      company: 'Consult Collab',
      title: 'Profil bilingue',
      location: '',
      type: 'Télétravail en temps plein',
      time: 'Publiée il y a moins de 24h',
      logo: '→',
    },
    {
      company: 'Consult Collab',
      title: 'Community Manager',
      location: '',
      type: 'Télétravail en temps plein',
      time: 'Publiée il y a moins de 24h',
      logo: '→',
    },
  ];

  router = inject(Router);
  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    // Check if code is running in browser
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.isVisible = entry.isIntersecting;
        },
        { threshold: 0.2 }
      );

      observer.observe(this.elementRef.nativeElement);
    }
  }
  onDeposit() {
    this.router.navigate(['/deposer-un-cv']);
    window.scrollTo(0, 0);
  }
}
