import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterStatComponent } from './newsletter-stat.component';

describe('NewsletterStatComponent', () => {
  let component: NewsletterStatComponent;
  let fixture: ComponentFixture<NewsletterStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
