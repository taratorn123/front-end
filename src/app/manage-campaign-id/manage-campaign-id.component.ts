import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';
import { CampaignListService } from './../services/campaign-list.service';
import { CampaignModel } from './../../models/campaign-model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-campaign-id',
  templateUrl: './manage-campaign-id.component.html',
  styleUrls: ['./manage-campaign-id.component.css']
})
export class ManageCampaignIdComponent implements OnInit {

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
    console.log("the dude: "+this.campaignData);

  }
 
  navigation(link){
    this.router.navigate([link]);
  }
  navigateToEditCampaign(link1, id, link2) {
    console.log('Campaign ID'+id);
    if(id === ''){
        this.router.navigate([link1]);
    } else {
        this.router.navigate([link1 + '/' + id+ '/' +link2]);
    }
  }
}
