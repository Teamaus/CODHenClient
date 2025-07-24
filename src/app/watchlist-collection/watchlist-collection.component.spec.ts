import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistCollectionComponent } from './watchlist-collection.component';

describe('WatchlistCollectionComponent', () => {
  let component: WatchlistCollectionComponent;
  let fixture: ComponentFixture<WatchlistCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
