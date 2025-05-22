import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNewsletterComponent } from './manage-newsletter.component';

describe('ManageNewsletterComponent', () => {
  let component: ManageNewsletterComponent;
  let fixture: ComponentFixture<ManageNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageNewsletterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
