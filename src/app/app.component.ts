import { CampaignFormService } from './services/campaign-form.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  title = 'donationblock';
  @Input() formData;
  constructor(private campaignFormService: CampaignFormService) 
  {
  }

  ngOnInit() {
      this.formData = this.campaignFormService.getFormData();
  }
}
