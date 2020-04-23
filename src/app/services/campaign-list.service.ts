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
  private campaignInActivateUrl: string;
  private getInactiveCampaignUrl: string;
  private activateCampaignUrl: string;

  constructor(private http:HttpClient) 
  { 
    this.campaignListUrl = 'http://localhost:8080/campaigns-list'
    this.campaignIdUrl = 'http://localhost:8080/campaigns'
    this.campaignByUserIdUrl = 'http://localhost:8080/userscampaigns'
    this.campaignInActivateUrl = 'http://localhost:8080/inactivateCampaign'
    this.getInactiveCampaignUrl = 'http://localhost:8080/getInactiveCampaign'
    this.activateCampaignUrl = 'http://localhost:8080/activeCampaign'
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
