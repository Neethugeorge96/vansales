import { TestBed } from '@angular/core/testing';

import { SuggestedqtyInvoicehistoryService } from './suggestedqty-invoicehistory.service';

describe('SuggestedqtyInvoicehistoryService', () => {
  let service: SuggestedqtyInvoicehistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuggestedqtyInvoicehistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
