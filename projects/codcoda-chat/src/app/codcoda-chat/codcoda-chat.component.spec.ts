import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodcodaChatComponent } from './codcoda-chat.component';

describe('CodcodaChatComponent', () => {
  let component: CodcodaChatComponent;
  let fixture: ComponentFixture<CodcodaChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodcodaChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodcodaChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
