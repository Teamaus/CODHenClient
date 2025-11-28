import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCardListComponent } from './stock-card-list.component';

describe('StockCardListComponent', () => {
  let component: StockCardListComponent;
  let fixture: ComponentFixture<StockCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
