import { Injectable } from '@angular/core';
import { AccountDonation } from 'src/models/account-donation.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from 'src/models/transaction.model'
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private usersUrl: string;
  private historyTransactionCampaignUrl: string;
  private historyTransactionUserUrl: string;
  private requestTransactionReportUrl: string;

  constructor(private http:HttpClient, private location:Location) 
  { 
    this.usersUrl = 'http://34.87.165.176:8080/sendDonation'
    this.historyTransactionCampaignUrl = 'http://34.87.165.176:8080/getHistoryTransactionCampaign'
    this.historyTransactionUserUrl = 'http://34.87.165.176:8080/getHistoryTransactionUser'
    this.requestTransactionReportUrl = 'http://34.87.165.176:8080/RequestForTransactionReport'
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
  
  public requestTransactionReport(transactionId: String)
  {
    return this.http.get(this.requestTransactionReportUrl+'/'+transactionId, {responseType: 'text'});
  }

}
