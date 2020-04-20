import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user-service.service';
import { User } from '../../models/User';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent  
{

  user: User;
  identityFile : any;
  signatureFile : any;
  event1 : any;
  identityURL: any;
  signatureURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;

  identity : String;
  signature : String;
 
  constructor(private route: ActivatedRoute, private router: Router, 
    private userService: UserService, private modalService : NgbModal) 
  {
    this.user = new User();
  }
 
  onSubmit() 
 {
    /* password not match */
    if(this.user.password != this.user.passwordConfirmation)
    {
      const modalRef = this.modalService.open(NgbdModalContentSignup,{centered: true} );
      modalRef.componentInstance.choice = '2';
    }
    /* username length */
    else if(this.user.username.length < 5)
    {
      const modalRef = this.modalService.open(NgbdModalContentSignup,{centered: true} );
      modalRef.componentInstance.choice = '3';
    }
    /* password length*/
    else if(this.user.password.length < 5)
    {
      const modalRef = this.modalService.open(NgbdModalContentSignup,{centered: true} );
      modalRef.componentInstance.choice = '4';
    }
    else
    {
      /* check user existence*/
      this.userService.checkUserExistence(this.user).subscribe(result =>
      {
        console.log("this is result from check user "+result)
        /* User already exist*/
        if(result == 0)
        {
          const modalRef = this.modalService.open(NgbdModalContentSignup,{centered: true} );
          modalRef.componentInstance.choice = '5';
        }
        /* Email already exist */
        else if(result == 1)
        {
          const modalRef = this.modalService.open(NgbdModalContentSignup,{centered: true} );
          modalRef.componentInstance.choice = '6';
        }
        else
        {
          /* If user click on verification flag */
          if(this.user.verificationFlag)
          {
            if(this.identityURL == null && this.signatureURL == null)
            {
              /* Check image null */
              const modalRef = this.modalService.open(NgbdModalContentSignup,{centered: true} );
              modalRef.componentInstance.choice = '1';
            }
            else
            {
              this.userService.save(this.user).subscribe(createUserResult => 
                {
                  /* stellar transaction error */
                  if(createUserResult == 0)
                  {
                    const modalRef = this.modalService.open(NgbdModalContentSignup,{centered: true} );
                    modalRef.componentInstance.choice = '7';
                  }
                  else
                  {
                    const uploadData = new FormData();
                    uploadData.append("userId", createUserResult.toString());
                    uploadData.append("verification", this.identityFile);
                    uploadData.append("signature", this.signatureFile);
                    console.log('Upload data');
                    this.userService.saveVerification(uploadData).subscribe(verificationResult=>
                    {
                      if(verificationResult)
                      {
                        console.log(createUserResult.toString);
                        this.userService.emailVerify(createUserResult.toString()).subscribe(verificationResult =>
                        {
                          if(verificationResult == 1)
                          console.log("Sending Email success");
                        });
                        console.log("userService emailVerify");
                        const modalRef = this.modalService.open(NgbdModalContentSignup,{centered: true} );
                        modalRef.componentInstance.choice = '8';
                      }
                      else
                      {
                        const modalRef = this.modalService.open(NgbdModalContentSignup,{centered: true} );
                        modalRef.componentInstance.choice = '7';
                      }
                    });
                  }
                });
            }
          }
          /* If user didn't choose to verify */
          else
          {
            this.userService.save(this.user).subscribe(createUserResult => 
            {
              /* stellar transaction error */
              if(createUserResult == 0)
              {
                const modalRef = this.modalService.open(NgbdModalContentSignup,{centered: true} );
                modalRef.componentInstance.choice = '7';
              }
              else
              {
                console.log(createUserResult.toString);
                this.userService.emailVerify(createUserResult.toString()).subscribe(verificationResult =>
                {
                  if(verificationResult == 1)
                  console.log("Sending Email success");
                });
                console.log("userService emailVerify");
                const modalRef = this.modalService.open(NgbdModalContentSignup,{centered: true} );
                modalRef.componentInstance.choice = '8';
              }
            });
          }
        }
      })
    }
  }
  onFileChanged(event,choice : number) 
  {
    if(choice == 1)
    {
      console.log(event);
      this.identityFile = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event2) => 
      {
        this.identityURL = reader.result;
      };
      this.identityURL = reader.result;
    }
    else
    {
      console.log(event);
      this.signatureFile = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event2) => 
      {
        this.signatureURL = reader.result;
      };
      this.signatureURL = reader.result;
    }
  }

}


@Component({
  selector: 'ngbd-modal-content',
  template: `
  
  <div *ngIf="choice == 1">
    <div class="modal-header">
      <h3>Error</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>Please insert image</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  </div>



  <div *ngIf="choice == 2">
    <div class="modal-header">
      <h3>Error</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>Password does not matched</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  </div>


  <div *ngIf="choice == 3">
    <div class="modal-header">
      <h3>Error</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>Username must have more than 4 letters</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  </div>


  <div *ngIf="choice == 4">
    <div class="modal-header">
      <h3>Error</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>Password must have more than 4 letters</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  </div>


  <div *ngIf="choice == 5">
    <div class="modal-header">
      <h3>Error</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>User name already exist, Please change</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  </div>


  <div *ngIf="choice == 6">
    <div class="modal-header">
      <h3>Error</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>User Email already exist, Please change</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  </div>


  <div *ngIf="choice == 7">
    <div class="modal-header">
      <h3>Error</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>Error occured, Please try again</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  </div>



  <div *ngIf="choice == 8">
    <div class="modal-header">
      <h3>Success</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>Please verify your email</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  </div>

  `
})
export class NgbdModalContentSignup
{
  @Input() choice;
  constructor(public activeModal: NgbActiveModal, private router: Router)
  {
  }
}