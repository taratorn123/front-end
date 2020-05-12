import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.css']
})
export class RecoverAccountComponent implements OnInit {

  private nullresult:boolean = false;
  private accountFound:boolean = false;
  private userEmail:string;
  constructor(private userService:UserService) 
  { 

  }

  ngOnInit() 
  {
  }
  onSubmit()
  {
    this.userService.recoverAccount(this.userEmail).subscribe(result=>
      {
        if(result)
        {
          this.accountFound=true;
          this.userService.sendUserRecoverEmail(this.userEmail).subscribe(emailResult=>
            {
            })
        }
        else
        {
          this.nullresult=true;
        }
      })
  }
  

}
