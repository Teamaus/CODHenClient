import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEcComponent } from './test-ec.component';

describe('TestEcComponent', () => {
  let component: TestEcComponent;
  let fixture: ComponentFixture<TestEcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestEcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestEcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
