import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';
import { IconComponent } from '../../../../../../../shared/ui/icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation',
  imports: [ModalComponent,IconComponent,CommonModule],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss',
})
export class DeleteConfirmationComponent {
  @Input() isVisible = false;
  @Input() title = 'Confirm Deletion';
  @Input() message =
    'Are you sure you want to delete this item? This action cannot be undone.';
  @Input() warningMessage =
    'This will permanently delete the item and all related data.';
  @Input() deleteButtonText = 'Delete';
  @Input() cancelButtonText = 'Cancel';
  @Input() isLoading$: Observable<boolean> | null = null;
  @Input() confirmIcon = 'confirmDeletionIcon';
  @Input() warningIcon = 'waringDeletionIcon';
  @Input() loadingIcon = 'deleteLoadingIcon';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
