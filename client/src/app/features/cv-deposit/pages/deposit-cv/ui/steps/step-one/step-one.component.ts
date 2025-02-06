import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { IconComponent } from '../../../../../../../shared/ui/icon/icon.component';
import { InputComponent } from '../../../../../../../common/components/input/input.component';
import { CustomInputComponent } from '../ui/custom-input/custom-input.component';
import { CustomSelectComponent } from '../ui/custom-select/custom-select.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-step-one',
  standalone:true,
  imports: [
    CustomInputComponent,
    CustomSelectComponent,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss',
})
export class StepOneComponent {
  @Input() formGroup!: FormGroup;
  @Input() selectedFile: File | null = null;
  @Input() previewUrl: SafeResourceUrl | null = null;
  @Input() previewType: string = '';

  @Output() prev = new EventEmitter<void>();
  @Output() proceed = new EventEmitter<void>();

  onPrevClick() {
    this.prev.emit();
  }

  onProceedClick() {
    this.proceed.emit();
  }


  personalInformations = [
    {
      id: 'firstName',
      classInput:
        'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel:
        'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
      title: 'CV_DEPOSIT.STEP_1.LAST_NAME',
    },
    {
      id: 'lastName',
      classInput:
        'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel:
        'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
      title: 'CV_DEPOSIT.STEP_1.FIRST_NAME',
    },
    {
      id: 'email',
      classInput:
        'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel:
        'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
      title: 'Email',
    },
    {
      id: 'telephone',
      classInput:
        'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel:
        'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
      title: 'CV_DEPOSIT.STEP_1.PHONE',
    },
  ];

  civilities = [
    { value: 'Monsieur', label: 'CV_DEPOSIT.STEP_1.CIVILITY_OPTIONS.MR' },
    { value: 'Madame', label: 'CV_DEPOSIT.STEP_1.CIVILITY_OPTIONS.MRS' },
    { value: 'Mademoiselle', label: 'CV_DEPOSIT.STEP_1.CIVILITY_OPTIONS.MISS' },
  ];

  civilityField = {
    id: 'civility',
    classSelect:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel:
      'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'CV_DEPOSIT.STEP_1.CIVILITY',
  };


}
