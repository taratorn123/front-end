import { Component, OnInit } from '@angular/core';
import { PasswordUpdate } from '../../models/password-update.model'
import { UserService } from '../services/user-service.service' 
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/User'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  userPassword : PasswordUpdate;
  user : User
  token : string;
  constructor(private userService:UserService,
    private activatedRoute: ActivatedRoute, 
    private router: Router) 
  { 
    this.userPassword = new PasswordUpdate();
    this.user = new User();
  }

  ngOnInit() 
  {
    this.activatedRoute.queryParams.subscribe(param=>
      {
        this.token = param['token'];
        this.userService.checkUserToken(this.token).subscribe(result=>
          {
            if(result == 0)
            {
              this.router.navigate(['/'])
            }
            else
            {
              this.user.id = result;
            }
          })
      })
  }

  onSubmit()
  {
    this.user.password = this.userPassword.newPassword
    this.userService.resetUserPassword(this.user).subscribe(result=>
      {
        if(result)
        {
          this.router.navigate(['/sign-in'])
        }
      })
  }

}
