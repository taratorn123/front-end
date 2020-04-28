export class AccountDonation 
{
    campaignId : String;
    userId : String;
    amount: string ;
    timestamp: Date;
    comment: String = null;
    privateKey: String;
    anonymousFlag: Boolean = false;
    exchangeRate: string;
}
