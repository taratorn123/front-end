import { CampaignListService } from './../services/campaign-list.service';
import { CampaignFormService } from './../services/campaign-form.service';
import { CampaignModel } from './../../models/campaign-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {
  campaignModels: CampaignModel[];

  constructor(private campaignListService: CampaignListService,
              private router:Router
              )
  { 

  }

  ngOnInit() {
    this.campaignListService.findAll().subscribe(data => 
    {
      this.campaignModels = data;
      console.log(this.campaignModels);
    });
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
