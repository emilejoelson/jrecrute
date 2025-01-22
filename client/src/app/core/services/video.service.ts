import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface VideoContent {
  title: string;
  subtitle: string;
  audioPath: string;
}

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private audio: HTMLAudioElement | null = null;
  private currentTime = new BehaviorSubject<number>(0);
  private isPlaying = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;
  private volumeInterval: any;

  currentTime$ = this.currentTime.asObservable();
  isPlaying$ = this.isPlaying.asObservable();

  content: VideoContent = {
    title: 'Consult Collab',
    subtitle: 'Votre partenaire pour maximiser votre potentiel',
    audioPath: 'assets/audio/cc-recrute.mp3',
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.initAudio();
    }
  }

  private initAudio() {
    this.audio = new Audio(this.content.audioPath);
    this.audio.preload = 'auto';
    this.audio.volume = 0;
    this.audio.muted = true;
  }

  async autoplay() {
    if (!this.isBrowser || !this.audio) return;

    try {
      this.audio.muted = true;
      await this.audio.play();

      setTimeout(() => {
        if (this.audio) {
          this.audio.muted = false;
          this.startVolumeFade();
        }
      }, 100);

      this.isPlaying.next(true);
      this.setupAudioListeners();
    } catch (error) {
      console.error('Autoplay failed:', error);
      this.retryAutoplay();
    }
  }

  private retryAutoplay() {
    setTimeout(() => {
      this.autoplay();
    }, 1000);
  }

  private startVolumeFade() {
    if (!this.audio) return;

    let volume = 0.6;
    this.audio.volume = volume;

    if (this.volumeInterval) {
      clearInterval(this.volumeInterval);
    }

    this.volumeInterval = setInterval(() => {
      volume = Math.min(volume + 0.1, 1);
      if (this.audio) {
        this.audio.volume = volume;
      }

      if (volume >= 1) {
        clearInterval(this.volumeInterval);
      }
    }, 200);
  }

  private setupAudioListeners() {
    if (!this.audio) return;

    this.audio.ontimeupdate = () => {
      this.currentTime.next(this.audio?.currentTime || 0);
    };

    this.audio.onended = () => {
      this.stop();
    };
  }

  pause() {
    if (this.volumeInterval) {
      clearInterval(this.volumeInterval);
    }
    this.audio?.pause();
    this.isPlaying.next(false);
  }

  resume() {
    this.audio?.play();
    this.isPlaying.next(true);
  }

  stop() {
    if (this.volumeInterval) {
      clearInterval(this.volumeInterval);
    }
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.isPlaying.next(false);
    this.currentTime.next(0);
  }

  getTotalDuration(): number {
    return this.audio?.duration || 72;
  }
}
