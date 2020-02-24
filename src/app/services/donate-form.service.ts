import { Injectable } from '@angular/core';
import { AccountDonation } from 'src/models/account-donation.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonateFormService {

  private usersUrl: string;
  constructor(private http:HttpClient ) 
  { 
    this.usersUrl = 'http://localhost:8080/sendDonation'
  }
  public saveDonation(accountDonation: AccountDonation) 
  {
    /*<obj> this tag use set object type from backend*/
    return this.http.post<Number>(this.usersUrl, accountDonation);
  }
}
