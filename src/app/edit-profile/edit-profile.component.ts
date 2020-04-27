import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/models/User';
import { Component, OnInit } from '@angular/core';

import { EditProfileDataService } from './../services/edit-profile-data.service';
import { finalize } from "rxjs/operators"
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from '../services/user-service.service'


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit 
{
  userData : User;
  temp : User;
  result: any;
  userImage: any = null;
  userImageResult: any = null;
  formTemplate: FormGroup;
  selectedImage: any;
  imageUrl: string;
  isSubmitted: boolean;
  constructor(private editProfileDataService: EditProfileDataService,
    private storage:AngularFireStorage,private userService : UserService) 
    { 
    this.userData = new User
    this.temp = new User
  }

  ngOnInit() {
    //Declare form group
    this.formTemplate = new FormGroup({
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      imageUrl: new FormControl('')
    })
    this.editProfileDataService.get().subscribe(data => 
      {
      this.userData = data;
      //To show current cover image 
      if(this.userData.routeUserImage == null)
      this.imageUrl = '../../assets/img/DefaultUserProfile/defaultUser.jpg'
      else
      this.imageUrl = this.userData.routeUserImage
      //Declare form group
      this.formTemplate.controls['firstName'].setValue(this.userData.firstName)
      this.formTemplate.controls['lastName'].setValue(this.userData.lastName)
      this.formTemplate.controls['email'].setValue(this.userData.email)
      console.log(this.userData);
      });
  }
  
  //This is for uploading campaign
  ngOnSubmit(formValue) {
    this.isSubmitted = true;
    if(this.formTemplate.valid){
      //Assign formValue to model
      this.userData.firstName = formValue['firstName'];
      this.userData.lastName = formValue['lastName'];
      this.userData.email = formValue['email'];
      //Send assigned value to SpringBoot, return campaignId
      this.editProfileDataService.editUserDetail(this.userData).subscribe(user => {
        if(this.selectedImage != null){
          //Uploading Image to Firebase storage
          var filePath = `${sessionStorage.getItem('userId')}/coverPhoto/coverPhoto.jpg`
          const fileRef = this.storage.ref(filePath);
          console.log("filePath: "+filePath)
          this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
            finalize(()=>{
              fileRef.getDownloadURL().subscribe((url)=>{
                formValue['imageUrl'] = url;
                this.userData.routeUserImage = formValue['imageUrl']
                //Send new assigned value (campaignId with userId, coverImagePath) to Springboot
                this.editProfileDataService.editUserDetail(this.userData).subscribe()
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
  
  //Used to display the selected image
  onFileChanged(event) {
    console.log(event);
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (event:any) => this.imageUrl = event.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else
    {
      this.imageUrl = '../../assets/img/DefaultUserProfile/defaultUser.jpg'
      this.selectedImage = null;
    }
  }
}
