import {
  Component,
  EventEmitter,
  inject,
  Input,
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
import {
  CreateNewsletterContentRequest,
  PublishFrequency,
} from '../../../../../../newsletter/data-access/models/newsletter-content';
import { IconComponent } from '../../../../../../../shared/ui/icon/icon.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CommonModule } from '@angular/common';
import { EditorComponent } from '../../shared/editor/editor.component';

@Component({
  selector: 'app-newsletter-creation-modal',
  imports: [
    IconComponent,
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EditorComponent,
  ],
  templateUrl: './newsletter-creation-modal.component.html',
  styleUrl: './newsletter-creation-modal.component.scss',
})
export class NewsletterCreationModalComponent implements OnInit {
  @Input() isVisible:boolean = false;
  @Input() isLoading:boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<CreateNewsletterContentRequest>();

  private fb = inject(FormBuilder);

  newsletterForm!: FormGroup;
  imageFile: File | null = null;
  imagePreview: string | null = null;

  publishFrequencyOptions: { value: PublishFrequency; label: string }[] = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
  ];

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.newsletterForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      publishFrequency: ['weekly', Validators.required],
      content: ['', Validators.required],
      status: ['draft'],
    });
  }

  onClose(): void {
    this.resetForm();
    this.close.emit();
  }

  onSubmit(): void {
    if (this.newsletterForm.valid) {
      const request: CreateNewsletterContentRequest = {
        title: this.newsletterForm.value.title,
        description: this.newsletterForm.value.description,
        publishFrequency: this.newsletterForm.value.publishFrequency,
        content: this.newsletterForm.value.content,
        status: this.newsletterForm.value.status,
        image: this.imagePreview,
      };

      this.submit.emit(request);
    } else {
      this.markFormGroupTouched();
    }
  }

  onImageChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.imageFile = element.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  removeImage(): void {
    this.imageFile = null;
    this.imagePreview = null;
  }

  onEditorContentChange(content: string): void {
    this.newsletterForm.patchValue({ content });
  }

  private resetForm(): void {
    this.newsletterForm.reset({
      title: '',
      description: '',
      publishFrequency: 'weekly',
      content: '',
      status: 'draft',
    });
    this.imagePreview = null;
    this.imageFile = null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.newsletterForm.controls).forEach((key) => {
      const control = this.newsletterForm.get(key);
      control?.markAsTouched();
    });
  }
}
