import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Candidate {
  id: number;
  name: string;
  position: string;
  date: string;
  status: 'pending' | 'interview' | 'hired' | 'rejected';
  profileImg: string;
}

@Component({
  selector: 'app-recruitement-table',
  imports: [CommonModule],
  templateUrl: './recruitement-table.component.html',
  styleUrl: './recruitement-table.component.scss'
})
export class RecruitementTableComponent {
candidates: Candidate[] = [
    {
      id: 1,
      name: 'Sophie Martin',
      position: 'Full Stack Developer',
      date: 'May 8, 2025',
      status: 'interview',
      profileImg: 'assets/candidate1.jpg'
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      position: 'UI/UX Designer',
      date: 'May 7, 2025',
      status: 'pending',
      profileImg: 'assets/candidate2.jpg'
    },
    {
      id: 3,
      name: 'Camille Bernard',
      position: 'Project Manager',
      date: 'May 6, 2025',
      status: 'hired',
      profileImg: 'assets/candidate3.jpg'
    },
    {
      id: 4,
      name: 'Lucas Moreau',
      position: 'Backend Developer',
      date: 'May 5, 2025',
      status: 'pending',
      profileImg: 'assets/candidate4.jpg'
    },
    {
      id: 5,
      name: 'Emma Petit',
      position: 'DevOps Engineer',
      date: 'May 4, 2025',
      status: 'rejected',
      profileImg: 'assets/candidate5.jpg'
    }
  ];
}
