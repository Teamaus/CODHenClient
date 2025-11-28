import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternsMdOrangeComponent } from './patterns-md-orange.component';

describe('PatternsMdOrangeComponent', () => {
  let component: PatternsMdOrangeComponent;
  let fixture: ComponentFixture<PatternsMdOrangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternsMdOrangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatternsMdOrangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
