import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentPopupConfirmationComponent } from './recruitment-popup-confirmation.component';

describe('RecruitmentPopupConfirmationComponent', () => {
  let component: RecruitmentPopupConfirmationComponent;
  let fixture: ComponentFixture<RecruitmentPopupConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitmentPopupConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitmentPopupConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
