/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseServiceService } from './base-service.service';

describe('Service: BaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseServiceService]
    });
  });

  it('should ...', inject([BaseServiceService], (service: BaseServiceService) => {
    expect(service).toBeTruthy();
  }));
});
