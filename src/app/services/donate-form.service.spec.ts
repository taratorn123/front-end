import { TestBed } from '@angular/core/testing';

import { DonateFormService } from './donate-form.service';

describe('DonateFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonateFormService = TestBed.get(DonateFormService);
    expect(service).toBeTruthy();
  });
});
