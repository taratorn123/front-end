import { TestBed } from '@angular/core/testing';

import { EditProfileDataService } from './edit-profile-data.service';

describe('EditProfileDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditProfileDataService = TestBed.get(EditProfileDataService);
    expect(service).toBeTruthy();
  });
});
