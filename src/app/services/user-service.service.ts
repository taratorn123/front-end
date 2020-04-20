import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/models/User';
import { Observable } from 'rxjs/Observable';
import { tick } from '@angular/core/testing';
 
@Injectable()
export class UserService 
{
 
  private usersUrl: string;
  private emailUrl: string;
  private checkVerification: string;
  private getUserIdUrl:string;
  private checkUserUrl: string;
  private verficationUserUrl: string;

  constructor(private http: HttpClient) 
  {
    this.emailUrl= 'http://localhost:8080/sendmail';
    this.usersUrl = 'http://localhost:8080/users';
    this.checkVerification = 'http://localhost:8080/checkVerification';
    this.getUserIdUrl = 'http://localhost:8080/getUserId';
    this.checkUserUrl = 'http://localhost:8080/checkUser';
    this.verficationUserUrl = "http://localhost:8080/userImageVerification"
  }


  public findAll(): Observable<User[]> 
  {
    return this.http.get<User[]>(this.usersUrl);
  }

  public getUserId(username: string)
  {
      return this.http.get<string>(this.getUserIdUrl+'/'+username);
  }

  public save(user: User) 
  {
    return this.http.post<number>(this.usersUrl, user);
  }

  public emailVerify(id: string)
  {
    console.log("Sending email to backend");
    return this.http.get<number>(this.emailUrl+'/'+id);
  }
  public checkUserVerification(id: string)
  {
    return this.http.get<number>(this.checkVerification+'/'+id);
  }
  public checkUserExistence(user: User)
  {
    return this.http.post<number>(this.checkUserUrl,user);
  }
  public saveVerification(uploadData: FormData)
  {
    return this.http.post<boolean>(this.verficationUserUrl,uploadData);
  }
  
}