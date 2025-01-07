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
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-brochure-website',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, FooterComponent],
  templateUrl: './brochure-website.component.html',
  styleUrl: './brochure-website.component.scss',
})
export class BrochureWebsiteComponent implements OnInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  isMobile: WritableSignal<boolean> = signal(false); // Default value

  videos = [
    '/assets/videos/video2.mp4',
    '/assets/videos/video1.mp4',
    '/assets/videos/video3.mp4',
  ];

  currentIndex = 0;
  currentVideo = signal(this.videos[this.currentIndex]);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private handleResize = () => {
    if (this.isBrowser) {
      this.isMobile.set(window.innerWidth < 650);
      console.log('Is Mobile:', this.isMobile());
    }
  };

  ngOnInit() {
    if (this.isBrowser) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      window.removeEventListener('resize', this.handleResize);
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
      }, 0);
    }
  }
}
