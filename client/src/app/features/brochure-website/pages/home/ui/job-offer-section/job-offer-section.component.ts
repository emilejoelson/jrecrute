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
 
interface JobOffer {
  company : string;
  title : string;
  slug : string;
  type : string;
  time : string;
  logo : string;
}
@Component({
  selector: 'app-job-offer-section',
  standalone: true,
  templateUrl: './job-offer-section.component.html',
  styleUrl: './job-offer-section.component.scss',
})
export class JobOfferSectionComponent implements AfterViewInit {
  isVisible = false;
  jobOffers:JobOffer[] = [
    {
      company: 'Consult Collab',
      title: 'Commercial',
      slug: 'commercial',
      type: 'Télétravail en temps plein',
      time: 'Publiée il y a moins de 24h',
      logo: '→',
    },
    {
      company: 'Consult Collab',
      title: 'Secrétaire',
      slug: 'secretaire',
      type: 'Télétravail en temps plein',
      time: 'Publiée il y a moins de 24h',
      logo: '→',
    },
    {
      company: 'Consult Collab',
      title: 'Développeur web',
      slug: 'developpeur-web',
      type: 'Télétravail en temps plein',
      time: 'Publiée il y a moins de 24h',
      logo: '→',
    },
    {
      company: 'Consult Collab',
      title: 'Profil bilingue',
      slug: 'profil-bilingue',
      type: 'Télétravail en temps plein',
      time: 'Publiée il y a moins de 24h',
      logo: '→',
    },
    {
      company: 'Consult Collab',
      title: 'Community Manager',
      slug: 'profil-bilingue',
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
  
  navigateToJobDetails(slug: string) {
    this.router.navigate(['/offre-d\'emploi', slug]);
    window.scroll(0, 0);
  }
}
