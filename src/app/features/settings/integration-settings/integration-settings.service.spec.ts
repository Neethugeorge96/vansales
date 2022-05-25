import { TestBed } from '@angular/core/testing';

import { IntegrationSettingsService } from './integration-settings.service';

describe('IntegrationSettingsService', () => {
  let service: IntegrationSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegrationSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
