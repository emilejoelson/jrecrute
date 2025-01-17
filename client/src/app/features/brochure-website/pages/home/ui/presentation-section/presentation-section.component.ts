import { Component, inject, signal, WritableSignal } from '@angular/core';
import { PrimaryButtonComponent } from '../../../../../../common/components/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../../../../../common/components/buttons/secondary-button/secondary-button.component';
import { HomePresentationImage } from '../../../../../../../assets/svg/templates/home-presentation-image/home-presentation-image';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { AudioControlsComponent } from '../../../../../../shared/audio-controls/audio-controls.component';
import { VideoPlayerComponent } from '../../../../../../shared/video-player/video-player.component';

@Component({
  selector: 'app-presentation-section',
  standalone: true,
  imports: [CommonModule, AudioControlsComponent, VideoPlayerComponent],
  templateUrl: './presentation-section.component.html',
  styleUrl: './presentation-section.component.scss',
})
export class PresentationSectionComponent {
  isPostuler = true;

  isVideoPlayerOpen: WritableSignal<boolean> = signal(false);

  setPostuler(value: boolean) {
    if (this.isPostuler === value) {
      if (value) {
        this.onDeposit();
      } else {
        this.onFindCandidate();
      }
    }
    this.isPostuler = value;
  }

  private viewportScroller = inject(ViewportScroller);

  router = inject(Router);

  scrollToAncherHandler(elementId: string) {
    return () => this.viewportScroller.scrollToAnchor(elementId);
  }

  onDeposit() {
    this.router.navigate(['/deposer-un-cv']);
    window.scrollTo(0, 0);
  }

  onFindCandidate() {
    this.router.navigate(['/client']);
    window.scrollTo(0, 0);
  }

  

  onOpenVideoPlayer() {
    this.isVideoPlayerOpen.update(state => !state);
  }

  onCloseVideoPlayer() {
    this.isVideoPlayerOpen.set(false);
  }
}
