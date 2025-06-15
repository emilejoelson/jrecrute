import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterStatusBadgeComponent } from './newsletter-status-badge.component';

describe('NewsletterStatusBadgeComponent', () => {
  let component: NewsletterStatusBadgeComponent;
  let fixture: ComponentFixture<NewsletterStatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterStatusBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
