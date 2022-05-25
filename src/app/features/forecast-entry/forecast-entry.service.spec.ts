import { TestBed } from '@angular/core/testing';

import { ForecastEntryService } from './forecast-entry.service';

describe('ForecastEntryService', () => {
  let service: ForecastEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
