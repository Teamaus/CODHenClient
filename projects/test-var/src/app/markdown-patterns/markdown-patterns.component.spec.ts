import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownPatternsComponent } from './markdown-patterns.component';

describe('MarkdownPatternsComponent', () => {
  let component: MarkdownPatternsComponent;
  let fixture: ComponentFixture<MarkdownPatternsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownPatternsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkdownPatternsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
