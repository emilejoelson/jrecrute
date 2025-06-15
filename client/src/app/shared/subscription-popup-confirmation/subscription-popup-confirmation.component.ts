import { Component, inject, signal } from '@angular/core';
import { DepositCvConfirmationPopupComponent } from '../../features/cv-deposit/pages/deposit-cv/ui/deposit-cv-confirmation-popup/deposit-cv-confirmation-popup.component';
import { Congratulation } from '../../features/cv-deposit/data-access/models/congratulation';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subscription-popup-confirmation',
  imports: [DepositCvConfirmationPopupComponent,TranslateModule],
  templateUrl: './subscription-popup-confirmation.component.html',
  styleUrl: './subscription-popup-confirmation.component.scss'
})
export class SubscriptionPopupConfirmationComponent {

  private translate = inject(TranslateService);
  congratulationData = signal<Congratulation>({
    congratulationImage: '../../../assets/images/congratulation.png',
    title: this.translate.instant('CONGRATULATIONS.TITLE'),
    message: this.translate.instant('CONGRATULATIONS.MESSAGE.0'),
    invitation: this.translate.instant('CONGRATULATIONS.INVITATION.0')
  });
}
