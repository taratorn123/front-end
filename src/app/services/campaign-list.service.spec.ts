import { TestBed } from '@angular/core/testing';

import { CampaignListService } from './campaign-list.service';

describe('CampaignListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampaignListService = TestBed.get(CampaignListService);
    expect(service).toBeTruthy();
  });
});
