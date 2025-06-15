import { Component } from '@angular/core';
import { EasyUseIconComponent } from '../../../../../../../assets/svg/templates/easy-use-icon.component';
import { NoInstalationIconComponent } from '../../../../../../../assets/svg/templates/no-instalation.component';
import { SecurityIconComponent } from '../../../../../../../assets/svg/templates/security-icon.component';
import { AutomationIconComponent } from '../../../../../../../assets/svg/templates/automation-icon.component';

@Component({
  selector: 'app-advantages-section',
  standalone: true,
  imports: [
    EasyUseIconComponent,
    NoInstalationIconComponent,
    SecurityIconComponent,
    AutomationIconComponent,
  ],
  templateUrl: './advantages-section.component.html',
  styleUrl: './advantages-section.component.scss',
})
export class AdvantagesSectionComponent {}
