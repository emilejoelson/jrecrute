import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../../../../../../common/components/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../../../../../common/components/buttons/secondary-button/secondary-button.component';
import { CurvedArrowComponent } from '../../../../../../../assets/svg/templates/curved-arrow.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-why-us-section',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    CurvedArrowComponent,
  ],
  templateUrl: './why-us-section.component.html',
  styleUrl: './why-us-section.component.scss',
})
export class WhyUsSectionComponent {
  private viewportScroller = inject(ViewportScroller);

  scrollToAncherHandler(elementId: string) {
    return () => this.viewportScroller.scrollToAnchor(elementId);
  }
}
