import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFromListComponent } from './filter-from-list.component';

describe('FilterFromListComponent', () => {
  let component: FilterFromListComponent;
  let fixture: ComponentFixture<FilterFromListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterFromListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterFromListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
