import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FileUploadEvent } from '../../../../data-access/models/file-upload';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-upload-cv',
  standalone:true,
  imports:[ReactiveFormsModule],
  templateUrl: './upload-cv.component.html',
  styleUrl: './upload-cv.component.scss'
})
export class UploadCvComponent {
  @Input() formGroup!: FormGroup;
  @Output() fileSelected = new EventEmitter<FileUploadEvent>();

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      console.log('Selected file in child component:', file); // Debugging here
      this.fileSelected.emit({ file });
    }
  }
  
    
}
