import { AfterViewInit, Component, ElementRef, inject, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-advantage-section',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './advantage-section.component.html',
  styleUrl: './advantage-section.component.scss'
})
export class AdvantageSectionComponent implements AfterViewInit {
  elementRef = inject(ElementRef);
  isVisible = false;

  // Inject PLATFORM_ID to check if it's running in the browser
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Execute only in the browser
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.isVisible = entry.isIntersecting;
        },
        {
          threshold: 0.2
        }
      );
      observer.observe(this.elementRef.nativeElement);
    }
  }
}
