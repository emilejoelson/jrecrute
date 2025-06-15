import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterCreationModalComponent } from './newsletter-creation-modal.component';

describe('NewsletterCreationModalComponent', () => {
  let component: NewsletterCreationModalComponent;
  let fixture: ComponentFixture<NewsletterCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterCreationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
