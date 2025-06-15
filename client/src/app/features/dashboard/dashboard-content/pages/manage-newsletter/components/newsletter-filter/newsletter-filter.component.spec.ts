import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterFilterComponent } from './newsletter-filter.component';

describe('NewsletterFilterComponent', () => {
  let component: NewsletterFilterComponent;
  let fixture: ComponentFixture<NewsletterFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
