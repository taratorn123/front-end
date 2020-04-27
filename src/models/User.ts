export class User 
{
    id : number;
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    username: string = "";
    password: string = "";
    passwordConfirmation: string = "";
    verificationFlag: boolean = false;
    routeSignatureImage:String  ="";
    routeImageVerification:String = "";
    routeUserImage:string="";
    privilegeLevel:number;
}
