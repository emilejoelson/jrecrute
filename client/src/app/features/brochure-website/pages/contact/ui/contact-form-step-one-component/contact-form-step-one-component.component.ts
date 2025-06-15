import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  inject,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CountriesSelectorInputComponent } from '../../../../../../common/components/countries-selector-input/countries-selector-input';
import { TField } from '../../../../../../common/model/field';
import { InputComponent } from '../../../../../../common/components/input/input.component';

@Component({
  selector: 'app-contact-form-step-one-component',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    CountriesSelectorInputComponent,
  ],
  templateUrl: './contact-form-step-one-component.component.html',
  styleUrl: './contact-form-step-one-component.component.scss',
})
export class ContactFormStepOneComponentComponent implements OnInit {
  @Input() fieldsData: TField[] = [];
  @Input() oldData: null | { [key: string]: string } = null;
  @Output() changeStep = new EventEmitter();
  @Output() subSubmit = new EventEmitter();

  stepOneFrom!: FormGroup;
  formBuilder = inject(FormBuilder);
  isFormSubmited = false;

  nextStep() {
    this.changeStep.emit();
  }

  ngOnInit(): void {
    this.stepOneFrom = this.generateDynamicForm();
  }

  private generateDynamicForm(): FormGroup {
    const formGroup = this.formBuilder.group({});

    this.fieldsData.forEach((field) => {
      formGroup.addControl(
        field.formControlName,
        this.formBuilder.control(
          this.oldData && this.oldData[field.formControlName]
            ? this.oldData[field.formControlName]
            : '',
          field.validators,
        ),
      );
    });

    return formGroup;
  }

  onSubmit() {
    this.isFormSubmited = true;

    if (this.stepOneFrom.valid) {
      this.subSubmit.emit(this.stepOneFrom);
      this.nextStep();
    }
  }
}
