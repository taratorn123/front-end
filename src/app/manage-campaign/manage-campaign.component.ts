import { Router } from '@angular/router';
import { CampaignModel } from './../../models/campaign-model';
import { CampaignListService } from './../services/campaign-list.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-manage-campaign',
  templateUrl: './manage-campaign.component.html',
  styleUrls: ['./manage-campaign.component.css']
})
export class ManageCampaignComponent implements OnInit {
  subscription: Subscription;
  filteredCampaigns: CampaignModel[];


  constructor(private campaignListService: CampaignListService,
              private router: Router) {
    this.subscription = this.campaignListService.findCampaignByCurrentUser().subscribe(campaigns => this.filteredCampaigns = campaigns); 
  }

  ngOnInit() {
  }
  
  getNavigation(link, id)
  {
    console.log('Campaign ID'+id);
    if(id === ''){
        this.router.navigate([link]);
    } else {
        this.router.navigate([link + '/' + id]);
    }
  }
}
