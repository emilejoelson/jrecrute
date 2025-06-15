import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-stat-card',
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent implements OnChanges {
  @Input() svgIcon: string = '';
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() change: string = '';
  @Input() changeType: 'positive' | 'negative' = 'positive';

  safeIcon!: SafeHtml;
  safeChangeIcon!: SafeHtml;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnChanges() {
    if (this.svgIcon) {
      this.safeIcon = this.sanitizer.bypassSecurityTrustHtml(this.svgIcon);
    }

    const upIcon = `<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 12 7-7 7 7'></path><path d='M12 19V5'></path></svg>`;
    const downIcon = `<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 12 7 7 7-7'></path><path d='M12 5v14'></path></svg>`;

    this.safeChangeIcon = this.sanitizer.bypassSecurityTrustHtml(
      this.changeType === 'positive' ? upIcon : downIcon
    );
  }
}
