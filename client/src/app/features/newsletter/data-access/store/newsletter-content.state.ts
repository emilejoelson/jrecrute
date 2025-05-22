import { NewsletterContent, NewsletterAnalytics } from '../models/newsletter-content';
import { HttpErrorResponse } from '@angular/common/http';

export interface NewsletterContentState {
  // Create newsletter
  createLoading: boolean;
  createSuccess: boolean;
  createdNewsletter: NewsletterContent | null;
  createError: HttpErrorResponse | Error | string | null;
  
  // Get newsletters list
  newsletters: NewsletterContent[];
  newslettersLoading: boolean;
  newslettersError: HttpErrorResponse | Error | string | null;
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
  
  // Get single newsletter
  selectedNewsletter: NewsletterContent | null;
  selectedNewsletterLoading: boolean;
  selectedNewsletterError: HttpErrorResponse | Error | string | null;
  
  // Update newsletter
  updateLoading: boolean;
  updateSuccess: boolean;
  updateError: HttpErrorResponse | Error | string | null;
  
  // Delete newsletter
  deleteLoading: boolean;
  deleteSuccess: boolean;
  deleteError: HttpErrorResponse | Error | string | null;
  
  // Send newsletter
  sendLoading: boolean;
  sendSuccess: boolean;
  sendError: HttpErrorResponse | Error | string | null;
  sendResults: {
    total: number;
    sent: number;
    failed: number;
    failedEmails: string[];
  } | null;
  
  // Upload image
  imageUploadLoading: boolean;
  imageUploadSuccess: boolean;
  imageUploadError: HttpErrorResponse | Error | string | null;
  uploadedImagePath: string | null;
  
  // Analytics
  analytics: NewsletterAnalytics | null;
  analyticsLoading: boolean;
  analyticsError: HttpErrorResponse | Error | string | null;
}