import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurJobOfferScrollComponent } from './our-job-offer-scroll.component';

describe('OurJobOfferScrollComponent', () => {
  let component: OurJobOfferScrollComponent;
  let fixture: ComponentFixture<OurJobOfferScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurJobOfferScrollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurJobOfferScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
