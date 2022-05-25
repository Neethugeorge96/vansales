import { TestBed } from '@angular/core/testing';

import { ItemGrouppingService } from './item-groupping.service';

describe('ItemGrouppingService', () => {
  let service: ItemGrouppingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemGrouppingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
