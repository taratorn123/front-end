import { UserService } from './../services/user-service.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit 
{
  userBalance:string;
  user:User;
  constructor(public loginService:AuthenticationService,
              private userService:UserService) 
  {
    this.user = new User();
  }

  ngOnInit() 
  {
    if(sessionStorage.getItem('userId') != null){
      this.userService.getUserById(sessionStorage.getItem('userId')).subscribe(userModel =>{
        this.user = userModel
      })
      this.userService.getUserBalance().subscribe(userBalanceXLM => {
        this.userBalance = userBalanceXLM;
      })
    }
  }
  /**
   * name
  
   */
  public getPrivilege() 
  {
    return sessionStorage.getItem('privilege');
  }

  
}
