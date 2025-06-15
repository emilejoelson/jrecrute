import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterListComponent } from './newsletter-list.component';

describe('NewsletterListComponent', () => {
  let component: NewsletterListComponent;
  let fixture: ComponentFixture<NewsletterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
