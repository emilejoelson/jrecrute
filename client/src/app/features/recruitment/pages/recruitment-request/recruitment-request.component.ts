import { Component } from '@angular/core';
import { HeroSectionComponent } from './ui/hero-section/hero-section.component';
import { ServiceSectionComponent } from './ui/service-section/service-section.component';
import { StatSectionComponent } from './ui/stat-section/stat-section.component';
import { PricingComponent } from './ui/pricing/pricing.component';
import { JobSheetComponent } from './ui/job-sheet/job-sheet.component';
import { JobOfferDetailsComponent } from './ui/job-offer-details/job-offer-details.component';

@Component({
  selector: 'app-recruitment-request',
  imports: [
    HeroSectionComponent,
    ServiceSectionComponent,
    StatSectionComponent,
    PricingComponent,
    JobSheetComponent,
    JobOfferDetailsComponent
  ],
  templateUrl: './recruitment-request.component.html',
  styleUrl: './recruitment-request.component.scss',
})
export class RecruitmentRequestComponent {}
