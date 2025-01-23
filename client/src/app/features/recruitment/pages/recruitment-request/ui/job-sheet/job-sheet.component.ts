import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { min, Subject, takeUntil } from 'rxjs';
import { CustomInputComponent } from '../../../../../cv-deposit/pages/deposit-cv/ui/steps/ui/custom-input/custom-input.component';
import { CustomSelectComponent } from '../../../../../cv-deposit/pages/deposit-cv/ui/steps/ui/custom-select/custom-select.component';
import { CustomTextAreaComponent } from '../../../../../cv-deposit/pages/deposit-cv/ui/steps/ui/custom-text-area/custom-text-area.component';
import { CommonModule } from '@angular/common';
import { CustomRadioButtonComponent } from '../../../../../cv-deposit/pages/deposit-cv/ui/steps/ui/custom-radio-button/custom-radio-button.component';
import { Store } from '@ngrx/store';
import { RecruitmentFormActions } from '../../../../store/actions/recruitment.actions';

@Component({
  selector: 'app-job-sheet',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CustomInputComponent,
    CustomSelectComponent,
    CustomTextAreaComponent,
    CommonModule,
    CustomRadioButtonComponent,
  ],
  templateUrl: './job-sheet.component.html',
  styleUrl: './job-sheet.component.scss',
})
export class JobSheetComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  jobSheetForm!: FormGroup;
  fb = inject(FormBuilder);
  store = inject(Store);

  showCustomPosition = false;
  selectedPosition: string = '';
  selectedUrgency: string = '';

  monthlyBudgets = [
    {
      id: 'min',
      classInput:
        'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel: 'left-3 -top-2.5 text-sm text-[#362E75] bg-white px-1',
      title: 'Minimum',
      type: 'number',
    },
    {
      id: 'max',
      classInput:
        'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel: 'left-3 -top-2.5 text-sm text-[#362E75] bg-white px-1',
      title: 'Maximum',
      type: 'number',
    },
  ];

  urgencyOptions = [
    {
      id: 'urgency',
      value: 'Très urgent',
      title: 'Très urgent',
      classInput: 'sr-only peer',
      classLabel:
        'inline-flex items-center justify-center w-full p-2 md:py-4 text-center  border text-[12px] border-gray-200 rounded-lg cursor-pointer',
      classOption: 'flex-1',
    },
    {
      id: 'urgency',
      value: 'Dans les 7 jours',
      title: 'Dans les 7 jours',
      classInput: 'sr-only peer',
      classLabel:
        'inline-flex items-center justify-center w-full p-2 md:py-4 text-center  text-[12px]  border border-gray-200 rounded-lg cursor-pointer',
      classOption: 'flex-1',
    },
    {
      id: 'urgency',
      value: 'Pas pressé',
      title: 'Pas pressé',
      classInput: 'sr-only peer',
      classLabel:
        'inline-flex items-center  justify-center w-full p-2 md:py-4 text-center text-[12px]  border border-gray-200 rounded-lg cursor-pointer',
      classOption: 'flex-1',
    },
  ];

  jobSheetInformations = [
    {
      id: 'companyName',
      classInput:
        'peer w-full p-2 md:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel: 'left-3 -top-2.5 text-sm text-[#362E75] bg-white px-1',
      title: "Nom de l'entreprise",
    },
    {
      id: 'contactEmail',
      classInput:
        'peer w-full p-2 md:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel: 'left-3 -top-2.5 text-sm text-[#362E75] bg-white px-1',
      title: 'Email de contact',
    },
    {
      id: 'phoneNumber',
      classInput:
        'peer w-full p-2 md:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel: 'left-3 -top-2.5 text-sm text-[#362E75] bg-white px-1',
      title: 'Numéro de téléphone',
    },
  ];

  postes = [
    { value: 'Développeur web', label: 'Développeur web' },
    { value: 'Community Manager', label: 'Community Manager' },
    { value: 'Secrétaire', label: 'Secrétaire' },
    { value: 'Profil bilingue', label: 'Profil bilingue' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Autre', label: 'Autre' },
  ];

  postField = {
    id: 'position',
    classSelect:
      'peer w-full p-2 md:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-[#362E75] bg-white px-1',
    title: 'Poste recherché',
  };

  customPositionField = {
    id: 'position',
    classInput:
      'peer w-full p-2 md:p-4 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none pr-10', // Added pr-10 for button space
    classLabel: 'left-3 -top-2.5 text-sm text-[#362E75] bg-white px-1',
    title: 'Précisez le poste',
  };

  needsDescription = {
    id: 'needsDescription',
    classTextarea:
      'peer w-full p-2 md:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-[#362E75] bg-white px-1',
    title: 'Description des besoins',
    rows: 5,
  };

  ngOnInit() {
    this.initializeForms();

    this.jobSheetForm
      .get('position')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value === 'Autre' && !this.showCustomPosition) {
          this.showCustomPosition = true;
          this.selectedPosition = value;
          setTimeout(() => {
            this.jobSheetForm
              .get('position')
              ?.setValue('', { emitEvent: false });
          });
        } else if (value && !this.showCustomPosition) {
          this.selectedPosition = value;
        }
      });
  }

  private initializeForms() {
    this.jobSheetForm = this.fb.group({
      companyName: ['', Validators.required],
      contactEmail: [
        '',
        [Validators.required, Validators.email],
      ],
      phoneNumber: ['', Validators.required],
      position: ['Sécrétaire', Validators.required],
      needsDescription: [
        '',
        Validators.required,
      ],
      monthlyBudget: this.fb.group({
        min: [0, Validators.required],
        max: [0, Validators.required],
      }),
      urgency: ['', Validators.required],
    });
  }

  get monthlyBudgetGroup(): FormGroup | null {
    return this.jobSheetForm
      ? (this.jobSheetForm.get('monthlyBudget') as FormGroup)
      : null;
  }
  backToSelect() {
    const currentValue = this.jobSheetForm.get('position')?.value;
    this.showCustomPosition = false;
    setTimeout(() => {
      if (currentValue) {
        this.selectedPosition = currentValue;
      }
      this.jobSheetForm
        .get('position')
        ?.setValue(this.selectedPosition || 'Autre');
    });
  }

  onUrgencySelect(value: string) {
    this.selectedUrgency = value;
    this.jobSheetForm.get('urgency')?.setValue(value, { emitEvent: false });
  }

  isSelected(value: string): boolean {
    return this.selectedUrgency === value;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    const payload = {
      ...this.jobSheetForm.value,
    };

    this.store.dispatch(
      RecruitmentFormActions.submitRecruitmentForm({
        recruitmentPayload: payload,
      })
    );
  }
  
}
