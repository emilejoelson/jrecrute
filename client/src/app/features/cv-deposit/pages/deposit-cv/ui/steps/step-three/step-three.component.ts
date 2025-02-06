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
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    TranslateModule,
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
  translate = inject(TranslateService);

  readonly MAX_LANGUAGES = 5;
  readonly MIN_LANGUAGES = 1;

  languages = [
    { value: 'Français', label: 'CV_DEPOSIT.STEP_3.LANGUAGES.0' },
    { value: 'Anglais', label: 'CV_DEPOSIT.STEP_3.LANGUAGES.1' },
    { value: 'Allemand', label: 'CV_DEPOSIT.STEP_3.LANGUAGES.2' },
    { value: 'Espagnol', label: 'CV_DEPOSIT.STEP_3.LANGUAGES.3' },
    { value: 'Arabe', label: 'CV_DEPOSIT.STEP_3.LANGUAGES.4' },
  ];

  readonly levelLanguage = [
    { value: 'Avancé', label: 'CV_DEPOSIT.STEP_3.LEVEL_LANGUAGE.0' },
    { value: 'Courant', label: 'CV_DEPOSIT.STEP_3.LEVEL_LANGUAGE.1' },
    { value: 'Très bien', label: 'CV_DEPOSIT.STEP_3.LEVEL_LANGUAGE.2' },
    { value: 'Intermédiaire', label: 'CV_DEPOSIT.STEP_3.LEVEL_LANGUAGE.3' },
    { value: 'Bien', label: 'CV_DEPOSIT.STEP_3.LEVEL_LANGUAGE.4' },
    { value: 'Faible', label: 'CV_DEPOSIT.STEP_3.LEVEL_LANGUAGE.5' },
  ];

  readonly trainings = [
    { value: '<Bac', label: 'CV_DEPOSIT.STEP_3.EDUCATION_OPTIONS.0' },
    { value: 'Bac', label: 'CV_DEPOSIT.STEP_3.EDUCATION_OPTIONS.1' },
    { value: 'Bac+1', label: 'CV_DEPOSIT.STEP_3.EDUCATION_OPTIONS.2' },
    { value: 'Bac+2', label: 'CV_DEPOSIT.STEP_3.EDUCATION_OPTIONS.3' },
    { value: 'Bac+3', label: 'CV_DEPOSIT.STEP_3.EDUCATION_OPTIONS.4' },
    { value: 'Bac+4', label: 'CV_DEPOSIT.STEP_3.EDUCATION_OPTIONS.5' },
    { value: 'Bac+5', label: 'CV_DEPOSIT.STEP_3.EDUCATION_OPTIONS.6' },
    { value: 'Bac+6 et plus', label: 'CV_DEPOSIT.STEP_3.EDUCATION_OPTIONS.7' },
  ];

  trainingField = {
    id: 'level',
    classSelect:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'CV_DEPOSIT.STEP_3.EDUCATION_LEVEL',
  };

  motivation = {
    id: 'motivation',
    classTextarea:
      'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
    classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
    title: 'CV_DEPOSIT.STEP_3.MOTIVATION',
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
    const ordinalSuffix = this.getOrdinalSuffix(index + 1);
    
    if (type === 'language') {
      return {
        id: type,
        classSelect: 'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
        classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
        title: `${index + 1}${ordinalSuffix} ${this.translate.instant('CV_DEPOSIT.STEP_3.VOCABULARY.LANGUAGE')}`
      };
    } else {
      return {
        id: type,
        classSelect: 'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none',
        classLabel: 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1',
        title: `${this.translate.instant('CV_DEPOSIT.STEP_3.VOCABULARY.LEVEL')} ${index + 1}${ordinalSuffix} ${this.translate.instant('CV_DEPOSIT.STEP_3.VOCABULARY.LANGUAGE')}`
      };
    }
  }

  private getOrdinalSuffix(num: number): string {
    const currentLang = this.translate.currentLang;
    
    if (currentLang === 'FR') {
      return num === 1
        ? this.translate.instant('CV_DEPOSIT.STEP_3.VOCABULARY.ORDINAL.FIRST')
        : this.translate.instant('CV_DEPOSIT.STEP_3.VOCABULARY.ORDINAL.OTHER');
    } else {
      
      if (num >= 11 && num <= 13) {
        return this.translate.instant('CV_DEPOSIT.STEP_3.VOCABULARY.ORDINAL.OTHER');
      }
      
      const lastDigit = num % 10;
      switch (lastDigit) {
        case 1:
          return this.translate.instant('CV_DEPOSIT.STEP_3.VOCABULARY.ORDINAL.FIRST');
        case 2:
          return this.translate.instant('CV_DEPOSIT.STEP_3.VOCABULARY.ORDINAL.SECOND');
        case 3:
          return this.translate.instant('CV_DEPOSIT.STEP_3.VOCABULARY.ORDINAL.THIRD');
        default:
          return this.translate.instant('CV_DEPOSIT.STEP_3.VOCABULARY.ORDINAL.OTHER');
      }
    }
  }

  onPrevClick() {
    this.prev.emit();
  }

  onValidateClick() {
    this.validate.emit();
  }
  // https://claude.ai/chat/055de2f1-758f-446a-8845-82783ad99e41
}
