import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterEmptyStateComponent } from './newsletter-empty-state.component';

describe('NewsletterEmptyStateComponent', () => {
  let component: NewsletterEmptyStateComponent;
  let fixture: ComponentFixture<NewsletterEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterEmptyStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
