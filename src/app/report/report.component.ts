import { Component, OnInit, Input } from '@angular/core';
import { ReportService } from '../services/report.service';
import { Report } from '../../models/report.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportNumber } from 'src/models/report-number.model'
import { CampaignListService } from '../services/campaign-list.service'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantPool } from '@angular/compiler';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reports : ReportNumber[];
  campaignId: string;

  constructor(private reportService: ReportService,private router: Router,
    private campaignService : CampaignListService,private modalService : NgbModal) 
  { 
  }

  ngOnInit() 
  {
    if(sessionStorage.getItem('privilege') != '3')
    {
      this.router.navigate(["/"]);
    }
    this.reportService.getReportNumber().subscribe(result=>
      {
        this.reports = result;
      })
  }
  navigateToCampaign(campaignId : string)
  {
    this.router.navigate(['/campaigns/'+campaignId]);
  }
  inactivateCampaign(campaignIdRemove : string)
  {
    var campaignId = campaignIdRemove;
    const modalRef = this.modalService.open(NgbdModalContentReportAdmin,{centered: true} );
    for (let i = 0; i < this.reports.length; i++) 
    {
      if(this.reports[i].campaignId == campaignId)
      {
        this.reports.splice(i,1);
      }
    }
    this.reportService.sendUserReportEmail(campaignId).subscribe(result=>
      {
        if(result)
        {
          this.campaignService.inActivateCampaign(campaignId).subscribe(resutl1=>
            {
              if(resutl1)
              {
              }
            })
        }
      })
      this.reportService.sendBeneficiaryReport(campaignId).subscribe()
  }

  displayReportDetail(campaignId : string)
  {
    this.router.navigate(['/reportDetail/'+campaignId]);
  }

}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <h3 style="text-align: center; ;">Inactivated</h3>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="inactivateDone()">Close</button>
    </div>
  `,
  styles: [`
  .modal-header
    {
      border: none !important;
    }
    .modal-footer
    {
      border: none !important;
    }
  `],
})
export class NgbdModalContentReportAdmin
{
  constructor(public activeModal: NgbActiveModal, private router: Router)
  {
  }
  inactivateDone()
  {
    this.activeModal.close('Close click')
  }
}