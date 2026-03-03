import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAutoPopupComponent } from './select-auto-popup.component';

describe('SelectAutoPopupComponent', () => {
  let component: SelectAutoPopupComponent;
  let fixture: ComponentFixture<SelectAutoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAutoPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAutoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
