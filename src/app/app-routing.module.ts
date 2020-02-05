import { CreateCampaignTwoComponent } from './create-campaign-two/create-campaign-two.component';
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

const routes: Routes = [
  // { path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
  { path: '',
    component: HomeComponent
  },
  { path: 'campaigns',
    component: CampaignsComponent
  },
  { path: 'about-us',
    component: AboutUsComponent
  }
  ,
  { path: 'sign-in',
    component: SignInComponent
  },
  { path: 'sign-up',
    component: SignupFormComponent
  },
  { path: 'users', 
    component: UserListComponent },
  { path: 'sign-out', 
    component: SignOutComponent ,canActivate:[AuthGaurdService]},
  { path: 'create-campaign-one', 
    component: CreateCampaignOneComponent },  
    { path: 'create-campaign-two', 
    component: CreateCampaignTwoComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
