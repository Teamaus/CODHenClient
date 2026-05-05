import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodcodaIdsComponent } from './codcoda-ids.component';

describe('CodcodaIdsComponent', () => {
  let component: CodcodaIdsComponent;
  let fixture: ComponentFixture<CodcodaIdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodcodaIdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodcodaIdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
