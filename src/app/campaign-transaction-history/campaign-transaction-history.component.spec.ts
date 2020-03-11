import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTransactionHistoryComponent } from './campaign-transaction-history.component';

describe('CampaignTransactionHistoryComponent', () => {
  let component: CampaignTransactionHistoryComponent;
  let fixture: ComponentFixture<CampaignTransactionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTransactionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
