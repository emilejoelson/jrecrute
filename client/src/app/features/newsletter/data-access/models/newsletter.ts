export interface Newsletter {
  email: string;
  isConfirmed: boolean;
  confirmationToken?: string;
  confirmationExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewsletterSubscriptionRequest {
  email: string;
}

export interface NewsletterSubscriptionResponse {
  message: string;
}

export interface NewsletterConfirmationRequest {
  token: string;
}

export interface NewsletterConfirmationResponse {
  message: string;
}

export interface NewsletterUnsubscribeRequest {
  email: string;
}

export interface NewsletterUnsubscribeResponse {
  message: string;
}