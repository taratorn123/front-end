import { ProfileModel } from './../../models/ProfileModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AccountDonation } from 'src/models/account-donation.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/models/User';
import { Session } from 'protractor';

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

  constructor(private fb: FormBuilder,
              public http: HttpClient, 
              private transaction: TransactionService,
              private _modalService: NgbModal,
              private route: ActivatedRoute, 
              private router: Router) 
  { 
    this.donation = new AccountDonation();
    this.username = sessionStorage.getItem('username');
  }

  /* This method use to send donate form to spring boot backend
  If transaction send successfully it will au*/
  donate()
  {


    console.log("Hello Im here"+this.donation.anonymousFlag);
    this.transaction.saveDonation(this.donation).subscribe(result => 
      {
        console.log(result);
        if(result == 2)
        {
          this.router.navigate(['/campaigns']);
          console.log("Success");
        }
      });
  };

  

  ngOnInit() 
  {
    this.campaignID = this.route.snapshot.params['id'];
    console.log('This is campaign ID '+this.campaignID);
    console.log('This is username '+this.username);
    this.donation.userId = this.username;
    this.donation.campaignId = this.campaignID;
    this.donateForm = this.fb.group(
    {
      'amount': [null, Validators.required],
      'donate-privatekey': [null, Validators.required]
    });
  }

}