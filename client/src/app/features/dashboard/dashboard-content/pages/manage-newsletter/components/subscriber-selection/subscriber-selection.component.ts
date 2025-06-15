import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';
import { IconComponent } from '../../../../../../../shared/ui/icon/icon.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: Date;
  selected: boolean;
}
@Component({
  selector: 'app-subscriber-selection',
  imports: [
    ModalComponent,
    IconComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './subscriber-selection.component.html',
  styleUrl: './subscriber-selection.component.scss',
})
export class SubscriberSelectionComponent implements OnInit, OnDestroy {
  @Input() show = false;
  @Input() subscribers: Subscriber[] = [];
  @Input() loading = false;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<string[]>();
  @Output() loadSubscribers = new EventEmitter<void>();

  searchTerm = '';
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Load subscribers when component initializes and show is true
    if (this.show && this.subscribers.length === 0) {
      this.loadSubscribers.emit();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get filteredSubscribers(): Subscriber[] {
    if (!this.searchTerm) return this.subscribers;
    return this.subscribers.filter((subscriber) =>
      subscriber.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onClose(): void {
    this.searchTerm = '';
    this.close.emit();
  }

  selectAllSubscribers(): void {
    this.filteredSubscribers.forEach(
      (subscriber) => (subscriber.selected = true)
    );
  }

  deselectAllSubscribers(): void {
    this.filteredSubscribers.forEach(
      (subscriber) => (subscriber.selected = false)
    );
  }

  getSelectedSubscribersCount(): number {
    return this.subscribers.filter((subscriber) => subscriber.selected).length;
  }

  onConfirmSelection(): void {
    const selectedSubscriberIds = this.subscribers
      .filter((subscriber) => subscriber.selected)
      .map((subscriber) => subscriber.id);

    this.confirm.emit(selectedSubscriberIds);
  }

  trackBySubscriberId(index: number, subscriber: Subscriber): string {
    return subscriber.id;
  }
}
