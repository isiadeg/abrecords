import { TestBed } from '@angular/core/testing';

import { LocationgetService } from './locationget.service';

describe('LocationgetService', () => {
  let service: LocationgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
