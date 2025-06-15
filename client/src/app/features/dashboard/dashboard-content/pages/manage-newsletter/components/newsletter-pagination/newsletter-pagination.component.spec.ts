import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterPaginationComponent } from './newsletter-pagination.component';

describe('NewsletterPaginationComponent', () => {
  let component: NewsletterPaginationComponent;
  let fixture: ComponentFixture<NewsletterPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
