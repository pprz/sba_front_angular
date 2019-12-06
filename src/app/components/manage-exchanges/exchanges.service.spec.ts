import { TestBed } from '@angular/core/testing';

import { ExchangesService } from './exchanges.service';

describe('ExchangesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExchangesService = TestBed.get(ExchangesService);
    expect(service).toBeTruthy();
  });
});
