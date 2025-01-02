import { AfterViewInit, Component, ElementRef, inject, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss' // Added style for consistency
})
export class FaqComponent implements AfterViewInit {
  elementRef = inject(ElementRef);
  isVisible = false;

  // Inject PLATFORM_ID to check environment
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  faqItems: FaqItem[] = [
    {
      question: 'Est-ce que je peux postuler à plusieurs offres en même temps ?',
      answer: 'Oui, vous pouvez postuler à autant d\'offres que vous le souhaitez, tant que votre profil correspond aux exigences des postes.',
      isOpen: false
    },
    {
      question: 'Comment savoir si mon CV a été reçu ?',
      answer: 'Après avoir soumis votre CV, vous serez dirigés vers une page qui confirme que votre candidature a bien été envoyée. Si nous avons besoin d\'informations supplémentaires, nous vous contacterons directement.',
      isOpen: false
    },
    {
      question: 'Que se passe-t-il après l\'entretien ?',
      answer: 'Après l\'entretien, nous analysons les informations recueillies et vous informons rapidement de la suite donnée à votre candidature, en vous mettant en relation avec l\'entreprise si vous êtes retenu.',
      isOpen: false
    },
    {
      question: 'Que faire si je rencontre un problème technique lors de ma candidature ?',
      answer: 'Si vous rencontrez des problèmes techniques, notre équipe support est disponible pour vous aider. Vous pouvez nous contacter via nos réseaux sociaux : Instagram et Facebook.',
      isOpen: false
    }
  ];

  toggleFaq(selectedItem: FaqItem): void {
    // Close all other FAQ items except the selected one
    this.faqItems.forEach(item => {
      if (item !== selectedItem) {
        item.isOpen = false;
      }
    });
    selectedItem.isOpen = !selectedItem.isOpen;
  }

  ngAfterViewInit() {
    // Execute only in the browser
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            // Disconnect observer once animation is triggered
            observer.disconnect();
          }
        },
        {
          threshold: 0.2
        }
      );

      observer.observe(this.elementRef.nativeElement);
    }
  }
}
