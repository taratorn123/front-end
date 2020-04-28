import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user-service.service'
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-identity-verification',
  templateUrl: './user-identity-verification.component.html',
  styleUrls: ['./user-identity-verification.component.css']
})
export class UserIdentityVerificationComponent implements OnInit {

  identityURL: any;
  signatureURL: any;
  identityFile : any;
  signatureFile : any;
  userId: any;
  user: User;

  constructor(private userService : UserService,
    private router: Router,private storage:AngularFireStorage,
    private modalService : NgbModal) 
  { 

  }

  ngOnInit() 
  {
    this.userId = sessionStorage.getItem('userId');
    if(this.userId == null)
    {
      this.router.navigate(['/'])
    }
    this.userService.getUserById(this.userId).subscribe(data=>
      {
        this.user = data;
      })
  }

  onImageChanged(event,choice : number) 
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
  verify()
  {
    var verificationFilePath = `${this.user.id}/verification/verification.jpg`
    var signatureFilePath = `${this.user.id}/verification/signature.jpg`
    const verificationFileRef = this.storage.ref(verificationFilePath);
    const signatureFileRef = this.storage.ref(signatureFilePath);
    console.log("filePath: "+verificationFilePath)
    console.log("filePath: "+signatureFilePath)
    this.storage.upload(verificationFilePath,this.identityFile).snapshotChanges().pipe
    (
      finalize(()=>
      {
        verificationFileRef.getDownloadURL().subscribe((verificationUrl)=>
        {
          this.user.routeImageVerification = verificationUrl;
          console.log("Verfication "+this.user.routeImageVerification)
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
                    console.log("Signature "+this.user.routeSignatureImage)
                    //Send new assigned value (campaignId with userId, coverImagePath) to Springboot
                    this.userService.saveSignature(this.user).subscribe(signatureResult=>
                    {
                      if(signatureResult)
                      {
                        const modalRef = this.modalService.open(NgbdModalContentEdit,{centered: true} );
                        modalRef.componentInstance.choice = '1';
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
  }

}

@Component({
  selector: 'ngbd-modal-content',
  template: `
  
  <div *ngIf="choice == 1">
    <div class="modal-header">
      <h3>SENDING</h3>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h4>Success your verification image has been send!</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="navigateEdit()">Close</button>
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
export class NgbdModalContentEdit
{
  @Input() choice;
  constructor(public activeModal: NgbActiveModal, private router: Router)
  {
  }
  navigateEdit()
  {
    this.activeModal.close('Close click')
    this.router.navigate(['/edit-profile'])
  }
}