import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownCleanComponent } from './markdown-clean.component';

describe('MarkdownCleanComponent', () => {
  let component: MarkdownCleanComponent;
  let fixture: ComponentFixture<MarkdownCleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownCleanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkdownCleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
