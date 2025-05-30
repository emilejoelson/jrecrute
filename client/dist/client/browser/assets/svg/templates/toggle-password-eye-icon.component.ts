import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toggle-password-eye-icon',
  standalone: true,
  template: `
    @if (isOpen) {
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 3.99995C14.79 3.99995 18.17 6.12995 19.82 9.49995C19.23 10.72 18.4 11.77 17.41 12.62L18.82 14.03C20.21 12.8 21.31 11.26 22 9.49995C20.27 5.10995 16 1.99995 11 1.99995C9.73 1.99995 8.51 2.19995 7.36 2.56995L9.01 4.21995C9.66 4.08995 10.32 3.99995 11 3.99995ZM9.93 5.13995L12 7.20995C12.57 7.45995 13.03 7.91995 13.28 8.48995L15.35 10.56C15.43 10.22 15.49 9.85995 15.49 9.48995C15.5 7.00995 13.48 4.99995 11 4.99995C10.63 4.99995 10.28 5.04995 9.93 5.13995ZM1.01 1.86995L3.69 4.54995C2.06 5.82995 0.77 7.52995 0 9.49995C1.73 13.89 6 17 11 17C12.52 17 13.98 16.71 15.32 16.18L18.74 19.6L20.15 18.19L2.42 0.449951L1.01 1.86995ZM8.51 9.36995L11.12 11.98C11.08 11.99 11.04 12 11 12C9.62 12 8.5 10.88 8.5 9.49995C8.5 9.44995 8.51 9.41995 8.51 9.36995ZM5.11 5.96995L6.86 7.71995C6.63 8.26995 6.5 8.86995 6.5 9.49995C6.5 11.98 8.52 14 11 14C11.63 14 12.23 13.87 12.77 13.64L13.75 14.62C12.87 14.86 11.95 15 11 15C7.21 15 3.83 12.87 2.18 9.49995C2.88 8.06995 3.9 6.88995 5.11 5.96995Z"
          fill="#7263D8"
        />
      </svg>
    } @else {
      <svg
        width="22"
        height="15"
        viewBox="0 0 22 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 2C14.79 2 18.17 4.13 19.82 7.5C18.17 10.87 14.79 13 11 13C7.21 13 3.83 10.87 2.18 7.5C3.83 4.13 7.21 2 11 2ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0ZM11 5C12.38 5 13.5 6.12 13.5 7.5C13.5 8.88 12.38 10 11 10C9.62 10 8.5 8.88 8.5 7.5C8.5 6.12 9.62 5 11 5ZM11 3C8.52 3 6.5 5.02 6.5 7.5C6.5 9.98 8.52 12 11 12C13.48 12 15.5 9.98 15.5 7.5C15.5 5.02 13.48 3 11 3Z"
          fill="#7263D8"
        />
      </svg>
    }
  `,
})
export class TogglePasswordEyeIconComponent {
  @Input() class: string = '';
  @Input() isOpen: boolean = false;
}
