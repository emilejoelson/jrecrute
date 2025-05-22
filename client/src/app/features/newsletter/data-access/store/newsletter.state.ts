import { HttpErrorResponse } from "@angular/common/http";
import {  Newsletter, NewsletterSubscriptionResponse } from "../models/newsletter";


export interface NewsletterState {
  subscribeLoading: boolean;
  subscribeSuccess: boolean;
  subscribeError: HttpErrorResponse | Error | string | null;
  subscribeResponse: NewsletterSubscriptionResponse | null;
   subscribers: Newsletter[];
}
