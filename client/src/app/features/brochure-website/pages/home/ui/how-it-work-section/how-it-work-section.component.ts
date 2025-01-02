import { AfterViewInit, Component, ElementRef, inject, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { PrimaryButtonComponent } from '../../../../../../common/components/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../../../../../common/components/buttons/secondary-button/secondary-button.component';
import { HomeHowItWorkImageComponent } from '../../../../../../../assets/svg/templates/home-how-it-work-image/home-how-it-work-image.component';

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
}
