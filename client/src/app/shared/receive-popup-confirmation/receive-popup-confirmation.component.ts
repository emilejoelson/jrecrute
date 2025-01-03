import { Component, signal } from '@angular/core';
import { Congratulation } from '../../features/cv-deposit/data-access/models/congratulation';
import { DepositCvConfirmationPopupComponent } from '../../features/cv-deposit/pages/deposit-cv/ui/deposit-cv-confirmation-popup/deposit-cv-confirmation-popup.component';

@Component({
  selector: 'app-receive-popup-confirmation',
  imports: [DepositCvConfirmationPopupComponent],
  templateUrl: './receive-popup-confirmation.component.html',
  styleUrl: './receive-popup-confirmation.component.scss'
})
export class ReceivePopupConfirmationComponent {

   congratulationData = signal<Congratulation>({
        congratulationImage: '../../../assets/images/congratulation.png',
        title: 'Félicitation',
        message: 'Votre cv a été envoyé avec succès ',
        invitation: 'Vous serez contacté(e) si votre profil correspond à nos attentes.',
      });
}
