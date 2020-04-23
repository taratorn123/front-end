import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampaignModel} from './../../models/campaign-model';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CampaignFormService {
  private campaignModel: CampaignModel = new CampaignModel();
  private isPersonalFormValid: boolean = false;
  private isWorkFormValid: boolean = false;
  private isAddressFormValid: boolean = false;

  private campaignUrl: string;
  private campaignUserUrl: string;
  constructor(private http : HttpClient) {
    this.campaignUrl = 'http://localhost:8080/campaigns';
    this.campaignUserUrl = 'http://localhost:8080/campaignUser';
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

  //Save user(campaign's owner) and campaign together
  public saveCampaignUser(campaignModel:CampaignModel){
    return this.http.post<number>(this.campaignUserUrl, campaignModel)
  }

}
