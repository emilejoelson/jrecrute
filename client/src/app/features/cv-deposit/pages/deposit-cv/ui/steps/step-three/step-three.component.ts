import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CustomSelectComponent } from '../ui/custom-select/custom-select.component';
import { CustomTextAreaComponent } from '../ui/custom-text-area/custom-text-area.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface FieldConfig {
  id: string;
  classSelect: string;
  classLabel: string;
  title: string;
}

interface LanguageForm {
  language: string;
  level: string;
}

interface FormationForm {
  level: string;
  languages: LanguageForm[];
}

interface AcademicForm {
  formation: FormationForm;
  motivation: string;
}

@Component({
  selector: 'app-step-three',
  standalone: true,
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

  fb = inject(FormBuilder);

  readonly MAX_LANGUAGES = 5;
  readonly MIN_LANGUAGES = 1;

  languages = [
    { value: 'Français', label: 'Français' },
    { value: 'Anglais', label: 'Anglais' },
    { value: 'Allemand', label: 'Allemand' },
    { value: 'Espagnol', label: 'Espagnol' },
    { value: 'Arabe', label: 'Arabe' },
  ];

  readonly levelLanguage = [
    { value: 'Avancé', label: 'Avancé' },
    { value: 'Courant', label: 'Courant' },
    { value: 'Très bien', label: 'Très bien' },
    { value: 'Intermédiaire', label: 'Intermédiaire' },
    { value: 'Bien', label: 'Bien' },
    { value: 'Faible', label: 'Faible' },
  ];

  readonly trainings = [
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

  motivation = {
    id: 'motivation',
    classTextarea:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'Votre motivation',
    rows: 5,
  };

  ngOnInit() {
    this.initializeFormation();
  }

  get formation(): FormGroup {
    return this.formGroup.get('formation') as FormGroup;
  }

  get languagesFormArray(): FormArray {
    return this.formation.get('languages') as FormArray;
  }

  getLanguageGroup(index: number): FormGroup {
    return this.languagesFormArray.at(index) as FormGroup;
  }

  private initializeFormation() {
    const formation = this.formGroup.get('formation');
    if (formation) {
      const levelControl = formation.get('level');
      if (!levelControl?.value) {
        formation.patchValue({
          level: this.trainings[0].value,
        });
      }
    }
  }

  addLanguage(): void {
    if (this.languagesFormArray.length < this.MAX_LANGUAGES) {
      this.languagesFormArray.push(this.createLanguageGroup());
    }
  }

  removeLanguage(index: number): void {
    if (this.languagesFormArray.length > this.MIN_LANGUAGES) {
      this.languagesFormArray.removeAt(index);
    }
  }

  private createLanguageGroup(): FormGroup {
    return this.fb.group({
      language: ['', Validators.required],
      level: ['', Validators.required],
    });
  }

  getFieldConfig(index: number, type: 'language' | 'level'): FieldConfig {
    return {
      id: type,
      classSelect:
        'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
      classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
      title:
        type === 'language'
          ? `${index + 1}${this.getOrdinalSuffix(index + 1)} langue`
          : `Niveau ${index + 1}${this.getOrdinalSuffix(index + 1)} langue`,
    };
  }

  private getOrdinalSuffix(num: number): string {
    return num === 1 ? 'ère' : 'ème';
  }

  onPrevClick() {
    this.prev.emit();
  }

  onValidateClick() {
    this.validate.emit();
  }
}
