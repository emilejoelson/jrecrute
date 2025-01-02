import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../../../../../common/components/buttons/primary-button/primary-button.component';

@Component({
  selector: 'app-free-trial-section',
  standalone: true,
  imports: [PrimaryButtonComponent],
  templateUrl: './free-trial-section.component.html',
  styleUrl: './free-trial-section.component.scss',
})
export class FreeTrialSectionComponent {}
