import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switcher-component',
  standalone: true,
  imports: [],
  templateUrl: './switcher-component.component.html',
  styleUrl: './switcher-component.component.scss',
})
export class SwitcherComponentComponent {
  @Output() selectedEvent = new EventEmitter<string>();
  @Input({ required: true }) switches!: [string, string];
  @Input({ required: true }) selected!: string;

  onSelect(selectedItem: string) {
    this.selectedEvent.emit(selectedItem);
  }
}
