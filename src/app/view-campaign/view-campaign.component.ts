import { Component, OnInit } from '@angular/core';
import { CampaignListService } from './../services/campaign-list.service';
import { CampaignModel } from './../../models/campaign-model';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/models/User';

@Component({
  selector: 'app-view-campaign',
  templateUrl: './view-campaign.component.html',
  styleUrls: ['./view-campaign.component.css']
})
export class ViewCampaignComponent implements OnInit {
  campaignData : CampaignModel;
  campaignDataTemp : any;
  userData : User;
  campaignID: number;
  constructor(private campaignListService: CampaignListService,private router: Router,private actRoute: ActivatedRoute) {
    this.campaignData = new CampaignModel;
    this.userData = new User;
   }

  ngOnInit() 
  {
    this.campaignID = this.actRoute.snapshot.params['id'];
    console.log("campaignID: "+ this.campaignID);
    this.loadCampaignDetails(this.campaignID);
  }
  /*Get campaignDetail by using campaignId */
  loadCampaignDetails(campaignID)
  {
    this.campaignListService.getCampaignDetails(campaignID).subscribe(data => {
    this.campaignData = data;
    this.campaignDataTemp = data.user;
    this.userData = this.campaignDataTemp;
    console.log(this.campaignData);
    });
  }
  navigateDonate()
  {
    /* The reference is not to Angular itself but to an Angular Module called Angular UI.Router. 
    This module allows you to turn your Angular application into a State Machine, 
    and handle what appears on the view based on these states, rather than only on the URL parameters. 
    Many people consider this an essential Angular Module, and far more functional 
    than the default $routeProvider. */
    console.log('From view-campaign'+this.campaignID);
    this.router.navigate(['donate'+'/'+this.campaignID]);
  }
  navigateHistoryTransaction()
  {
    this.router.navigate(['campaign-transaction-history'+'/'+this.campaignID])
  }
  navigation(link){
    this.router.navigate([link]);
  }
}
