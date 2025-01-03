import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../../../../../../common/components/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../../../../../common/components/buttons/secondary-button/secondary-button.component';
import { HomePresentationImage } from '../../../../../../../assets/svg/templates/home-presentation-image/home-presentation-image';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation-section',
  standalone: true,
  imports: [],
  templateUrl: './presentation-section.component.html',
  styleUrl: './presentation-section.component.scss',
})
export class PresentationSectionComponent {
  private viewportScroller = inject(ViewportScroller);

  router = inject(Router);

  scrollToAncherHandler(elementId: string) {
    return () => this.viewportScroller.scrollToAnchor(elementId);
  }

  onDeposit() {
    this.router.navigate(['/deposer-un-cv']);
    window.scrollTo(0, 0);
  }
}
