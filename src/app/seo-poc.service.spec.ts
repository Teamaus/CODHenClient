import { TestBed } from '@angular/core/testing';

import { SeoPocService } from './seo-poc.service';

describe('SeoPocService', () => {
  let service: SeoPocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoPocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
