import { UserService } from './../user-service.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'; 

import { StepOne, CampaignModel } from './../../models/campaign-model';
import { CampaignFormService } from './../services/campaign-form.service';

@Component({
  selector: 'app-create-campaign-one',
  templateUrl: './create-campaign-one.component.html',
  styleUrls: ['./create-campaign-one.component.css']
})
export class CreateCampaignOneComponent implements OnInit {
  title = 'Please tell us about yourself.';
  stepOne: StepOne;
  campaignModel: CampaignModel;
  form: any;

  constructor(private router: Router,
    private campaignFormService: CampaignFormService) { 
      this.campaignModel = new CampaignModel()
    }
 
  ngOnInit() {
    this.stepOne = this.campaignFormService.getPersonal();
  }
  
  ngOnSubmit(){
    this.campaignFormService.saveCampaign(this.campaignModel).subscribe();

  }
  save(form: any): boolean {
    if (!form.valid) {
        return false;
    }
        
    this.campaignFormService.setPersonal(this.stepOne);
    return true;
  }

  goToNext(form: any) {
      if (this.save(form)) {
        console.log(this.stepOne);


          // Navigate to the second step
          this.router.navigate(['/create-campaign-two']);
      }
  }

}
