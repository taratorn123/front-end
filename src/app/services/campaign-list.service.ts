import { AccountDonation } from './../../models/account-donation.model';
import { CampaignUpdate } from './../../models/campaign-update';
import { CampaignModel } from './../../models/campaign-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Report } from 'src/models/report.model';
import { GlobalConstantsService } from '../global-constants.service'
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
  private getCampaignCurrentDonate: string;
  private deleteCampaignUrl: string;
  private finishedCampaignUrl: string;
  private getFinishedCampaignUrl: string;
  private getMostActiveUrl: string;
  private getDonateTimesUrl: string;
  private addDonateTimesUrl: string;

  constructor(private http:HttpClient) 
  { 
    this.campaignListUrl = GlobalConstantsService.apiURL+'campaigns-list'
    this.campaignIdUrl = GlobalConstantsService.apiURL+'campaigns'
    this.campaignByUserIdUrl = GlobalConstantsService.apiURL+'userscampaigns'
    this.campaignUpdateByCampaignIdUrl = GlobalConstantsService.apiURL+'getUpdateCampaigns'
    this.campaignCommentByCampaignIdUrl = GlobalConstantsService.apiURL+'getCommentCampaigns'
    this.campaignInActivateUrl = GlobalConstantsService.apiURL+'inactivateCampaign'
    this.deleteCampaignUrl = GlobalConstantsService.apiURL+'deleteCampaign'
    this.getInactiveCampaignUrl = GlobalConstantsService.apiURL+'getInactiveCampaign'
    this.activateCampaignUrl = GlobalConstantsService.apiURL+'activeCampaign'
    this.campaignByCategoryUrl = GlobalConstantsService.apiURL+'getCampaignCategory'
    this.getCampaignCurrentDonate = GlobalConstantsService.apiURL+'getTotalDonate'
    this.finishedCampaignUrl = GlobalConstantsService.apiURL+'finishedCampaign'
    this.getFinishedCampaignUrl = GlobalConstantsService.apiURL+'getFinishedCampaign'
    this.getMostActiveUrl = GlobalConstantsService.apiURL+'getMostActive'
    this.getDonateTimesUrl = GlobalConstantsService.apiURL+'getDonateTimes'
    this.addDonateTimesUrl = GlobalConstantsService.apiURL+'addDonateTimes'

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
    return this.http.post<boolean>(this.campaignInActivateUrl,campaignId);
  }
  public deleteCampaign(campaignId:string)
  {
    return this.http.post<string>(this.deleteCampaignUrl,campaignId);
  }
  public getInactiveCampaign()
  {
    return this.http.get<CampaignModel[]>(this.getInactiveCampaignUrl)
  }
  public activateCampaign(campaignId : String)
  {
    return this.http.post<boolean>(this.activateCampaignUrl,campaignId);
  }
  public getTotalDonate(campaignId : number)
  {
    return this.http.get<number>(this.getCampaignCurrentDonate+'/'+campaignId)
  }
  public finishedCampaign(campaignId:number){
    return this.http.post(this.finishedCampaignUrl,campaignId);
  }
  public getFinishedCampaign(finished : boolean)
  {
    return this.http.get<CampaignModel[]>(this.getFinishedCampaignUrl+'/'+finished)
  }
  public getMostActive()
  {
    return this.http.get<CampaignModel[]>(this.getMostActiveUrl)
  }
  public getDonateTimes(campaignId:number)
  {
    return this.http.get<number>(this.getDonateTimesUrl+'/'+campaignId)
  }
  public addDonateTimes(campaign: CampaignModel){
    return this.http.post(this.addDonateTimesUrl,campaign)
  }
} 
