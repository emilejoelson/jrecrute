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
import { TranslateModule } from '@ngx-translate/core';
 
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
  imports: [TranslateModule],
  templateUrl: './job-offer-section.component.html',
  styleUrl: './job-offer-section.component.scss',
})
export class JobOfferSectionComponent implements AfterViewInit {
  isVisible = false;
  jobOffers:JobOffer[] = [
    {
      company: 'Consult Collab',
      title: 'JOB_OFFERS.COMMERCIAL',
      slug: 'commercial',
      type: 'JOB_OFFERS.TYPE',
      time: 'JOB_OFFERS.TIME',
      logo: '→',
    },
    {
      company: 'Consult Collab',
      title: 'JOB_OFFERS.SECRETAIRE',
      slug: 'secretaire',
      type: 'JOB_OFFERS.TYPE',
      time: 'JOB_OFFERS.TIME',
      logo: '→',
    },
    {
      company: 'Consult Collab',
      title: 'JOB_OFFERS.DEVELOPPEUR_WEB',
      slug: 'developpeur-web',
      type: 'JOB_OFFERS.TYPE',
      time: 'JOB_OFFERS.TIME',
      logo: '→',
    },
    {
      company: 'Consult Collab',
      title: 'JOB_OFFERS.PROFIL_BILINGUE',
      slug: 'profil-bilingue',
      type: 'JOB_OFFERS.TYPE',
      time: 'JOB_OFFERS.TIME',
      logo: '→',
    },
    {
      company: 'Consult Collab',
      title: 'JOB_OFFERS.COMMUNITY_MANAGER',
      slug: 'community-manager',
      type: 'JOB_OFFERS.TYPE',
      time: 'JOB_OFFERS.TIME',
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
