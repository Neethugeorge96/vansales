import { TestBed } from '@angular/core/testing';

import { NetBillService } from './net-bill.service';

describe('NetBillService', () => {
  let service: NetBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
