import { Component } from '@angular/core';
import { HeroSectionComponent } from './ui/hero-section/hero-section.component';
import { ServiceSectionComponent } from './ui/service-section/service-section.component';
import { StatSectionComponent } from './ui/stat-section/stat-section.component';

@Component({
  selector: 'app-recruitment-request',
  imports: [HeroSectionComponent,ServiceSectionComponent,StatSectionComponent],
  templateUrl: './recruitment-request.component.html',
  styleUrl: './recruitment-request.component.scss'
})
export class RecruitmentRequestComponent {
  
}
