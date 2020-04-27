import { User } from 'src/models/User';
import { Component, OnInit } from '@angular/core';

import { EditProfileDataService } from './../services/edit-profile-data.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userData : User;
  temp : User;
  result: any;
  userImage: any = null;
  constructor(private editProfileDataService: EditProfileDataService) { 
    this.userData = new User
    this.temp = new User
  }

  ngOnInit() {
    this.editProfileDataService.get().subscribe(data => {
      this.userData = data;

      console.log(this.userData);
      });
  }

  onEdit() 
  {
    this.temp = this.userData
    this.editProfileDataService.get().subscribe(data => {
      this.editProfileDataService.editUserDetail(this.temp).subscribe(data => {
        this.result = data
        console.log("onEdit result must be 1: "+this.result)
    
      });
    })
  }
  onFileChanged(event) 
  {
    console.log(event);
    this.userImage = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => 
    {
      this.userImage = reader.result;
    };
    this.userImage = reader.result;
  }
}
