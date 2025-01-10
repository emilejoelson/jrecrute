import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-scroll-button',
  imports: [CommonModule],
  templateUrl: './scroll-button.component.html',
  styleUrl: './scroll-button.component.scss',
})
export class ScrollButtonComponent implements OnInit, OnDestroy {
  isAtTop = signal(true);
  private scrollInterval: any = null;
  private readonly SCROLL_DURATION = 500;
  private readonly FRAME_RATE = 60;

  ngOnInit() {
    this.checkScrollPosition();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkScrollPosition();
  }

  private checkScrollPosition() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isAtTop.set(scrollTop === 0);
  }

  toggleScroll() {
    if (this.scrollInterval) {
      this.stopScrolling();
      return;
    }

    const targetPosition = this.isAtTop()
      ? document.documentElement.scrollHeight - window.innerHeight
      : 0;
    this.smoothScroll(targetPosition);
  }

  private smoothScroll(targetPosition: number) {
    const startPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    const distance = targetPosition - startPosition;
    const stepCount = Math.round(
      this.SCROLL_DURATION / (1000 / this.FRAME_RATE)
    );
    const stepSize = distance / stepCount;

    let step = 0;
    this.scrollInterval = setInterval(() => {
      step++;
      window.scrollTo(0, startPosition + step * stepSize);

      if (step >= stepCount) {
        this.stopScrolling();
      }
    }, 1000 / this.FRAME_RATE);
  }

  private stopScrolling() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }

  ngOnDestroy() {
    this.stopScrolling();
  }
}
