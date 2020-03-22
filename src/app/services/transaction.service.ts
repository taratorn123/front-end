import { Injectable } from '@angular/core';
import { AccountDonation } from 'src/models/account-donation.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from 'src/models/transaction.model'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private usersUrl: string;
  private historyTransactionUrl: string;

  constructor(private http:HttpClient ) 
  { 
    this.usersUrl = 'http://localhost:8080/sendDonation'
    this.historyTransactionUrl = 'http://localhost:8080/getHistoryTransactionCampaign'
  }
  public saveDonation(accountDonation: AccountDonation) 
  {
    /*<obj> this tag use set object type from backend*/
    return this.http.post<Number>(this.usersUrl, accountDonation);
  }
  public getHistoryDonation(campaignId: String)
  {
    return this.http.get<Transaction[]>(this.historyTransactionUrl+'/'+campaignId);
  }

}
