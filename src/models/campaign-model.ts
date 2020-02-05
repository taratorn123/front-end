export class CampaignModel {
    campaignID: string = '';
    targetDonation: number = null;
    campaignName : string = '';
    category : string = '';
    fundRaisingAs : string = '';
    coverImagePath : string = '';
    coverImageName : string = '';
    startDate : Date = new Date();
    endDate : Date = new Date();
    activeFlag : boolean = true;
    deleteFlag : boolean = false;
    
 
    clear() {
        this.campaignID = '';
        this.targetDonation = null;
        this.campaignName = '';
        this.category = '';
        this.fundRaisingAs = '';
        this.coverImagePath = '';
        
    }
    
}

export class StepOne {
    targetDonation: number = null;
    campaignName : string = '';
    category : string = '';
    fundRaisingAs : string = '';
}
 
export class StepTwo {
    coverImagePath : string = '';
    coverImageName : string = '';
}