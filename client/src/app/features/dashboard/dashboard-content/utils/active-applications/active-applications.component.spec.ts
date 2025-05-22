import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveApplicationsComponent } from './active-applications.component';

describe('ActiveApplicationsComponent', () => {
  let component: ActiveApplicationsComponent;
  let fixture: ComponentFixture<ActiveApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
