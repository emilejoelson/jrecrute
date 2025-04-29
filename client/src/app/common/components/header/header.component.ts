// TypeScript (header.component.ts)
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
    translationKey: string;
    sectionId: string;
    href?: string;
    behaviour: string;
  }[];
  buttons: { 
    name: string;
    translationKey: string;
  }[];
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, IconComponent],
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
  dropdonwOpenSetting : boolean = false;
  profileImageUrl: string = 'assets/profile/user-avatar.jpg';
  userName: string = 'emilejoelson';
  fullName: string = 'Joelson Emile ANDRIAMIHAJA'
  isProfileMenuOpen: boolean = false;

  // Add this method to your component class
getInitials(fullName: string): string {
  if (!fullName) return '';
  
  // Split the name by spaces
  const nameParts = fullName.split(' ');
  
  // Map through each part and take the first character, then join them
  return nameParts
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

toggleDropdownOpen() {
  this.dropdonwOpenSetting = !this.dropdonwOpenSetting;
  if(this.dropdonwOpenSetting){
    this.isProfileMenuOpen = false;
  }
}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.isProfileMenuOpen = false;
    }
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    if (this.isProfileMenuOpen) {
      this.dropdownOpen = false;
    }
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

  logout() {
    console.log('Logging out...');
    this.isProfileMenuOpen = false;
  }

  onDeposit() {
    this.isNavOpen = false;
    this.router.navigate(['/deposer-un-cv']);
    window.scrollTo(0, 0);
  }

  onSignup(){
    this.isNavOpen = false;
    this.router.navigate(['/inscription']);
    window.scrollTo(0, 0);
    this.toggleProfileMenu();
  }
  onLogin(){
    this.isNavOpen = false;
    this.router.navigate(['/connexion']);
    window.scrollTo(0, 0);
    this.toggleProfileMenu();
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
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.performScroll(sectionId);
        }, 100);
      });
    } else {
      this.performScroll(sectionId);
    }
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

  @HostListener('window:scroll')
  scrollHandler() {
    this.toggleHeaderBackground();
    this.updateProgressBar();
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent): void {
    if (this.isProfileMenuOpen && !event.target) {
      this.isProfileMenuOpen = false;
    }
    
    if (this.dropdownOpen && !event.target) {
      this.dropdownOpen = false;
    }
  }

  toggleHeaderBackground() {
    if (typeof window === 'undefined') {
      return;
    }
    const top = window.scrollY;
    if (top > 0) {
      this.headerElement.nativeElement.style.background = 'white';
      this.headerElement.nativeElement.style.boxShadow =
        'rgba(17, 17, 26, 0.1) 0px 1px 0px';

      this.headerElement.nativeElement.classList.remove('min-h-[100px]');
      this.headerElement.nativeElement.classList.add('min-h-[70px]');

      this.navElements.forEach((navElement) => {
        navElement.nativeElement.classList.remove('text-gray-100');
        navElement.nativeElement.classList.add('text-gray-600');
      });
    } else {
      this.headerElement.nativeElement.style.background = 'transparent';
      this.headerElement.nativeElement.style.boxShadow = 'none';

      this.headerElement.nativeElement.classList.add('min-h-[100px]');
      this.headerElement.nativeElement.classList.remove('min-h-[70px]');

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