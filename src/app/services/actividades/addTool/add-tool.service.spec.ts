import { TestBed } from '@angular/core/testing';

import { AddToolService } from './add-tool.service';

describe('AddToolService', () => {
  let service: AddToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
