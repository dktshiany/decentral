import { TestBed } from '@angular/core/testing';

import { GetmarketService } from './getmarket.service';

describe('GetmarketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetmarketService = TestBed.get(GetmarketService);
    expect(service).toBeTruthy();
  });
});
