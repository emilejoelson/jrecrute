import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CustomSelectComponent } from '../ui/custom-select/custom-select.component';
import { CustomTextAreaComponent } from '../ui/custom-text-area/custom-text-area.component';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-three',
  imports: [
    CustomSelectComponent,
    CustomTextAreaComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss',
})
export class StepThreeComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() selectedFile: File | null = null;
  @Input() previewUrl: SafeResourceUrl | null = null;
  @Input() previewType: string = '';

  @Output() prev = new EventEmitter<void>();
  @Output() validate = new EventEmitter<void>();

  onPrevClick() {
    this.prev.emit();
  }

  onValidateClick() {
    this.validate.emit();
  }

  ngOnInit() {
    this.initilizeFormation();
  }

  get formation(): FormGroup {
    return this.formGroup.get('formation') as FormGroup;
  }

  get languagesFormArray(): FormArray {
    return this.formation.get('languages') as FormArray;
  }

  get currentLanguages(): FormGroup {
    return this.languagesFormArray.at(0) as FormGroup;
  }

  private initilizeFormation() {
    const formation = this.formation;
    if (formation) {
      const levelControl = formation.get('level');
      if (!levelControl?.value) {
        formation.patchValue({
          level: levelControl?.value || '',
        });
      }
    }
  }

  trainings = [
    { value: '<Bac', label: '<Bac' },
    { value: 'Bac', label: 'Bac' },
    { value: 'Bac+1', label: 'Bac+1' },
    { value: 'Bac+2', label: 'Bac+2' },
    { value: 'Bac+3', label: 'Bac+3' },
    { value: 'Bac+4', label: 'Bac+4' },
    { value: 'Bac+5', label: 'Bac+5' },
    { value: 'Bac+6 et plus', label: 'Bac+6 et plus' },
  ];

  trainingField = {
    id: 'level',
    classSelect:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'Niveau de formation',
  };

  languages = [
    { value: 'Français', label: 'Français' },
    { value: 'Français', label: 'Anglais' },
  ];

  languageFieldOne = {
    id: 'languageone',
    classSelect:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: '1ère langue',
  };

  languageFieldTwo = {
    id: 'languagetwo',
    classSelect:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: '2ème langue',
  };

  levelLanguage = [
    { value: 'Avancé', label: 'Avancé' },
    { value: 'Courant', label: 'Courant' },
    { value: 'Très bien', label: 'Très bien' },
    { value: 'Intermédiaire', label: 'Intermédiaire' },
    { value: 'Bien', label: 'Bien' },
    { value: 'Faible', label: 'Faible' },
  ];

  levelField01 = {
    id: 'levelone',
    classSelect:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'Niveau 1ère langue',
  };
  levelField02 = {
    id: 'leveltwo',
    classSelect:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'Niveau 2ème langue',
  };

  motivation = {
    id: 'motivation',
    classTextarea:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'Votre motivation',
    rows: 5,
  };
}
