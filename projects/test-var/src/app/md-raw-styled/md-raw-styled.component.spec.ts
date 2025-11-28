import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdRawStyledComponent } from './md-raw-styled.component';

describe('MdRawStyledComponent', () => {
  let component: MdRawStyledComponent;
  let fixture: ComponentFixture<MdRawStyledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdRawStyledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdRawStyledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
