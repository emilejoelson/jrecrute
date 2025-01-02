import { Component, WritableSignal, computed, signal } from '@angular/core';
import { SwitcherComponentComponent } from '../switcher-component/switcher-component.component';

type TPlan = {
  id: number;
  name: string;
  price?: number;
  description: string;
  features: { id: number; name: string }[];
  isPopular: boolean;
};

@Component({
  selector: 'app-plans-section',
  standalone: true,
  imports: [SwitcherComponentComponent],
  templateUrl: './plans-section.component.html',
  styleUrl: './plans-section.component.scss',
})
export class PlansSectionComponent {
  subscriptionDurations: [string, string] = ['mensuel', 'annuel'];
  selectedsubscriptionDuration = this.subscriptionDurations[0];
  isOtherCardHovered = false;

  plans: TPlan[] = [
    {
      id: 1,
      name: 'gratuit',
      description: 'Accès limité aux fonctionnalités de base.',
      features: [
        { id: 1, name: 'CRM' },
        { id: 2, name: '10 factures' },
        { id: 3, name: '1 accès comptable' },
        { id: 4, name: 'Finances (Trésorerie, Prévisionnel, TVA)' },
        { id: 5, name: 'Gestion des produits' },
      ],
      isPopular: false,
    },
    {
      id: 2,
      name: 'base',
      price: 120,
      description: 'Accès à la plupart des fonctionnalités essentielles',
      features: [
        { id: 6, name: 'CRM' },
        { id: 7, name: 'Factures illimités' },
        { id: 8, name: '2 accès comptable' },
        { id: 9, name: 'Finances (Trésorerie, Prévisionnel, TVA)' },
        { id: 10, name: 'Gestion des produits' },
        { id: 11, name: 'Vents' },
        { id: 12, name: 'Achats' },
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
        { id: 13, name: 'CRM' },
        { id: 14, name: 'Factures illimités' },
        { id: 15, name: '2 accès comptable' },
        { id: 16, name: 'Finances (Trésorerie, Prévisionnel, TVA)' },
        { id: 17, name: 'Vents' },
        { id: 18, name: 'Achats' },
        { id: 19, name: 'Suivi de la Prospection ' },
        { id: 20, name: 'Gestion de Stock' },
        { id: 21, name: 'Projets & Travail Collaboratif' },
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
        { id: 22, name: 'CRM' },
        { id: 23, name: 'Factures illimités' },
        { id: 24, name: '2 accès comptable' },
        { id: 25, name: 'Finances (Trésorerie, Prévisionnel, TVA)' },
        { id: 26, name: 'Gestion des produits' },
        { id: 27, name: 'Vents' },
        { id: 28, name: 'Achats' },
        { id: 29, name: 'Suivi de la Prospection ' },
        { id: 30, name: 'Gestion de Stock' },
        { id: 31, name: 'Projets & Travail Collaboratif' },
      ],
      isPopular: false,
    },
  ];

  selectedPlan: WritableSignal<undefined | TPlan> = signal(
    this.plans.find((p) => p.isPopular),
  );

  savePercent = 30;

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

  onHover() {
    this.isOtherCardHovered = true;
  }

  onMouseLease() {
    this.isOtherCardHovered = false;
  }

  planClickHandler(plan: TPlan) {
    this.selectedPlan.set(plan);
  }
}
