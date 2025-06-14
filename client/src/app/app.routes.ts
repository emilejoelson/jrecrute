import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/brochure-website/brochure-website.component').then(
        (m) => m.BrochureWebsiteComponent
      ),
    children: [
      {
        title: 'Paramètre | Compte',
        path: 'parametre/compte',
        loadComponent: () =>
          import('./features/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
        canActivate: [authGuard],
      },
      {
        title: 'Connexion',
        path: 'connexion',
        loadComponent: () =>
          import('./authentication/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        title: 'Inscription',
        path: 'inscription',
        loadComponent: () =>
          import('./authentication/signup/signup.component').then(
            (m) => m.SignupComponent
          ),
      },
      {
        title: 'Recrutement | details',
        path: "offre-d'emploi/:slug",
        loadComponent: () =>
          import(
            './features/job-offer-details/job-offer-details.component'
          ).then((m) => m.JobOfferDetailsComponent),
      },
      {
        title: 'Recrutement | client',
        path: 'client',
        loadComponent: () =>
          import(
            './features/recruitment/pages/recruitment-request/recruitment-request.component'
          ).then((m) => m.RecruitmentRequestComponent),
      },
      {
        title: 'Recrutement | Dépot CV',
        path: 'deposer-un-cv',
        loadComponent: () =>
          import(
            './features/cv-deposit/pages/deposit-cv/deposit-cv.component'
          ).then((m) => m.DepositCvComponent),
      },
      {
        title: 'Recrutement | Mentions légales',
        path: 'mention-legal',
        loadComponent: () =>
          import(
            './features/recruitment/pages/legal-notice/legal-notice.component'
          ).then((m) => m.LegalNoticeComponent),
      },
      {
        title: 'Recrutement | CGV',
        path: 'condition-general-de-vente',
        loadComponent: () =>
          import(
            './features/recruitment/pages/sale-general-condition/sale-general-condition.component'
          ).then((m) => m.SaleGeneralConditionComponent),
      },
      {
        title: 'Loading ...',
        path: 'attente-de-reponse',
        loadComponent: () =>
          import('./shared/loading-spinner/loading-spinner.component').then(
            (m) => m.LoadingSpinnerComponent
          ),
      },
      {
        title: 'Depot | Succès',
        path: 'deposer-un-cv-avec-succes',
        loadComponent: () =>
          import(
            './shared/receive-popup-confirmation/receive-popup-confirmation.component'
          ).then((m) => m.ReceivePopupConfirmationComponent),
      },
      {
        title: 'Fiche de poste | Succès',
        path: 'fiche-de-poste-remplie-avec-succes',
        loadComponent: () =>
          import(
            './shared/recruitment-popup-confirmation/recruitment-popup-confirmation.component'
          ).then((m) => m.RecruitmentPopupConfirmationComponent),
      },
      {
        title: 'Email de confirmation',
        path: 'email-de-confirmation',
        loadComponent: () =>
          import(
            './shared/subscription-popup-confirmation/subscription-popup-confirmation.component'
          ).then((m) => m.SubscriptionPopupConfirmationComponent),
      },
      {
        path: '',
        loadComponent: () =>
          import('./features/brochure-website/pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
        pathMatch: 'full',
      },
      {
        path: 'confirm-newsletter',
        loadComponent: () =>
          import(
            './features/newsletter/confirm-newsletter/confirm-newsletter.component'
          ).then((m) => m.ConfirmNewsletterComponent),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [adminGuard],
    children: [
      {
        title: 'Newsletter recipient',
        path: 'newsletter-recipient',
        loadComponent: () =>
          import(
            './features/dashboard/dashboard-content/pages/manage-newsletter/newsletter-recipients/newsletter-recipients.component'
          ).then((m) => m.NewsletterRecipientsComponent),
      },
      {
        title: 'manage-newsletter',
        path: 'newsletter',
        loadComponent: () =>
          import(
            './features/dashboard/dashboard-content/pages/manage-newsletter/manage-newsletter.component'
          ).then((m) => m.ManageNewsletterComponent),
      },
      {
        title: 'manage-subscriber',
        path: 'subscribers',
        loadComponent: () =>
          import(
            './features/dashboard/dashboard-content/pages/manage-subscriber/manage-subscriber.component'
          ).then((m) => m.ManageSubscriberComponent),
      },
      {
        title: 'manage-role',
        path: 'roles',
        loadComponent: () =>
          import(
            './features/dashboard/dashboard-content/pages/manage-role/manage-role.component'
          ).then((m) => m.ManageRoleComponent),
      },
      {
        title: 'newsletter-detail',
        path: 'newsletter/:id',
        loadComponent: () =>
          import(
            './features/dashboard/dashboard-content/pages/manage-newsletter/components/newsletter-detail/newsletter-detail.component'
          ).then((m) => m.NewsletterDetailComponent),
      },
      {
        title: '',
        path: '',
        loadComponent: () =>
          import(
            './features/dashboard/dashboard-content/dashboard-content.component'
          ).then((m) => m.DashboardContentComponent),
      },
      {
        title: 'manage-user',
        path: 'users',
        loadComponent: () =>
          import(
            './features/dashboard/dashboard-content/pages/manage-user/manage-user.component'
          ).then((m) => m.ManageUserComponent),
      },
      {
        title: 'manage-recruitement',
        path: 'recruitment',
        loadComponent: () =>
          import(
            './features/dashboard/dashboard-content/pages/recruitement/recruitement.component'
          ).then((m) => m.RecruitementComponent),
      },
    ],
  },

  {
    path: 'access-denied',
    loadComponent: () =>
      import('./core/components/access-denied.component').then(
        (m) => m.AccessDeniedComponent
      ),
  },
  { path: '**', redirectTo: '/connexion' },
];
