import { TestBed } from '@angular/core/testing';

import { PurchaseAdminService } from './purchase-admin.service';

describe('PurchaseAdminService', () => {
  let service: PurchaseAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
