import { AccountDonation } from './../../models/account-donation.model';
import { CampaignUpdate } from './../../models/campaign-update';
import { CampaignModel } from './../../models/campaign-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Report } from 'src/models/report.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignListService {
  private campaignListUrl: string;
  private campaignIdUrl: string;
  private campaignByUserIdUrl: string;
  private campaignUpdateByCampaignIdUrl: string;
  private campaignCommentByCampaignIdUrl: string;
  private campaignByCategoryUrl: string;

  private campaignInActivateUrl: string;
  private getInactiveCampaignUrl: string;
  private activateCampaignUrl: string;
  
  constructor(private http:HttpClient) 
  { 
    this.campaignListUrl = 'http://localhost:8080/campaigns-list'
    this.campaignIdUrl = 'http://localhost:8080/campaigns'
    this.campaignByUserIdUrl = 'http://localhost:8080/userscampaigns'
    this.campaignUpdateByCampaignIdUrl = 'http://localhost:8080/getUpdateCampaigns'
    this.campaignCommentByCampaignIdUrl = 'http://localhost:8080/getCommentCampaigns'
    this.campaignInActivateUrl = 'http://localhost:8080/inactivateCampaign'
    this.getInactiveCampaignUrl = 'http://localhost:8080/getInactiveCampaign'
    this.activateCampaignUrl = 'http://localhost:8080/activeCampaign'
    this.campaignByCategoryUrl = 'http://localhost:8080/getCampaignCategory'
  }
  
  public findAll() 
  {
    return this.http.get<CampaignModel[]>(this.campaignListUrl);
  }
  public getCampaignDetails(campaignID)
  {
    return this.http.get<CampaignModel>(this.campaignIdUrl + '/' + campaignID);
  }
  public findCampaignByCurrentUser() 
  {
    var userIdLong = +sessionStorage.getItem('userId')
    return this.http.get<CampaignModel[]>(this.campaignByUserIdUrl+ '/' + userIdLong);
  }
  //Find list of updates using campaignId
  public findUpdateCampaignByCurrentCampaign(campaignId: number) 
  {
    return this.http.get<CampaignUpdate[]>(this.campaignUpdateByCampaignIdUrl+ '/' + campaignId);
  }
  //Find list of updates using campaignId
  public findCommentCampaignByCurrentCampaign(campaignId: number) 
  {
    return this.http.get<AccountDonation[]>(this.campaignCommentByCampaignIdUrl+ '/' + campaignId);
  }
  //Find list of campaigns using category
  public findCampaignByCategory(campaignCategory: string) 
  {
    return this.http.get<CampaignModel[]>(this.campaignByCategoryUrl+ '/' + campaignCategory);
  }
  public inActivateCampaign(campaignId:String)
  {
    console.log("Inactivate")
    return this.http.post<boolean>(this.campaignInActivateUrl,campaignId);
  }
  public getInactiveCampaign()
  {
    return this.http.get<CampaignModel[]>(this.getInactiveCampaignUrl)
  }
  public activateCampaign(campaignId : String)
  {
    return this.http.post<boolean>(this.activateCampaignUrl,campaignId);
  }
} 
