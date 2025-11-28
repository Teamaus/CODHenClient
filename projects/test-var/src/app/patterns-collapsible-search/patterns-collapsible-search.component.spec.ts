import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternsCollapsibleSearchComponent } from './patterns-collapsible-search.component';

describe('PatternsCollapsibleSearchComponent', () => {
  let component: PatternsCollapsibleSearchComponent;
  let fixture: ComponentFixture<PatternsCollapsibleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternsCollapsibleSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatternsCollapsibleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
