import { TestBed } from '@angular/core/testing';

import { ApiRepositoryService } from './api-repository.service';

describe('ApiRepositoryService', () => {
  let service: ApiRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
