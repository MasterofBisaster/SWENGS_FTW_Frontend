import { TestBed } from '@angular/core/testing';

import { FtwWordService } from './ftw-word.service';

describe('FtwWordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FtwWordService = TestBed.get(FtwWordService);
    expect(service).toBeTruthy();
  });
});
