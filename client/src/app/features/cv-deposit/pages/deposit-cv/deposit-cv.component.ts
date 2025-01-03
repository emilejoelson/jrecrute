import { Component, OnInit } from '@angular/core';
import { CvIntroComponent } from './ui/cv-intro/cv-intro.component';
import { UploadCvComponent } from './ui/upload-cv/upload-cv.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadEvent } from '../../data-access/models/file-upload';
import { VerifyUploadedCvComponent } from './ui/verify-uploaded-cv/verify-uploaded-cv.component';
import { StepOneComponent } from './ui/steps/step-one/step-one.component';
import { StepTwoComponent } from './ui/steps/step-two/step-two.component';
import { StepThreeComponent } from './ui/steps/step-three/step-three.component';
import { select, Store } from '@ngrx/store';
import { UserFormActions } from '../../store/actions/cv.actions';
import { filter } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit-cv',
  imports: [
    CvIntroComponent,
    UploadCvComponent,
    ReactiveFormsModule,
    VerifyUploadedCvComponent,
    CommonModule,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
  ],
  templateUrl: './deposit-cv.component.html',
  styleUrl: './deposit-cv.component.scss',
})
export class DepositCvComponent implements OnInit {
  mainForm!: FormGroup;
  uploadForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: SafeResourceUrl | null = null;
  previewType: string = '';
  currentStep: number = 1;
  
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForms();
  }

  private initializeForms() {
    this.uploadForm = this.fb.group({
      cvFile: [null, Validators.required],
    });

    this.mainForm = this.fb.group({
      personalInfo: this.fb.group({
        civility: ['M.', Validators.required],
        firstName: ['John', Validators.required],
        lastName: ['Doe', Validators.required],
        email: ['nina@gmail.com', [Validators.required, Validators.email]],
        telephone: ['123456789', Validators.required],
      }),

      professionalInfo: this.fb.group({
        currentPosition: ['Software Engineer', Validators.required],
        yearsOfExperience: ['3+ ans', Validators.required],
        desiredPosition: ['Manager Community', Validators.required],
        enterprise: ['Fitifash', Validators.required],
        hasRemoteExperience: [false],
        experiences: this.fb.array([this.createExperienceFormGroup()]),
      }),

      academicInfo: this.fb.group({
        formation: this.fb.group({
          level: ['M2', Validators.required],
          languages: this.fb.array([this.createLanguageFormGroup()]),
        }),
        motivation: ['sdlflsdfqmsfsdflqm', Validators.required],
      }),
    });
  }

  createLanguageFormGroup(): FormGroup {
    return this.fb.group({
      languageone: ['Anglais', Validators.required],
      levelone: ['Très bien', Validators.required],
      languagetwo: ['Anglais', Validators.required],
      leveltwo: ['Très bien', Validators.required],
    });
  }

  createExperienceFormGroup(): FormGroup {
    return this.fb.group({
      position: ['Java Dévéloppeur', Validators.required],
      company: ['Fitifash', Validators.required],
      startMonth: ['', Validators.required],
      startYear: ['', Validators.required],
      endMonth: ['', Validators.required],
      endYear: ['', Validators.required],
    });
  }

  get personalInfoGroup(): FormGroup {
    return this.mainForm.get('personalInfo') as FormGroup;
  }

  get professionalInfoGroup(): FormGroup {
    return this.mainForm.get('professionalInfo') as FormGroup;
  }

  get academicInfoGroup(): FormGroup {
    return this.mainForm.get('academicInfo') as FormGroup;
  }

  get experiencesFormArray(): FormArray {
    return this.professionalInfoGroup.get('experiences') as FormArray;
  }

  get languagesFormArray(): FormArray {
    return this.academicInfoGroup
      .get('formation')
      ?.get('languages') as FormArray;
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
      window.scrollTo(0, 0);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo(0, 0);
    }
  }

  onFileSelected(event: FileUploadEvent) {
    const file = event.file;
    this.uploadForm.patchValue({ cvFile: file });
    this.uploadForm.get('cvFile')?.updateValueAndValidity();

    if (file) {
      this.selectedFile = file;
      const fileType = file.type;

      if (fileType.startsWith('image/')) {
        this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(file)
        );
        this.previewType = 'image';
      } else if (fileType === 'application/pdf') {
        this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(file)
        );
        this.previewType = 'pdf';
      } else if (
        fileType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        this.previewUrl = '';
        this.previewType = 'word';
      } else {
        this.previewUrl = '';
        this.previewType = 'unknown';
      }
    }
  }

  reuploadFile() {
    this.selectedFile = null;
    this.previewUrl = null;
    this.previewType = 'unknown';
    this.uploadForm.get('cvFile')?.reset();
  }

  onSubmit() {
    if (this.mainForm.valid && this.uploadForm.valid) {
      const formData = new FormData();
      formData.append('cvFile', this.uploadForm.get('cvFile')?.value);

      const payload = {
        ...this.mainForm.value,
      };

      this.store.dispatch(
        UserFormActions.submitUserForm({
          formData,
          userPayload: payload,
        })
      );
    }
  }
}
