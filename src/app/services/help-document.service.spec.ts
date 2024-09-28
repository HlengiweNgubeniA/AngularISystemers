import { TestBed } from '@angular/core/testing';

import { HelpDocumentService } from './help-document.service';

describe('HelpDocumentService', () => {
  let service: HelpDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
