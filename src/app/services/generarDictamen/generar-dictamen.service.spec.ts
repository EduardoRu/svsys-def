import { TestBed } from '@angular/core/testing';

import { GenerarDictamenService } from './generar-dictamen.service';

describe('GenerarDictamenService', () => {
  let service: GenerarDictamenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerarDictamenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
