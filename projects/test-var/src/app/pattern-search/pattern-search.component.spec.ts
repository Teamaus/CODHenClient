import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternSearchComponent } from './pattern-search.component';

describe('PatternSearchComponent', () => {
  let component: PatternSearchComponent;
  let fixture: ComponentFixture<PatternSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatternSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
