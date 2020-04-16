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
  
  // Return the StepOne data
  // getPersonal(): StepOne {
  //   var personal: StepOne = {
  //       targetDonation: this.campaignModel.targetDonation,
  //       campaignName: this.campaignModel.campaignName,
  //       category: this.campaignModel.category,
  //       fundRaisingAs: this.campaignModel.fundRaisingAs,
  //   };
  //   return personal;
  // }
  
 // Update the StepOne data only when the StepOne Form had been validated successfully
  // setPersonal(data: StepOne) {
  //     this.isPersonalFormValid = true;
  //     this.campaignModel.targetDonation = data.targetDonation;
  //     this.campaignModel.campaignName = data.campaignName;
  //     this.campaignModel.category = data.category;
  //     this.campaignModel.fundRaisingAs = data.fundRaisingAs;
  // }

  getFormData(): CampaignModel {
      // Return the entire Form Data
      return this.campaignModel;
  }

  resetFormData(): CampaignModel {
      // Return the form data after all this.* members had been reset
      this.campaignModel.clear();
      this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
      return this.campaignModel;
  }

  isFormValid() {
      // Return true if all forms had been validated successfully; otherwise, return false
      return this.isPersonalFormValid &&
              this.isWorkFormValid && 
              this.isAddressFormValid;
  }

  //Save campaign then return campaignId
  public saveCampaign(uploadData: FormData) {
    return this.http.post<number>(this.campaignUrl, uploadData);
  }

  //Save user(campaign's owner) and campaign together
  public saveCampaignUser(CampaignModel:CampaignModel){
    return this.http.post<number>(this.campaignUserUrl, CampaignModel)
  }

}
