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
  constructor(private editProfileDataService: EditProfileDataService,
    private storage:AngularFireStorage,private userService : UserService) 
    { 
    this.userData = new User
    this.temp = new User
  }

  ngOnInit() {
    this.editProfileDataService.get().subscribe(data => 
      {
      this.userData = data;

      console.log(this.userData);
      });
  }

  // onEdit() 
  // {
  //   if(this.userImage)
  //   {
  //     var filePath = `${sessionStorage.getItem('userId')}/coverPhoto/coverPhoto.jpg`
  //     const fileRef = this.storage.ref(filePath);
  //     console.log("filePath: "+filePath)
  //     this.storage.upload(filePath,this.userImage).snapshotChanges().pipe(
  //       finalize(()=>
  //       {
  //         fileRef.getDownloadURL().subscribe((url)=>
  //         {
  //           this.userData.routeUserImage = url;
  //           //Send new assigned value (campaignId with userId, coverImagePath) to Springboot
  //           this.userService.setUserCoverImage(this.userData).subscribe(result=>
  //             {
  //               if(result)
  //               {
  //                 this.editProfileDataService.get().subscribe(data => 
  //                   {
  //                   this.editProfileDataService.editUserDetail(this.temp).subscribe(data => 
  //                     {
  //                     this.result = data
  //                     console.log("onEdit result must be 1: "+this.result)
  //                     });
  //                   })
  //               }
  //             })
  //         })
  //       })
  //     ).subscribe();
  //   }
  //   else
  //   {
  //     this.editProfileDataService.get().subscribe(data => 
  //     {
  //     this.editProfileDataService.editUserDetail(this.temp).subscribe(data => 
  //       {
  //       this.result = data
  //       console.log("onEdit result must be 1: "+this.result)
  //       });
  //     })
  //   }
  // }
  onFileChanged(event) 
  {
    console.log(event);
    this.userImage = event.target.files[0];
    var blob = new Blob([event.target.result], { type: "image/jpeg" });
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => 
    {
      this.userImageResult = reader.result;
      console.log('user image result'+ this.userImageResult)
    }
  }
}
