import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManipulationComponent } from './list-manipulation.component';

describe('ListManipulationComponent', () => {
  let component: ListManipulationComponent;
  let fixture: ComponentFixture<ListManipulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListManipulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
