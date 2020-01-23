import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCampaignOneComponent } from './create-campaign-one.component';

describe('CreateCampaignOneComponent', () => {
  let component: CreateCampaignOneComponent;
  let fixture: ComponentFixture<CreateCampaignOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCampaignOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCampaignOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
