import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/ui/toast/toast.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from './state/root.state';
import { CommonModule } from '@angular/common';
import { getIsUserSubmitting } from './features/cv-deposit/store/selectors/cv.selectors';
import { getIsRecruitmentSubmitting } from './features/recruitment/store/selectors/recruitment.selectors';

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
  isUserSubmitting$!: Observable<boolean>;
  isRecruitmentSubmitting$!: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isUserSubmitting$ = this.store.pipe(select(getIsUserSubmitting));
    this.isRecruitmentSubmitting$ = this.store.pipe(
      select(getIsRecruitmentSubmitting)
    );
  }
}
