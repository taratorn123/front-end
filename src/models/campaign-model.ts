export class CampaignModel 
{
    campaignId: number = null;
    targetDonation: number = null;
    userId : number = null;
    campaignName : string = '';
    category : string = '';
    fundRaisingAs : string = '';
    coverImagePath : string = '';
    coverImageName : string = '';
    campaignDetail : string = '';
    startDate : Date = new Date();
    activeFlag : boolean = true;
    deleteFlag : boolean = false;
    currentTotalDonate : number;
    
    user: [{
        id : number;
        firstName: string;
        lastName: string ;
        email: string ;
        username: string;
        password: string;
        passwordConfirmation: string;
        verificationFlag: boolean;
        routeSignatureImage:String;
        routeImageVerification:String;
      }]
    clear() {
        this.campaignId = null;
        this.targetDonation = null;
        this.campaignName = '';
        this.category = '';
        this.fundRaisingAs = '';
        this.coverImagePath = '';
        this.campaignDetail = '';

    }
    
}