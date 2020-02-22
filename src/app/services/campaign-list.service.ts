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

  constructor(private http:HttpClient) { 
    this.campaignListUrl = 'http://localhost:8080/campaigns-list'
    this.campaignIdUrl = 'http://localhost:8080/campaigns'}
  
  public findAll(): Observable<CampaignModel[]> {
    return this.http.get<CampaignModel[]>(this.campaignListUrl);
  }
  public getCampaignDetails(campaignID){
    return this.http.get(this.campaignIdUrl + '/' + campaignID);
  }
  

} 
