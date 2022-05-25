import { TestBed } from '@angular/core/testing';

import { StocktovanService } from './stocktovan.service';

describe('StocktovanService', () => {
  let service: StocktovanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StocktovanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
