import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
})
export class CustomInputComponent implements OnInit {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) classInput: string = '';
  @Input({ required: true }) classLabel: string = '';
  @Input({ required: true }) title: string = '';

  @Input() control?: AbstractControl | null;

  constructor(@Optional() private controlContainer: ControlContainer) {}

  ngOnInit() {
    if (this.controlContainer) {
      this.control = this.controlContainer.control?.get(this.id);
    }
  }
}
