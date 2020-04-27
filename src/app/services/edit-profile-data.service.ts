import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class EditProfileDataService {
  public API = '//localhost:8080';
  public CURRENTUSER_API = this.API + '/current-user';
  public CURRENTUSER_API_EDIT = this.API+ '/current-user/edit'
  public userName: string;
  constructor(private http: HttpClient) {
   }
  /* Get user data of current user, by using username from sesstionStorage */
  get() {
    this.userName = sessionStorage.getItem('username');
    return this.http.get<User>(this.CURRENTUSER_API + '/' + this.userName);
  }

  editUserDetail(user : User) {
    return this.http.post<User>(this.CURRENTUSER_API_EDIT, user);
  }
}
