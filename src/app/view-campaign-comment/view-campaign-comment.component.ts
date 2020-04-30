import { AccountDonation } from './../../models/account-donation.model';
import { CampaignUpdate } from './../../models/campaign-update';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignModel } from './../../models/campaign-model';
import { CampaignListService } from './../services/campaign-list.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-view-campaign-comment',
  templateUrl: './view-campaign-comment.component.html',
  styleUrls: ['./view-campaign-comment.component.css']
})
export class ViewCampaignCommentComponent implements OnInit {
  subscription: Subscription;
  filteredComments: AccountDonation[];
  campaignID: number;
  constructor(private campaignListService: CampaignListService,
    private router: Router,
    private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.campaignID = this.actRoute.snapshot.params['id'];
    this.subscription = this.campaignListService.findCommentCampaignByCurrentCampaign(this.campaignID).subscribe(comments => {
      this.filteredComments = comments
    });
  }
}
