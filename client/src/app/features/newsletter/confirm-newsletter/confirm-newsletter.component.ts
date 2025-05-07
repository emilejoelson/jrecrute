import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsletterService } from '../data-access/services/newsletter.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-newsletter',
  imports: [RouterModule, CommonModule,TranslateModule],
  templateUrl: './confirm-newsletter.component.html',
  styleUrl: './confirm-newsletter.component.scss',
})

export class ConfirmNewsletterComponent implements OnInit {
  loading = true;
  confirmationSuccess = false;
  confirmationError = false;
  errorMessage = 'The confirmation link appears to be invalid or has expired. Please try subscribing again.';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private newsletterService = inject(NewsletterService);

  ngOnInit(): void {
    // Get token from URL query parameters
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];

      if (token) {
        this.confirmSubscription(token);
      } else {
        this.showError('No confirmation token found in the URL.');
      }
    });
  }

  confirmSubscription(token: string): void {
    this.newsletterService.confirmSubscription(token).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.confirmationSuccess = true;
      },
      error: (error) => {
        this.loading = false;
        this.confirmationError = true;

        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        }
      },
    });
  }

  showError(message: string): void {
    this.loading = false;
    this.confirmationError = true;
    this.errorMessage = message;
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}