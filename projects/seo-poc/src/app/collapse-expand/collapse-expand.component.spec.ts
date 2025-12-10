import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseExpandComponent } from './collapse-expand.component';

describe('CollapseExpandComponent', () => {
  let component: CollapseExpandComponent;
  let fixture: ComponentFixture<CollapseExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapseExpandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollapseExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
