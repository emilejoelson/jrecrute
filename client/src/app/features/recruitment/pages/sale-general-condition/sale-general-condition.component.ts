// sale-general-condition.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-sale-general-condition',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './sale-general-condition.component.html',
  styleUrl: './sale-general-condition.component.scss'
})
export class SaleGeneralConditionComponent {
  private expandedArticles: { [key: number]: boolean } = {};

  constructor(
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) {}

  toggleArticle(index: number): void {
    this.expandedArticles[index] = !this.expandedArticles[index];
  }

  isArticleExpanded(index: number): boolean {
    return this.expandedArticles[index] || false;
  }

  getArticleTitle(index: number): string {
    const titles: { [key: number]: string } = {
      1: 'SALE_GENERAL_CONDITION.ARTICLES.TITLES.1',
      2: 'SALE_GENERAL_CONDITION.ARTICLES.TITLES.2',
      3: 'SALE_GENERAL_CONDITION.ARTICLES.TITLES.3',
      4: 'SALE_GENERAL_CONDITION.ARTICLES.TITLES.4',
      5: 'SALE_GENERAL_CONDITION.ARTICLES.TITLES.5',
      6: "SALE_GENERAL_CONDITION.ARTICLES.TITLES.6",
      7: 'SALE_GENERAL_CONDITION.ARTICLES.TITLES.7',
      8: 'SALE_GENERAL_CONDITION.ARTICLES.TITLES.8',
      9: 'SALE_GENERAL_CONDITION.ARTICLES.TITLES.9',
    };
    return this.translate.instant(titles[index] || '');
  }

  getArticleContent(index: number): SafeHtml {
    const templateContent = this.getContentTemplate(index);
    const translatedContent = this.translate.instant(templateContent);
    return this.sanitizer.bypassSecurityTrustHtml(translatedContent);
  }

  private getContentTemplate(index: number): string {
    const contents: { [key: number]: string } = {
      1: `
        <div class="space-y-4">
          <p>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.INTRO')}</p>
          <div class="space-y-2">
            <p class="font-medium">${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.SERVICE_INCLUDES')}</p>
            <ol class="list-decimal pl-6 space-y-3">
              <li><span class="font-bold underline">${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.1.TITLE')}</span>: ${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.1.CONTENT')}</li>
              <li>
                <span class="font-bold underline">${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.2.TITLE')}</span>:
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.2.SUBPOINTS.0')}</li>
                  <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.2.SUBPOINTS.1')}</li>
                </ul>
              </li>
              <li>
                <span class="font-bold underline">${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.3.TITLE')}</span>:
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.3.SUBPOINTS.0')}</li>
                  <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.3.SUBPOINTS.1')}</li>
                </ul>
              </li>
              <li><span class="font-bold underline">${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.4.TITLE')}</span>: ${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.4.CONTENT')}</li>
            </ol>
          </div>
        </div>
      `,
      2: `
        <ul class="space-y-2">
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.2.0')}</li>
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.2.1')}</li>
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.2.2')}</li>
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.2.3')}</li>
        </ul>
      `,
      3: `<p>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.3')}</p>`,
      4: `
        <ul class="space-y-2">
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.4.0')}</li>
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.4.1')}</li>
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.4.2')}</li>
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.4.3')}</li>
        </ul>
      `,
      5: `
        <ul class="space-y-2">
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.5.0')}</li>
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.5.1')}</li>
        </ul>
      `,
      6: `
        <ul class="space-y-2">
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.6.0')}</li>
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.6.1')}</li>
        </ul>
      `,
      7: `
        <ul class="space-y-2">
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.7.0')}</li>
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.7.1')}</li>
        </ul>
      `,
      8: `
        <ul class="space-y-2">
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.8.0')}</li>
          <li>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.8.1')}</li>
        </ul>
      `,
      9: `<p>${this.translate.instant('SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.9')}</p>`,
    };
    return contents[index] || '';
  }
}