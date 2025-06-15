import { Component } from '@angular/core';
import { CurvedArrowV2Component } from '../../../../../../../assets/svg/templates/curved-arrow-v2.component';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CurvedArrowV2Component],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.scss',
})
export class TestimonialsSectionComponent {
  testimonialsData = [
    {
      id: 1,
      comment:
        'Vendiko simplifies my business life! With everything in one place, managing marketing, sales, and finances has never been easier.',
      name: 'Anas Aghliouche',
      role: 'Directeur de la société Biborne',
      picture: 'persone1.jpg',
    },
    {
      id: 2,
      comment:
        'Finally found a platform that streamlines my business tasks seamlessly. Vendiko nails it with its all-in-one solution!',
      name: 'Soukaina Lakbab',
      role: 'Responsable service logistique de la societé SDTM.',
      picture: 'persone2.jpg',
    },
    {
      id: 3,
      comment:
        "Vendiko has transformed how I manage my business. From marketing to cash flow, it's a game-changer that simplifies everything.",
      name: 'Elon musk',
      role: 'CEO of Tesla Motors',
      picture: 'persone3.jpg',
    },
  ];

  navigateHandler(dir: 'up' | 'down'): void {
    if (this.testimonialsData.length < 2) {
      return;
    }

    switch (dir) {
      case 'up':
        const firstElem = this.testimonialsData.shift();
        if (firstElem) {
          this.testimonialsData.push(firstElem);
        }
        break;
      case 'down':
        const lastElem = this.testimonialsData.pop();
        if (lastElem) {
          this.testimonialsData.unshift(lastElem);
        }
        break;
      default:
        break;
    }
  }
}
