import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPopupConfirmationComponent } from './subscription-popup-confirmation.component';

describe('SubscriptionPopupConfirmationComponent', () => {
  let component: SubscriptionPopupConfirmationComponent;
  let fixture: ComponentFixture<SubscriptionPopupConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionPopupConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionPopupConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
