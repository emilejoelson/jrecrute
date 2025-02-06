import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

type TNavLinks = {
  links: {
    name: string;
    translationKey: string; // Add this
    sectionId: string;
    href?: string;
    behaviour: string;
  }[];
  buttons: { 
    name: string;
    translationKey: string; // Add this
  }[];
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('headerElement') headerElement!: ElementRef<HTMLElement>;
  @ViewChild('progressBarElement')
  progressBarElement!: ElementRef<HTMLDivElement>;
  @ViewChildren('navElement') navElements!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('logoImage') logoImage!: ElementRef<HTMLImageElement>;
  @ViewChild('logoContainer') logoContainer!: ElementRef<HTMLDivElement>;

  isNavOpen = false;
  currentRoute: string = '';
  dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  currentLanguage: 'FR' | 'EN' = 'EN';

  constructor(private router: Router,private translationService: TranslationService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    this.currentLanguage = this.translationService.getCurrentLang() as 'FR' | 'EN';

  }

  switchLanguage(lang: 'FR' | 'EN') {
    this.translationService.switchLanguage(lang);
    this.currentLanguage = lang;
    this.dropdownOpen = false;
  }

  navItems: TNavLinks = {
    links: [
      { 
        name: 'Offres', 
        translationKey: 'HEADER.OFFRES', 
        sectionId: 'offers-section', 
        behaviour: 'scroll' 
      },
      { 
        name: 'Etapes', 
        translationKey: 'HEADER.ETAPES', 
        sectionId: 'steps-section', 
        behaviour: 'scroll' 
      },
      {
        name: 'Avantages',
        translationKey: 'HEADER.AVANTAGES',
        sectionId: 'advantages-section',
        behaviour: 'scroll',
      },
      { 
        name: 'FAQ', 
        translationKey: 'HEADER.FAQ', 
        sectionId: 'faq-section', 
        behaviour: 'scroll' 
      },
      { 
        name: 'Contact', 
        translationKey: 'HEADER.CONTACT', 
        sectionId: 'contact-section', 
        behaviour: 'scroll' 
      },
    ],
    buttons: [
      {
        name: 'Client',
        translationKey: 'HEADER.CLIENT'
      },
      {
        name: 'Postuler maintenant',
        translationKey: 'HEADER.POSTULER_MAINTENANT'
      },
    ],
  };

  onDeposit() {
    this.isNavOpen = false;
    this.router.navigate(['/deposer-un-cv']);
    window.scrollTo(0, 0);
  }

  onClient() {
    this.isNavOpen = false;
    this.router.navigate(['/client']);
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    this.toggleHeaderBackground();
    this.updateProgressBar();
  }

  scrollToSection(sectionId: string) {
    // First check if we're on the home page
    if (this.router.url !== '/') {
      // If not, navigate to home and then scroll
      this.router.navigate(['/']).then(() => {
        // Wait for navigation and DOM update
        setTimeout(() => {
          this.performScroll(sectionId);
        }, 100);
      });
    } else {
      // If already on home page, scroll directly
      this.performScroll(sectionId);
    }

    // Close mobile nav if open
    this.isNavOpen = false;
  }

  private performScroll(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = this.headerElement.nativeElement.offsetHeight;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }
  //onScroll evenet to the window
  @HostListener('window:scroll')
  scrollHandler() {
    this.toggleHeaderBackground();
    this.updateProgressBar();
  }

  //methods
  toggleHeaderBackground() {
    if (typeof window === 'undefined') {
      return;
    }
    const top = window.scrollY;
    if (top > 0) {
      // Header background changes
      this.headerElement.nativeElement.style.background = 'white';
      this.headerElement.nativeElement.style.boxShadow =
        'rgba(17, 17, 26, 0.1) 0px 1px 0px';

      // Reduce header height
      this.headerElement.nativeElement.classList.remove('min-h-[100px]');
      this.headerElement.nativeElement.classList.add('min-h-[70px]');

      // Reduce logo size
      // this.logoImage.nativeElement.classList.remove('w-9', 'h-9');
      // this.logoImage.nativeElement.classList.add('w-8', 'h-8');

      // Reduce logo text size
      // this.logoContainer.nativeElement
      //   .querySelector('span')
      //   ?.classList.remove('text-2xl');
      // this.logoContainer.nativeElement
      //   .querySelector('span')
      //   ?.classList.add('text-xl');

      // Update all nav items to blue
      this.navElements.forEach((navElement) => {
        navElement.nativeElement.classList.remove('text-gray-100');
        navElement.nativeElement.classList.add('text-gray-600');
      });
    } else {
      // Reset header background
      this.headerElement.nativeElement.style.background = 'transparent';
      this.headerElement.nativeElement.style.boxShadow = 'none';

      // Reset header height
      this.headerElement.nativeElement.classList.add('min-h-[100px]');
      this.headerElement.nativeElement.classList.remove('min-h-[70px]');

      // Reset logo size
      // this.logoImage.nativeElement.classList.add('w-9', 'h-9');
      // this.logoImage.nativeElement.classList.remove('w-8', 'h-8');

      // Reset logo text size
      // this.logoContainer.nativeElement
      //   .querySelector('span')
      //   ?.classList.add('text-2xl');
      // this.logoContainer.nativeElement
      //   .querySelector('span')
      //   ?.classList.remove('text-xl');

      // Reset nav items to gray
      this.navElements.forEach((navElement) => {
        navElement.nativeElement.classList.remove('text-gray-600');
        navElement.nativeElement.classList.add('text-gray-100');
      });
    }
  }

  updateProgressBar() {
    if (typeof window === 'undefined') {
      return;
    }
    const top = window.scrollY;
    const pageHeight = window.document.body.scrollHeight - window.innerHeight;
    const progressBarWidth = (top / Math.max(1, pageHeight)) * 100;

    if (top > 0) {
      this.progressBarElement.nativeElement.style.opacity = '1';
    } else {
      this.progressBarElement.nativeElement.style.opacity = '0';
    }

    this.progressBarElement.nativeElement.style.width = `${progressBarWidth}%`;
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  
}
