import { User } from './../../models/User';
import { UserService } from './../user-service.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username :string
  password :string
  invalidLogin :boolean
  user: User = new User()

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    
    this.loginservice.authenticate(this.user, this.username, this.password).subscribe(result => {
      if(result == true){
        this.gotoHome()
        this.invalidLogin = false
      }else {
        this.invalidLogin = true
      }
    });
    // if (this.loginservice.authenticate(this.user, this.username, this.password)) {
    //   console.log(this.loginservice.authenticate(this.user, this.username, this.password)+"iasmdmad")
    //   this.router.navigate([''])
    //   this.invalidLogin = false
    // } else {
    //   this.invalidLogin = true
      
    // }

  }

  gotoHome() {
    this.router.navigate([''])
  }
  
}
