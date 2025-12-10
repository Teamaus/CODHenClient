import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSentenceComponent } from './stock-sentence.component';

describe('StockSentenceComponent', () => {
  let component: StockSentenceComponent;
  let fixture: ComponentFixture<StockSentenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockSentenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockSentenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
