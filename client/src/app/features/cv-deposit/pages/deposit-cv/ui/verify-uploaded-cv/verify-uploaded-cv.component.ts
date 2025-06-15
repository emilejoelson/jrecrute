import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-verify-uploaded-cv',
  templateUrl: './verify-uploaded-cv.component.html',
  styleUrls: ['./verify-uploaded-cv.component.scss'],
})
export class VerifyUploadedCvComponent implements OnInit, OnDestroy {
  @Input() selectedFile: File | null = null;
  @Input() previewUrl: SafeResourceUrl | null = null;
  @Input() previewType: string = '';
  @Input({ required: true }) nameFile: string = '';
  @Output() reupload = new EventEmitter<void>();
  @Output() proceed = new EventEmitter<void>();

  isMobile: WritableSignal<boolean> = signal(window.innerWidth < 650);

  private handleResize = () => {
    this.isMobile.set(window.innerWidth < 650);
    console.log('Is Mobile:', this.isMobile());
  };

  ngOnInit() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }

  onReuploadClick() {
    this.reupload.emit();
  }

  onProceedClick() {
    this.proceed.emit();
  }
}
