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
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


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
      'bold','italic','underline','image','imageResize'
    ]
  }
  //Form & Models
  formTemplate: FormGroup;
  campaignModel: CampaignModel;
  campaignUpdate:CampaignUpdate;
  campaignDataTemp : any;
  userData: User;
  
  today:Date;
  editorContent: string;
  campaignID: number;
  campaignUpdateId: number;
  editorInstance: any;
  isSubmitted: boolean;
  
  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    private campaignFormService: CampaignFormService,
    private userService: UserService,
    private campaignListService : CampaignListService,
    private storage:AngularFireStorage,
    private modalService: NgbModal) { 
      this.campaignModel = new CampaignModel();
      this.campaignUpdate = new CampaignUpdate();
      this.userData = new User();

    }
  ngOnInit() {
    //Declare form group
    this.formTemplate = new FormGroup({
      editor: new FormControl('',Validators.required)
    })
  }


imageEditor(){
  let data:any = this.editorInstance
  if(this.editorInstance != null){
    let range = this.editorInstance.getSelection()
    if(range != null){
      let input = document.createElement('input')
      input.setAttribute('type','file')
      input.setAttribute('accept','image/png, image/jpeg')
      input.addEventListener('change',()=>{
        if(input.files != null){
          let file = input.files[0]
          if(file != null){
            let reader = new FileReader()
            reader.readAsDataURL(file)
            //Uploading Image to Firebase storage
            this.campaignFormService.getLastestUpdateId().subscribe(lastestUpdateId => {
              if(lastestUpdateId != null)
              this.campaignUpdateId = lastestUpdateId+1
              else
              this.campaignUpdateId = 1;
            
              var filePath = `${sessionStorage.getItem('userId')}/campaign/${this.actRoute.snapshot.params['id']}/updateImage/${this.campaignUpdateId}.jpg`
              const fileRef = this.storage.ref(filePath);
              this.storage.upload(filePath,file).snapshotChanges().pipe(
                finalize(()=>{
                  fileRef.getDownloadURL().subscribe((url)=>{
                    data.insertEmbed(range.index, 'image', url)
                  })
                })
              ).subscribe();
            })
          }
        }
      })
      input.click();
    }
  }
}
  ngOnSubmit(formValue){
    this.isSubmitted = true;
      if(this.formTemplate.valid){
      //Get campaignId from route snapshot
      this.campaignID = this.actRoute.snapshot.params['id'];
      this.campaignUpdate.campaignId = this.campaignID

      this.campaignUpdate.campaignUpdateDetail = formValue['editor'];
      this.today= new Date();

      this.campaignUpdate.updateTimestamp = this.today;
      this.campaignFormService.saveCampaignUpdate(this.campaignUpdate).subscribe();
      this.resetForm()
    }
  }

  get formControls(){
    return this.formTemplate['controls']
  }

  //Reset FormGroup
  resetForm(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      editor: ''
    });
    this.isSubmitted = false;
  }
}
