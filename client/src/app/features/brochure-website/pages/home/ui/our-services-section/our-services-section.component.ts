import { Component } from '@angular/core';
import { HomeOurServicesImageComponent } from '../../../../../../../assets/svg/templates/home-our-services-image/home-our-services-image.component';

@Component({
  selector: 'app-our-services-section',
  standalone: true,
  imports: [HomeOurServicesImageComponent],
  templateUrl: './our-services-section.component.html',
  styleUrl: './our-services-section.component.scss',
})
export class OurServicesSectionComponent {}
