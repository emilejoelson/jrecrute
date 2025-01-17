import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface VideoContent {
  title: string;
  subtitle: string;
  audioPath: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private audio: HTMLAudioElement | null = null;
  private currentTime = new BehaviorSubject<number>(0);
  private isPlaying = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;

  currentTime$ = this.currentTime.asObservable();
  isPlaying$ = this.isPlaying.asObservable();

  content: VideoContent = {
    title: 'Consult Collab',
    subtitle: 'Votre partenaire pour maximiser votre potentiel',
    audioPath: 'assets/audio/cc-recrute.mp3'
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.audio = new Audio(this.content.audioPath);
    }
  }

  play() {
    if (!this.isBrowser || !this.audio) return;
    
    this.audio.play();
    this.isPlaying.next(true);
    
    this.audio.ontimeupdate = () => {
      this.currentTime.next(this.audio?.currentTime || 0);
    };

    this.audio.onended = () => {
      this.stop();
    };
  }

  pause() {
    this.audio?.pause();
    this.isPlaying.next(false);
  }

  resume() {
    this.audio?.play();
    this.isPlaying.next(true);
  }

  stop() {
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