import { User } from './../../models/User';
import { UserService } from '../services/user-service.service';
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
  invalidLogin :boolean = false;
  user: User = new User()

  constructor(private router: Router,
    private loginservice: AuthenticationService,
    private userService: UserService) { }

  ngOnInit() {
  }

  checkLogin() 
  {
    this.loginservice.authenticate(this.user, this.username, this.password).subscribe(result => 
    {
      if(result == true)
      {
        this.userService.getUserId(this.user.username).subscribe(userId=>
          {
            sessionStorage.setItem('userId', userId);
            this.userService.checkUserVerification(userId).subscribe(verification=>
              {
                if(verification == 0)
                {
                  this.router.navigate(['/verification'])
                  sessionStorage.setItem('emailVerfication', '1');
                  sessionStorage.getItem('privilege')
                }
                else
                {
                  this.userService.getUserPrivilege(userId).subscribe(privilege=>
                    {
                      sessionStorage.setItem('privilege',privilege.toString())
                      if(privilege == 3)
                      {
                        this.router.navigate(['/'])
                      }
                      else
                      {
                        this.gotoHome()
                      }
                    });
                }
              })
          });
        this.invalidLogin = false
      }
      else 
      {
        this.invalidLogin = true
      }
    });
  }

  gotoHome() 
  {
    this.router.navigate([''])
    .then(() => {
      window.location.reload();
    });
  }

  gotoSignUp() {
    this.router.navigate(['sign-up'])
  }
  
}
