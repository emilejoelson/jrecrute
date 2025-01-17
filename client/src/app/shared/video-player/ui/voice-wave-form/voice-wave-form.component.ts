import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-voice-wave-form',
  imports: [CommonModule],
  templateUrl: './voice-wave-form.component.html',
  styleUrl: './voice-wave-form.component.scss'
})
export class VoiceWaveformComponent implements OnChanges {
  @Input() isPlaying: boolean = false;
  waveformBars: { height: number }[] = [];

  constructor() {
    this.generateWaveform();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isPlaying']) {
      // You could add additional logic here when playback state changes
    }
  }

  private generateWaveform() {
    // Generate 70 bars with varying heights
    const numberOfBars = 70;
    this.waveformBars = Array.from({ length: numberOfBars }, () => ({
      height: this.getRandomHeight()
    }));
  }

  private getRandomHeight(): number {
    // Generate random heights between 20 and 80
    return Math.random() * 60 + 20;
  }

   getGradientColor(index: number): string {
    // Create a gradient effect from violet to purple to pink
    const hue = 280 + (index / this.waveformBars.length * 40);
    const saturation = 70;
    const lightness = 60;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
}
