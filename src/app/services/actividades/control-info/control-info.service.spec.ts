import { TestBed } from '@angular/core/testing';

import { ControlInfoService } from './control-info.service';

describe('ControlInfoService', () => {
  let service: ControlInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
