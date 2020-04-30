import { Component, OnInit } from '@angular/core';
import { CampaignListService } from '../services/campaign-list.service'
import { CampaignModel } from 'src/models/campaign-model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-inactivate-campaign',
  templateUrl: './inactivate-campaign.component.html',
  styleUrls: ['./inactivate-campaign.component.css']
})
export class InactivateCampaignComponent implements OnInit 
{
  campaigns : CampaignModel[]

  constructor(private campaignService : CampaignListService,
    private router: Router) 
  { 

  }

  ngOnInit() 
  {
    if(sessionStorage.getItem('privilege') != '3')
    {
      this.router.navigate(["/"]);
    }
    this.campaignService.getInactiveCampaign().subscribe(result=>
      {
        this.campaigns = result;
      })
  }
  navigateToCampaign(campaignId : string)
  {
    this.router.navigate(['/campaigns/'+campaignId]);
  }
  activateCampaign(campaignId: string)
  {
    this.campaignService.activateCampaign(campaignId).subscribe(result=>  
    {
      if(result)
      {
        location.reload();
      }
    })
  }

}
