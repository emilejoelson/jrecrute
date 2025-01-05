import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

type TNavLinks = {
  links: {
    name: string;
    sectionId: string;
    href?: string;
    behaviour: string;
  }[];
};

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @ViewChild('headerElement') headerElement!: ElementRef<HTMLElement>;
  router = inject(Router);
  navItems: TNavLinks = {
    links: [
      {
        name: 'Parcourir les offres',
        sectionId: 'offers-section',
        behaviour: 'scroll',
      },
      {
        name: 'Découvrir les étapes',
        sectionId: 'steps-section',
        behaviour: 'scroll',
      },
      {
        name: 'En savoir plus sur les avantages',
        sectionId: 'advantages-section',
        behaviour: 'scroll',
      },
      {
        name: 'Accéder à la FAQ',
        sectionId: 'faq-section',
        behaviour: 'scroll',
      },
    ],
  };

  footerItems = {
    connects: [
      { name: 'À Propos' },
      { name: 'Contact' },
      { name: 'Politique de Confidentialité' },
      { name: "Conditions d'Utilisation" },
    ],
    socialMedia: [
      {
        name: 'Facebook',
        icon: 'fa fa-facebook',
        link: 'https://www.facebook.com/profile.php?id=61551056274954',
      },
      {
        name: 'Instagram',
        icon: 'fa fa-instagram',
        link: 'https://www.instagram.com/consult.collab/',
      },
      {
        name: 'LinkedIn',
        icon: 'fa fa-linkedin',
        link: 'https://www.linkedin.com/company/consultcollab/?originalSubdomain=fr',
      },
      {
        name: 'Contact',
        icon: 'fa fa-envelope',
        link: 'mailto:contact@consultcollab.com ',
      },
    ],
  };

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

  currentYear = new Date().getFullYear();

  onClickLegalNotice() {
    window.scroll(0, 0);
    this.router.navigate(['/mention-legal']);
  }
}
