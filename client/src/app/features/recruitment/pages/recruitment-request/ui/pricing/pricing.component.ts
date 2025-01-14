// pricing.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  selectedCandidates: number = 1;
  calculatedPrice: number = 1490;
  pricePerCandidate: number = 1490;
  isPack: boolean = false;
  activePackSize: number | null = null;

  standardFeatures = [
    'Analyse des besoins',
    'Recherche ciblée',
    'Présélection et organisation des entretiens',
    'Suivi initial après la mise en relation'
  ];

  recruitmentPacks = [
    {
      candidates: 5,
      price: 6705,
      pricePerCandidate: 1341
    },
    {
      candidates: 10,
      price: 12665,
      pricePerCandidate: 1266.50
    }
  ];

  calculatePrice() {
    if (this.selectedCandidates >= 10) {
      this.isPack = true;
      this.activePackSize = 10;
      this.calculatedPrice = this.recruitmentPacks[1].price;
      this.pricePerCandidate = this.recruitmentPacks[1].pricePerCandidate;
    } else if (this.selectedCandidates >= 5) {
      this.isPack = true;
      this.activePackSize = 5;
      this.calculatedPrice = this.recruitmentPacks[0].price;
      this.pricePerCandidate = this.recruitmentPacks[0].pricePerCandidate;
    } else {
      this.isPack = false;
      this.activePackSize = null;
      this.pricePerCandidate = 1490;
      this.calculatedPrice = this.selectedCandidates * 1490;
    }
  }

  updateCandidates(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    this.selectedCandidates = value;
    this.calculatePrice();
  }

  formatPrice(price: number): string {
    return price.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
  }
}