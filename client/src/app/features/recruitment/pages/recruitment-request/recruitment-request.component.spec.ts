import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentRequestComponent } from './recruitment-request.component';

describe('RecruitmentRequestComponent', () => {
  let component: RecruitmentRequestComponent;
  let fixture: ComponentFixture<RecruitmentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitmentRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
