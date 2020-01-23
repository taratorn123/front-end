import { User } from './../../models/User';
import { UserService } from './../user-service.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  private findByUsernameUrl: string;
  private isAuthenticated: boolean;
 
  isMatch: boolean;
  
  constructor(private userService: UserService, private http: HttpClient) {
    this.findByUsernameUrl = 'http://25.22.233.154:8080/findByUsername';

  }

  authenticate(user:User, username:string, password:string) {
     this.http.post<boolean>(this.findByUsernameUrl, user).subscribe(result => {
       if(result == true){
        sessionStorage.setItem('username',  username)
       }
     });
  
    return this.http.post<boolean>(this.findByUsernameUrl, user);
  
  //  .subscribe(response => {
  //   if (username === response["username"]   && password === response["password"]) {
     
  //     sessionStorage.setItem('username', username)
  //     this.isAuthenticated = true;
  //     console.log(this.isAuthenticated+"isAuthenticateddude")
  //   } else {
  //     console.log(response["username"]);
  //     console.log(response["password"]);
      
  //     this.isAuthenticated = false;
  //     console.log(this.isAuthenticated+"isAuthenticateddude")

  //   }
  // }
  //  );
    
  }
    
    

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}