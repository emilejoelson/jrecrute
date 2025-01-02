import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

interface ICountries {
  name: string;
  code: string;
  flag: string;
}

@Component({
  selector: 'app-custom-select-country',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './custom-select-country.component.html',
  styleUrl: './custom-select-country.component.scss'
})
export class CustomSelectCountryComponent {
  formGroup = input.required<FormGroup>();
  countryControlName = input.required<string>();
  codeControlName = input.required<string>();
  label = input<string>();
  required = input<boolean>(true);
  className = input<string>('');

  // Liste des pays avec leur drapeau et leur indicatif
  countries: ICountries[] = [
    { name: 'Maroc', code: '+212', flag: '/assets/svg/country/ma.svg' },
    { name: 'Guinée', code: '+224', flag: '/assets/svg/country/gn.svg' },
    { name: 'Niger', code: '+227', flag: '/assets/svg/country/ni.svg' },
    { name: 'Mali', code: '+223', flag: '/assets/svg/country/ml.svg' },
    { name: 'France', code: '+33', flag: '/assets/svg/country/fr.svg' },
    { name: 'États-Unis', code: '+1', flag: '/assets/svg/country/us.svg' },
    { name: 'Canada', code: '+1', flag: '/assets/svg/country/ca.svg' },
    { name: 'Espagne', code: '+34', flag: '/assets/svg/country/es.svg' },
  ];

  isOpen: boolean = false; // For controlling dropdown visibility
  selectedCountry = this.countries[0]; // Default selection

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {
    // Initialize form controls with default country
    this.formGroup()
      .get(this.countryControlName())
      ?.setValue(this.selectedCountry.name);
    this.formGroup()
      .get(this.codeControlName())
      ?.setValue(this.selectedCountry.code);
  }

  // Toggle the dropdown visibility
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  // Select a country from the dropdown
  selectCountry(country: ICountries) {
    this.selectedCountry = country;
    this.formGroup().get(this.countryControlName())?.setValue(country.name);
    this.formGroup().get(this.codeControlName())?.setValue(country.code);
    this.isOpen = false;
  }

  // Click outside listener to close the dropdown
  @HostListener('document:click', ['$event'])
  clickOutside(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
