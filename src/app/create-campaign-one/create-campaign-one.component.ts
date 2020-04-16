import { QuillModule } from 'ngx-quill';
import Quill from 'quill';
import { UserService } from '../services/user-service.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'; 
import { CampaignModel } from './../../models/campaign-model';
import { CampaignFormService } from './../services/campaign-form.service';

@Component({
  selector: 'app-create-campaign-one',
  templateUrl: './create-campaign-one.component.html',
  styleUrls: ['./create-campaign-one.component.css']
})
export class CreateCampaignOneComponent implements OnInit {
  title = 'Please tell us about yourself.';
  campaignModel: CampaignModel;
  form: any;
  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;

  editorForm: FormGroup;
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
    private userService: UserService) { 
      this.campaignModel = new CampaignModel()
    }
  
  //Used to display the selected image
  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.campaignModel.coverImageName = "cover.jpg";
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
  };

 }

 //Fix length (10) for text editor
  textChanged($event) {
    if ($event.editor.getLength() > 10) {
      $event.editor.deleteText(10, $event.editor.getLength());
    }
  }

  //Display campaign detail in output section (quilljs)
  submitEditor() {
    this.editorContent = this.editorForm.get('editor').value;
    console.log(this.editorForm.get('editor').value)
    this.campaignModel.campaignDetail = this.editorContent;

  }

  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
  }
  
  //This is for uploading campaign
  ngOnSubmit() {
    const uploadData = new FormData();
    for(var key in this.campaignModel){
      uploadData.append(key, this.campaignModel[key])
    }
    uploadData.append("myFile", this.selectedFile, this.campaignModel.coverImageName);
    this.campaignFormService.saveCampaign(uploadData).subscribe(campaignId => {
      console.log("campaignId = "+campaignId)
      var userIdLong = +sessionStorage.getItem('userId'); // userIdLong: number
      this.campaignModel.campaignId = campaignId
      this.campaignModel.userId = userIdLong
      this.campaignFormService.saveCampaignUser(this.campaignModel).subscribe()
    });
  }
}
