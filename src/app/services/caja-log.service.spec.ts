import { TestBed } from '@angular/core/testing';

import { CajaLogService } from './caja-log.service';

describe('CajaLogService', () => {
  let service: CajaLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CajaLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
