import { Component, Input, signal } from '@angular/core';
import { Congratulation } from '../../../../data-access/models/congratulation';

@Component({
  selector: 'app-deposit-cv-confirmation-popup',
  imports: [],
  templateUrl: './deposit-cv-confirmation-popup.component.html',
  styleUrl: './deposit-cv-confirmation-popup.component.scss'
})
export class DepositCvConfirmationPopupComponent {
   imgCongratulation = signal('../../../../../../../assets/images/congratulation.png');

  @Input() congratulationData = signal<Congratulation>({
    congratulationImage: '',
    title: '',
    message: '',
    invitation: '',
  
  });

}
