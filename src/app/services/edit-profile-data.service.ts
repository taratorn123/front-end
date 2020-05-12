import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/User';
import { GlobalConstantsService } from '../global-constants.service'
import { PasswordUpdate } from '../../models/password-update.model'

@Injectable({
  providedIn: 'root'
})
export class EditProfileDataService 
{
  public CURRENTUSER_API = GlobalConstantsService.apiURL+ 'current-user';
  public CURRENTUSER_API_EDIT = GlobalConstantsService.apiURL+'current-user/edit'
  public userName: string;
  private changePasswordUrl : string = GlobalConstantsService.apiURL+'editPassword'; 
  constructor(private http: HttpClient) 
  {
   
  }
  /* Get user data of current user, by using username from sesstionStorage */
  get() {
    this.userName = sessionStorage.getItem('username');
    return this.http.get<User>(this.CURRENTUSER_API + '/' + this.userName);
  }

  editUserDetail(user : User) {
    return this.http.post<number>(this.CURRENTUSER_API_EDIT, user);
  }
  changePassword(password : PasswordUpdate)
  {
    return this.http.post<boolean>(this.changePasswordUrl,password);
  }
}
