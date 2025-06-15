import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleGeneralConditionComponent } from './sale-general-condition.component';

describe('SaleGeneralConditionComponent', () => {
  let component: SaleGeneralConditionComponent;
  let fixture: ComponentFixture<SaleGeneralConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleGeneralConditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleGeneralConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
