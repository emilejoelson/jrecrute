import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import {
  NewsletterContent,
  CreateNewsletterContentRequest,
  CreateNewsletterContentResponse,
  UpdateNewsletterContentRequest,
  NewsletterStatus,
  NewsletterAnalytics,
  NewsletterListResponse,
  SendNewsletterResponse,
  ImageUploadResponse,
} from '../models/newsletter-content';
import { Subscriber, User } from '../models/newsletter.types';

@Injectable({
  providedIn: 'root',
})
export class NewsletterContentService {
  private apiUrl = environment.apiUrl;

  http = inject(HttpClient);

  getAllSubscribers(): Observable<{ subscribers: Subscriber[] }> {
    return this.http.get<{ subscribers: Subscriber[] }>(`${this.apiUrl}/newsletter`);
  }

  getUsersWithCv(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(`${this.apiUrl}/getusers-with-cv`);
  }

  // Get all newsletters with optional pagination and status filtering
  getNewsletters(
    page = 1,
    limit = 10,
    status?: NewsletterStatus
  ): Observable<NewsletterListResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<NewsletterListResponse>(`${this.apiUrl}/newsletters`, {
      params,
    });
  }

  // Get newsletter analytics
  getNewsletterAnalytics(): Observable<NewsletterAnalytics> {
    return this.http.get<NewsletterAnalytics>(
      `${this.apiUrl}/newsletters/analytics`
    );
  }

  // Get a single newsletter by ID
  getNewsletterById(id: string): Observable<NewsletterContent> {
    return this.http.get<NewsletterContent>(`${this.apiUrl}/newsletters/${id}`);
  }

  // Create a new newsletter
  createNewsletter(
    request: CreateNewsletterContentRequest
  ): Observable<CreateNewsletterContentResponse> {
    return this.http.post<CreateNewsletterContentResponse>(
      `${this.apiUrl}/newsletters`,
      request
    );
  }

  uploadNewsletterImage(file: File): Observable<{ filePath: string }> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<{ filePath: string }>(
      `${this.apiUrl}/newsletters/image`,
      formData
    );
  }

  updateNewsletter(
    id: string,
    request: UpdateNewsletterContentRequest
  ): Observable<{ message: string; newsletter: NewsletterContent }> {
    return this.http.put<{ message: string; newsletter: NewsletterContent }>(
      `${this.apiUrl}/newsletters/${id}`,
      request
    );
  }

  deleteNewsletter(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/newsletters/${id}`
    );
  }

  sendNewsletterToSelectedSubscribers(
    id: string,
    subscriberIds: string[]
  ): Observable<SendNewsletterResponse> {
    return this.http.post<SendNewsletterResponse>(
      `${this.apiUrl}/newsletters/${id}/send`,
      { subscriberIds }
    );
  }

  // Send newsletter to selected users with CV
  sendNewsletterToSelectedUsersWithCv(
    id: string,
    userIds: string[]
  ): Observable<SendNewsletterResponse> {
    return this.http.post<SendNewsletterResponse>(
      `${this.apiUrl}/newsletters/${id}/send-to-candidates`,
      { userIds }
    );
  }
  // Update newsletter image
  updateNewsletterImage(
    id: string,
    file: File
  ): Observable<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.put<ImageUploadResponse>(
      `${this.apiUrl}/newsletters/${id}/image`,
      formData
    );
  }

  // Delete newsletter image
  deleteNewsletterImage(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/newsletters/${id}/image`
    );
  }
}
