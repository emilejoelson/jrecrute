import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitementTableComponent } from './recruitement-table.component';

describe('RecruitementTableComponent', () => {
  let component: RecruitementTableComponent;
  let fixture: ComponentFixture<RecruitementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitementTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
