import { TestBed } from '@angular/core/testing';

import { ResponseParserService } from './response-parser.service';

describe('ResponseParserService', () => {
  let service: ResponseParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
