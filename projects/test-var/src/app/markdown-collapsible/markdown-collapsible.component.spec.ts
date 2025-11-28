import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownCollapsibleComponent } from './markdown-collapsible.component';

describe('MarkdownCollapsibleComponent', () => {
  let component: MarkdownCollapsibleComponent;
  let fixture: ComponentFixture<MarkdownCollapsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownCollapsibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkdownCollapsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
