import { ProfileModel } from './../../models/ProfileModel';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AccountDonation } from 'src/models/account-donation.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Session } from 'protractor';
import { CurrencyService } from '../services/currency.service';

@Component({
  /* selector is basically a custome html tag that can
  be use to represent this component*/
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})

export class DonateComponent implements OnInit 
{
  
  donateForm: FormGroup;
  profileData: ProfileModel;
  donation: AccountDonation;
  username : String;
  campaignID : String;
  usd : string;
  baht : string;


  constructor(private fb: FormBuilder,
              public http: HttpClient, 
              private transaction: TransactionService,
              private modalService: NgbModal,
              private route: ActivatedRoute, 
              private router: Router,
              private currencyService : CurrencyService)
  { 
    this.donation = new AccountDonation();
    this.username = sessionStorage.getItem('username');
  }
  onInputChanged(event) 
  {
    this.baht = (parseFloat(this.donation.amount) *parseFloat(this.donation.exchangeRate)).toString()
  };
  /* This method use to send donate form to spring boot backend
  If transaction send successfully it will au*/
  donate()
  {
    if(sessionStorage.getItem('userId') == null)
    {
      const modalRef = this.modalService.open(NgbdModalContentDonate,{centered: true} );
      modalRef.componentInstance.choice = '1';
    }
    else
    {
      this.transaction.saveDonation(this.donation).subscribe(result => 
        {
          /* Not enough money */
          if(result == 0)
          {
            const modalRef = this.modalService.open(NgbdModalContentDonate,{centered: true} );
            modalRef.componentInstance.choice = '2';
          }
          /* Incorrect private key */
          else if(result == 1)
          {
            const modalRef = this.modalService.open(NgbdModalContentDonate,{centered: true} );
            modalRef.componentInstance.choice = '3';
          }
          /* Cannot send transaction*/
          else if(result == 2)
          {
            const modalRef = this.modalService.open(NgbdModalContentDonate,{centered: true} );
            modalRef.componentInstance.choice = '4';
          }
          else if(result == 3)
          {
            const modalRef = this.modalService.open(NgbdModalContentDonate,{centered: true} );
            modalRef.componentInstance.choice = '5';
          }
        });
    }
  };
  ngOnInit() 
  {
    this.campaignID = this.route.snapshot.params['id'];
    this.donation.userId = this.username;
    this.donation.campaignId = this.campaignID;
    this.currencyService.getCryptoCurrency().subscribe(data=>
      {
        this.usd = data['XLM']['USD']
        this.currencyService.getCurrencyUSDBase().subscribe(currencyData=>
          {
            this.donation.exchangeRate = (parseFloat(currencyData['rates']['THB']) * parseFloat(this.usd)).toString()
          })
      })
    
  }

}


@Component({
  selector: 'ngbd-modal-content',
  template: `
  
  <div *ngIf="choice == 1">
    <div class="modal-header">
      <h3>Error</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>Please login</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="navigateToSignin()">Login</button>
    </div>
  </div>
  <div *ngIf="choice == 2">
    <div class="modal-header">
      <h3>Error</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>Not enough balance</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  </div>
  <div *ngIf="choice == 3">
    <div class="modal-header">
      <h3>Error</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>Incorrect private key</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  </div>
  <div *ngIf="choice == 4">
    <div class="modal-header">
      <h3>Error</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>Please try again</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  </div>
  <div *ngIf="choice == 5">
    <div class="modal-header">
      <h3>Transaction Sent</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>Done</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="navigateToCampaign()">Close</button>
    </div>
  </div>

  `,
  styles: [`
  .modal-header
    {
      border: none !important;
    }
    .modal-footer
    {
      border: none !important;
    }
  `],
})
export class NgbdModalContentDonate {
  @Input() choice;

  constructor(public activeModal: NgbActiveModal, private router: Router)
   
  {
  }
  navigateToCampaign()
  {
    this.activeModal.close('Close click')
    this.router.navigate(['/campaigns']);
  }
  navigateToSignin()
  {
    this.activeModal.close('Close click')
    this.router.navigate(['/sign-in']);
  }
}