import { CampaignListService } from './../services/campaign-list.service';
import { CampaignModel } from './../../models/campaign-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {
  campaignModels: CampaignModel[];
  campaignsName: {campaignName : string}[];
  filteredCampaigns: any[];
  subscription: Subscription;
  isCollapsed = true;

  constructor(private campaignListService: CampaignListService,
              private router:Router
              )
  { 
    this.subscription = this.campaignListService.findAll().subscribe(campaigns => this.filteredCampaigns = this.campaignsName = campaigns);
  }

  ngOnInit() {
    this.campaignListService.findAll().subscribe(data => 
    {
      
      this.campaignModels = data;
      console.log(this.campaignModels);
    });
  }
  getCampaignByCategory(category:string){
    this.subscription = this.campaignListService.findCampaignByCategory(category).subscribe(campaigns =>this.filteredCampaigns = this.campaignsName = campaigns);
  }
  getAllCampaign(){
    this.subscription = this.campaignListService.findAll().subscribe(campaigns => this.filteredCampaigns = this.campaignsName = campaigns);
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
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  filter(query : string) 
  {
   this.filteredCampaigns = (query) ?
    this.campaignsName.filter(p => p.campaignName.toLowerCase().includes(query.toLowerCase())):
    this.campaignsName;
  }
}
