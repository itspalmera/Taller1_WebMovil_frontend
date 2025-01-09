import { TestBed } from '@angular/core/testing';

import { ClientsAdminService } from './clients-admin.service';

describe('ClientsAdminService', () => {
  let service: ClientsAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
