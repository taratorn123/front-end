import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/models/transaction.model';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-user-transaction-history',
  templateUrl: './user-transaction-history.component.html',
  styleUrls: ['./user-transaction-history.component.css']
})
export class UserTransactionHistoryComponent implements OnInit {

  userId : String;
  transactions : Transaction[];
  content: any;
  backendEncoded : String;
  userPublicKey : String;
  userName : String;

  constructor(
    private transactionService : TransactionService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: AuthenticationService
  ) 
  {
    transactionService : TransactionService 
  }

  ngOnInit() 
  {
    this.userId = sessionStorage.getItem('userId')
    if(this.userId == null)
    {
      this.router.navigate(['sign-in']);
    }
    else
    {
      this.transactionService.getHistoryDonationUser(this.userId).subscribe(data=>
      {
        if(data[0].transactionHash != null)
        {
          this.transactions = data;
          this.userPublicKey = data[0].campaignPublicKey;
          this.userName = data[0].userName;
        }
        else
        {
          this.userPublicKey = data[0].campaignPublicKey;
          this.userName = data[0].campaignName;
        }
      })
    }
  }
  reportRequest(transactionId : String)
  {
    this.transactionService.requestTransactionReport(transactionId).subscribe(result=>
      {
        window.open('http://34.87.165.176:8080/getTransactionReport/'+result);
      }
    )
  }
  
}
