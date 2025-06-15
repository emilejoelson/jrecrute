import { AfterViewInit, Component, ElementRef, inject, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements AfterViewInit {
  elementRef = inject(ElementRef);
  isVisible = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  faqItems: FaqItem[] = [
    {
      question: 'FAQ.FAQITEMS.0.QUESTION',
      answer: 'FAQ.FAQITEMS.0.ANSWER',
      isOpen: false
    },
    {
      question: 'FAQ.FAQITEMS.1.QUESTION',
      answer: 'FAQ.FAQITEMS.1.ANSWER',
      isOpen: false
    },
    {
      question: 'FAQ.FAQITEMS.2.QUESTION',
      answer: 'FAQ.FAQITEMS.2.ANSWER',
      isOpen: false
    },
    {
      question: 'FAQ.FAQITEMS.3.QUESTION',
      answer: 'FAQ.FAQITEMS.3.ANSWER',
      isOpen: false
    }
  ];

  toggleFaq(selectedItem: FaqItem): void {
    this.faqItems.forEach(item => {
      if (item !== selectedItem) {
        item.isOpen = false;
      }
    });
    selectedItem.isOpen = !selectedItem.isOpen;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
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