import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodHeaderComponent } from './cod-header.component';

describe('CodHeaderComponent', () => {
  let component: CodHeaderComponent;
  let fixture: ComponentFixture<CodHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
