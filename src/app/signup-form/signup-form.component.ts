import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user-service.service';
import { User } from '../../models/User';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}



@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent  
{

  user: User;
 
  constructor(private route: ActivatedRoute, private router: Router, 
    private userService: UserService, private modalService : NgbModal) 
  {
    this.user = new User();
  }
 
  onSubmit() 
  {
    this.userService.save(this.user).subscribe(result => 
      {
        //this.open();
        if(result != 0)
        {
          console.log(result.toString);
          this.userService.emailVerify(result.toString()).subscribe(verificationResult =>
          {
            if(verificationResult == 1)
            console.log("Sending Email success");
          });
          console.log("userService emailVerify");
        }
        console.log(result);
      });
  }
  open() 
  {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }
 
  gotoUserList() 
  {
    this.router.navigate(['/users']);
  }

}
