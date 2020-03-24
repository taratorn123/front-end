import { Injectable } from '@angular/core';
import { AccountDonation } from 'src/models/account-donation.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from 'src/models/transaction.model'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private usersUrl: string;
  private historyTransactionCampaignUrl: string;
  private historyTransactionUserUrl: string;

  constructor(private http:HttpClient ) 
  { 
    this.usersUrl = 'http://localhost:8080/sendDonation'
    this.historyTransactionCampaignUrl = 'http://localhost:8080/getHistoryTransactionCampaign'
    this.historyTransactionUserUrl = 'http://localhost:8080/getHistoryTransactionUser'
  }
  public saveDonation(accountDonation: AccountDonation) 
  {
    /*<obj> this tag use set object type from backend*/
    return this.http.post<Number>(this.usersUrl, accountDonation);
  }
  public getHistoryDonationCampaign(campaignId: String)
  {
    return this.http.get<Transaction[]>(this.historyTransactionCampaignUrl+'/'+campaignId);
  }
  public getHistoryDonationUser(userId: String)
  {
    return this.http.get<Transaction[]>(this.historyTransactionUserUrl+'/'+userId);
  }

}
