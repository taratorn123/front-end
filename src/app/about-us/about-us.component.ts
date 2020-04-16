import { CampaignModel } from './../../models/campaign-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  campaign : CampaignModel
  constructor() { this.campaign = new CampaignModel }

  ngOnInit() {
    this.campaign.coverImagePath = "../../assets/img/26/coverImage/cover.jpg"
  }

}
