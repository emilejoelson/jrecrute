import { Component, signal } from '@angular/core';
import { Congratulation } from '../../features/cv-deposit/data-access/models/congratulation';
import { DepositCvConfirmationPopupComponent } from '../../features/cv-deposit/pages/deposit-cv/ui/deposit-cv-confirmation-popup/deposit-cv-confirmation-popup.component';

@Component({
  selector: 'app-recruitment-popup-confirmation',
  imports: [DepositCvConfirmationPopupComponent],
  templateUrl: './recruitment-popup-confirmation.component.html',
  styleUrl: './recruitment-popup-confirmation.component.scss',
})
export class RecruitmentPopupConfirmationComponent {
  congratulationData = signal<Congratulation>({
    congratulationImage: '../../../assets/images/congratulation.png',
    title: 'Félicitation',
    message: 'Votre fiche de poste a été soumise avec succès.',
    invitation:
      'Notre équipe vous contactera pour vous accompagner dans votre recrutement.',
  });
}
