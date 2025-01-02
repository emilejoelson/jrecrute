import { Component } from '@angular/core';
import { PresentationSectionComponent } from './ui/presentation-section/presentation-section.component';
import { OurCustomersSectionComponent } from './ui/our-customers-section/our-customers-section.component';
import { JobOfferSectionComponent } from './ui/job-offer-section/job-offer-section.component';
import { OurJobOfferScrollComponent } from './ui/our-job-offer-scroll/our-job-offer-scroll.component';
import { HowItWorkSectionComponent } from './ui/how-it-work-section/how-it-work-section.component';
import { WhyUsSectionComponent } from './ui/why-us-section/why-us-section.component';
import { AdvantageSectionComponent } from './ui/advantage-section/advantage-section.component';
import { FaqComponent } from './ui/faq/faq.component';
import { StepThreeComponent } from '../../../cv-deposit/pages/deposit-cv/ui/steps/step-three/step-three.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PresentationSectionComponent,
    OurJobOfferScrollComponent,
    JobOfferSectionComponent,
    HowItWorkSectionComponent,
    AdvantageSectionComponent,
    FaqComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  
}
