/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeleteDialogService } from './deleteDialog.service';

describe('Service: DeleteDialog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeleteDialogService]
    });
  });

  it('should ...', inject([DeleteDialogService], (service: DeleteDialogService) => {
    expect(service).toBeTruthy();
  }));
});
