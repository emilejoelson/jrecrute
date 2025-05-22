import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterItemComponent } from './newsletter-item.component';

describe('NewsletterItemComponent', () => {
  let component: NewsletterItemComponent;
  let fixture: ComponentFixture<NewsletterItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
