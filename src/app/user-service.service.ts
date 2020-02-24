import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';
import { tick } from '@angular/core/testing';
 
@Injectable()
export class UserService 
{
 
  private usersUrl: string;
  private emailUrl: string;


  constructor(private http: HttpClient) 
  {
    this.emailUrl= 'http://localhost:8080/sendmail';
    this.usersUrl = 'http://localhost:8080/users';

  }

  public findAll(): Observable<User[]> 
  {
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: User) {
    return this.http.post<number>(this.usersUrl, user);
  }

  public emailVerify(user: User)
  {
    console.log("Sending email to backend");
    return this.http.post<number>(this.emailUrl, user);
  }
  
}