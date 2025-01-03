import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/ui/toast/toast.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from './state/root.state';
import { CommonModule } from '@angular/common';
import { getLoading } from './state/shared/shared.selector';
// import { selectCongratulationData, selectShowCongratulationPopup } from './features/cv-deposit/store/selectors/cv.selectors';
import { DepositCvConfirmationPopupComponent } from './features/cv-deposit/pages/deposit-cv/ui/deposit-cv-confirmation-popup/deposit-cv-confirmation-popup.component';
import { Congratulation } from './features/cv-deposit/data-access/models/congratulation';
import { UserEffects } from './features/cv-deposit/store/effects/cv.effects';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastComponent,
    LoadingSpinnerComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showLoading!: Observable<boolean>;

  userEffect = inject(UserEffects);
  
  congratulationData = signal<Congratulation>({
    congratulationImage: '../assets/images/congratulation.png',
    title: 'Félicitation',
    message: 'Votre compte a été créé avec succès !',
    invitation: 'Veuillez vérifier votre email pour se connecter.',
  });

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
  }
}
