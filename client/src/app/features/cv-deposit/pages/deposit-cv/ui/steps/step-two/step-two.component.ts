// step-two.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormArray,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CustomInputComponent } from '../ui/custom-input/custom-input.component';
import { CustomSelectComponent } from '../ui/custom-select/custom-select.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [
    CustomInputComponent,
    CustomSelectComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
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
    { value: '01', label: 'CV_DEPOSIT.STEP_2.MONTHS.JANUARY' },
    { value: '02', label: 'CV_DEPOSIT.STEP_2.MONTHS.FEBRUARY' },
    { value: '03', label: 'CV_DEPOSIT.STEP_2.MONTHS.MARCH' },
    { value: '04', label: 'CV_DEPOSIT.STEP_2.MONTHS.APRIL' },
    { value: '05', label: 'CV_DEPOSIT.STEP_2.MONTHS.MAY' },
    { value: '06', label: 'CV_DEPOSIT.STEP_2.MONTHS.JUNE' },
    { value: '07', label: 'CV_DEPOSIT.STEP_2.MONTHS.JULY' },
    { value: '08', label: 'CV_DEPOSIT.STEP_2.MONTHS.AUGUST' },
    { value: '09', label: 'CV_DEPOSIT.STEP_2.MONTHS.SEPTEMBER' },
    { value: '10', label: 'CV_DEPOSIT.STEP_2.MONTHS.OCTOBER' },
    { value: '11', label: 'CV_DEPOSIT.STEP_2.MONTHS.NOVEMBER' },
    { value: '12', label: 'CV_DEPOSIT.STEP_2.MONTHS.DECEMBER' },
  ];

  years = Array.from({ length: 25 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
  });

  professionnalInformations = [
    {
      id: 'currentPosition',
      classInput:
        'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
      title: 'CV_DEPOSIT.STEP_2.CURRENT_POSITION',
    },
    {
      id: 'enterprise',
      classInput:
        'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
      title: 'CV_DEPOSIT.STEP_2.COMPANY',
    },
  ];

  postes = [
    { value: 'Développeur web', label: 'JOB_OFFERS.DEVELOPPEUR_WEB' },
    { value: 'Community Manager', label: 'JOB_OFFERS.COMMUNITY_MANAGER' },
    { value: 'Secrétaire', label: 'JOB_OFFERS.SECRETAIRE' },
    { value: 'Profil bilingue', label: 'JOB_OFFERS.PROFIL_BILINGUE' },
    { value: 'Commercial', label: 'Commercial' },
  ];

  postField = {
    id: 'desiredPosition',
    classSelect:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'CV_DEPOSIT.STEP_2.JOB_TITLE',
  };

  startMonthField = {
    id: 'startMonth',
    classSelect:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'CV_DEPOSIT.STEP_2.START_DATE.MONTH',
  };

  startYearField = {
    id: 'startYear',
    classSelect:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'CV_DEPOSIT.STEP_2.START_DATE.YEAR',
  };

  endMonthField = {
    id: 'endMonth',
    classSelect:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'CV_DEPOSIT.STEP_2.END_DATE.MONTH',
  };

  endYearField = {
    id: 'endYear',
    classSelect:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'CV_DEPOSIT.STEP_2.END_DATE.YEAR',
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
        endYear: today.getFullYear().toString(),
      });
    }
  }

  onRemoteWorkChange(value: boolean) {
    this.hasWorkedRemotely = value;
    this.formGroup.get('professionalInfo')?.patchValue({
      hasRemoteExperience: value,
    });
  }

  onCurrentPositionChange(checked: boolean) {
    this.isCurrentPosition = checked;
    if (checked) {
      const today = new Date();
      this.currentExperience.patchValue({
        endMonth: (today.getMonth() + 1).toString().padStart(2, '0'),
        endYear: today.getFullYear().toString(),
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
