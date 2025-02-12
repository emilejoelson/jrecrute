import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

interface JobProfile {
  icon: SafeHtml;
  title: string;
  description: string[];
}

@Component({
  selector: 'app-job-offer-details',
  imports:[CommonModule,TranslateModule],
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
        title: 'CLIENT.JOB_PROFILES.0.TITLE',
        description: [
          'CLIENT.JOB_PROFILES.0.DESCRIPTION.0',
          'CLIENT.JOB_PROFILES.0.DESCRIPTION.1',
          'CLIENT.JOB_PROFILES.0.DESCRIPTION.2',
          'CLIENT.JOB_PROFILES.0.DESCRIPTION.3'
        ]
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 mb-4 text-purple-600">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        `),
        title: 'CLIENT.JOB_PROFILES.1.TITLE',
        description: [
          'CLIENT.JOB_PROFILES.1.DESCRIPTION.0',
          'CLIENT.JOB_PROFILES.1.DESCRIPTION.1',
          'CLIENT.JOB_PROFILES.1.DESCRIPTION.2'
        ]
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 mb-4 text-purple-600">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <path d="M22 4 12 14.01l-3-3"/>
          </svg>
        `),
        title: 'CLIENT.JOB_PROFILES.2.TITLE',
        description: [
          'CLIENT.JOB_PROFILES.2.DESCRIPTION.0',
          'CLIENT.JOB_PROFILES.2.DESCRIPTION.1',
          'CLIENT.JOB_PROFILES.2.DESCRIPTION.2'
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
        title: 'CLIENT.JOB_PROFILES.3.TITLE',
        description: [
          'CLIENT.JOB_PROFILES.3.DESCRIPTION.0',
          'CLIENT.JOB_PROFILES.3.DESCRIPTION.1',
          'CLIENT.JOB_PROFILES.3.DESCRIPTION.2',
          'CLIENT.JOB_PROFILES.3.DESCRIPTION.3'
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
        title: 'CLIENT.JOB_PROFILES.4.TITLE',
        description: [
          'CLIENT.JOB_PROFILES.4.DESCRIPTION.0',
          'CLIENT.JOB_PROFILES.4.DESCRIPTION.1',
          'CLIENT.JOB_PROFILES.4.DESCRIPTION.2',
          'CLIENT.JOB_PROFILES.4.DESCRIPTION.3'
        ]
      }
    ];
  }
}