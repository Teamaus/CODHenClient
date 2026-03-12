import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowGridPopupComponent } from './row-grid-popup.component';

describe('RowGridPopupComponent', () => {
  let component: RowGridPopupComponent;
  let fixture: ComponentFixture<RowGridPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowGridPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowGridPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
