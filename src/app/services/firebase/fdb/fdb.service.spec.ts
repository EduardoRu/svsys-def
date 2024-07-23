import { TestBed } from '@angular/core/testing';

import { FdbService } from './fdb.service';

describe('FdbService', () => {
  let service: FdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
