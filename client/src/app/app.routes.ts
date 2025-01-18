import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/brochure-website/brochure-website.component').then(
        (m) => m.BrochureWebsiteComponent
      ),
    children: [
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
        path: '',
        loadComponent: () =>
          import('./features/brochure-website/pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '',
    loadComponent: () =>
      import('./common/components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
