import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CampaignListService } from './../services/campaign-list.service';
import { CampaignModel } from './../../models/campaign-model';

@Component({
  selector: 'app-view-campaign',
  templateUrl: './view-campaign.component.html',
  styleUrls: ['./view-campaign.component.css']
})
export class ViewCampaignComponent implements OnInit {
  campaignData : any;
  campaignID: any;
  constructor(private campaignListService: CampaignListService,private router: Router,private actRoute: ActivatedRoute) {
    
   }

  ngOnInit() {
    this.campaignID = this.actRoute.snapshot.params['id'];
    console.log("campaignID: "+ this.campaignID);
    this.loadCampaignDetails(this.campaignID);
  }
  loadCampaignDetails(campaignID){
    this.campaignListService.getCampaignDetails(campaignID).subscribe(data => {
    this.campaignData = data;
    });
  }

  navigation(link){
    this.router.navigate([link]);
  }
}
