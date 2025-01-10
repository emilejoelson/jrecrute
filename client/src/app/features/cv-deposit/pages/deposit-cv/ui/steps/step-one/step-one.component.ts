import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { IconComponent } from '../../../../../../../shared/ui/icon/icon.component';
import { InputComponent } from '../../../../../../../common/components/input/input.component';
import { CustomInputComponent } from '../ui/custom-input/custom-input.component';
import { CustomSelectComponent } from '../ui/custom-select/custom-select.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  standalone:true,
  imports: [
    CustomInputComponent,
    CustomSelectComponent,
    ReactiveFormsModule
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
      title: 'Nom',
    },
    {
      id: 'lastName',
      classInput:
        'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel:
        'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
      title: 'Prénom',
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
      title: 'Téléphone',
    },
  ];

  // {
  //   id: 'telephone',
  //   classInput:
  //     'peer w-full p-3 border border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-200 focus:outline-none focus:border-purple-500',
  //   classLabel:
  //     'left-3 -top-2.5 text-sm text-purple-500 bg-white px-1 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:scale-100 peer-focus:-top-2.5 peer-focus:scale-100 peer-focus:text-purple-500',
  //   title: 'Téléphone',
  // },
  
  civilities = [
    { value: 'Monsieur', label: 'Monsieur' },
    { value: 'Madame', label: 'Madame' },
    { value: 'Mademoiselle', label: 'Mademoiselle' },
  ];

  civilityField = {
    id: 'civility',
    classSelect:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel:
      'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'Civilité',
  };


}
