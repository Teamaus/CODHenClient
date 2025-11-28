import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternsCollapsibleComponent } from './patterns-collapsible.component';

describe('PatternsCollapsibleComponent', () => {
  let component: PatternsCollapsibleComponent;
  let fixture: ComponentFixture<PatternsCollapsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternsCollapsibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatternsCollapsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
