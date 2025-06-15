import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  NewsletterContent,
  CreateNewsletterContentRequest,
  CreateNewsletterContentResponse,
  NewsletterListResponse,
  UpdateNewsletterContentRequest,
  NewsletterStatus,
  NewsletterAnalytics,
  SendNewsletterResponse,
  ImageUploadResponse
} from '../../models/newsletter-content';

export const NewsletterContentActions = createActionGroup({
  source: 'Newsletter Content',
  events: {
    // Create newsletter
    'Create Newsletter': props<{ request: CreateNewsletterContentRequest }>(),
    'Create Newsletter Success': props<{ response: CreateNewsletterContentResponse }>(),
    'Create Newsletter Failure': props<{ error: {error: HttpErrorResponse | Error | string} }>(),
    'Reset Create Status': emptyProps(),
    
    // Get newsletters list
    'Load Newsletters': props<{ page?: number; limit?: number; status?: NewsletterStatus }>(),
    'Load Newsletters Success': props<{ response: NewsletterListResponse }>(),
    'Load Newsletters Failure': props<{ error: {error: HttpErrorResponse | Error | string}}>(),
    
    
    // Get single newsletter
    'Load Newsletter': props<{ id: string }>(),
    'Load Newsletter Success': props<{ newsletter: NewsletterContent }>(),
    'Load Newsletter Failure': props<{error: {error: HttpErrorResponse | Error | string} }>(),
    'Clear Selected Newsletter': emptyProps(),
    
    // Update newsletter
    'Update Newsletter': props<{ id: string; request: UpdateNewsletterContentRequest }>(),
    'Update Newsletter Success': props<{ newsletter: NewsletterContent }>(),
    'Update Newsletter Failure': props<{ error: {error: HttpErrorResponse | Error | string} }>(),
    'Reset Update Status': emptyProps(),
    
    // Delete newsletter
    'Delete Newsletter': props<{ id: string }>(),
    'Delete Newsletter Success': props<{ id: string }>(),
    'Delete Newsletter Failure': props<{ error: {error: HttpErrorResponse | Error | string}}>(),
    'Reset Delete Status': emptyProps(),
    
    // Send newsletter to selected subscribers
    'Send Newsletter To Selected Subscribers': props<{ id: string; subscriberIds: string[] }>(),
    'Send Newsletter To Selected Subscribers Success': props<{ response: SendNewsletterResponse }>(),
    'Send Newsletter To Selected Subscribers Failure': props<{ error: {error: HttpErrorResponse | Error | string} }>(),
    'Reset Send To Selected Subscribers Status': emptyProps(),

    // Send newsletter to selected users with CV
    'Send Newsletter To Selected Users With Cv': props<{ id: string; userIds: string[] }>(),
    'Send Newsletter To Selected Users With Cv Success': props<{ response: SendNewsletterResponse }>(),
    'Send Newsletter To Selected Users With Cv Failure': props<{ error: {error: HttpErrorResponse | Error | string} }>(),
    'Reset Send To Selected Users With Cv Status': emptyProps(),
        
    // Upload newsletter image
    'Upload Image': props<{ file: File }>(),
    'Upload Image Success': props<{ filePath: string }>(),
    'Upload Image Failure': props<{ error: {error: HttpErrorResponse | Error | string} }>(),
    'Reset Upload Status': emptyProps(),
    
    // Update newsletter image
    'Update Image': props<{ id: string; file: File }>(),
    'Update Image Success': props<{ response: ImageUploadResponse }>(),
    'Update Image Failure': props<{ error: {error: HttpErrorResponse | Error | string} }>(),
    
    // Delete newsletter image
    'Delete Image': props<{ id: string }>(),
    'Delete Image Success': props<{ id: string }>(),
    'Delete Image Failure': props<{ error: {error: HttpErrorResponse | Error | string} }>(),
    
    // Get newsletter analytics
    'Load Analytics': emptyProps(),
    'Load Analytics Success': props<{ analytics: NewsletterAnalytics }>(),
    'Load Analytics Failure': props<{ error: {error: HttpErrorResponse | Error | string}}>()
  },
});