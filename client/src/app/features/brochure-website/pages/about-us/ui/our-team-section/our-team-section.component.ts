import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-our-team-section',
  standalone: true,
  imports: [],
  templateUrl: './our-team-section.component.html',
  styleUrl: './our-team-section.component.scss',
})
export class OurTeamSectionComponent {
  @ViewChild('membersSlider') membersSlider!: ElementRef<HTMLLIElement>;

  teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Software Engineer',
      picture: 'persone1.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'UI/UX Designer',
      picture: 'persone2.jpg',
    },
    {
      id: 3,
      name: 'David Johnson',
      role: 'Project Manager',
      picture: 'persone3.jpg',
    },
    {
      id: 4,
      name: 'Emily Brown',
      role: 'Marketing Specialist',
      picture: 'persone1.jpg',
    },
    {
      id: 5,
      name: 'Michael Lee',
      role: 'Quality Assurance Engineer',
      picture: 'persone2.jpg',
    },
    {
      id: 6,
      name: 'Sarah Adams',
      role: 'Frontend Developer',
      picture: 'persone3.jpg',
    },
    {
      id: 7,
      name: 'Chris Wilson',
      role: 'Backend Developer',
      picture: 'persone1.jpg',
    },
    {
      id: 8,
      name: 'Amanda Taylor',
      role: 'Product Manager',
      picture: 'persone2.jpg',
    },
    {
      id: 9,
      name: 'Mark Thompson',
      role: 'Content Strategist',
      picture: 'persone3.jpg',
    },
    {
      id: 10,
      name: 'Laura Martinez',
      role: 'Graphic Designer',
      picture: 'persone1.jpg',
    },
    {
      id: 11,
      name: 'Daniel Garcia',
      role: 'Data Analyst',
      picture: 'persone2.jpg',
    },
    {
      id: 12,
      name: 'Sophia Nguyen',
      role: 'Marketing Manager',
      picture: 'persone3.jpg',
    },
  ];

  rewind(dir: 'left' | 'right') {
    const scrollLeft = this.membersSlider.nativeElement.scrollLeft;
    const scrollWidth = this.membersSlider.nativeElement.scrollWidth;
    const elementWidth = this.membersSlider.nativeElement.clientWidth;
    const isEndOfScroll = scrollLeft >= scrollWidth - elementWidth;

    if (isEndOfScroll && dir === 'right') {
      this.membersSlider.nativeElement.scrollTo({ left: 0 });
    } else if (scrollLeft === 0 && dir === 'left') {
      this.membersSlider.nativeElement.scrollTo({ left: scrollWidth });
    }
  }

  onNavigate(dir: 'left' | 'right'): void {
    switch (dir) {
      case 'right':
        this.membersSlider.nativeElement.scrollBy({
          /* left: this.membersSlider.nativeElement.clientWidth, */
          left: 382,
        });
        break;
      case 'left':
        this.membersSlider.nativeElement.scrollBy({
          /* left: -this.membersSlider.nativeElement.clientWidth, */
          left: -382,
        });
        break;
      default:
        break;
    }

    this.rewind(dir);
  }
}
