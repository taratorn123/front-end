import { Injectable } from '@angular/core';
import { AccountDonation } from 'src/models/account-donation.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from 'src/models/transaction.model'
import { Location } from '@angular/common';
import { GlobalConstantsService } from '../global-constants.service'

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
    this.usersUrl = GlobalConstantsService.apiURL+'sendDonation'
    this.historyTransactionCampaignUrl = GlobalConstantsService.apiURL+'getHistoryTransactionCampaign'
    this.historyTransactionUserUrl = GlobalConstantsService.apiURL+'getHistoryTransactionUser'
    this.requestTransactionReportUrl = GlobalConstantsService.apiURL+'RequestForTransactionReport'
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
