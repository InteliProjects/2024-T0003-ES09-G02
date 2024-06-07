import { TestBed } from '@angular/core/testing';

import { FormsModalService } from './forms-modal.service';

describe('FormsModalService', () => {
  let service: FormsModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
