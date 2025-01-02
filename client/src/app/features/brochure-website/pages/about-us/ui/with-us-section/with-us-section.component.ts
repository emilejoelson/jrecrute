import { Component } from '@angular/core';

@Component({
  selector: 'app-with-us-section',
  standalone: true,
  imports: [],
  templateUrl: './with-us-section.component.html',
  styleUrl: './with-us-section.component.scss',
})
export class WithUsSectionComponent {
  cardsData = [
    {
      id: 1,
      icon: 'simplicity.svg',
      title: 'Simplifier la facturation :',
      description:
        'Générez des factures professionnelles en un instant, envoyez-les directement à vos clients et gérez les paiements, le tout en un seul endroit.',
    },

    {
      id: 2,
      icon: 'oversee.svg',
      title: 'Superviser votre trésorerie : ',
      description:
        'Générez des factures professionnelles en un instant, envoyez-les directement à vos clients et gérez les paiements, le tout en un seul endroit.',
    },
    {
      id: 3,
      icon: 'marketing.svg',
      title: 'Améliorer votre marketing :',
      description:
        'Créez et exécutez des campagnes marketing efficaces avec nos outils intégrés, conçus pour engager votre public et renforcer la présence de votre marque.',
    },
    {
      id: 4,
      icon: 'decisions.svg',
      title: 'Prendre des décisions éclairées :',
      description:
        'Accédez à des analyses détaillées et à des rapports qui fournissent des insights sur chaque aspect de votre entreprise, vous aidant à prendre des décisions basées sur les données pour la croissance.',
    },
    {
      id: 5,
      icon: 'collaborate.svg',
      title: 'Collaborer en équipe:',
      description:
        "Améliorez la collaboration au sein de votre équipe avec des outils de communication et de partage de documents qui facilitent le travail d'équipe et la productivité.",
    },
  ];
}
