import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferSectionComponent } from './job-offer-section.component';

describe('JobOfferSectionComponent', () => {
  let component: JobOfferSectionComponent;
  let fixture: ComponentFixture<JobOfferSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOfferSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobOfferSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
