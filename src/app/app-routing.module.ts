
import { UpdateCampaignComponent } from './update-campaign/update-campaign.component';
import { ManageCampaignIdComponent } from './manage-campaign-id/manage-campaign-id.component';
import { ManageCampaignComponent } from './manage-campaign/manage-campaign.component';
import { CreateCampaignOneComponent } from './create-campaign-one/create-campaign-one.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { SignOutComponent } from './sign-out/sign-out.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { ViewCampaignComponent } from './view-campaign/view-campaign.component';
import { DonateComponent } from './donate/donate.component';
import { CampaignTransactionHistoryComponent } from './campaign-transaction-history/campaign-transaction-history.component';
import { UserTransactionHistoryComponent } from './user-transaction-history/user-transaction-history.component';
import { VerificationComponent } from './verification/verification.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReportComponent } from './report/report.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { IdentityVerificationComponent } from './identity-verification/identity-verification.component'
import { InactivateCampaignComponent} from './inactivate-campaign/inactivate-campaign.component'
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';
import { IdentityVerificationDetailComponent} from './identity-verification-detail/identity-verification-detail.component'
import { ViewCampaignUpdateComponent } from './view-campaign-update/view-campaign-update.component';
import { ViewCampaignCommentComponent } from './view-campaign-comment/view-campaign-comment.component';
import { ViewCampaignCardComponent } from './view-campaign-card/view-campaign-card.component';
import { ReadMoreComponent } from './readmore/readmore.component';
import { UserIdentityVerificationComponent } from './user-identity-verification/user-identity-verification.component'

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'campaigns', component: CampaignsComponent},
  { path: 'campaigns/:id', component: ViewCampaignComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignupFormComponent},
  { path: 'users', component: UserListComponent },
  { path: 'sign-out', component: SignOutComponent ,canActivate:[AuthGaurdService]},
  { path: 'create-campaign-one', component: CreateCampaignOneComponent },
  { path: 'donate/:id', component: DonateComponent},
  { path: 'campaign-transaction-history/:id', component: CampaignTransactionHistoryComponent},
  { path: 'user-transaction-history', component: UserTransactionHistoryComponent},
  { path: 'edit-profile', component: EditProfileComponent},
  { path: 'verification', component: VerificationComponent},
  { path: 'manage-campaign', component: ManageCampaignComponent},
  { path: 'report', component: ReportComponent},
  { path: 'reportDetail/:id', component: ReportDetailComponent},
  { path: 'identity-verification', component: IdentityVerificationComponent},
  { path: 'inactivate-campaign', component: InactivateCampaignComponent},
  { path: 'manage-campaigns', component: ManageCampaignComponent},
  { path: 'manage-campaigns/:id', component: ManageCampaignIdComponent},
  { path: 'manage-campaigns/:id/edit-campaign', component: EditCampaignComponent},
  { path: 'identityDetail/:id', component: IdentityVerificationDetailComponent},
  { path: 'manage-campaigns/:id/update-campaign', component: UpdateCampaignComponent},
  { path: 'manage-campaigns/:id/view-update-campaign', component: ViewCampaignUpdateComponent},
  { path: 'manage-campaigns/:id/view-comment-campaign', component: ViewCampaignCommentComponent},
  { path: 'manage-campaigns/:id/view-card-campaign', component: ViewCampaignCardComponent},
  { path: 'manage-campaigns/:id/readmore', component: ReadMoreComponent},
  { path: 'user-verification', component: UserIdentityVerificationComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
