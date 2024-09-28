import { TestBed } from '@angular/core/testing';

import { ThisHelpService } from './this-help.service';

describe('ThisHelpService', () => {
  let service: ThisHelpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThisHelpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
