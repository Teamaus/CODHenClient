import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSymbolComponent } from './stock-symbol.component';

describe('StockSymbolComponent', () => {
  let component: StockSymbolComponent;
  let fixture: ComponentFixture<StockSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockSymbolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
