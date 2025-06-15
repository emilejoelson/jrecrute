import { isPlatformBrowser } from '@angular/common';
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
  signal,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-our-customers-section',
  standalone: true,
  imports: [],
  templateUrl: './our-customers-section.component.html',
  styleUrl: './our-customers-section.component.scss',
})
export class OurCustomersSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('companiesListOne, companiesListTwo, companiesListThree')
  companiesLists!: QueryList<ElementRef<HTMLUListElement>>;

  source = interval(300);
  intervalSubscription: Subscription | null = null;

  isBrowser: WritableSignal<boolean> = signal(false);
  initialTranslateXValue: WritableSignal<number> = signal(0);
  isIntervalPaused: WritableSignal<boolean> = signal(false);

  images = [
    { src: 'codingart-logo.png' },
    { src: 'biborne-logo.png' },
    { src: 'roomee-logo.png' },
    { src: 'codingart-logo.png' },
    { src: 'biborne-logo.png' },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  autoScroll() {
    const elementRefsArray: ElementRef<HTMLUListElement>[] =
      this.companiesLists.toArray();

    const sliderWidth = elementRefsArray[0].nativeElement.clientWidth;
    const currentTranslateXValue = this.initialTranslateXValue();

    let nextTranslateXValue = currentTranslateXValue - 10;
    let isRewind = false;

    if (Math.abs(currentTranslateXValue) >= sliderWidth) {
      nextTranslateXValue = sliderWidth - Math.abs(currentTranslateXValue);
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
}
