import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodcodaCollectionComponent } from './codcoda-collection.component';

describe('CodcodaCollectionComponent', () => {
  let component: CodcodaCollectionComponent;
  let fixture: ComponentFixture<CodcodaCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodcodaCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodcodaCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
