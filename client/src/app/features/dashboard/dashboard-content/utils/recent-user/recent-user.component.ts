import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: 'online' | 'offline' | 'away';
  profileImg: string;
}

@Component({
  selector: 'app-recent-user',
  imports: [CommonModule],
  templateUrl: './recent-user.component.html',
  styleUrl: './recent-user.component.scss'
})
export class RecentUserComponent {
recentUsers: User[] = [
    {
      id: 1,
      name: 'Antoine Dupont',
      email: 'antoine.d@example.com',
      role: 'Admin',
      lastActive: 'Just now',
      status: 'online',
      profileImg: 'assets/user1.jpg'
    },
    {
      id: 2,
      name: 'Marie Laurent',
      email: 'marie.l@example.com',
      role: 'Recruiter',
      lastActive: '5 min ago',
      status: 'online',
      profileImg: 'assets/user2.jpg'
    },
    {
      id: 3,
      name: 'Pierre Moreau',
      email: 'pierre.m@example.com',
      role: 'HR Manager',
      lastActive: '1 hour ago',
      status: 'away',
      profileImg: 'assets/user3.jpg'
    },
    {
      id: 4,
      name: 'Sophie Lemoine',
      email: 'sophie.l@example.com',
      role: 'Recruiter',
      lastActive: '3 hours ago',
      status: 'offline',
      profileImg: 'assets/user4.jpg'
    }
  ];
}
