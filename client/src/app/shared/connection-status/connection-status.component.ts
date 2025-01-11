import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { ConnectionService } from '../../core/services/connection.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-connection-status',
  imports: [CommonModule],
  templateUrl: './connection-status.component.html',
  styleUrl: './connection-status.component.scss',
  animations: [
    trigger('slideInOut', [
      state('true', style({ opacity: 1, transform: 'translate(-50%, -50%) scale(1)' })),
      state('false', style({ opacity: 0, transform: 'translate(-50%, -60%) scale(0.95)' })),
      transition('false => true', animate('300ms ease-out')),
      transition('true => false', animate('300ms ease-in'))
    ])
  ]
})

export class ConnectionStatusComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  isOnline: boolean = true;
  showStatus: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private connectionService: ConnectionService) {
    // Check connection status immediately on component creation
    if (this.isBrowser) {
      this.isOnline = navigator.onLine;
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Subscribe to connection status changes
      this.subscription.add(
        this.connectionService.connectionStatus$.subscribe(
          (online: boolean) => {
            this.isOnline = online;
            if (online) {
              this.showStatus = true;
              // Hide after 5 seconds when connected
              this.subscription.add(
                timer(5000).subscribe(() => {
                  this.showStatus = false;
                })
              );
            }
          }
        )
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
