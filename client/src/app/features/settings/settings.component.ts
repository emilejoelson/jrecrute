import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomInputComponent } from '../cv-deposit/pages/deposit-cv/ui/steps/ui/custom-input/custom-input.component';

import { ChangePasswordPopupComponent } from '../../shared/change-password-popup/change-password-popup.component';


@Component({
  selector: 'app-settings',
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ChangePasswordPopupComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
   showPasswordModal: boolean = false;

  togglePasswordModal(state: boolean) {
    this.showPasswordModal = state;
  }
}
