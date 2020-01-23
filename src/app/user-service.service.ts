import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class UserService {
 
  private usersUrl: string;
  private findByUsernameUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
    this.findByUsernameUrl = 'http://localhost:8080/findByUsername';

  }
 
  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  
 
  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }

  public authenticate(user:User) {
    
    return this.http.post<boolean>(this.findByUsernameUrl, user);
  }
}