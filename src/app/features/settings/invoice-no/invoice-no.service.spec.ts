import { TestBed } from '@angular/core/testing';

import { InvoiceNoService } from './invoice-no.service';

describe('InvoiceNoService', () => {
  let service: InvoiceNoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceNoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
