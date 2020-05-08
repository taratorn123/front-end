import { User } from './../../models/User';
import { UserService } from './user-service.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EditProfileDataService } from './../services/edit-profile-data.service';
import { GlobalConstantsService } from '../global-constants.service'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  private findByUsernameUrl: string;
  private isAuthenticated: boolean;
  private getUserId: string;
  private result: boolean = false;
  isMatch: boolean;
  constructor(private userService: UserService, 
              private http: HttpClient,
              private editProfileDataService: EditProfileDataService) 
  {
    this.findByUsernameUrl = GlobalConstantsService.apiURL+'findByUsername';
    this.getUserId = GlobalConstantsService.apiURL+'getUserId';
  }

  authenticate(user:User, username:string, password:string) 
  {
    this.http.post<boolean>(this.findByUsernameUrl, user).subscribe(result => 
    {
      if(result == true)
      {
        this.result = true;
        sessionStorage.setItem('username',  user.username);

      }
    });
    return this.http.post<boolean>(this.findByUsernameUrl, user);

  }

  isUserLoggedIn() 
  {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  logOut() 
  {
    sessionStorage.clear();
  }
}
