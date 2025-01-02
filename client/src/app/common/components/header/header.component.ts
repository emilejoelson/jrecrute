import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { Router } from '@angular/router';

type TNavLinks = {
  links: {
    name: string;
    sectionId: string;
    href?: string;
    behaviour: string;
  }[];
  buttons: { name: string; href: string; behaviour: 'link' | 'button' }[];
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('headerElement') headerElement!: ElementRef<HTMLElement>;
  @ViewChild('progressBarElement')
  progressBarElement!: ElementRef<HTMLDivElement>;
  isNavOpen = false;
  router = inject(Router);

  navItems: TNavLinks = {
    links: [
      { name: 'Offres', sectionId: 'offers-section', behaviour: 'scroll' },
      { name: 'Etapes', sectionId: 'steps-section', behaviour: 'scroll' },
      {
        name: 'Avantages',
        sectionId: 'advantages-section',
        behaviour: 'scroll',
      },
      { name: 'FAQ', sectionId: 'faq-section', behaviour: 'scroll' },
      { name: 'Contact', sectionId: 'contact-section', behaviour: 'scroll' },
    ],
    buttons: [
      {
        name: 'Postuler maintenant',
        href: '/deposer-un-cv',
        behaviour: 'link',
      },
    ],
  };

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
      this.headerElement.nativeElement.style.background = 'white';
      this.headerElement.nativeElement.style.boxShadow =
        'rgba(17, 17, 26, 0.1) 0px 1px 0px';
    } else {
      this.headerElement.nativeElement.style.background = 'transparent';
      this.headerElement.nativeElement.style.boxShadow = 'none';
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
