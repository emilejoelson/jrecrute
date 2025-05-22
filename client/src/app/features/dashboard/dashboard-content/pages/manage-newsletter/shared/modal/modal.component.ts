// modal.component.ts
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, AfterViewInit {
  @Input() title: string = '';
  @Input() primaryButtonText: string = 'Confirm';
  @Input() secondaryButtonText: string = 'Cancel';
  @Input() showFooter: boolean = true;
  @Input() closeOnBackdropClick: boolean = true;

  @Output() close = new EventEmitter<void>();
  @Output() primaryAction = new EventEmitter<void>();
  @Output() secondaryAction = new EventEmitter<void>();

  @ViewChild('modalContent') modalContent!: ElementRef;
  @ViewChild('modalBody') modalBody!: ElementRef;

  ngOnInit(): void {}
  
  ngAfterViewInit(): void {
    // Ensure the modal starts at the top when it's shown
    if (this.modalBody) {
      this.modalBody.nativeElement.scrollTop = 0;
    }
  }

  onBackdropClick(event: MouseEvent) {
    if (
      this.closeOnBackdropClick &&
      this.modalContent &&
      !this.modalContent.nativeElement.contains(event.target)
    ) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  onPrimaryClick(): void {
    this.primaryAction.emit();
  }

  onSecondaryClick(): void {
    this.secondaryAction.emit();
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
  
  // New method to scroll the modal body to top
  scrollToTop(): void {
    if (this.modalBody) {
      this.modalBody.nativeElement.scrollTop = 0;
    }
  }
}