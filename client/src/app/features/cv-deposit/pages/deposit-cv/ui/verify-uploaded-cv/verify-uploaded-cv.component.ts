import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
// EventEmitter

@Component({
  selector: 'app-verify-uploaded-cv',
  standalone:true,
  imports: [],
  templateUrl: './verify-uploaded-cv.component.html',
  styleUrl: './verify-uploaded-cv.component.scss'
})
export class VerifyUploadedCvComponent {
  @Input() selectedFile: File | null = null;
  @Input() previewUrl: SafeResourceUrl | null = null;
  @Input() previewType: string = '';
  
  @Output() reupload = new EventEmitter<void>(); 
  @Output() proceed = new EventEmitter<void>();   

  onReuploadClick() {
    this.reupload.emit();  
  }

  onProceedClick() {
    this.proceed.emit();  
  }
}
