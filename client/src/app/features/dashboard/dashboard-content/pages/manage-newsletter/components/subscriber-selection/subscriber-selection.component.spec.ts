import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberSelectionComponent } from './subscriber-selection.component';

describe('SubscriberSelectionComponent', () => {
  let component: SubscriberSelectionComponent;
  let fixture: ComponentFixture<SubscriberSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriberSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriberSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
