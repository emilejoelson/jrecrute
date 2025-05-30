import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-facebook-icon',
  standalone: true,
  template: `
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      [class]="class"
    >
      <path
        d="M29.3333 16.0003C29.3333 8.64033 23.36 2.66699 16 2.66699C8.63996 2.66699 2.66663 8.64033 2.66663 16.0003C2.66663 22.4537 7.25329 27.827 13.3333 29.067V20.0003H10.6666V16.0003H13.3333V12.667C13.3333 10.0937 15.4266 8.00033 18 8.00033H21.3333V12.0003H18.6666C17.9333 12.0003 17.3333 12.6003 17.3333 13.3337V16.0003H21.3333V20.0003H17.3333V29.267C24.0666 28.6003 29.3333 22.9203 29.3333 16.0003Z"
        fill="currentColor"
      />
    </svg>
  `,
})
export class FacebookIconComponent {
  @Input() class: string = '';
}
