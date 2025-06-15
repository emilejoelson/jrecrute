import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../../../../../common/components/buttons/primary-button/primary-button.component';
import { LogoIconComponent } from '../../../../../../../assets/svg/templates/logo-icon.component';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [PrimaryButtonComponent, LogoIconComponent],
  templateUrl: './discussion.component.html',
})
export class DiscussionComponent {}
