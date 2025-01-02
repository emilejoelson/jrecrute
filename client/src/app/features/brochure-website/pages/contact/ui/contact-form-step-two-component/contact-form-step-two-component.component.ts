import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { countriesPhoneCodeData } from '../../../../../../common/components/store/country-phone-code-data';
import { countriesData } from '../../../../../../common/components/store/country-data-store';
import { TField } from '../../../../../../common/model/field';
import { InputComponent } from '../../../../../../common/components/input/input.component';
import { CountriesPhoneCodeSelectorInputComponent } from '../../../../../../common/components/countries-phone-code-selector-input/countries-phone-code-selector-input';

@Component({
  selector: 'app-contact-form-step-two-component',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    CountriesPhoneCodeSelectorInputComponent,
  ],
  templateUrl: './contact-form-step-two-component.component.html',
  styleUrl: './contact-form-step-two-component.component.scss',
})
export class ContactFormStepTwoComponentComponent {
  @Input() fieldsData: TField[] = [];
  @Input() oldData: null | { [key: string]: string } = null;
  @Input() countryNameFromPrevStep: null | string = null;
  @Output() changeStep = new EventEmitter();
  @Output() subSubmit = new EventEmitter();
  @Output() finalSubmit = new EventEmitter();

  countryCodeControle = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\+\d+$/),
  ]);

  countryCodeFieldData = {
    isRequired: true,
    type: 'text',
    name: 'countryCode',
    id: 'countryCode',
    formControlName: this.countryCodeControle,
  };

  stepTwoForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  isFormSubmited = false;

  changeStepHandler(direction: 'next' | 'back') {
    this.changeStep.emit(direction);
  }

  ngOnInit(): void {
    this.stepTwoForm = this.generateDynamicFrom();

    if (this.countryNameFromPrevStep) {
      const countryName = this.countryNameFromPrevStep;

      const country = countriesData.find((c) => c.name === countryName);

      const countryPhoneData = countriesPhoneCodeData.find(
        (c) => c.numeric === country?.numeric,
      );

      this.countryCodeControle.setValue(countryPhoneData?.phoneCode ?? '');
    }

    if (
      !this.countryCodeControle.value &&
      this.oldData &&
      this.oldData['phoneField'] &&
      this.oldData['phoneField'].split('<>').length === 2
    ) {
      this.countryCodeControle.setValue(
        this.oldData['phoneField'].split('<>')[0],
      );
    }
  }

  private generateDynamicFrom(): FormGroup {
    const formGroup = this.formBuilder.group({});

    this.fieldsData.forEach((field) => {
      formGroup.addControl(
        field.formControlName,

        this.formBuilder.control(
          this.oldData && this.oldData[field.formControlName]
            ? field.formControlName === 'phoneField' &&
              this.oldData[field.formControlName].split('<>').length === 2
              ? this.oldData[field.formControlName].split('<>')[1]
              : this.oldData[field.formControlName]
            : '',

          field.validators,
        ),
      );
    });

    return formGroup;
  }

  onBack() {
    const phoneField = this.stepTwoForm.get('phoneField');
    const countryCode = this.countryCodeControle.value;

    if (phoneField && countryCode) {
      phoneField.setValue(
        countryCode.replace('<>', '') +
          '<>' +
          phoneField.value.replace('<>', ''),
      );
    }

    this.subSubmit.emit(this.stepTwoForm);
    this.changeStepHandler('back');
  }

  onSubmit() {
    this.isFormSubmited = true;

    if (this.stepTwoForm.valid && this.countryCodeControle.valid) {
      const phoneField = this.stepTwoForm.get('phoneField');
      const countryCode = this.countryCodeControle.value;

      if (phoneField && countryCode) {
        phoneField.setValue(countryCode + phoneField.value);
      }

      this.changeStepHandler('next');
      this.subSubmit.emit(this.stepTwoForm);
      this.finalSubmit.emit();
    }
  }
}
