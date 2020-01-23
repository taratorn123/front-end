import { ProfileModel } from './../../models/ProfileModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
  profileForm: FormGroup;
  form: FormGroup;
  profileData: ProfileModel;


  constructor(private fb: FormBuilder, public http: HttpClient) { }

  donate() {
    console.log(this.profileForm);
    this.http.post("", this.profileForm)
      .subscribe(data => {

     });

    //  this.http.get<ProfileModel>("").subscribe(data => {
    //  this.profileData = data;
    //  });

  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      'donate-baht': [null, Validators.required],
      'donate-comment': [null, Validators.required],
      'donate-privatekey': [null, Validators.required]
    });
  }

}