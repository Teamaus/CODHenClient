import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodCheckboxComponent } from './cod-checkbox.component';

describe('CodCheckboxComponent', () => {
  let component: CodCheckboxComponent;
  let fixture: ComponentFixture<CodCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
