// step-two.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CustomInputComponent } from '../ui/custom-input/custom-input.component';
import { CustomSelectComponent } from '../ui/custom-select/custom-select.component';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CustomInputComponent, CustomSelectComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() selectedFile: File | null = null;
  @Input() previewUrl: SafeResourceUrl | null = null;
  @Input() previewType: string = '';

  @Output() prev = new EventEmitter<void>();
  @Output() proceed = new EventEmitter<void>();

  isCurrentPosition = false;
  hasWorkedRemotely: boolean | null = null;

  months = [
    { value: '01', label: 'Janvier' },
    { value: '02', label: 'Février' },
    { value: '03', label: 'Mars' },
    { value: '04', label: 'Avril' },
    { value: '05', label: 'Mai' },
    { value: '06', label: 'Juin' },
    { value: '07', label: 'Juillet' },
    { value: '08', label: 'Août' },
    { value: '09', label: 'Septembre' },
    { value: '10', label: 'Octobre' },
    { value: '11', label: 'Novembre' },
    { value: '12', label: 'Décembre' }
  ];

  years = Array.from({ length: 25 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
  });

  professionnalInformations = [
    {
      id: 'currentPosition',
      classInput: 'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
      title: 'Post occupé actuel',
    },
    {
      id: 'enterprise',
      classInput: 'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
      title: 'Entreprise',
    },
  ];

  postes = [
    { value: 'dev', label: 'Développeur web' },
    { value: 'cma', label: 'Community Manager' },
    { value: 'sec', label: 'Secrétaire' },
    { value: 'pbi', label: 'Profil bilingue' },
    { value: 'cme', label: 'Commercial' },
  ];

  postField = {
    id: 'desiredPosition',
    classSelect: 'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'Poste recherché',
  };

  startMonthField = {
    id: 'startMonth',
    classSelect: 'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'Mois'
  };

  startYearField = {
    id: 'startYear',
    classSelect: 'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'Année'
  };

  endMonthField = {
    id: 'endMonth',
    classSelect: 'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'Mois'
  };

  endYearField = {
    id: 'endYear',
    classSelect: 'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'Année'
  };

  ngOnInit() {
    this.initializeExperience();
  }

  get experiencesFormArray(): FormArray {
    return this.formGroup.get('experiences') as FormArray;
  }

  get currentExperience(): FormGroup {
    return this.experiencesFormArray.at(0) as FormGroup;
  }

  private initializeExperience() {
    const experience = this.currentExperience;
    if (!experience.get('startMonth')?.value) {
      const today = new Date();
      experience.patchValue({
        startMonth: (today.getMonth() + 1).toString().padStart(2, '0'),
        startYear: today.getFullYear().toString(),
        endMonth: (today.getMonth() + 1).toString().padStart(2, '0'),
        endYear: today.getFullYear().toString()
      });
    }
  }

  onRemoteWorkChange(value: boolean) {
    this.hasWorkedRemotely = value;
    this.formGroup.get('professionalInfo')?.patchValue({
      hasRemoteExperience: value
    });
  }

  onCurrentPositionChange(checked: boolean) {
    this.isCurrentPosition = checked;
    if (checked) {
      const today = new Date();
      this.currentExperience.patchValue({
        endMonth: (today.getMonth() + 1).toString().padStart(2, '0'),
        endYear: today.getFullYear().toString()
      });
    }
  }
  
  onPrevClick() {
    this.prev.emit();
  }

  onProceedClick() {
    this.proceed.emit();
    // if (this.formGroup.valid) {
     
    // }
  }
}