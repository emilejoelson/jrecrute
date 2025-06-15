import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterAnalyticsComponent } from './newsletter-analytics.component';

describe('NewsletterAnalyticsComponent', () => {
  let component: NewsletterAnalyticsComponent;
  let fixture: ComponentFixture<NewsletterAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
