import { UserService } from './../user-service.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'; 

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
  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;

  editorForm: FormGroup;
  editorContent: string;
  
  editorStyle ={
    height: '300px',
    backgroundColor: '#ffffff'
  }


  constructor(private router: Router,
    private campaignFormService: CampaignFormService) { 
      this.campaignModel = new CampaignModel()
    }
  
  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.campaignModel.coverImageName = "cover";
    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
      console.log("imageURL"+this.imgURL);

  };

 }
 //Fix length (10) for text editor
 textChanged($event) {
  if ($event.editor.getLength() > 10) {
    $event.editor.deleteText(10, $event.editor.getLength());
  }
}
  submitEditor() {
    this.editorContent = this.editorForm.get('editor').value;
    console.log(this.editorForm.get('editor').value)
    this.campaignModel.campaignDetail = this.editorContent;

  }
  ngOnInit() {
    this.stepOne = this.campaignFormService.getPersonal();
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
  }
  
  //Submit the form to spring
  // ngOnSubmit(){
  //   this.campaignFormService.saveCampaign(this.campaignModel).subscribe();

  // }
  // save(form: any): boolean {
  //   if (!form.valid) {
  //       return false;
  //   }
        
  //   this.campaignFormService.setPersonal(this.stepOne);
  //   return true;
  // }

  //Go to stepTwo
  // goToNext(form: any) {
  //     if (this.save(form)) {
  //       console.log(this.stepOne);
  //         // Navigate to the second step
  //         this.router.navigate(['/create-campaign-two']);
  //     }
  // }

  // This part is for uploading
  ngOnSubmit() {


    const uploadData = new FormData();

    for(var key in this.campaignModel){
      uploadData.append(key, this.campaignModel[key])
    }
    uploadData.append("myFile", this.selectedFile, this.campaignModel.coverImageName);


    // this.campaignModel.imageByte = this.selectedFile;
    // console.log(this.campaignModel.imageByte)
    this.campaignFormService.saveCampaign(uploadData).subscribe();
    // this.httpClient.post('http://localhost:8080/uploadImage', uploadData)
    // .subscribe(
    //             res => {console.log(res);
    //                     this.receivedImageData = res;
    //                     this.base64Data = this.receivedImageData.pic;
    //                     this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
    //             err => console.log('Error Occured duringng saving: ' + err)
    //           );


  }
}
