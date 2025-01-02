import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUploadedCvComponent } from './verify-uploaded-cv.component';

describe('VerifyUploadedCvComponent', () => {
  let component: VerifyUploadedCvComponent;
  let fixture: ComponentFixture<VerifyUploadedCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyUploadedCvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyUploadedCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
