import { TestBed } from '@angular/core/testing';

import { ConfirmDialogServiceService } from './confirm-dialog-service.service';

describe('DialogServiceService', () => {
  let service: ConfirmDialogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmDialogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
