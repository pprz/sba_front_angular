import { TestBed } from '@angular/core/testing';

import { CompanyServiceService } from './company-service.service';

describe('CompanyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyServiceService = TestBed.get(CompanyServiceService);
    expect(service).toBeTruthy();
  });
});
