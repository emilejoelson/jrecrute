import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  footerItems = {
    jobSeekers: [
      { name: 'Parcourir les offres' },
      { name: 'Découvrir les étapes' },
      { name: 'En savoir plus sur les avantages' },
      { name: 'Accéder à la FAQ' },
    ],

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
        link: 'mailto:joelsonemile.andriamihaja@edu.uiz.ac.ma',
      },
    ],
  };

  currentYear = new Date().getFullYear();
}
