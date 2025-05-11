import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomInputComponent } from '../../features/cv-deposit/pages/deposit-cv/ui/steps/ui/custom-input/custom-input.component';
import { Store } from '@ngrx/store';
import { State } from '../../state/root.state';
import {
  selectIsChangingPassword,
  selectPasswordChangeError,
  selectPasswordChangeSuccess,
} from '../../authentication/data-access/store/selectors/auth.selectors';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthActions } from '../../authentication/data-access/store/actions/auth.actions';
import { ChangePasswordPayload } from '../../authentication/data-access/models/auth.response';

interface InputConfig {
  id: string;
  type: string;
  title: string;
  classControl: string;
  classLabel: string;
}

@Component({
  selector: 'app-change-password-popup',
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CustomInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './change-password-popup.component.html',
  styleUrl: './change-password-popup.component.scss',
})
export class ChangePasswordPopupComponent implements OnInit, OnDestroy {
  @Input() isVisible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  passwordForm!: FormGroup;
  passwordVisibility = false;

  fb = inject(FormBuilder);
  store = inject(Store<State>);

  isChangingPassword$ = this.store.select(selectIsChangingPassword);
  passwordChangeSuccess$ = this.store.select(selectPasswordChangeSuccess);
  passwordChangeError$ = this.store.select(selectPasswordChangeError);

  private destroy$ = new Subject<void>();
  private subscription = new Subscription();

  commonInputClass =
    'peer w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:outline-none focus:border-purple-500 appearance-none';
  commonLabelClass = 'left-3 -top-2.5 text-sm text-gray-600 bg-white px-1';

  accountCurrentPassWord: InputConfig = {
    id: 'current_password',
    type: 'current_password',
    title: 'PROFILE.CURRENT_PASSWORD',
    classControl: this.commonInputClass,
    classLabel: this.commonLabelClass,
  };

  accountNewPassword: InputConfig = {
    id: 'new_password',
    type: 'new_password',
    title: 'PROFILE.NEW_PASSWORD',
    classControl: this.commonInputClass,
    classLabel: this.commonLabelClass,
  };

  accountConfirmPassword: InputConfig = {
    id: 'confirm_password',
    type: 'confirm_password',
    title: 'PROFILE.CONFIRM_PASSWORD',
    classControl: this.commonInputClass,
    classLabel: this.commonLabelClass,
  };

  ngOnInit(): void {
    this.initPasswordForm();
    this.setupSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription.unsubscribe();
  }

  setupSubscriptions(): void {
    // Monitor for successful password change
    this.subscription.add(
      this.passwordChangeSuccess$
        .pipe(takeUntil(this.destroy$))
        .subscribe((success) => {
          if (success) {
            this.close();
            this.passwordForm.reset();
            // Reset the password change state after handling the success
            setTimeout(() => {
              this.store.dispatch(AuthActions.resetPasswordState());
            }, 3000);
          }
        })
    );

    // Monitor for password change errors
    this.subscription.add(
      this.passwordChangeError$
        .pipe(takeUntil(this.destroy$))
        .subscribe((error) => {
          if (error) {
            // Handle specific field errors
            if (error.field === 'current_password') {
              this.passwordForm
                .get('current_password')
                ?.setErrors({ serverError: error.message });
            } else if (error.field === 'confirm_password') {
              this.passwordForm
                .get('confirm_password')
                ?.setErrors({ serverError: error.message });
            }
          }
        })
    );
  }

  initPasswordForm(): void {
    this.passwordForm = this.fb.group(
      {
        current_password: ['', Validators.required],
        new_password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('new_password')?.value;
    const confirmPassword = formGroup.get('confirm_password')?.value;

    if (newPassword !== confirmPassword) {
      formGroup.get('confirm_password')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  changePassword() {
    if (this.passwordForm.valid) {
      const payload: ChangePasswordPayload = {
        current_password: this.passwordForm.get('current_password')?.value,
        new_password: this.passwordForm.get('new_password')?.value,
        confirm_password: this.passwordForm.get('confirm_password')?.value,
      };

      this.store.dispatch(AuthActions.changePassword({ payload }));
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility(field: number) {
    this.passwordVisibility = !this.passwordVisibility;
  }

  close() {
    this.visibleChange.emit(false);
    this.store.dispatch(AuthActions.resetPasswordState());
    this.passwordForm.reset();
  }

  // Helper method to check if a field has errors
  hasError(controlName: string, errorName: string): boolean {
    const control = this.passwordForm.get(controlName);
    return (control?.touched && control?.hasError(errorName)) || false;
  }
}
