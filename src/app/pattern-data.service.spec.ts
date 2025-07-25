import { TestBed } from '@angular/core/testing';

import { PatternDataService } from './pattern-data.service';

describe('PatternDataService', () => {
  let service: PatternDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatternDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
