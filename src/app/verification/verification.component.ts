import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user-service.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  private userId : string;
  constructor(private authService: AuthenticationService,private actRoute: ActivatedRoute, private router: Router,private userService: UserService) 
  { 

  }

  ngOnInit() 
  {
    if(sessionStorage.getItem('username') === null)
    {
      this.router.navigate(['/']);
    }
  }
  resendVerification()
  {
    console.log("Sending");
    this.userId = sessionStorage.getItem('userId')
    this.userService.emailVerify(this.userId).subscribe(result=>
      {
        if(result == 1)
        {
          console.log("Sending Email success");
        }
      });
  }

}
