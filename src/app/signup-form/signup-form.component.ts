import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user-service.service';
import { User } from '../../models/User';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent  
{

  user: User;
 
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private modalService : NgbModal) 
  {
    this.user = new User();
  }
 
  onSubmit() 
  {
    this.userService.save(this.user).subscribe(result => 
      {
        if(result == 1)
        {
          this.userService.emailVerify(this.user).subscribe(verificationResult =>
          {
            if(verificationResult == 1)
            console.log("Sending Email success");
          });
          console.log("userService emailVerify");
        }
        console.log(result);
      });
  }
 
  gotoUserList() 
  {
    this.router.navigate(['/users']);
  }

}
