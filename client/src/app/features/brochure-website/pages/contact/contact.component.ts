import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ContactFormStepOneComponentComponent } from './ui/contact-form-step-one-component/contact-form-step-one-component.component';
import { ContactFormStepTwoComponentComponent } from './ui/contact-form-step-two-component/contact-form-step-two-component.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service, RecaptchaV3Module } from 'ng-recaptcha';
import { Subscription } from 'rxjs';
import { TField } from '../../../../common/model/field';

type TStep = 'stepOne' | 'stepTwo' | 'thankyou';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ContactFormStepOneComponentComponent,
    ContactFormStepTwoComponentComponent,
    RecaptchaV3Module,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit, OnDestroy {
  currentStep: TStep = 'stepOne';
  formBuilder = inject(FormBuilder);
  recaptchaV3Service = inject(ReCaptchaV3Service);
  contactForm!: FormGroup;
  private recaptchaV3Subscription?: Subscription;

  fieldsData: { stepTwoFields: TField[]; stepOneFields: TField[] } = {
    stepOneFields: [
      {
        label: 'Adresse e-mail',
        isRequired: true,
        type: 'email',
        name: 'email',
        id: 'email',
        formControlName: 'emailField',
        validators: [Validators.required, Validators.email],
        errorMessage: 'Veuillez saisir une adresse e-mail valide',
      },
      {
        label: 'Pays/région',
        isRequired: false,
        type: 'text',
        name: 'country',
        id: 'country',
        formControlName: 'countryField',
        validators: [],
        errorMessage: null,
      },
    ],
    stepTwoFields: [
      {
        label: 'Prénom',
        isRequired: true,
        type: 'text',
        name: 'f-name',
        id: 'f-name',
        formControlName: 'fNameField',
        validators: [Validators.required],
        errorMessage: 'Veuillez saisir votre prénom.',
      },

      {
        label: 'Nom',
        isRequired: true,
        type: 'text',
        name: 'l-name',
        id: 'l-name',
        formControlName: 'lNameField',
        validators: [Validators.required],
        errorMessage: 'Veuillez saisir votre nom.',
      },

      {
        label: 'N° de Téléphone',
        isRequired: true,
        type: 'tel',
        name: 'phone',
        id: 'phone',
        formControlName: 'phoneField',
        validators: [Validators.required, Validators.pattern(/^\d+$/)],
        errorMessage: 'Veuillez saisir un N° de téléphone valid.',
      },

      {
        label: 'Nom de l’entreprise',
        isRequired: false,
        type: 'text',
        name: 'website',
        id: 'website',
        formControlName: 'websiteField',
        validators: [],
        errorMessage: null,
      },

      {
        label: 'Quelque chose à ajouter ?',
        isRequired: true,
        type: 'textArea',
        name: 'message',
        id: 'message',
        formControlName: 'messageField',
        validators: [Validators.required],
        errorMessage: 'Veuillez ajouter un message.',
      },
    ],
  };

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      stepOneInfo: null,
      stepTwoInfo: null,
    });
  }

  changeStep(currentStep: TStep, direction: 'next' | 'back'): void {
    switch (currentStep) {
      case 'stepOne':
        if (direction === 'next') {
          this.currentStep = 'stepTwo';
        }
        break;
      case 'stepTwo':
        if (direction === 'next') {
          this.currentStep = 'thankyou';
        } else if (direction === 'back') {
          this.currentStep = 'stepOne';
        }
        break;
    }
  }

  subSubmit(name: 'stepOneInfo' | 'stepTwoInfo', group: FormGroup) {
    this.contactForm.setControl(name, group);
  }

  onSubmit() {
    console.log(this.contactForm.value);

    this.recaptchaV3Subscription = this.recaptchaV3Service
      .execute('newsletterSubscribe')
      .subscribe((token) => {
        console.log(`Token [${token}] generated`);
      });
  }

  ngOnDestroy(): void {
    if (this.recaptchaV3Subscription) {
      this.recaptchaV3Subscription.unsubscribe();
    }
  }
}
