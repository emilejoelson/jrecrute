import { Component, OnInit } from '@angular/core';
import { CookieConsentService } from '../../core/services/cookie-consent.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cookie-consent',
  imports: [CommonModule,FormsModule],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ]),
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CookieConsentComponent implements OnInit {
  showDetails = false;
  preferences = {
    necessary: true,
    analytics: false,
    marketing: false
  };

  constructor(public cookieService: CookieConsentService) {}

  ngOnInit() {}

  acceptAll() {
    this.cookieService.acceptCookies({
      necessary: true,
      analytics: true,
      marketing: true
    });
  }

  declineAll() {
    this.cookieService.declineCookies();
  }

  savePreferences() {
    this.cookieService.acceptCookies({
      ...this.preferences,
      necessary: true
    });
  }
}
