import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flying-plus',
  standalone: true,
  templateUrl: 'flying-plus.component.html',
  styleUrl: 'flying-plus.component.scss',
})
export class FlyingPlusComponent {
  @Input({ required: true }) type!: 'normal' | 'gradiant';
}
