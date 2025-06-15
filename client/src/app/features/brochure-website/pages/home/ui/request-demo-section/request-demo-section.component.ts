import { Component } from '@angular/core';
import { DemoRequestFormComponent } from '../../../../../../common/components/demo-request-form/demo-request-form.component';

@Component({
  selector: 'app-request-demo-section',
  standalone: true,
  imports: [DemoRequestFormComponent],
  templateUrl: './request-demo-section.component.html',
  styleUrl: './request-demo-section.component.scss',
})
export class RequestDemoSectionComponent {}
