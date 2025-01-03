import { AfterViewInit, Component, ElementRef, inject, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { HomeHowItWorkImageComponent } from '../../../../../../../assets/svg/templates/home-how-it-work-image/home-how-it-work-image.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-it-work-section',
  standalone: true,
  imports: [
    HomeHowItWorkImageComponent,
  ],
  templateUrl: './how-it-work-section.component.html',
  styleUrl: './how-it-work-section.component.scss',
})
export class HowItWorkSectionComponent implements AfterViewInit {
  private viewportScroller = inject(ViewportScroller);
router = inject(Router);
  elementRef = inject(ElementRef);
  isVisible = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  scrollToAncherHandler(elementId: string) {
    return () => this.viewportScroller.scrollToAnchor(elementId);
  }

  ngAfterViewInit() {
    // Check if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.isVisible = entry.isIntersecting;
        },
        {
          threshold: 0.2,
        }
      );
      observer.observe(this.elementRef.nativeElement);
    }
  }
  onDeposit() {
    this.router.navigate(['/deposer-un-cv']);
    window.scrollTo(0, 0);
  }
}
