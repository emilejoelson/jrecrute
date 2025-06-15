import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubscriberComponent } from './manage-subscriber.component';

describe('ManageSubscriberComponent', () => {
  let component: ManageSubscriberComponent;
  let fixture: ComponentFixture<ManageSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSubscriberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
