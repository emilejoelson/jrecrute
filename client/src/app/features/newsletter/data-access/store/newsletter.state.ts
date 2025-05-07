import { HttpErrorResponse } from "@angular/common/http";
import {  NewsletterSubscriptionResponse } from "../models/newsletter";


export interface NewsletterState {
  subscribeLoading: boolean;
  subscribeSuccess: boolean;
  subscribeError: HttpErrorResponse | Error | string | null;
  subscribeResponse: NewsletterSubscriptionResponse | null;
}
