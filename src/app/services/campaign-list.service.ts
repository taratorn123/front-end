import { CampaignModel } from './../../models/campaign-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignListService {
  private campaignListUrl: string;
  private campaignIdUrl: string;
  private campaignByUserIdUrl: string;
  private campaignHeaderDetailUrl: string;

  constructor(private http:HttpClient) 
  { 
    this.campaignListUrl = 'http://localhost:8080/campaigns-list'
    this.campaignIdUrl = 'http://localhost:8080/campaigns'
    this.campaignByUserIdUrl = 'http://localhost:8080/userscampaigns'
    this.campaignHeaderDetailUrl = 'http://localhost:8080/'
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
} 
