import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  standardFeatures = [
    'Analyse des besoins',
    'Recherche ciblée',
    'Présélection et organisation des entretiens',
    'Suivi initial après la mise en relation'
  ];

  recruitmentPacks = [
    {
      candidates: 5,
      price: '6 705',
      pricePerCandidate: '1 341'
    },
    {
      candidates: 10,
      price: '12 665',
      pricePerCandidate: '1 266,50'
    }
  ];
}
