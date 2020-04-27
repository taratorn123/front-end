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
  private privilegeUrl: string;
  private verificationRequestUserUrl: string;
  private signatureUserUrl: string;
  private getUserByIdUrl: string;
  private approveUserIdentityUrl: string;
  private declineUserIdentityUrl: string;
  private setUserCoverImageUrl: string;
  constructor(private http: HttpClient) 
  {
    this.emailUrl= 'http://localhost:8080/sendmail';
    this.usersUrl = 'http://localhost:8080/users';
    this.checkVerification = 'http://localhost:8080/checkVerification';
    this.getUserIdUrl = 'http://localhost:8080/getUserId';
    this.checkUserUrl = 'http://localhost:8080/checkUser';
    this.verficationUserUrl = "http://localhost:8080/userImageVerification";
    this.signatureUserUrl = 'http://localhost:8080/userImageSignature';
    this.privilegeUrl = 'http://localhost:8080/checkPrivilege';
    this.verificationRequestUserUrl = 'http://localhost:8080/getverificationrequest'
    this.getUserByIdUrl = 'http://localhost:8080/getUser';
    this.approveUserIdentityUrl = 'http://localhost:8080/approveuseridentity'
    this.declineUserIdentityUrl = 'http://localhost:8080/declineuseridentity'
    this.setUserCoverImageUrl = 'http://localhost:8080/setUserCoverImage'
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
    return this.http.post<boolean>(this.emailUrl,id);
  }
  public checkUserVerification(id: string)
  {
    return this.http.get<number>(this.checkVerification+'/'+id);
  }
  public checkUserExistence(user: User)
  {
    return this.http.post<number>(this.checkUserUrl,user);
  }
  public saveVerification(user: User)
  {
    return this.http.post<boolean>(this.verficationUserUrl,user);
  }
  public saveSignature(user: User)
  {
    return this.http.post<boolean>(this.signatureUserUrl,user);
  }
  public getUserPrivilege(userId : string)
  {
    return this.http.post<number>(this.privilegeUrl,userId);
  }
  public getVerificationRequestUser()
  {
    return this.http.get<User[]>(this.verificationRequestUserUrl);
  }
  public getUserById(userId:String)
  {
    return this.http.post<User>(this.getUserByIdUrl,userId);
  }
  public approveUserIdentity(userId : String)
  {
    return this.http.post<boolean>(this.approveUserIdentityUrl,userId)
  }
  public declineUserIdentity(userId : String)
  {
    return this.http.post<boolean>(this.declineUserIdentityUrl,userId)
  }
  public setUserCoverImage(user : User)
  {
    return this.http.post<boolean>(this.setUserCoverImageUrl,user);
  }
  
}