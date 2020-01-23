import { AuthGaurdService } from './services/auth-gaurd.service';
import { AuthenticationService } from './services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from '../environments/environment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { DonateComponent } from './donate/donate.component';
import { HomeComponent } from './home/home.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { DonateSuccessComponent } from './donate-success/donate-success.component';
import { MyHistoryComponent } from './my-history/my-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AboutUsComponent } from './about-us/about-us.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './user-service.service';
import { SignOutComponent } from './sign-out/sign-out.component';
import { CreateCampaignOneComponent } from './create-campaign-one/create-campaign-one.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    CampaignsComponent,
    DonateComponent,
    HomeComponent,
    CheckOutComponent,
    DonateSuccessComponent,
    MyHistoryComponent,
    AboutUsComponent,
    SignInComponent,
    SignupFormComponent,
    UserListComponent,
    SignOutComponent,
    CreateCampaignOneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // HttpClient,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
    
  ],
  providers: [UserService,
    AuthenticationService,
    AuthGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
