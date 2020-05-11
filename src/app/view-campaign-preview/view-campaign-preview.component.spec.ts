import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCampaignPreviewComponent } from './view-campaign-preview.component';

describe('ViewCampaignPreviewComponent', () => {
  let component: ViewCampaignPreviewComponent;
  let fixture: ComponentFixture<ViewCampaignPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCampaignPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCampaignPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
