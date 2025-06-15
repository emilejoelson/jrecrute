import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../../../../state/root.state';
import { selectSubscribeError, selectSubscribeLoading, selectSubscribeResponse, selectSubscribeSuccess } from '../../../../../newsletter/data-access/store/selectors/newsletter.selectors';
import { NewsletterActions } from '../../../../../newsletter/data-access/store/actions/newsletter.actions';

@Component({
  selector: 'app-newsletter-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TranslateModule],
  templateUrl: './newsletter-home.component.html',
  styleUrls: ['./newsletter-home.component.scss'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition('void => *', [
        animate('0.6s ease-out')
      ])
    ]),
    trigger('pulse', [
      state('default', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.05)' })),
      transition('default <=> hover', animate('300ms ease-in-out'))
    ]),
    trigger('slideIn', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(-30px)'
      })),
      transition('void => *', [
        animate('0.5s 0.2s ease-out')
      ])
    ])
  ]
})
export class NewsletterHomeComponent implements OnInit {
  newsletterForm: FormGroup;
  newsletterLoading$: Observable<boolean>;
  newsletterSuccess$: Observable<boolean>;
  newsletterError$: Observable<any>;
  newsletterMessage$: Observable<any>;

  isSubmitting = false;
  isSuccess = false;
  buttonState = 'default';
  
  constructor(private fb: FormBuilder,private store : Store<State>) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

        this.newsletterLoading$ = this.store.select(selectSubscribeLoading);
        this.newsletterSuccess$ = this.store.select(selectSubscribeSuccess);
        this.newsletterError$ = this.store.select(selectSubscribeError);
        this.newsletterMessage$ = this.store.select(selectSubscribeResponse);
    
  }

  ngOnInit() {
    // Initialize any additional component logic here
  }

  onSubmit() {
    if (this.newsletterForm.valid) {
      const request = {
        email: this.newsletterForm.value.email,
      };
      this.store.dispatch(NewsletterActions.subscribe({ request }));
    } else {
      this.newsletterForm.markAllAsTouched();
    }
  }
  resetNewsletterForm(): void {
    this.newsletterForm.reset();
    this.store.dispatch(NewsletterActions.resetSubscribeStatus());
  }
  
  onMouseEnter(): void {
    this.buttonState = 'hover';
  }

  onMouseLeave(): void {
    this.buttonState = 'default';
  }
}