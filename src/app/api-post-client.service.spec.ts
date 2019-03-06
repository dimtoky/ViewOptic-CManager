import { TestBed } from '@angular/core/testing';

import { ApiPostClientService } from './api-post-client.service';

describe('ApiPostClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPostClientService = TestBed.get(ApiPostClientService);
    expect(service).toBeTruthy();
  });
});
