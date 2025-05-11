import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterHomeComponent } from './newsletter-home.component';

describe('NewsletterHomeComponent', () => {
  let component: NewsletterHomeComponent;
  let fixture: ComponentFixture<NewsletterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
