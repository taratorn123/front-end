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
  { path: 'user-transaction-history/:id', component: UserTransactionHistoryComponent},
  { path: 'edit-profile', component: EditProfileComponent},
  { path: 'verification', component: VerificationComponent},
  { path: 'manage-campaign', component: ManageCampaignComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
