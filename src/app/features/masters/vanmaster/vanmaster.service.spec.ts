import { TestBed } from '@angular/core/testing';

import { VanmasterService } from './vanmaster.service';

describe('VanmasterService', () => {
  let service: VanmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VanmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
