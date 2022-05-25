import { TestBed } from '@angular/core/testing';

import { ExcelSrvService } from './excel-srv.service';

describe('ExcelSrvService', () => {
  let service: ExcelSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
