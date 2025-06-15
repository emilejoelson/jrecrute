import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterRecipientsComponent } from './newsletter-recipients.component';

describe('NewsletterRecipientsComponent', () => {
  let component: NewsletterRecipientsComponent;
  let fixture: ComponentFixture<NewsletterRecipientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterRecipientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
