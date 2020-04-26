import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCampaignCommentComponent } from './view-campaign-comment.component';

describe('ViewCampaignCommentComponent', () => {
  let component: ViewCampaignCommentComponent;
  let fixture: ComponentFixture<ViewCampaignCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCampaignCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCampaignCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
