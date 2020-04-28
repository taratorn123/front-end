import { CampaignListService } from './../services/campaign-list.service';
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
import { User } from 'src/models/User';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.css']
})
export class EditCampaignComponent implements OnInit {
  campaignModel: CampaignModel;
  form: any;
  selectedImage: any = null;
  public event1;
  imageUrl: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  isSubmitted:boolean=false;
  formTemplate: FormGroup;
  editorContent: string;
  closeResult: string;
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
  campaignData : CampaignModel;
  campaignDataTemp : any;
  userData : User;
  campaignID: number;

  
  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    private campaignFormService: CampaignFormService,
    private userService: UserService,
    private campaignListService : CampaignListService,
    private storage:AngularFireStorage,
    private modalService: NgbModal) { 
      this.campaignModel = new CampaignModel();
      this.userData = new User;

    }
  
    ngOnInit() {
      //Declare form group
      this.formTemplate = new FormGroup({
        targetDonation: new FormControl('',Validators.required),
        campaignName: new FormControl('',Validators.required),
        category: new FormControl('',Validators.required),
        fundRaisingAs: new FormControl('',Validators.required),
        imageUrl: new FormControl(''),
        editor: new FormControl('',Validators.required)
      })
      //Get campaignId from route snapshot
      this.campaignID = this.actRoute.snapshot.params['id'];
      console.log("campaignID: "+ this.campaignID);
      this.campaignModel.campaignId = this.campaignID
      console.log("this.campaignModel.campaignId ngOnInIt : = "+this.campaignModel.campaignId)

      this.campaignListService.getCampaignDetails(this.campaignID).subscribe(campaignModelData => {
        this.campaignData = campaignModelData
        console.log("campaignData: " + this.campaignData)
        //To show current cover image 
        this.imageUrl = this.campaignData.coverImagePath
        //To set current image path
        this.campaignModel.coverImagePath = this.imageUrl
        console.log("coverImagePath(onFileChanged): "+this.imageUrl)
      //Declare form group
      this.formTemplate.controls['targetDonation'].setValue(this.campaignData.targetDonation)
      this.formTemplate.controls['campaignName'].setValue(this.campaignData.campaignName)
      this.formTemplate.controls['category'].setValue(this.campaignData.category)
      this.formTemplate.controls['fundRaisingAs'].setValue(this.campaignData.fundRaisingAs)
      this.formTemplate.controls['editor'].setValue(this.campaignData.campaignDetail)
    });
    }

 
  //Used to display the selected image
  onFileChanged(event) {
      console.log(event);
      this.selectedImage = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
 }

 //Fix length (10) for text editor
  textChanged($event) {
    if ($event.editor.getLength() > 10) {
      $event.editor.deleteText(10, $event.editor.getLength());
    }
  }

  //Display campaign detail in output section (quilljs)
  // submitEditor() {
  //   this.editorContent = this.formTemplate.get('editor').value;
  //   console.log(this.formTemplate.get('editor').value)
  //   this.campaignModel.campaignDetail = this.editorContent;
  // }

 
  
  //This is for uploading campaign
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
      //Send assigned value to SpringBoot, return campaignId
      this.campaignFormService.editCampaign(this.campaignModel).subscribe(campaignId => {
        if(this.selectedImage != null){
          console.log("campaignId = "+campaignId)
          var userIdLong = +sessionStorage.getItem('userId');
          this.campaignModel.campaignId = campaignId
          console.log("this.campaignModel.campaignId Submit : = "+this.campaignModel.campaignId)
          this.campaignModel.userId = userIdLong
          this.campaignModel.coverImageName = "cover.jpg";
          //Uploading Image to Firebase storage
          var filePath = `${this.campaignModel.userId}/campaign/${this.campaignModel.campaignId}/coverImage/${this.campaignModel.coverImageName}`
          const fileRef = this.storage.ref(filePath);
          console.log("filePath: "+filePath)
          this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
            finalize(()=>{
              fileRef.getDownloadURL().subscribe((url)=>{
                formValue['imageUrl'] = url;
                this.campaignModel.coverImagePath = formValue['imageUrl']
                //Send new assigned value (campaignId with userId, coverImagePath) to Springboot
                this.campaignFormService.saveCampaignUser(this.campaignModel).subscribe()
              })
            })
          ).subscribe();
        }
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
