import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { HeaderComponent } from '../../common/components/header/header.component';
import { FooterComponent } from '../../common/components/footer/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-brochure-website',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, FooterComponent,CommonModule],
  templateUrl: './brochure-website.component.html',
  styleUrl: './brochure-website.component.scss',
})
export class BrochureWebsiteComponent implements OnInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  isMobile: WritableSignal<boolean> = signal(false);
  showVideo = signal(true);
  private destroy$ = new Subject<void>();

  videos = [
    '/assets/videos/video2.mp4',
    '/assets/videos/video1.mp4',
    '/assets/videos/video3.mp4',
  ];

  currentIndex = 0;
  currentVideo = signal(this.videos[this.currentIndex]);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private router: Router) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private handleResize = () => {
    if (this.isBrowser) {
      const width = window.innerWidth;
      this.isMobile.set(width < 650);
    }
  };

  ngOnInit() {
    if (this.isBrowser) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const hideVideoUrls = ['deposer-un-cv', 'mention-legal', 'client','condition-general-de-vente','offre-d\'emploi'];
          this.showVideo.set(
            !hideVideoUrls.some((url) => event.url.includes(url))
          );
        }
      });
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      window.removeEventListener('resize', this.handleResize);
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  playNextVideo() {
    if (this.isBrowser) {
      this.currentIndex = (this.currentIndex + 1) % this.videos.length;
      this.currentVideo.set(this.videos[this.currentIndex]);
  
      setTimeout(() => {
        if (this.videoPlayer?.nativeElement) {
          this.videoPlayer.nativeElement.load(); 
          this.videoPlayer.nativeElement.play();
        }
      }, 50); 
    }
  }
  
  
}
