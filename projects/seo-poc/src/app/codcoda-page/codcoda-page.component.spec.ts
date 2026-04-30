import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodcodaPageComponent } from './codcoda-page.component';

describe('CodcodaPageComponent', () => {
  let component: CodcodaPageComponent;
  let fixture: ComponentFixture<CodcodaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodcodaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodcodaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
