export interface NewsletterContent {
  _id?: string;
  title: string;
  description: string;
  image?: string | null;
  publishFrequency: PublishFrequency;
  content: string;
  publishDate?: Date | null;
  status: NewsletterStatus;
  createdBy:
    | {
        _id: string;
        personalInfo?: {
          firstName: string;
          lastName: string;
        };
      }
    | string;
  sentToSubscribers: boolean;
  recipientCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PublishFrequency =
  | 'daily'
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'quarterly';

export type NewsletterStatus = 'draft' | 'scheduled' | 'published';

export interface CreateNewsletterContentRequest {
  title: string;
  description: string;
  image?: string | null;
  publishFrequency: PublishFrequency;
  content: string;
  status?: NewsletterStatus;
}

export interface UpdateNewsletterContentRequest {
  title?: string;
  description?: string;
  image?: string | null;
  publishFrequency?: PublishFrequency;
  content?: string;
  status?: NewsletterStatus;
}

export interface CreateNewsletterContentResponse {
  message: string;
  newsletter: NewsletterContent;
}

export interface NewsletterListResponse {
  newsletters: NewsletterContent[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export interface NewsletterAnalytics {
  totalNewsletters: number;
  publishedNewsletters: number;
  draftNewsletters: number;
  scheduledNewsletters: number;
  totalSubscribers: number;
  confirmedSubscribers: number;
}

export interface SendNewsletterResponse {
  message: string;
  results: {
    total: number;
    sent: number;
    failed: number;
    failedEmails: string[];
  };
}

export interface ImageUploadResponse {
  message: string;
  imagePath: string;
  url?: string;
  filename?: string;
}
