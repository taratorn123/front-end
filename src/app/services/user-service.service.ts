import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/models/User';
import { Observable } from 'rxjs/Observable';
import { tick } from '@angular/core/testing';
import { GlobalConstantsService } from '../global-constants.service'
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
    this.emailUrl= GlobalConstantsService.apiURL+'sendmail';
    this.usersUrl = GlobalConstantsService.apiURL+'users';
    this.checkVerification = GlobalConstantsService.apiURL+'checkVerification';
    this.getUserIdUrl = GlobalConstantsService.apiURL+'getUserId';
    this.checkUserUrl = GlobalConstantsService.apiURL+'checkUser';
    this.verficationUserUrl = GlobalConstantsService.apiURL+'userImageVerification';
    this.signatureUserUrl = GlobalConstantsService.apiURL+'userImageSignature';
    this.privilegeUrl = GlobalConstantsService.apiURL+'checkPrivilege';
    this.verificationRequestUserUrl = GlobalConstantsService.apiURL+'getverificationrequest'
    this.getUserByIdUrl = GlobalConstantsService.apiURL+'getUser';
    this.approveUserIdentityUrl = GlobalConstantsService.apiURL+'approveuseridentity'
    this.declineUserIdentityUrl = GlobalConstantsService.apiURL+'declineuseridentity'
    this.setUserCoverImageUrl = GlobalConstantsService.apiURL+'setUserCoverImage'
    this.getUserBalanceUrl = GlobalConstantsService.apiURL+'getUserBalance'
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