import { ProfileModel } from './../../models/ProfileModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AccountDonation } from 'src/models/account-donation.model';
import { DonateFormService } from 'src/app/services/donate-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})

export class DonateComponent implements OnInit 
{
  donateForm: FormGroup;
  profileData: ProfileModel;
  donation: AccountDonation;

  constructor(private fb: FormBuilder,
              public http: HttpClient, 
              private donateService: DonateFormService,
              private _modalService: NgbModal,
              private route: ActivatedRoute, 
              private router: Router) 
  { 
    this.donation = new AccountDonation();
  }

  donate()
  {

    console.log("Hello Im here"+this.donation);
    this.donateService.saveDonation(this.donation).subscribe(result => 
      {
        console.log(result);
        if(result == 2)
        {
          this.router.navigate(['/campaigns']);
          console.log("Success");
        }
      });
  };

  

  ngOnInit() {
    this.donateForm = this.fb.group(
    {
      'amount': [null, Validators.required],
      'donate-privatekey': [null, Validators.required]
    });
  }

}