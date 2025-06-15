import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogLine, SpeechService } from '../../core/services/speech.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-controls',
  imports: [CommonModule],
  templateUrl: './audio-controls.component.html',
  styleUrl: './audio-controls.component.scss'
})
export class AudioControlsComponent implements OnDestroy {
  isPlaying = false;
  dialogLines: DialogLine[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private speechService: SpeechService) {
    this.subscriptions.push(
      this.speechService.isPlaying$.subscribe(
        playing => this.isPlaying = playing
      ),
      this.speechService.currentDialog$.subscribe(
        dialog => this.dialogLines = dialog
      )
    );
  }

  togglePlay() {
    if (this.isPlaying) {
      this.speechService.pause();
    } else {
      this.speechService.play();
    }
  }

  stop() {
    this.speechService.stop();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
