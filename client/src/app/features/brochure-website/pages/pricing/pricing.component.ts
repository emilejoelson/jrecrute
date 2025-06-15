import { Component } from '@angular/core';
import { PlansSectionComponent } from './ui/plans-section/plans-section.component';
import { PlansComparisonSectionComponent } from './ui/plans-comparison-section/plans-comparison-section.component';
import { FreeTrialSectionComponent } from './ui/free-trial-section/free-trial-section.component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    PlansSectionComponent,
    PlansComparisonSectionComponent,
    FreeTrialSectionComponent,
  ],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {}
