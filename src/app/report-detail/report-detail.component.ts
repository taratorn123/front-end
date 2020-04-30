import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { Report } from '../../models/report.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {

  reportDetail : Report[];
  campaignId: string;
  campaignName: string;
  
  constructor(private reportService: ReportService,private actRoute: ActivatedRoute,
    private router: Router) 
  { 
  }

  ngOnInit() 
  {
    if(sessionStorage.getItem('privilege') != '3')
    {
      this.router.navigate(["/"]);
    }
    this.campaignId = this.actRoute.snapshot.params['id'];
    this.reportService.getReportDetail(this.campaignId).subscribe(result=>
      {
        this.reportDetail = result;
        this.campaignId = this.reportDetail[0].campaignId;
        this.campaignName = this.reportDetail[0].campaignName;
      })
  }

}
