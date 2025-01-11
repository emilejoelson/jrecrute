import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/ui/toast/toast.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from './state/root.state';
import { CommonModule } from '@angular/common';
import { getIsUserSubmitting } from './features/cv-deposit/store/selectors/cv.selectors';
import { getIsRecruitmentSubmitting } from './features/recruitment/store/selectors/recruitment.selectors';
import { ScrollButtonComponent } from './shared/scroll-button/scroll-button.component';
import { SocialMediaComponent } from './shared/social-media/social-media.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastComponent,
    LoadingSpinnerComponent,
    CommonModule,
    ScrollButtonComponent,
    SocialMediaComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  isUserSubmitting$!: Observable<boolean>;
  isRecruitmentSubmitting$!: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isUserSubmitting$ = this.store.pipe(select(getIsUserSubmitting));
    this.isRecruitmentSubmitting$ = this.store.pipe(
      select(getIsRecruitmentSubmitting)
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      document.getElementById('preloader')?.remove();
      const appRoot = document.querySelector('app-root') as HTMLElement;
      if (appRoot) {
        appRoot.style.display = 'block';
      }
    }, 1500);
  }
}
