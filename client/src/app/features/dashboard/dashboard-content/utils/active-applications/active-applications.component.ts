import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface JobPosition {
  title: string;
  candidates: number;
  progress: number;
  daysLeft: number;
}

@Component({
  selector: 'app-active-applications',
  imports: [CommonModule],
  templateUrl: './active-applications.component.html',
  styleUrl: './active-applications.component.scss'
})
export class ActiveApplicationsComponent {
 activeJobs: JobPosition[] = [
    {
      title: 'Senior React Developer',
      candidates: 48,
      progress: 75,
      daysLeft: 5
    },
    {
      title: 'Product Manager',
      candidates: 36,
      progress: 60,
      daysLeft: 12
    },
    {
      title: 'UI/UX Designer',
      candidates: 27,
      progress: 40,
      daysLeft: 18
    },
    {
      title: 'DevOps Engineer',
      candidates: 15,
      progress: 25,
      daysLeft: 21
    }
  ];
}
