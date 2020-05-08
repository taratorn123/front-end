import { AuthGaurdService } from './services/auth-gaurd.service';
import { AuthenticationService } from './services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//AngularFire Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage"
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from '../environments/environment';
//Bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//Quilljs
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { DonateComponent } from './donate/donate.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AboutUsComponent } from './about-us/about-us.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './services/user-service.service';
import { SignOutComponent } from './sign-out/sign-out.component';
import { CreateCampaignOneComponent } from './create-campaign-one/create-campaign-one.component';
import { ViewCampaignComponent } from './view-campaign/view-campaign.component';
import { CampaignTransactionHistoryComponent } from './campaign-transaction-history/campaign-transaction-history.component';
import { UserTransactionHistoryComponent } from './user-transaction-history/user-transaction-history.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { VerificationComponent } from './verification/verification.component';
import { ManageCampaignComponent } from './manage-campaign/manage-campaign.component';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';
import { ManageCampaignIdComponent } from './manage-campaign-id/manage-campaign-id.component'

import { NgbdModalContentEdit } from './user-identity-verification/user-identity-verification.component'
import { NgbdModalContentDonate } from './donate/donate.component'
import { NgbdModalContentSignup } from './signup-form/signup-form.component';
import { NgbdModalContentReport } from './view-campaign/view-campaign.component';
import { ReportComponent } from './report/report.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { NgbdModalContentReportAdmin } from './report/report.component';
import { IdentityVerificationComponent } from './identity-verification/identity-verification.component';
import { InactivateCampaignComponent } from './inactivate-campaign/inactivate-campaign.component';
import { IdentityVerificationDetailComponent } from './identity-verification-detail/identity-verification-detail.component'
import { UpdateCampaignComponent } from './update-campaign/update-campaign.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { ViewCampaignUpdateComponent } from './view-campaign-update/view-campaign-update.component';
import { ViewCampaignCommentComponent } from './view-campaign-comment/view-campaign-comment.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ViewCampaignCardComponent } from './view-campaign-card/view-campaign-card.component';
import { ReadMoreComponent } from './readmore/readmore.component';
import { UserIdentityVerificationComponent } from './user-identity-verification/user-identity-verification.component';
import { GlobalConstantsService } from './global-constants.service'

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    CampaignsComponent,
    DonateComponent,
    HomeComponent,
    AboutUsComponent,
    SignInComponent,
    SignupFormComponent,
    UserListComponent,
    SignOutComponent,
    CreateCampaignOneComponent,
    ViewCampaignComponent,
    CampaignTransactionHistoryComponent,
    UserTransactionHistoryComponent,
    EditProfileComponent,
    VerificationComponent,
    ManageCampaignComponent,
    NgbdModalContentDonate,
    NgbdModalContentSignup,
    NgbdModalContentReport,
    ReportComponent,
    ReportDetailComponent,
    NgbdModalContentReportAdmin,
    IdentityVerificationComponent,
    InactivateCampaignComponent,
    EditCampaignComponent,
    ManageCampaignIdComponent,
    IdentityVerificationDetailComponent,
    UpdateCampaignComponent,
    DateAgoPipe,
    ViewCampaignUpdateComponent,
    ViewCampaignCommentComponent,
    SafeHtmlPipe,
    ViewCampaignCardComponent,
    ReadMoreComponent,
    UserIdentityVerificationComponent,
    NgbdModalContentEdit,
  ],
  entryComponents: 
  [
    NgbdModalContentDonate,
    NgbdModalContentSignup,
    NgbdModalContentReport,
    NgbdModalContentReportAdmin,
    NgbdModalContentEdit
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // HttpClient,
    AppRoutingModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    QuillModule.forRoot()

  ],
  providers: [
    UserService,
    AuthenticationService,
    AuthGaurdService,
    GlobalConstantsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
