import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodDownComponent } from './cod-down.component';

describe('CodDownComponent', () => {
  let component: CodDownComponent;
  let fixture: ComponentFixture<CodDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodDownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
