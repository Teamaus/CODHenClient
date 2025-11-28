import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodcodaSideBarComponent } from './codcoda-side-bar.component';

describe('CodcodaSideBarComponent', () => {
  let component: CodcodaSideBarComponent;
  let fixture: ComponentFixture<CodcodaSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodcodaSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodcodaSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
