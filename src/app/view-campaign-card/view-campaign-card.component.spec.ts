import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCampaignCardComponent } from './view-campaign-card.component';

describe('ViewCampaignCardComponent', () => {
  let component: ViewCampaignCardComponent;
  let fixture: ComponentFixture<ViewCampaignCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCampaignCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCampaignCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
