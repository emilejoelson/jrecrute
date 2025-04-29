import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomInputComponent } from '../../features/cv-deposit/pages/deposit-cv/ui/steps/ui/custom-input/custom-input.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CustomInputComponent,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSubmitting = false;
  isSuccess = false;
  passwordVisibility = false;
  loginError: string | null = null;
  commonInputClass =
    'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none';
  commonLabelClass = 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1';

  formFields = {
    accountInfo: [
      {
        id: 'email',
        type: 'email',
        title: 'Adresse email',
        classControl: this.commonInputClass,
        classLabel: this.commonLabelClass,
        placeholder: 'votre.email@exemple.com',
      },
      {
        id: 'password',
        type: 'password',
        title: 'Mot de passe',
        classControl: this.commonInputClass,
        classLabel: this.commonLabelClass,
        placeholder: 'Entrez votre mot de passe',
      },
    ],
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.initForm();
  }

  onSignup() {
    this.router.navigate(['/inscription']);
    window.scrollTo(0, 0);
  }
  initForm(): void {
    const formConfig: { [key: string]: any } = {};

    this.formFields.accountInfo.forEach((field) => {
      const validators = [Validators.required];

      if (field.id === 'email') {
        validators.push(Validators.email);
      }

      formConfig[field.id] = ['', validators];
    });

    this.loginForm = this.fb.group(formConfig);
  }

  togglePasswordVisibility(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.loginError = null;

      // Simulate API call
      setTimeout(() => {
        const email = this.loginForm.get('email')?.value;

        // For demo purposes - show error for specific email
        if (email === 'error@example.com') {
          this.isSubmitting = false;
          this.loginError = 'Identifiants incorrects. Veuillez réessayer.';
          return;
        }

        this.isSubmitting = false;
        this.isSuccess = true;

        // Redirect after successful login
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      }, 1500);
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  forgotPassword(): void {
    this.router.navigate(['/reset-password']);
  }
}
