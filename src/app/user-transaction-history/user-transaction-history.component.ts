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
  username : String;
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
    this.username = sessionStorage.getItem('username')
    if(this.username == null)
    {
      this.router.navigate(['sign-in']);
    }
    else
    {
      this.userId = this.route.snapshot.params['id'];
      if(sessionStorage.getItem('userId') != this.userId)
      {
        this.router.navigate(['']);
      }
      this.transactionService.getHistoryDonationUser(this.userId).subscribe(data=>
      {
        this.transactions = data;
        console.log(this.transactions);
      })
    }
  }
}
