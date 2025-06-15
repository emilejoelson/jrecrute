import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../category';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-faq-category-component',
  standalone: true,
  imports: [],
  templateUrl: './faq-category-component.component.html',
  styleUrl: './faq-category-component.component.scss',
  animations: [
    trigger('showInOut', [
      transition(':enter', [
        style({ maxHeight: 0, opacity: 0 }),
        animate('1000ms ease-out', style({ maxHeight: '100vh', opacity: 1 })),
      ]),
      /* transition(':leave', [ */
      /*   animate('1000ms ease-out', style({ maxHeight: 0, opacity: 0 })), */
      /* ]), */
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class FaqCategoryComponentComponent {
  @Input({ required: true }) selectedCategories!: Set<number>;
  @Input({ required: true }) selectedQuestions!: Set<number>;
  @Input({ required: true }) category!: Category;
  @Input({ required: true }) searchQuery!: string | null;
  @Output() selectCategoryEvent = new EventEmitter<number>();
  @Output() selectQuestionEvent = new EventEmitter<number>();

  highlightText(text: string, searchQuery: string): string {
    let highlightedText: string[] = [];

    if (!text) {
      return text;
    }

    const tokens = new Set(
      searchQuery
        .split(' ')
        .map((t) => t.trim())
        .filter((t) => t.length),
    );

    const words = new Set(
      text
        .split(' ')
        .map((t) => t.trim())
        .filter((t) => t.length),
    );

    words.forEach((word) => {
      let highlightedWord = word;
      for (let token of tokens) {
        const regex = new RegExp(`^${token}$`, 'gi');
        let newWord = word.replace(
          regex,
          (match) => `<span class='text-app-secondary-dark'>${match}</span>`,
        );
        if (newWord !== word) {
          highlightedWord = newWord;
          break;
        }
      }
      highlightedText.push(highlightedWord);
    });

    return highlightedText.join(' ');
  }
}
