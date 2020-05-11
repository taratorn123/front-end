import { Component, OnInit, Input } from '@angular/core';
import { ReportService } from '../services/report.service';
import { Report } from '../../models/report.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportNumber } from 'src/models/report-number.model'
import { CampaignListService } from '../services/campaign-list.service'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
  inactivateCampaign(campaignId : string)
  {
    this.reportService.sendUserReportEmail(campaignId).subscribe()
    this.reportService.sendBeneficiaryReport(campaignId).subscribe()
    this.campaignService.inActivateCampaign(campaignId).subscribe(result=>
      {
        if(result)
        {
          const modalRef = this.modalService.open(NgbdModalContentReportAdmin,{centered: true} );
        }
      })
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
    location.reload();
  }
}