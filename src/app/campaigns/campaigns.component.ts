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
  isNull : boolean;
  initialCampaignCategory: string;
  finished: boolean;

  constructor(private campaignListService: CampaignListService,
              private router:Router
              )
  { 
    this.subscription = this.campaignListService.findAll().subscribe(campaigns => this.filteredCampaigns = this.campaignsName = campaigns);
  }

  ngOnInit() {
    this.initialCampaignCategory = "Category";
    this.campaignListService.findAll().subscribe(data => 
    {
      this.campaignModels = data;
    });
  }
  getCampaignByCategory(category:string){
    this.initialCampaignCategory = category;
    this.subscription = this.campaignListService.findCampaignByCategory(category).subscribe(campaigns => {
      console.log(campaigns.values)
      

      this.filteredCampaigns = this.campaignsName = campaigns
      console.log("filteredCampaigns: "+this.filteredCampaigns)
      if(campaigns.length == 0)
        this.isNull = true;
      else
        this.isNull = false;

      console.log("isNull category: "+this.isNull)
    });
  }
  getCampaignByFinished(category : string){
    console.log(category)
    if(category == "false"){
      this.initialCampaignCategory = "Under Goal";
      this.finished = false
    }
    else if (category == "true"){      
      this.initialCampaignCategory = "Over Goal";
      this.finished = true
    }

    this.subscription = this.campaignListService.getFinishedCampaign(this.finished).subscribe(campaigns => {      
      this.filteredCampaigns = this.campaignsName = campaigns
  
      if(campaigns.length == 0)
        this.isNull = true;
      else
        this.isNull = false;

    });
  }
  getCampaignByMostActive(){
    this.initialCampaignCategory = "Most Active";
    this.subscription = this.campaignListService.getMostActive().subscribe(campaigns =>{ 
      this.filteredCampaigns = this.campaignsName = campaigns
      if(campaigns.length == 0)
      this.isNull = true;
      else
      this.isNull = false;

    });
  }
  getAllCampaign(){
    this.initialCampaignCategory = "All campaigns";
    this.subscription = this.campaignListService.findAll().subscribe(campaigns =>{ 
      this.filteredCampaigns = this.campaignsName = campaigns
      if(campaigns.length == 0)
      this.isNull = true;
      else
      this.isNull = false;

    });
  }
  getNavigation(link, id)
  {
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
