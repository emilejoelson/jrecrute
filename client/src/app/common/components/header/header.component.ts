import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { AuthActions } from '../../../authentication/data-access/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { State } from '../../../state/root.state';
import {
  selectFullName,
  selectIsAuthenticated,
  selectProfileImage,
  selectUser,
  selectUserEmail,
  selectUserProfile,
} from '../../../authentication/data-access/store/selectors/auth.selectors';
import {
  combineLatest,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { User } from '../../../authentication/signup/data-access/models/user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { CustomInputComponent } from '../../../features/cv-deposit/pages/deposit-cv/ui/steps/ui/custom-input/custom-input.component';

import { NewsletterActions } from '../../../features/newsletter/data-access/store/actions/newsletter.actions';
import {
  selectSubscribeError,
  selectSubscribeLoading,
  selectSubscribeResponse,
  selectSubscribeSuccess,
} from '../../../features/newsletter/data-access/store/selectors/newsletter.selectors';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

type TNavLinks = {
  links: {
    name: string;
    translationKey: string;
    sectionId: string;
    href?: string;
    behaviour: string;
    svgIcon: string;
    safeIcon?: SafeHtml;
  }[];
  buttons: {
    name: string;
    translationKey: string;
  }[];
};

interface NewsletterField {
  id: string;
  classInput: string;
  classLabel: string;
  title: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    IconComponent,
    CustomInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit, OnInit {
  @ViewChild('headerElement') headerElement!: ElementRef<HTMLElement>;
  @ViewChild('progressBarElement')
  progressBarElement!: ElementRef<HTMLDivElement>;
  @ViewChildren('navElement') navElements!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('logoImage') logoImage!: ElementRef<HTMLImageElement>;
  @ViewChild('logoContainer') logoContainer!: ElementRef<HTMLDivElement>;

  fb = inject(FormBuilder);
  isOnline: boolean = true;
  isNavOpen = false;
  currentRoute: string = '';
  dropdownOpen: boolean = false;
  dropdownNewsOpen: boolean = false;

  // Add the missing property for desktop menu dropdown
  showDesktopMenu: boolean = false;

  newsletterForm: FormGroup;
  newsletterLoading$: Observable<boolean>;
  newsletterSuccess$: Observable<boolean>;
  newsletterError$: Observable<any>;
  newsletterMessage$: Observable<any>;

  dropdonwOpenSetting: boolean = false;
  isProfileMenuOpen: boolean = false;

  private destroy$ = new Subject<void>();

  commonInputClass =
    'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none';
  commonLabelClass = 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1';

  isAuthenticated$: Observable<boolean>;
  userProfile$: Observable<Partial<User> | null>;
  profileImageUrl$: Observable<string>;
  fullName$: Observable<string>;
  userEmail$: Observable<string>;

  getInitials(fullName: string | null): string {
    if (!fullName) return '';

    const nameParts = fullName.split(' ');

    return nameParts.map((part) => part.charAt(0).toUpperCase()).join('');
  }

  toggleDropdownNews() {
    this.dropdownNewsOpen = !this.dropdownNewsOpen;
    if (this.dropdownNewsOpen) {
      this.isProfileMenuOpen = false;
      this.showDesktopMenu = false;
    }
  }
  toggleDropdownOpen() {
    this.dropdonwOpenSetting = !this.dropdonwOpenSetting;
    if (this.dropdonwOpenSetting) {
      this.isProfileMenuOpen = false;
      this.showDesktopMenu = false;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.isProfileMenuOpen = false;
      this.showDesktopMenu = false;
    }
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    if (this.isProfileMenuOpen) {
      this.dropdownOpen = false;
      this.showDesktopMenu = false;
    }
  }

  currentLanguage: 'FR' | 'EN' = 'EN';

  constructor(
    private router: Router,
    private translationService: TranslationService,
    private store: Store<State>,
    private sanitizer: DomSanitizer
  ) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.newsletterLoading$ = this.store.select(selectSubscribeLoading);
    this.newsletterSuccess$ = this.store.select(selectSubscribeSuccess);
    this.newsletterError$ = this.store.select(selectSubscribeError);
    this.newsletterMessage$ = this.store.select(selectSubscribeResponse);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    this.currentLanguage = this.translationService.getCurrentLang() as
      | 'FR'
      | 'EN';

    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);

    this.userProfile$ = this.store.select(selectUserProfile);
    this.profileImageUrl$ = this.store.select(selectProfileImage);
    this.fullName$ = this.store.select(selectFullName);
    this.userEmail$ = this.store.select(selectUserEmail);

    this.userEmail$.pipe(takeUntil(this.destroy$)).subscribe((email) => {
      console.log('User Email Value:', email);
    });

    this.fullName$.pipe(takeUntil(this.destroy$)).subscribe((name) => {
      console.log('Full Name Value:', name);
    });

    this.profileImageUrl$
      .pipe(takeUntil(this.destroy$))
      .subscribe((imageUrl) => {
        console.log('Profile Image URL:', imageUrl);
      });

    this.userProfile$.pipe(takeUntil(this.destroy$)).subscribe((profile) => {
      console.log('Complete User Profile:', profile);
    });

    // Alternative approach using combineLatest if you want to log everything together
    combineLatest([
      this.userEmail$,
      this.fullName$,
      this.profileImageUrl$,
      this.userProfile$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([email, fullName, imageUrl, profile]) => {
        console.log('--- User Data Debug ---');
        console.log('Email:', email);
        console.log('Name:', fullName);
        console.log('Image:', imageUrl);
        console.log('Profile:', profile);
        console.log('---------------------');
      });

    combineLatest([this.isAuthenticated$])
      .pipe(map(([isAuthenticated]) => isAuthenticated))
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.store.dispatch(AuthActions.loadUserProfile());
        }
      });
    this.initNavItems();
  }

  ngOnInit() {
    this.store.dispatch(NewsletterActions.resetSubscribeStatus());
    this.newsletterSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((success) => success === true)
      )
      .subscribe(() => {
        this.toggleDropdownNews();
      });

      setInterval(() => {
        this.isOnline = !this.isOnline;
      }, 30000);
  }

  onNewsletterSubmit(): void {
    if (this.newsletterForm.valid) {
      const request = {
        email: this.newsletterForm.value.email,
      };
      this.store.dispatch(NewsletterActions.subscribe({ request }));
    } else {
      this.newsletterForm.markAllAsTouched();
    }
  }

  resetNewsletterForm(): void {
    this.newsletterForm.reset();
    this.store.dispatch(NewsletterActions.resetSubscribeStatus());
  }

  switchLanguage(lang: 'FR' | 'EN') {
    this.translationService.switchLanguage(lang);
    this.currentLanguage = lang;
    this.dropdownOpen = false;
  }

  initNavItems() {
    this.navItems.links.forEach((link) => {
      link.safeIcon = this.sanitizer.bypassSecurityTrustHtml(link.svgIcon);
    });
  }

  navItems: TNavLinks = {
    links: [
      {
        name: 'Offres',
        translationKey: 'HEADER.OFFRES',
        sectionId: 'offers-section',
        behaviour: 'scroll',
        svgIcon: ` <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"></path>
                                    </svg>`,
      },
      {
        name: 'Etapes',
        translationKey: 'HEADER.ETAPES',
        sectionId: 'steps-section',
        behaviour: 'scroll',
        svgIcon: `<svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                                    </svg>`,
      },
      {
        name: 'Avantages',
        translationKey: 'HEADER.AVANTAGES',
        sectionId: 'advantages-section',
        behaviour: 'scroll',
        svgIcon: `                                    <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>`,
      },
      {
        name: 'FAQ',
        translationKey: 'HEADER.FAQ',
        sectionId: 'faq-section',
        behaviour: 'scroll',
        svgIcon: `<svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
                                    </svg>`,
      },
      {
        name: 'Contact',
        translationKey: 'HEADER.CONTACT',
        sectionId: 'contact-section',
        behaviour: 'scroll',
        svgIcon: `<svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                    </svg>`,
      },
    ],
    buttons: [
      {
        name: 'Client',
        translationKey: 'HEADER.CLIENT',
      },
      {
        name: 'Postuler maintenant',
        translationKey: 'HEADER.POSTULER_MAINTENANT',
      },
    ],
  };

  logout() {
    console.log('Logging out...');
    this.store.dispatch(AuthActions.logout());
    this.isProfileMenuOpen = false;
  }

  onDeposit() {
    this.isNavOpen = false;
    this.router.navigate(['/deposer-un-cv']);
    window.scrollTo(0, 0);
  }

  onSignup() {
    this.isNavOpen = false;
    this.router.navigate(['/inscription']);
    window.scrollTo(0, 0);
    this.toggleProfileMenu();
  }

  onLogin() {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    // Close profile menu when clicking outside
    if (this.isProfileMenuOpen && !event.target) {
      this.isProfileMenuOpen = false;
    }

    // Close dropdown when clicking outside
    if (this.dropdownOpen && !event.target) {
      this.dropdownOpen = false;
    }

    // Close desktop menu when clicking outside
    if (this.showDesktopMenu && !event.target) {
      this.showDesktopMenu = false;
    }
  }
  isLightTextRoute(route: string): boolean {
    return [
      '/client',
      '/inscription',
      '/connexion',
      '/mention-legal',
      '/deposer-un-cv',
      '/condition-general-de-vente',
      '/offre-d\'emploi/commercial',
      '/offre-d\'emploi/community-manager',
      '/offre-d\'emploi/developpeur-web',
      '/offre-d\'emploi/secretaire',
      '/offre-d\'emploi/profil-bilingue'
    ].includes(route);
  }
  
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

  newsletterFields: NewsletterField[] = [
    {
      id: 'email',
      classInput:
        'peer w-full p-2 md:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel: 'left-3 -top-2.5 text-sm text-[#362E75] bg-white px-1',
      title: 'EMAIL',
    },
  ];

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
