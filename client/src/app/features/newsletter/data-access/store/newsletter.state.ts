import { HttpErrorResponse } from '@angular/common/http';
import {
  Newsletter,
  NewsletterSubscriptionResponse,
} from '../models/newsletter';
import { Subscriber, User } from '../models/newsletter.types';

export interface NewsletterState {
  subscribeLoading: boolean;
  subscribeSuccess: boolean;
  subscribeError: HttpErrorResponse | Error | string | null;
  subscribeResponse: NewsletterSubscriptionResponse | null;
  subscribers: Newsletter[];

  allSubscribers: Subscriber[];
  subscribersLoading: boolean;
  subscribersError: HttpErrorResponse | Error | string | null;

  usersWithCv: User[];
  usersLoading: boolean;
  usersError: HttpErrorResponse | Error | string | null;
}
