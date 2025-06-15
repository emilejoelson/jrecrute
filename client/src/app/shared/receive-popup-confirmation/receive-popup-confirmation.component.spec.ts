import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivePopupConfirmationComponent } from './receive-popup-confirmation.component';

describe('ReceivePopupConfirmationComponent', () => {
  let component: ReceivePopupConfirmationComponent;
  let fixture: ComponentFixture<ReceivePopupConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivePopupConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivePopupConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
