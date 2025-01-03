import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/ui/toast/toast.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from './state/root.state';
import { CommonModule } from '@angular/common';
import { Congratulation } from './features/cv-deposit/data-access/models/congratulation';
import { UserEffects } from './features/cv-deposit/store/effects/cv.effects';
import { getIsSubmitting } from './features/cv-deposit/store/selectors/cv.selectors';

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
  isSubmitting$!: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isSubmitting$ = this.store.pipe(select(getIsSubmitting));
  }
}
