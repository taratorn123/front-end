import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCampaignTwoComponent } from './create-campaign-two.component';

describe('CreateCampaignTwoComponent', () => {
  let component: CreateCampaignTwoComponent;
  let fixture: ComponentFixture<CreateCampaignTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCampaignTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCampaignTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
