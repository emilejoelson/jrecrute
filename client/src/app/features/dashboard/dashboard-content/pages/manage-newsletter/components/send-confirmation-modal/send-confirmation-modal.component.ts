import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IconComponent } from '../../../../../../../shared/ui/icon/icon.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-send-confirmation-modal',
  imports: [IconComponent,ModalComponent,CommonModule],
  templateUrl: './send-confirmation-modal.component.html',
  styleUrl: './send-confirmation-modal.component.scss'
})
export class SendConfirmationModalComponent {
  @Input() show = false;
  @Input() recipientTypeText = '';
  @Input() isLoading$: Observable<boolean> | null = null;
  
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
}
