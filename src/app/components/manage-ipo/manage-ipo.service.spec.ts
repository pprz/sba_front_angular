import { TestBed } from '@angular/core/testing';

import { ManageIpoService } from './manage-ipo.service';

describe('ManageIpoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageIpoService = TestBed.get(ManageIpoService);
    expect(service).toBeTruthy();
  });
});
