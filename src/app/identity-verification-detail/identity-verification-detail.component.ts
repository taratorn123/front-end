import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService} from '../services/user-service.service'


@Component({
  selector: 'app-identity-verification-detail',
  templateUrl: './identity-verification-detail.component.html',
  styleUrls: ['./identity-verification-detail.component.css']
})
export class IdentityVerificationDetailComponent implements OnInit {

  user: User;
  userId : String;
  constructor(private actRoute : ActivatedRoute,private router : Router,
    private userService:UserService) 
  { 
    this.user = new User;
  }

  ngOnInit() 
  {
    if(sessionStorage.getItem('privilege') != '3')
    {
      this.router.navigate(["/"]);
    }
    this.userId = this.actRoute.snapshot.params['id'];
    this.userService.getUserById(this.userId).subscribe(result=>
    {
      this.user = result;
    })
  }
  approve(userId: number)
  {
    this.userService.approveUserIdentity(userId.toString()).subscribe(result=>
      {
        if(result)
        {
          this.router.navigate(['/identity-verification']);
        }
      })
  }
  decline(userId: number)
  {
    this.userService.declineUserIdentity(userId.toString()).subscribe(result=>
      {
        if(result)
        {
          this.router.navigate(['/identity-verification']);
        }
      })
  }


}
