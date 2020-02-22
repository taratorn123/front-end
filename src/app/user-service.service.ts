import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
 
  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://35.247.130.239:8080/users';

  }
 
  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  
 
  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }

}