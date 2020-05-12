import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user-service.service';
import { User } from '../../models/User';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from "rxjs/operators"
import { AngularFireStorage } from '@angular/fire/storage';


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
    private userService: UserService, private modalService : NgbModal,
    private storage:AngularFireStorage) 
  {
    this.user = new User();
  }
 
  onSubmit() 
 {
    /* password not match */
    if(this.user.password == this.user.passwordConfirmation && this.user.username.length > 4 &&
      this.user.password.length > 4)
    {
      /* check user existence*/
      this.userService.checkUserExistence(this.user).subscribe(result =>
        {
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
                  this.user.id = createUserResult
                  var verificationFilePath = `${this.user.id}/verification/verification.jpg`
                  var signatureFilePath = `${this.user.id}/verification/signature.jpg`
                  const verificationFileRef = this.storage.ref(verificationFilePath);
                  const signatureFileRef = this.storage.ref(signatureFilePath);
                  const modalRef = this.modalService.open(NgbdModalContentSignup,{centered: true} );
                  modalRef.componentInstance.choice = '9';
                  this.storage.upload(verificationFilePath,this.identityFile).snapshotChanges().pipe
                  (
                    finalize(()=>
                    {
                      verificationFileRef.getDownloadURL().subscribe((verificationUrl)=>
                      {
                        this.user.routeImageVerification = verificationUrl;
                        //Send new assigned value (campaignId with userId, coverImagePath) to Springboot
                        this.userService.saveVerification(this.user).subscribe(verificationResult=>
                        {
                          if(verificationResult)
                          {
                            this.storage.upload(signatureFilePath,this.signatureFile).snapshotChanges().pipe
                            (
                              finalize(()=>
                              {
                                signatureFileRef.getDownloadURL().subscribe((signatureUrl)=>
                                {
                                  this.user.routeSignatureImage = signatureUrl;
                                  //Send new assigned value (campaignId with userId, coverImagePath) to Springboot
                                  this.userService.saveSignature(this.user).subscribe(signatureResult=>
                                  {
                                    if(signatureResult)
                                    {
                                      
                                      this.user.routeUserImage = '../../assets/img/Registration/DefaultUser.png'
                                      this.userService.setUserCoverImage(this.user).subscribe(coverResult=>
                                        {
                                          if(coverResult)
                                          {
                                            this.userService.emailVerify(createUserResult.toString()).subscribe(verificationResult =>
                                              {
                                                if(verificationResult)
                                                {
                                                  modalRef.componentInstance.choice = '8';
                                                }
                                              });
                                          }
                                        })
                                    }
                                  })
                                })
                              })
                            ).subscribe();
                          }
                        })
                      })
                    })
                  ).subscribe();
                });
              }
            }
            /* If user didn't choose to verify */
            else
            {
              this.userService.save(this.user).subscribe(createUserResult => 
              {
                this.user.id = createUserResult
                this.user.routeUserImage = '../../assets/img/Registration/DefaultUser.png'
                const modalRef = this.modalService.open(NgbdModalContentSignup,{centered: true} );
                modalRef.componentInstance.choice = '9';
                this.userService.setUserCoverImage(this.user).subscribe(coverResult=>
                  {
                    if(coverResult)
                    {
                      this.userService.emailVerify(createUserResult.toString()).subscribe(verificationResult =>
                        {
                          modalRef.componentInstance.choice = '8';
                        });
                    }
                  })
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
      <button type="button" class="btn btn-primary" (click)="navigateLogin()">Close</button>
    </div>
  </div>

  <div *ngIf="choice == 9">
    <div class="modal-header">
      <h3>In progress</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>Please wait a moment</h4>
    </div>
  </div>

  <div *ngIf="choice == 10">
    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">Edit Profile</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      Successful
    </div>
  </div>

  `,
  styles: [`
  .modal-header
    {
      border: none !important;
    }
    .modal-footer
    {
      border: none !important;
    }
  `],
})
export class NgbdModalContentSignup
{
  @Input() choice;
  constructor(public activeModal: NgbActiveModal, private router: Router)
  {
  }
  navigateLogin()
  {
    this.activeModal.close('Close click')
    this.router.navigate(['/sign-in'])
  }
}