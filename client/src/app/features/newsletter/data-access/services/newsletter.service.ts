import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { Newsletter, NewsletterConfirmationResponse, NewsletterSubscriptionRequest, NewsletterSubscriptionResponse, NewsletterUnsubscribeRequest, NewsletterUnsubscribeResponse } from '../models/newsletter';



@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  private apiUrl = environment.apiUrl;
  
  http = inject(HttpClient);
  
  getAllSubscribers(): Observable<{ subscribers: Newsletter[] }> {
    return this.http.get<{ subscribers: Newsletter[] }>(`${this.apiUrl}/newsletter`);
  }
  
  subscribe(request: NewsletterSubscriptionRequest): Observable<NewsletterSubscriptionResponse> {
    return this.http.post<NewsletterSubscriptionResponse>(`${this.apiUrl}/newsletter/subscribe`, request);
  }

  confirmSubscription(token: string): Observable<NewsletterConfirmationResponse> {
    return this.http.get<NewsletterConfirmationResponse>(`${this.apiUrl}/newsletter/confirm`, {
      params: { token }
    });
  }

  unsubscribe(request: NewsletterUnsubscribeRequest): Observable<NewsletterUnsubscribeResponse> {
    return this.http.post<NewsletterUnsubscribeResponse>(`${this.apiUrl}/newsletter/unsubscribe`, request);
  }
}
