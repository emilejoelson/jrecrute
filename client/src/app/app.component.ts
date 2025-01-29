import {
  AfterViewInit,
  Component,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/ui/toast/toast.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from './state/root.state';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { getIsUserSubmitting } from './features/cv-deposit/store/selectors/cv.selectors';
import { getIsRecruitmentSubmitting } from './features/recruitment/store/selectors/recruitment.selectors';
import { ScrollButtonComponent } from './shared/scroll-button/scroll-button.component';
import { ConnectionStatusComponent } from './shared/connection-status/connection-status.component';
import { VideoService } from './core/services/video.service';
import { CookieConsentComponent } from './shared/cookie-consent/cookie-consent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastComponent,
    LoadingSpinnerComponent,
    CommonModule,
    ScrollButtonComponent,
    ConnectionStatusComponent,
    CookieConsentComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  isUserSubmitting$!: Observable<boolean>;
  isRecruitmentSubmitting$!: Observable<boolean>;

  store = inject(Store<State>);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    this.isUserSubmitting$ = this.store.pipe(select(getIsUserSubmitting));
    this.isRecruitmentSubmitting$ = this.store.pipe(
      select(getIsRecruitmentSubmitting)
    );
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.videoService.autoplay();
      
      setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
          preloader.remove();
        }
        const appRoot = document.querySelector('app-root') as HTMLElement;
        if (appRoot) {
          appRoot.style.display = 'block';
        }
      }, 1500);
    }
  }
}
