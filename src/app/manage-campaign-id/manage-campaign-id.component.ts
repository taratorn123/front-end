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
  totalDonate: number;
  campaignDataTemp1: CampaignModel;
  campaignIdString: string;
  width: number;
  showThis : boolean;
  constructor(private campaignListService: CampaignListService,private router: Router,private actRoute: ActivatedRoute) {
    this.campaignData = new CampaignModel;
    this.userData = new User;
   }

  ngOnInit() 
  {
    
    this.campaignID = this.actRoute.snapshot.params['id'];
    this.campaignIdString = this.actRoute.snapshot.params['id'];
    this.loadCampaignDetails(this.campaignID);
    this.campaignListService.getTotalDonate(this.campaignID).subscribe(donate=>
      {
        this.totalDonate = donate;
        this.campaignListService.getCampaignDetails(this.campaignID).subscribe(campaignModel => {
          this.campaignDataTemp1 = campaignModel;
          this.width =  (this.totalDonate*100)/this.campaignDataTemp1.targetDonation;
          if(this.width >= 100){
            this.width = 100;
          }
        })
      })
  }
  /*Get campaignDetail by using campaignId */
  loadCampaignDetails(campaignID)
  {
    this.campaignListService.getCampaignDetails(campaignID).subscribe(data => {
    this.campaignData = data;
    this.campaignData.campaignId = campaignID;
    this.campaignDataTemp = data.user;
    this.userData = this.campaignDataTemp;
    });
    
  }
 
  navigation(link){
    this.router.navigate([link]);
  }
  navigateToEditCampaign(link1, id, link2) 
  {
    if(id === ''){
        this.router.navigate([link1]);
    } else {
        this.router.navigate([link1 + '/' + id+ '/' +link2]);
    }
  }
  navigateToUpdateCampaign(link1, id, link2) {
    if(id === ''){
        this.router.navigate([link1]);
    } else {
        this.router.navigate([link1 + '/' + id+ '/' +link2]);
    }
  }
  navigateToViewUpdateCampaign(link1, id, link2) {
    if(id === ''){
        this.router.navigate([link1]);
    } else {
        this.router.navigate([link1 + '/' + id+ '/' +link2]);
    }
  }
  navigateToPreviewCampaign(link1, id, link2){
    if(id === ''){
      this.router.navigate([link1]);
    } else {
      this.router.navigate([link1 + '/' + id+ '/' +link2]);
    }  
  }
  navigateToManage(link){
    if(confirm("Are you sure to delete this campaign")) {
      this.campaignListService.deleteCampaign(this.campaignIdString).subscribe()
      this.router.navigate([link])
      .then(() => {
        window.location.reload();
      });
    }
  }
}
