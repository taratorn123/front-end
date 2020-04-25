import { CampaignUpdate } from './../../models/campaign-update';
import { CampaignModel } from 'src/models/campaign-model';
import { CampaignListService } from './../services/campaign-list.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';
import { UserService } from '../services/user-service.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'; 
import { CampaignFormService } from './../services/campaign-form.service';
import { finalize } from "rxjs/operators"
import { User } from 'src/models/User';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-update-campaign',
  templateUrl: './update-campaign.component.html',
  styleUrls: ['./update-campaign.component.css']
})
export class UpdateCampaignComponent implements OnInit {
  
  //Config the style of quilljs
  editorStyle ={
  height: '300px',
  backgroundColor: '#ffffff'
  }
  //Config the tool of quilljs
  config = {
    toolbar: [
      'bold','italic','underline','image'
    ]
  }
  //Form & Models
  formTemplate: FormGroup;
  campaignModel: CampaignModel;
  campaignUpdate:CampaignUpdate;
  userData: User;
  //Date
  //jstoday = '';
  today:Date;
  editorContent: string;
  campaignID: number;

  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    private campaignFormService: CampaignFormService,
    private userService: UserService,
    private campaignListService : CampaignListService,
    private storage:AngularFireStorage) { 
      this.campaignModel = new CampaignModel();
      this.campaignUpdate = new CampaignUpdate();
      this.userData = new User();

    }
  ngOnInit() {
    //Declare form group
    this.formTemplate = new FormGroup({
      editor: new FormControl('',Validators.required)
    })
    
    //Use to format date to user friendly
    //this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+7');
    //console.log(this.today)
  }
//Display campaign detail in output section (quilljs)
submitEditor() {
  this.editorContent = this.formTemplate.get('editor').value;
  console.log(this.formTemplate.get('editor').value)
  this.campaignModel.campaignDetail = this.editorContent;
}
  ngOnSubmit(formValue){
    //Get campaignId from route snapshot
    this.campaignID = this.actRoute.snapshot.params['id'];
    this.campaignUpdate.campaignId = this.campaignID

    this.campaignUpdate.campaignUpdateDetail = formValue['editor'];
    this.today= new Date();

    this.campaignUpdate.updateTimestamp = this.today;
    this.campaignFormService.saveCampaignUpdate(this.campaignUpdate).subscribe();
  }

}
