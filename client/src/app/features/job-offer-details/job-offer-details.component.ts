import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface JobOfferDetails {
  title: string;
  company: string;
  companyDomain: string;
  workType: string;
  salaryRange: string;
  salaryMedian: string;
  description: string;
  mainMissions: string[];
  requiredSkills: string[];
}

@Component({
  selector: 'app-job-offer-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-offer-details.component.html',
  styleUrl: './job-offer-details.component.scss',
})
export class JobOfferDetailsComponent implements OnInit {
  jobOfferDetails: JobOfferDetails | null = null;
  isExpanded = false;
  showFixedButton = false;
  router = inject(Router);
  contentStyle: { [key: string]: string } = {
    maxHeight: '300px',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease-out',
  };

  private jobOffers: { [key: string]: JobOfferDetails } = {
    commercial: {
      title: 'Commercial',
      company: 'Consult Collab',
      companyDomain: 'Services Commerciaux',
      workType: 'Télétravail en temps plein',
      salaryRange: '7.2K€ - 8.4K€',
      salaryMedian: '7.8K€',
      description:
        "Le Commercial est chargé de développer le portefeuille clients de l'entreprise, d'augmenter les ventes et de fidéliser les clients existants. Il est responsable de la gestion des relations commerciales de bout en bout, de la prospection à la conclusion des contrats.",
      mainMissions: [
        'Identifier de nouveaux prospects et opportunités commerciales',
        'Développer des stratégies de vente efficaces pour atteindre les objectifs fixés',
        'Gérer les relations clients en assurant un suivi personnalisé',
        'Négocier et conclure des contrats de vente',
        'Collaborer avec les équipes internes pour assurer une bonne exécution des services',
      ],
      requiredSkills: [
        'Excellentes compétences en communication et négociation',
        "Sens de l'organisation et capacité à travailler sous pression",
        'Maitrise des outils CRM et des techniques de prospection',
      ],
    },
    secretaire: {
      title: 'Secrétaire',
      company: 'Consult Collab',
      companyDomain: 'Support Administratif',
      workType: 'Télétravail en temps plein',
      salaryRange: '7.2K€ - 8.4K€',
      salaryMedian: '7.8K€',
      description:
        "Le Secrétaire est chargé de la gestion administrative quotidienne de l'entreprise, incluant l'organisation des rendez-vous, la gestion des documents et la coordination des communications internes et externes.",
      mainMissions: [
        'Gérer les appels téléphoniques, les courriels et le courrier',
        'Planifier les rendez-vous et organiser les réunions',
        'Rédiger et archiver des documents administratifs',
        "Gérer l'accueil des visiteurs et le support logistique",
        "Assister l'équipe dans diverses tâches administratives",
      ],
      requiredSkills: [
        'Excellente maîtrise des outils bureautiques (Word, Excel, PowerPoint)',
        "Capacité d'organisation et de gestion du temps",
        'Discrétion et sens de la confidentialité',
      ],
    },
    'developpeur-web': {
      title: 'Développeur Web',
      company: 'Consult Collab',
      companyDomain: 'Technologies',
      workType: 'Télétravail en temps plein',
      salaryRange: '7.2K€ - 8.4K€',
      salaryMedian: '7.8K€',
      description:
        "Le Développeur Web est responsable de la conception, du développement et de la maintenance des sites web de l'entreprise ou de ses clients. Il travaille en collaboration avec d'autres équipes pour créer des expériences utilisateur optimales.",
      mainMissions: [
        'Concevoir et développer des sites web responsifs et performants',
        'Corriger les bugs et optimiser le code',
        'Collaborer avec des designers pour intégrer des maquettes',
        'Assurer la sécurité et la maintenance des sites',
        'Rester à jour sur les nouvelles technologies et tendances',
      ],
      requiredSkills: [
        'Maîtrise des langages de programmation (HTML, CSS, JavaScript, PHP, etc.)',
        'Connaissance des frameworks et des CMS',
        'Compétences en résolution de problèmes',
      ],
    },
    'community-manager': {
      title: 'Community Manager',
      company: 'Consult Collab',
      companyDomain: 'Marketing Digital',
      workType: 'Télétravail en temps plein',
      salaryRange: '7.2K€ - 8.4K€',
      salaryMedian: '7.8K€',
      description:
        "Le Community Manager est chargé de gérer l'image de l'entreprise sur les réseaux sociaux. Il crée du contenu engageant, développe des communautés en ligne et assure une veille constante pour renforcer la notoriété et l'engagement.",
      mainMissions: [
        'Développer et mettre en oeuvre une stratégie de contenu',
        'Animer et modérer les communautés sur différentes plateformes',
        'Rédiger des publications engageantes',
        'Analyser les performances des campagnes et produire des rapports',
        'Collaborer avec les équipes de marketing et de design',
      ],
      requiredSkills: [
        'Maîtrise des outils de gestion de réseaux sociaux',
        'Excellentes compétences rédactionnelles et créatives',
      ],
    },
    'profil-bilingue': {
      title: 'Profil Bilingue',
      company: 'Consult Collab',
      companyDomain: 'Communication Internationale',
      workType: 'Télétravail en temps plein',
      salaryRange: '7.2K€ - 8.4K€',
      salaryMedian: '7.8K€',
      description:
        "Les profils bilingues sont recherchés pour divers rôles nécessitant des compétences en communication dans plusieurs langues afin d'assurer des échanges fluides avec des clients ou des partenaires internationaux.",
      mainMissions: [
        'Communiquer efficacement en plusieurs langues',
        'Traduire ou adapter des documents et contenus selon les besoins',
        'Gérer les relations avec des clients ou partenaires multilingues',
        'Participer à des projets nécessitant des compétences linguistiques spécialisées',
      ],
      requiredSkills: [
        'Bilinguisme obligatoire (français et anglais, ou autres langues selon le poste)',
        'Excellentes compétences en communication orale et écrite',
        'Capacité à travailler dans des environnements multiculturels',
      ],
    },
  };

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];
    this.jobOfferDetails = slug ? this.jobOffers[slug] : null;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const remunerationSection = document.querySelector('.remuneration-section');
    if (remunerationSection) {
      const rect = remunerationSection.getBoundingClientRect();
      this.showFixedButton = rect.top <= window.innerHeight;
    }
  }

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
    this.contentStyle = {
      ...this.contentStyle,
      maxHeight: this.isExpanded ? '2000px' : '300px',
    };
  }

  getButtonText(): string {
    return this.isExpanded ? 'Voir moins' : 'Voir plus';
  }

  onGetBack() {
    this.router.navigate(['/']);
    window.scroll(0, 0);
  }

  onContinue() {
    this.router.navigate(['/deposer-un-cv']);
    window.scroll(0, 0);
  }
}
