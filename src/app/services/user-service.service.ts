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
  private getUserBalanceUrl: string;
  private userId: number;
  constructor(private http: HttpClient) 
  {
    this.emailUrl= 'http://34.87.165.176:8080/sendmail';
    this.usersUrl = 'http://34.87.165.176:8080/users';
    this.checkVerification = 'http://34.87.165.176:8080/checkVerification';
    this.getUserIdUrl = 'http://34.87.165.176:8080/getUserId';
    this.checkUserUrl = 'http://34.87.165.176:8080/checkUser';
    this.verficationUserUrl = "http://34.87.165.176:8080/userImageVerification";
    this.signatureUserUrl = 'http://34.87.165.176:8080/userImageSignature';
    this.privilegeUrl = 'http://34.87.165.176:8080/checkPrivilege';
    this.verificationRequestUserUrl = 'http://34.87.165.176:8080/getverificationrequest'
    this.getUserByIdUrl = 'http://34.87.165.176:8080/getUser';
    this.approveUserIdentityUrl = 'http://34.87.165.176:8080/approveuseridentity'
    this.declineUserIdentityUrl = 'http://34.87.165.176:8080/declineuseridentity'
    this.setUserCoverImageUrl = 'http://34.87.165.176:8080/setUserCoverImage'
    this.getUserBalanceUrl = 'http://34.87.165.176:8080/getUserBalance'
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
  public getUserBalance()
  {
    this.userId = +sessionStorage.getItem('userId')
    return  this.http.get<string>(this.getUserBalanceUrl+'/'+this.userId)
  }
  
}