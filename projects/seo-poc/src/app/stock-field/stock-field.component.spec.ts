import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockFieldComponent } from './stock-field.component';

describe('StockFieldComponent', () => {
  let component: StockFieldComponent;
  let fixture: ComponentFixture<StockFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
