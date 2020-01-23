import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCampaignThreeComponent } from './create-campaign-three.component';

describe('CreateCampaignThreeComponent', () => {
  let component: CreateCampaignThreeComponent;
  let fixture: ComponentFixture<CreateCampaignThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCampaignThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCampaignThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
