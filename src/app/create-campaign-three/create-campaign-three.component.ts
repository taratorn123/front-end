import { CampaignModel } from './../../models/campaign-model';
import { UserService } from './../user-service.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'; 

@Component({
  selector: 'app-create-campaign-three',
  templateUrl: './create-campaign-three.component.html',
  styleUrls: ['./create-campaign-three.component.css']
})
export class CreateCampaignThreeComponent implements OnInit {
  goal :number
  campaignTitle :string
  campaignModel : CampaignModel = new CampaignModel

  form : FormGroup

  constructor(private router: Router,
    private fb:FormBuilder) { 
      this.form = fb.group({
        published : true,
        credentials : this.fb.array([]),
      });
    }
    addCreds() {
      const creds = this.form.controls.credentials as FormArray;
      creds.push(this.fb.group({
        username: '',
        password: '',
      }));
    }
  ngOnInit() {
  }

}
