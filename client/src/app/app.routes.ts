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
        path: '',
        loadComponent: () =>
          import('./features/brochure-website/pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
        pathMatch: 'full',
      },
      {
        path: 'deposer-un-cv',
        loadComponent: () =>
          import(
            './features/cv-deposit/pages/deposit-cv/deposit-cv.component'
          ).then((m) => m.DepositCvComponent),
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
