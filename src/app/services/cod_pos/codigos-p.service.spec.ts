import { TestBed } from '@angular/core/testing';

import { CodigosPService } from './codigos-p.service';

describe('CodigosPService', () => {
  let service: CodigosPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodigosPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
