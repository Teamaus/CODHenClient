import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodcodaButtonComponent } from './codcoda-button.component';

describe('CodcodaButtonComponent', () => {
  let component: CodcodaButtonComponent;
  let fixture: ComponentFixture<CodcodaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodcodaButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodcodaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
