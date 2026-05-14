import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodcodaAboutComponent } from './codcoda-about.component';

describe('CodcodaAboutComponent', () => {
  let component: CodcodaAboutComponent;
  let fixture: ComponentFixture<CodcodaAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodcodaAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodcodaAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
