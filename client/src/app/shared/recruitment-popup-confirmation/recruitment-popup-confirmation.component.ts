import { Component, inject, signal } from '@angular/core';
import { Congratulation } from '../../features/cv-deposit/data-access/models/congratulation';
import { DepositCvConfirmationPopupComponent } from '../../features/cv-deposit/pages/deposit-cv/ui/deposit-cv-confirmation-popup/deposit-cv-confirmation-popup.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-recruitment-popup-confirmation',
  imports: [DepositCvConfirmationPopupComponent, TranslateModule],
  templateUrl: './recruitment-popup-confirmation.component.html',
  styleUrl: './recruitment-popup-confirmation.component.scss',
})
export class RecruitmentPopupConfirmationComponent {
  private translate = inject(TranslateService);
  congratulationData = signal<Congratulation>({
    congratulationImage: '../../../assets/images/congratulation.png',
    title: this.translate.instant('CONGRATULATIONS.TITLE'),
    message: this.translate.instant('CONGRATULATIONS.MESSAGE.2'),
    invitation: this.translate.instant('CONGRATULATIONS.INVITATION.2'),
  });
}
