import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivateCampaignComponent } from './inactivate-campaign.component';

describe('InactivateCampaignComponent', () => {
  let component: InactivateCampaignComponent;
  let fixture: ComponentFixture<InactivateCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactivateCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactivateCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
