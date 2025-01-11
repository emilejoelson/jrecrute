import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private platformId = inject(PLATFORM_ID);
  private online$ = new BehaviorSubject<boolean>(true);
  public connectionStatus$: Observable<boolean> = this.online$.asObservable();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.online$.next(navigator.onLine);
      merge(
        fromEvent(window, 'online').pipe(map(() => true)),
        fromEvent(window, 'offline').pipe(map(() => false))
      ).subscribe(this.online$);
    }
  }
}