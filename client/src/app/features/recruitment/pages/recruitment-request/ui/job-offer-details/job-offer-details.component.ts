import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface JobProfile {
  icon: SafeHtml;
  title: string;
  description: string[];
}

@Component({
  selector: 'app-job-offer-details',
  imports:[CommonModule],
  templateUrl: './job-offer-details.component.html',
  styleUrls: ['./job-offer-details.component.scss']
})
export class JobOfferDetailsComponent implements OnInit{
  jobProfiles: JobProfile[] = [];
  constructor(private sanitizer: DomSanitizer) {}
  

  ngOnInit() {
    this.jobProfiles = [
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 mb-4 text-purple-600">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="8.5" cy="7" r="4"/>
            <path d="M20 8v6M23 11h-6"/>
          </svg>
        `),
        title: 'Commerciaux',
        description: [
          'Experts en négociation et en gestion de portefeuilles clients',
          'Maîtrise des techniques de prospection et de closing pour maximiser les ventes',
          'Capacité à analyser les besoins des clients et à proposer des solutions adaptées',
          'Expérience en gestion de relations clients à long terme pour assurer leur fidélité'
        ]
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 mb-4 text-purple-600">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        `),
        title: 'Community Managers',
        description: [
          'Compétents en gestion de communautés en ligne sur plusieurs plateformes',
          'Création de contenu engageant et adapté aux différentes audiences',
          'Développement de stratégies digitales pour renforcer la visibilité et la notoriété des marques'
        ]
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 mb-4 text-purple-600">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <path d="M22 4 12 14.01l-3-3"/>
          </svg>
        `),
        title: 'Profils Bilingues',
        description: [
          'Bilingues (anglais/français ou autres langues) pour gérer des communautés internationales',
          'Compétence en gestion de projets dans des environnements diversifiés et internationaux',
          'Aptitude à communiquer efficacement avec des clients et des équipes internationales'
        ]
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 mb-4 text-purple-600">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <path d="M14 2v6h6"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <line x1="10" y1="9" x2="8" y2="9"/>
          </svg>
        `),
        title: 'Secrétaires',
        description: [
          'Organisation et gestion administrative efficace pour alléger vos tâches quotidiennes',
          'Maîtrise des outils bureautiques et des logiciels spécialisés',
          'Gestion des agendas, des déplacements professionnels et des réunions',
          'Capacité à traiter les demandes urgentes avec réactivité et professionnalisme'
        ]
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 mb-4 text-purple-600">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
            <line x1="15" y1="21" x2="15" y2="9"/>
          </svg>
        `),
        title: 'Développeurs Web',
        description: [
          'Création de sites internet performants et optimisés',
          'Expertise en développement front-end et back-end pour des projets sur mesure',
          'Maintenance et mise à jour régulières pour garantir la sécurité et la performance',
          'Connaissance des dernières tendances technologiques et des normes en matière de web design et SEO'
        ]
      }
    ];
  }
}