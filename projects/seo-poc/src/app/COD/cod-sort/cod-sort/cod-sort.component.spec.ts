import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodSortComponent } from './cod-sort.component';

describe('CodSortComponent', () => {
  let component: CodSortComponent;
  let fixture: ComponentFixture<CodSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodSortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
