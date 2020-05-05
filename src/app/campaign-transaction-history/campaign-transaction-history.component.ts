import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/models/transaction.model';
import { CampaignModel } from 'src/models/campaign-model';
import { CampaignListService} from 'src/app/services/campaign-list.service'

@Component({
  selector: 'app-campaign-transaction-history',
  templateUrl: './campaign-transaction-history.component.html',
  styleUrls: ['./campaign-transaction-history.component.css']
})
export class CampaignTransactionHistoryComponent implements OnInit 
{

  campaignId : String;
  transactions : Transaction[];
  campaign : CampaignModel;
  username : String;
  campaignPublicKey : String;
  campaignName : String;

  constructor(
    private transactionService : TransactionService,
    private route: ActivatedRoute
  ) 
  {
  }

  ngOnInit() 
  {
    this.campaignId = this.route.snapshot.params['id'];
    this.transactionService.getHistoryDonationCampaign(this.campaignId).subscribe(data=>
      {
        this.transactions = data;
        this.campaignPublicKey = this.transactions[0].campaignPublicKey;
        this.campaignName = this.transactions[0].campaignName;
      })
  }

}
