import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCampaignUpdateComponent } from './view-campaign-update.component';

describe('ViewCampaignUpdateComponent', () => {
  let component: ViewCampaignUpdateComponent;
  let fixture: ComponentFixture<ViewCampaignUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCampaignUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCampaignUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
