import { CampaignModel } from './../../models/campaign-model';
import { UserService } from './../user-service.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'; 

@Component({
  selector: 'app-create-campaign-one',
  templateUrl: './create-campaign-one.component.html',
  styleUrls: ['./create-campaign-one.component.css']
})
export class CreateCampaignOneComponent implements OnInit {
  goal :number
  campaignTitle :string
  campaignModel : CampaignModel = new CampaignModel

  constructor(private router: Router,
    private fb:FormBuilder) { 
      
    }
 
  ngOnInit() {
  }

}
