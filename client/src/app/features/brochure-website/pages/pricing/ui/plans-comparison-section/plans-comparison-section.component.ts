import { Component } from '@angular/core';
import { SwitcherComponentComponent } from '../switcher-component/switcher-component.component';

@Component({
  selector: 'app-plans-comparison-section',
  standalone: true,
  imports: [SwitcherComponentComponent],
  templateUrl: './plans-comparison-section.component.html',
  styleUrl: './plans-comparison-section.component.scss',
})
export class PlansComparisonSectionComponent {
  subscriptionDurations: [string, string] = ['mensuel', 'annuel'];
  selectedsubscriptionDuration = this.subscriptionDurations[0];
  savePercent = 30;
  appFeatures = [
    'CRM',
    'Factures',
    'accès comptable',
    'Finances',
    'Gestion des produits',
    'Vents',
    'Achats',
    'Suivi de la Prospection',
    'Gestion de Stock',
    'Projets & Travail',
  ];

  plans = [
    {
      id: 1,
      name: 'gratuit',
      description: 'Accès limité aux fonctionnalités de base.',
      features: [
        { id: 1, value: true },
        { id: 2, value: 10 },
        { id: 3, value: 1 },
        { id: 4, value: true },
        { id: 5, value: true },
        { id: 6, value: false },
        { id: 7, value: false },
        { id: 8, value: false },
        { id: 9, value: false },
        { id: 10, value: false },
      ],
      isPopular: false,
    },
    {
      id: 2,
      name: 'base',
      price: 120,
      description: 'Accès à la plupart des fonctionnalités essentielles',
      features: [
        { id: 1, value: true },
        { id: 2, value: 10 },
        { id: 3, value: 2 },
        { id: 4, value: true },
        { id: 5, value: true },
        { id: 6, value: true },
        { id: 7, value: true },
        { id: 8, value: true },
        { id: 9, value: false },
        { id: 10, value: false },
      ],
      isPopular: false,
    },

    {
      id: 3,
      name: 'pro',
      price: 179,
      description:
        'Convient aux entreprises de taille moyenne.Accès à plus de fonctionnalités avancées.',
      features: [
        { id: 1, value: true },
        { id: 2, value: 10 },
        { id: 3, value: 2 },
        { id: 4, value: true },
        { id: 5, value: true },
        { id: 6, value: true },
        { id: 7, value: true },
        { id: 8, value: true },
        { id: 9, value: true },
        { id: 10, value: true },
      ],
      isPopular: true,
    },

    {
      id: 4,
      name: 'premium',
      price: 210,
      description:
        'Destiné aux grandes entreprises avec des besoins complexes.',
      features: [
        { id: 1, value: true },
        { id: 2, value: Infinity },
        { id: 3, value: 2 },
        { id: 4, value: true },
        { id: 5, value: true },
        { id: 6, value: true },
        { id: 7, value: true },
        { id: 8, value: true },
        { id: 9, value: true },
        { id: 10, value: true },
      ],
      isPopular: false,
    },
  ];

  changeSubscriptionDuration(event: string) {
    if (!this.subscriptionDurations.includes(event)) {
      return;
    }

    this.selectedsubscriptionDuration = event;
  }

  getPrice(price: number) {
    const annuelPrice = price * 12;
    return Math.trunc(
      this.selectedsubscriptionDuration === 'mensuel'
        ? price
        : annuelPrice - (this.savePercent / 100) * annuelPrice,
    );
  }

  isNumber(value: number | boolean): boolean {
    return typeof value === 'number';
  }

  isInfinity(number: number | boolean): boolean {
    if (typeof number === 'boolean') {
      return false;
    }

    return !isFinite(number);
  }
}
