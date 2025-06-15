import { AfterViewInit, Component, ElementRef, inject, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { HomeHowItWorkImageFrComponent } from '../../../../../../../assets/svg/templates/home-how-it-work-image-fr/home-how-it-work-image-fr.component';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HomeHowItWorkImageEnComponent } from '../../../../../../../assets/svg/templates/home-how-it-work-image-en/home-how-it-work-image-en.component';
import { TranslationService } from '../../../../../../core/services/translation.service';

@Component({
  selector: 'app-how-it-work-section',
  standalone: true,
  imports: [
    HomeHowItWorkImageFrComponent,
    HomeHowItWorkImageEnComponent,
    TranslateModule
  ],
  templateUrl: './how-it-work-section.component.html',
  styleUrl: './how-it-work-section.component.scss',
})
export class HowItWorkSectionComponent implements AfterViewInit {
  private viewportScroller = inject(ViewportScroller);
router = inject(Router);
  elementRef = inject(ElementRef);
  isVisible = false;
  translationService = inject(TranslationService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getCurrentLanguage(): string {
    return this.translationService.getCurrentLang();
  }
  
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
