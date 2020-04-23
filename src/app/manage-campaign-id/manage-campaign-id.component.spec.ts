import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCampaignIdComponent } from './manage-campaign-id.component';

describe('ManageCampaignIdComponent', () => {
  let component: ManageCampaignIdComponent;
  let fixture: ComponentFixture<ManageCampaignIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCampaignIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCampaignIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
