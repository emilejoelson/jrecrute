import { Component } from '@angular/core';
import { OurMissionSectionComponent } from './ui/our-mission-section/our-mission-section.component';
import { WhoWeAreSectionComponent } from './ui/who-we-are-section/who-we-are-section.component';
import { AppointmentSectionComponent } from './ui/appointment-section/appointment-section.component';
import { WithUsSectionComponent } from './ui/with-us-section/with-us-section.component';
import { TestimonialsSectionComponent } from './ui/testimonials-section/testimonials-section.component';
import { OurTeamSectionComponent } from './ui/our-team-section/our-team-section.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    OurMissionSectionComponent,
    WhoWeAreSectionComponent,
    AppointmentSectionComponent,
    WithUsSectionComponent,
    TestimonialsSectionComponent,
    OurTeamSectionComponent,
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {}
