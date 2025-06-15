import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoContent, VideoService } from '../../core/services/video.service';
import { Subscription, interval } from 'rxjs';
import { VoiceWaveformComponent } from './ui/voice-wave-form/voice-wave-form.component';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, VoiceWaveformComponent],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter<void>();
  content: VideoContent['EN'] | VideoContent['FR'];
  isPlaying = false;
  currentTime = 0;
  totalDuration: number;
  isModalOpen = true;
  private subscriptions: Subscription[] = [];

  constructor(
    private videoService: VideoService,
    private translationService: TranslationService
  ) {
    this.content = this.videoService.getCurrentContent();
    this.totalDuration = this.videoService.getTotalDuration();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.videoService.currentTime$.subscribe(
        (time) => (this.currentTime = time)
      ),
      this.videoService.isPlaying$.subscribe(
        (playing) => (this.isPlaying = playing)
      ),
      interval(1000).subscribe(() => {
        this.content = this.videoService.getCurrentContent();
      })
    );
  }

  togglePlay() {
    if (this.isPlaying) {
      this.videoService.pause();
    } else {
      this.videoService.autoplay();
    }
  }

  stop() {
    this.videoService.stop();
  }

  closeModalHandler() {
    this.isModalOpen = false;
    this.closeModal.emit();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.videoService.stop();
  }
}