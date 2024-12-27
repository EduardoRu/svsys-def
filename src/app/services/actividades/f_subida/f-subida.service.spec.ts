import { TestBed } from '@angular/core/testing';

import { FSubidaService } from './f-subida.service';

describe('FSubidaService', () => {
  let service: FSubidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FSubidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
