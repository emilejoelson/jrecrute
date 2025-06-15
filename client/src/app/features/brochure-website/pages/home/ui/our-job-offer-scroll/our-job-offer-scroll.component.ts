import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface JobOffer {
  title: string;
  slug: string;
}
@Component({
  selector: 'app-our-job-offer-scroll',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './our-job-offer-scroll.component.html',
  styleUrl: './our-job-offer-scroll.component.scss',
})
export class OurJobOfferScrollComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('jobOfferListOne, jobOfferListTwo, jobOfferListThree')
  jobOfferLists!: QueryList<ElementRef<HTMLUListElement>>;
  router = inject(Router);

  source = interval(100); // Faster scrolling for smoother animation
  intervalSubscription: Subscription | null = null;

  isBrowser: WritableSignal<boolean> = signal(false);
  initialTranslateXValue: WritableSignal<number> = signal(0);
  isIntervalPaused: WritableSignal<boolean> = signal(false);

  jobOffers: JobOffer[] = [
    {
      title: 'JOB_OFFERS.COMMERCIAL',
      slug: 'commercial',
    },
    {
      title: 'JOB_OFFERS.COMMUNITY_MANAGER',
      slug: 'community-manager',
    },
    {
      title: 'JOB_OFFERS.DEVELOPPEUR_WEB',
      slug: 'developpeur-web',
    },
    {
      title: 'JOB_OFFERS.SECRETAIRE',
      slug: 'secretaire',
    },
    {
      title: 'JOB_OFFERS.PROFIL_BILINGUE',
      slug: 'profil-bilingue',
    },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  autoScroll() {
    const elementRefsArray: ElementRef<HTMLUListElement>[] =
      this.jobOfferLists.toArray();

    const sliderWidth = elementRefsArray[0].nativeElement.scrollWidth;
    const currentTranslateXValue = this.initialTranslateXValue();

    let nextTranslateXValue = currentTranslateXValue - 2; // Smoother transition speed
    let isRewind = false;

    if (Math.abs(currentTranslateXValue) >= sliderWidth) {
      nextTranslateXValue = 0; // Reset position
      isRewind = true;
    }

    this.initialTranslateXValue.set(nextTranslateXValue);

    if (isRewind) {
      elementRefsArray.forEach((elementRef) => {
        elementRef.nativeElement.style.transitionDuration = '0s';
      });

      setTimeout(() => {
        this.autoScroll();
      }, 0);
    } else {
      elementRefsArray.forEach((elementRef) => {
        elementRef.nativeElement.style.transitionDuration = '0.3s';
      });
    }
  }

  pauseInterval() {
    this.isIntervalPaused.set(true);
  }

  resumeInterval() {
    this.isIntervalPaused.set(false);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser()) {
      this.intervalSubscription = this.source.subscribe(() => {
        if (this.isIntervalPaused()) {
          return;
        }
        this.autoScroll();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
  navigateToJobDetails(slug: string) {
    this.router.navigate(["/offre-d\'emploi", slug]);
    window.scroll(0, 0);
  }
}
