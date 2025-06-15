import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvantageSectionComponent } from './advantage-section.component';

describe('AdvantageSectionComponent', () => {
  let component: AdvantageSectionComponent;
  let fixture: ComponentFixture<AdvantageSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvantageSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvantageSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
