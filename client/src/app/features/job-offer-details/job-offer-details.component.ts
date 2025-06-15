import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
  imports: [CommonModule,TranslateModule],
  templateUrl: './job-offer-details.component.html',
  styleUrl: './job-offer-details.component.scss',
})
export class JobOfferDetailsComponent implements OnInit {
  jobOfferDetails: JobOfferDetails | null = null;
  isExpanded = false;
  showFixedButton = false;
  router = inject(Router);
  translate = inject(TranslateService);

  contentStyle: { [key: string]: string } = {
    maxHeight: '300px',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease-out',
  };

  private jobOffers: { [key: string]: JobOfferDetails } = {
    commercial: {
      title: 'JOB_OFFER_DETAILS.JOBS.COMMERCIAL.TITLE',
      company: 'Consult Collab',
      companyDomain: 'JOB_OFFER_DETAILS.JOBS.COMMERCIAL.COMPANY_DOMAIN',
      workType: 'JOB_OFFER_DETAILS.TAGS.REMOTE_FULL_TIME',
      salaryRange: '7.2K€ - 8.4K€',
      salaryMedian: '7.8K€',
      description:
        "JOB_OFFER_DETAILS.JOBS.COMMERCIAL.DESCRIPTION",
      mainMissions: [
        'JOB_OFFER_DETAILS.JOBS.COMMERCIAL.MAIN_MISSIONS.0',
        'JOB_OFFER_DETAILS.JOBS.COMMERCIAL.MAIN_MISSIONS.1',
        'JOB_OFFER_DETAILS.JOBS.COMMERCIAL.MAIN_MISSIONS.2',
        'JOB_OFFER_DETAILS.JOBS.COMMERCIAL.MAIN_MISSIONS.3',
        'JOB_OFFER_DETAILS.JOBS.COMMERCIAL.MAIN_MISSIONS.4',
      ],
      requiredSkills: [
        'JOB_OFFER_DETAILS.JOBS.COMMERCIAL.REQUIRED_SKILLS.0',
        "JOB_OFFER_DETAILS.JOBS.COMMERCIAL.REQUIRED_SKILLS.1",
        'JOB_OFFER_DETAILS.JOBS.COMMERCIAL.REQUIRED_SKILLS.2',
      ],
    },
    secretaire: {
      title: 'JOB_OFFER_DETAILS.JOBS.SECRETAIRE.TITLE',
      company: 'Consult Collab',
      companyDomain: 'JOB_OFFER_DETAILS.JOBS.SECRETAIRE.COMPANY_DOMAIN',
      workType: 'JOB_OFFER_DETAILS.JOBS.SECRETAIRE.WORK_TYPE',
      salaryRange: '7.2K€ - 8.4K€',
      salaryMedian: '7.8K€',
      description:
        "JOB_OFFER_DETAILS.JOBS.SECRETAIRE.DESCRIPTION",
      mainMissions: [
        'JOB_OFFER_DETAILS.JOBS.SECRETAIRE.MAIN_MISSIONS.0',
        'JOB_OFFER_DETAILS.JOBS.SECRETAIRE.MAIN_MISSIONS.1',
        'JOB_OFFER_DETAILS.JOBS.SECRETAIRE.MAIN_MISSIONS.2',
        "JOB_OFFER_DETAILS.JOBS.SECRETAIRE.MAIN_MISSIONS.3",
        "JOB_OFFER_DETAILS.JOBS.SECRETAIRE.MAIN_MISSIONS.4",
      ],
      requiredSkills: [
        'JOB_OFFER_DETAILS.JOBS.SECRETAIRE.REQUIRED_SKILLS.0',
        "JOB_OFFER_DETAILS.JOBS.SECRETAIRE.REQUIRED_SKILLS.1",
        'JOB_OFFER_DETAILS.JOBS.SECRETAIRE.REQUIRED_SKILLS.2',
      ],
    },
    'developpeur-web': {
      title: 'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.TITLE',
      company: 'Consult Collab',
      companyDomain: 'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.COMPANY_DOMAIN',
      workType: 'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.WORK_TYPE',
      salaryRange: '7,2K€ - 8,4K€',
      salaryMedian: '7,8K€',
      description:
        "JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.DESCRIPTION",
      mainMissions: [
        'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.MAIN_MISSIONS.0',
        'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.MAIN_MISSIONS.1',
        'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.MAIN_MISSIONS.2',
        'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.MAIN_MISSIONS.3',
        'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.MAIN_MISSIONS.4',
      ],
      requiredSkills: [
        'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.REQUIRED_SKILLS.0',
        'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.REQUIRED_SKILLS.1',
        'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.REQUIRED_SKILLS.2',
        'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.REQUIRED_SKILLS.3',
        'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.REQUIRED_SKILLS.4',
        'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.REQUIRED_SKILLS.5',
        'JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.REQUIRED_SKILLS.6',
        "JOB_OFFER_DETAILS.JOBS.DEVELOPPEUR_WEB.REQUIRED_SKILLS.7",
      ],
    },
    'community-manager': {
      title: 'Community Manager',
      company: 'Consult Collab',
      companyDomain: 'JOB_OFFER_DETAILS.JOBS.COMMUNITY_MANAGER.COMPANY_DOMAIN',
      workType: 'JOB_OFFER_DETAILS.JOBS.COMMUNITY_MANAGER.WORK_TYPE',
      salaryRange: '7.2K€ - 8.4K€',
      salaryMedian: '7.8K€',
      description:
        "JOB_OFFER_DETAILS.JOBS.COMMUNITY_MANAGER.DESCRIPTION",
      mainMissions: [
        'JOB_OFFER_DETAILS.JOBS.COMMUNITY_MANAGER.MAIN_MISSIONS.0',
        'JOB_OFFER_DETAILS.JOBS.COMMUNITY_MANAGER.MAIN_MISSIONS.1',
        'JOB_OFFER_DETAILS.JOBS.COMMUNITY_MANAGER.MAIN_MISSIONS.2',
        'JOB_OFFER_DETAILS.JOBS.COMMUNITY_MANAGER.MAIN_MISSIONS.3',
        'JOB_OFFER_DETAILS.JOBS.COMMUNITY_MANAGER.MAIN_MISSIONS.4',
      ],
      requiredSkills: [
        'JOB_OFFER_DETAILS.JOBS.COMMUNITY_MANAGER.REQUIRED_SKILLS.0',
        'JOB_OFFER_DETAILS.JOBS.COMMUNITY_MANAGER.REQUIRED_SKILLS.1',
      ],
    },
    'profil-bilingue': {
      title: 'JOB_OFFER_DETAILS.JOBS.PROFIL_BILINGUE.TITLE',
      company: 'Consult Collab',
      companyDomain: 'JOB_OFFER_DETAILS.JOBS.PROFIL_BILINGUE.COMPANY_DOMAIN',
      workType: 'JOB_OFFER_DETAILS.JOBS.PROFIL_BILINGUE.WORK_TYPE',
      salaryRange: '7.2K€ - 8.4K€',
      salaryMedian: '7.8K€',
      description:
        "JOB_OFFER_DETAILS.JOBS.PROFIL_BILINGUE.DESCRIPTION",
      mainMissions: [
        'JOB_OFFER_DETAILS.JOBS.PROFIL_BILINGUE.MAIN_MISSIONS.0',
        'JOB_OFFER_DETAILS.JOBS.PROFIL_BILINGUE.MAIN_MISSIONS.1',
        'JOB_OFFER_DETAILS.JOBS.PROFIL_BILINGUE.MAIN_MISSIONS.2',
        'JOB_OFFER_DETAILS.JOBS.PROFIL_BILINGUE.MAIN_MISSIONS.3',
      ],
      requiredSkills: [
        'JOB_OFFER_DETAILS.JOBS.PROFIL_BILINGUE.REQUIRED_SKILLS.0',
        'JOB_OFFER_DETAILS.JOBS.PROFIL_BILINGUE.REQUIRED_SKILLS.1',
        'JOB_OFFER_DETAILS.JOBS.PROFIL_BILINGUE.REQUIRED_SKILLS.2',
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
  return this.isExpanded 
    ? this.translate.instant('JOB_OFFER_DETAILS.BUTTONS.SHOW_LESS') 
    : this.translate.instant('JOB_OFFER_DETAILS.BUTTONS.SHOW_MORE');
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
