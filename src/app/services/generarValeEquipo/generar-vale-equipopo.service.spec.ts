import { TestBed } from '@angular/core/testing';

import { GenerarValeEquipopoService } from './generar-vale-equipopo.service';

describe('GenerarValeEquipopoService', () => {
  let service: GenerarValeEquipopoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerarValeEquipopoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
