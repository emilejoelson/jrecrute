import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSheetComponent } from './job-sheet.component';

describe('JobSheetComponent', () => {
  let component: JobSheetComponent;
  let fixture: ComponentFixture<JobSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
