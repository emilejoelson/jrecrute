import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientSelectionModalComponent } from './recipient-selection-modal.component';

describe('RecipientSelectionModalComponent', () => {
  let component: RecipientSelectionModalComponent;
  let fixture: ComponentFixture<RecipientSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipientSelectionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipientSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
