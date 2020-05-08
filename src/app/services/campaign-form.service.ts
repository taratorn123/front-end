import { CampaignUpdate } from './../../models/campaign-update';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampaignModel} from './../../models/campaign-model';
import { Observable } from 'rxjs/Observable';
import { GlobalConstantsService } from '../global-constants.service'
@Injectable({
  providedIn: 'root'
})
export class CampaignFormService {
  private campaignModel: CampaignModel = new CampaignModel();
  private isPersonalFormValid: boolean = false;
  private isWorkFormValid: boolean = false;
  private isAddressFormValid: boolean = false;

  private editCampaignUrl:string;
  private campaignUrl: string;
  private campaignUserUrl: string;
  private updateCampaignUrl: string;
  private updateCampaignIdUrl: string;

  constructor(private http : HttpClient) 
  {
    this.campaignUrl = GlobalConstantsService.apiURL+'campaigns';
    this.campaignUserUrl = GlobalConstantsService.apiURL+'campaignUser';
    this.editCampaignUrl = GlobalConstantsService.apiURL+'editCampaigns';
    this.updateCampaignUrl = GlobalConstantsService.apiURL+'updateCampaigns';
    this.updateCampaignIdUrl = GlobalConstantsService.apiURL+'updateCampaignsId';
   }
  
   // Return the entire Form Data
  getFormData(): CampaignModel {
      return this.campaignModel;
  }
  
  // Return the form data after all this.* members had been reset
  resetFormData(): CampaignModel {
      this.campaignModel.clear();
      this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
      return this.campaignModel;
  }
  
  // Return true if all forms had been validated successfully; otherwise, return false
  isFormValid() {
      return this.isPersonalFormValid &&
              this.isWorkFormValid && 
              this.isAddressFormValid;
  }

  //Save campaign then return campaignId
  public saveCampaign(campaignModel:CampaignModel) {
    return this.http.post<number>(this.campaignUrl, campaignModel);
  }
  //Edit campaign then return campaignId
  public editCampaign(campaignModel:CampaignModel) {
    return this.http.post<number>(this.editCampaignUrl, campaignModel);
  }
  //Save user(campaign's owner) and campaign together
  public saveCampaignUser(campaignModel:CampaignModel){
    return this.http.post<number>(this.campaignUserUrl, campaignModel)
  }
  //Save campaign's update
  public saveCampaignUpdate(campaignUpdate:CampaignUpdate){
    return this.http.post<number>(this.updateCampaignUrl, campaignUpdate)
  }

  public getLastestUpdateId(){
    return this.http.get<number>(this.updateCampaignIdUrl)
  }
}
