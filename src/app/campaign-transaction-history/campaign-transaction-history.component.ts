import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/models/transaction.model';

@Component({
  selector: 'app-campaign-transaction-history',
  templateUrl: './campaign-transaction-history.component.html',
  styleUrls: ['./campaign-transaction-history.component.css']
})
export class CampaignTransactionHistoryComponent implements OnInit {

  campaignId : String;
  transactions : Transaction[];
  username : String;
  constructor(
    private transactionService : TransactionService,
    private route: ActivatedRoute,
    private router: Router
  ) 
  {
    transactionService : TransactionService 
  }

  ngOnInit() 
  {
    this.campaignId = this.route.snapshot.params['id'];
    this.transactionService.getHistoryDonationCampaign(this.campaignId).subscribe(data=>
      {
        this.transactions = data;
        console.log(this.transactions);
      })
  }

}
