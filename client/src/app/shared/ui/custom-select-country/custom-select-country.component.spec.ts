import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectCountryComponent } from './custom-select-country.component';

describe('CustomSelectCountryComponent', () => {
  let component: CustomSelectCountryComponent;
  let fixture: ComponentFixture<CustomSelectCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSelectCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomSelectCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
