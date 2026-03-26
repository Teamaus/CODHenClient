import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPubsubComponent } from './test-pubsub.component';

describe('TestPubsubComponent', () => {
  let component: TestPubsubComponent;
  let fixture: ComponentFixture<TestPubsubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPubsubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPubsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
