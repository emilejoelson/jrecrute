import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-select-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './custom-select-input.component.html',
  styleUrl: './custom-select-input.component.scss',
})
export class CustomSelectInputComponent {
  formGroup = input.required<FormGroup>();
  controlName = input.required<string>();
  label = input<string>();
  required = input<boolean>(true);
  options = input.required<{ id: number | string; title: string }[]>();
  returnTitle = input<boolean>(false);
  placeholder = input<string>('Sélectionnez une option');
  className = input<string>('');

  isOpen = false;
  selectedOption: { id: number | string; title: string } | null = null;

  constructor(private eRef: ElementRef) {}

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: { id: number | string; title: string }) {
    this.selectedOption = option;
    const value = this.returnTitle() ? option.title : option.id;
    this.formGroup().get(this.controlName())?.setValue(value);
    this.isOpen = false;
  }

  // HostListener to listen for clicks outside the dropdown
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    // Check if the click is outside the dropdown element
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
