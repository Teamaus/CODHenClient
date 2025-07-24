import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternCollectionComponent } from './pattern-collection.component';

describe('PatternCollectionComponent', () => {
  let component: PatternCollectionComponent;
  let fixture: ComponentFixture<PatternCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatternCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
