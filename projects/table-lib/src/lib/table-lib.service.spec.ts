import { TestBed } from '@angular/core/testing';

import { TableLibService } from './table-lib.service';

describe('TableLibService', () => {
  let service: TableLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
