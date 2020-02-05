import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampaignModel, StepOne } from './../../models/campaign-model';

@Injectable({
  providedIn: 'root'
})
export class CampaignFormService {
  private campaignModel: CampaignModel = new CampaignModel();
  private isPersonalFormValid: boolean = false;
  private isWorkFormValid: boolean = false;
  private isAddressFormValid: boolean = false;

  private campaignUrl: string;
  constructor(private http : HttpClient) {
    this.campaignUrl = 'http://localhost:8080/campaigns';
   }
  
  getPersonal(): StepOne {
    // Return the StepOne data
    var personal: StepOne = {
        targetDonation: this.campaignModel.targetDonation,
        campaignName: this.campaignModel.campaignName,
        category: this.campaignModel.category,
        fundRaisingAs: this.campaignModel.fundRaisingAs,
        // email: this.campaignModel.email
    };
    return personal;
  }
  
  public saveCampaign(campaignModel: CampaignModel) {
    return this.http.post<CampaignModel>(this.campaignUrl, campaignModel);
  }
setPersonal(data: StepOne) {
    // Update the StepOne data only when the StepOne Form had been validated successfully
    this.isPersonalFormValid = true;
    this.campaignModel.targetDonation = data.targetDonation;
    this.campaignModel.campaignName = data.campaignName;
    this.campaignModel.category = data.category;
    this.campaignModel.fundRaisingAs = data.fundRaisingAs;

    // this.campaignModel.email = data.email;
}

// getWork() : string {
//     // Return the work type
//     return this.campaignModel.work;
// }

// setWork(data: string) {
//     // Update the work type only when the Work Form had been validated successfully
//     this.isWorkFormValid = true;
//     this.campaignModel.work = data;
// }

// getAddress() : Address {
//     // Return the Address data
//     var address: Address = {
//         street: this.campaignModel.street,
//         city: this.campaignModel.city,
//         state: this.campaignModel.state,
//         zip: this.campaignModel.zip
//     };
//     return address;
// }

// setAddress(data: Address) {
//     // Update the Address data only when the Address Form had been validated successfully
//     this.isAddressFormValid = true;
//     this.campaignModel.street = data.street;
//     this.campaignModel.city = data.city;
//     this.campaignModel.state = data.state;
//     this.campaignModel.zip = data.zip;
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
}
