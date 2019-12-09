import { TestBed } from '@angular/core/testing';

import { MsgService } from './msg.service';

describe('MsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MsgService = TestBed.get(MsgService);
    expect(service).toBeTruthy();
  });
});
