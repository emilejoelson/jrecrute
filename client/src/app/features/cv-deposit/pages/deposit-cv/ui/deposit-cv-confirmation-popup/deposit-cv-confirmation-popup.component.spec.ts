import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositCvConfirmationPopupComponent } from './deposit-cv-confirmation-popup.component';

describe('DepositCvConfirmationPopupComponent', () => {
  let component: DepositCvConfirmationPopupComponent;
  let fixture: ComponentFixture<DepositCvConfirmationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositCvConfirmationPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositCvConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
