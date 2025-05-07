import {
  AfterViewInit,
  Component,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  OnDestroy
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/ui/toast/toast.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
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
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  isUserSubmitting$!: Observable<boolean>;
  isRecruitmentSubmitting$!: Observable<boolean>;
  private subscriptions: Subscription[] = [];
  private isVideoInitialized = false;

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

    if (isPlatformBrowser(this.platformId)) {
      this.initializeVideo();
    }
  }

  private async initializeVideo() {
    try {
      const playAttempt = this.videoService.autoplay();
      
      this.subscriptions.push(
        this.videoService.isPlaying$.subscribe(isPlaying => {
          if (isPlaying && !this.isVideoInitialized) {
            this.isVideoInitialized = true;
            this.removePreloader();
          }
        })
      );

      setTimeout(() => {
        if (!this.isVideoInitialized) {
          this.removePreloader();
        }
      }, 3000);

      await playAttempt;
    } catch (error) {
      console.error('Failed to initialize video:', error);
      this.removePreloader();
    }
  }

  private removePreloader() {
    if (!isPlatformBrowser(this.platformId)) return;

    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.remove();
        this.showAppRoot();
      }, 500);
    } else {
      this.showAppRoot();
    }
  }

  private showAppRoot() {
    const appRoot = document.querySelector('app-root') as HTMLElement;
    if (appRoot) {
      appRoot.style.opacity = '0';
      appRoot.style.display = 'block';
      setTimeout(() => {
        appRoot.style.opacity = '1';
        appRoot.style.transition = 'opacity 0.5s ease-in-out';
      }, 0);
    }
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    // this.subscriptions.forEach(sub => sub.unsubscribe());
    // if (isPlatformBrowser(this.platformId)) {
    //   this.videoService.stop();
    // }
  }
}