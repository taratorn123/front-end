import { AngularFireStorage } from '@angular/fire/storage';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';

import { UserService } from '../services/user-service.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'; 
import { CampaignModel } from './../../models/campaign-model';
import { CampaignFormService } from './../services/campaign-form.service';
import { finalize } from "rxjs/operators"
@Component({
  selector: 'app-create-campaign-one',
  templateUrl: './create-campaign-one.component.html',
  styleUrls: ['./create-campaign-one.component.css']
})
export class CreateCampaignOneComponent implements OnInit {
  campaignModel: CampaignModel;
  form: any;
  selectedImage: any = null;
  public event1;
  imageUrl: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  isSubmitted:boolean;
  formTemplate: FormGroup;
  editorContent: string;

  //Config the tool of quilljs
  config = {
    toolbar: [
      'bold','italic','underline'
    ]
  }

  //Config the style of quilljs
  editorStyle ={
    height: '300px',
    backgroundColor: '#ffffff'
  }
  

  
  constructor(private router: Router,
    private campaignFormService: CampaignFormService,
    private userService: UserService,
    private storage:AngularFireStorage) { 
      this.campaignModel = new CampaignModel();
    }
  
  //Used to display the selected image
  onFileChanged(event) {
    this.selectedImage = event.target.files[0];
    var blob = new Blob([event.target.result], { type: "image/jpeg" });
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imageUrl = reader.result;
  };

 }

 //Fix length (10) for text editor
  textChanged($event) 
  {
    if ($event.editor.getLength() > 10) {
      $event.editor.deleteText(10, $event.editor.getLength());
    }
  }

  ngOnInit() {
    this.formTemplate = new FormGroup({
      targetDonation: new FormControl('',Validators.required),
      campaignName: new FormControl('',Validators.required),
      category: new FormControl('',Validators.required),
      fundRaisingAs: new FormControl('',Validators.required),
      imageUrl: new FormControl('',Validators.required),
      editor: new FormControl('',Validators.required)
    })
  }
  
  //This is for submiting campaign
  ngOnSubmit(formValue) {
    this.isSubmitted = true;
    if(this.formTemplate.valid){
      //Assign formValue to model
      this.campaignModel.targetDonation = formValue['targetDonation'];
      this.campaignModel.campaignName = formValue['campaignName'];
      this.campaignModel.category = formValue['category'];
      this.campaignModel.fundRaisingAs = formValue['fundRaisingAs'];
      this.campaignModel.campaignDetail = formValue['editor'];
      this.campaignModel.coverImageName = 'cover.jpg';
      this.campaignModel.startDate = new Date();
      //Send assigned value to SpringBoot
      this.campaignFormService.saveCampaign(this.campaignModel).subscribe(campaignId => {
        var userIdLong = +sessionStorage.getItem('userId'); // userIdLong: number
        this.campaignModel.campaignId = campaignId
        this.campaignModel.userId = userIdLong
        this.campaignModel.coverImageName = "cover.jpg";
        //Uploading Image to Firebase storage
        var filePath = `${this.campaignModel.userId}/campaign/${this.campaignModel.campaignId}/coverImage/${this.campaignModel.coverImageName}`
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
          finalize(()=>{
            fileRef.getDownloadURL().subscribe((url)=>{
              formValue['imageUrl'] = url;
              this.campaignModel.coverImagePath = formValue['imageUrl']
              //Send new assigned value (campaignId with userId, coverImagePath) to Springboot
              this.campaignFormService.saveCampaignUser(this.campaignModel).subscribe()
              this.resetForm();
              this.gotoManage(campaignId);
            })
          })
        ).subscribe();
      });
    }
  }

  get formControls(){
    return this.formTemplate['controls']
  }
  //Reset FormGroup
  resetForm(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      targetDonation: '',
      campaignName: '',
      category: '',
      fundRaisingAs: '',
      imageUrl: '',
      editor: ''
    });
    this.imageUrl = null;
    this.selectedImage = null;
    this.isSubmitted = false;
  }
  gotoManage(campaignId:number) {
    this.router.navigate(['manage-campaigns' + '/' + campaignId])
    .then(() => {
      window.location.reload();
    });
  }
}
