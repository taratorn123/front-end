import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { UserService } from '../services/user-service.service'
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-identity-verification',
  templateUrl: './identity-verification.component.html',
  styleUrls: ['./identity-verification.component.css']
})
export class IdentityVerificationComponent implements OnInit {

  users : User[]
  constructor(private userService : UserService,private router: Router) 
  { 

  }

  ngOnInit() 
  {
    console.log(sessionStorage.getItem('privilege') )
    if(sessionStorage.getItem('privilege') != '3')
    {
      this.router.navigate(["/"]);
    }
    this.userService.getVerificationRequestUser().subscribe(result=>
    {
      console.log(result)
      this.users = result;
    })
  }
  displayVerificationDetail(userId : String)
  {
    
  }

}
