import { TestBed } from '@angular/core/testing';

import { CustomErrorHandlingService } from './custom-error-handling.service';

describe('CustomErrorHandlingService', () => {
  let service: CustomErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
