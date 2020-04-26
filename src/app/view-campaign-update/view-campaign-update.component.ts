import { CampaignUpdate } from './../../models/campaign-update';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignModel } from './../../models/campaign-model';
import { CampaignListService } from './../services/campaign-list.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-view-campaign-update',
  templateUrl: './view-campaign-update.component.html',
  styleUrls: ['./view-campaign-update.component.css']
})
export class ViewCampaignUpdateComponent implements OnInit {
  subscription: Subscription;
  filteredUpdates: CampaignUpdate[];
  campaignID: number;

  constructor(private campaignListService: CampaignListService,
    private router: Router,
    private actRoute: ActivatedRoute) { 
    }

  ngOnInit() {
    this.campaignID = this.actRoute.snapshot.params['id'];
    console.log("campaignID: "+ this.campaignID);
    this.subscription = this.campaignListService.findUpdateCampaignByCurrentCampaign(this.campaignID).subscribe(campaigns => this.filteredUpdates = campaigns); 

  }

}
