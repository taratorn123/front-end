import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { CampaignListService } from './../services/campaign-list.service';
import { CampaignModel } from './../../models/campaign-model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Report } from './../../models/report.model';
import { ReportService } from './../services/report.service'
import { User } from 'src/models/User';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-view-campaign',
  templateUrl: './view-campaign.component.html',
  styleUrls: ['./view-campaign.component.css']
})
export class ViewCampaignComponent implements OnInit {
  campaignData : CampaignModel;
  campaignDataTemp : any;
  campaignDataTemp1: CampaignModel;
  userData : User;
  campaignID: number;
  width:any;
  //Date
  today= new Date();
  jstoday = '';
  totalDonate : number;
  constructor(private campaignListService: CampaignListService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal) 
    {
      this.campaignData = new CampaignModel;
      this.campaignDataTemp1 = new CampaignModel;
      this.userData = new User;
    }

  ngOnInit() 
  {
    
    this.campaignID = this.actRoute.snapshot.params['id'];
    console.log("campaignID: "+ this.campaignID);
    this.loadCampaignDetails(this.campaignID);
    //FormatDate
    this.campaignListService.getTotalDonate(this.campaignID).subscribe(donate=>
      {
        this.totalDonate = donate;
        this.campaignListService.getCampaignDetails(this.campaignID).subscribe(campaignModel => {
          this.campaignDataTemp1 = campaignModel;
          this.width =  (this.totalDonate*100)/this.campaignDataTemp1.targetDonation;
          if(this.width >= 100){
            this.width = 100;
          }
        })
      })
    console.log(this.today)
  }
  /*Get campaignDetail by using campaignId */
  loadCampaignDetails(campaignID)
  {
    this.campaignListService.getCampaignDetails(campaignID).subscribe(data => {
    this.campaignData = data;
    this.campaignDataTemp = data.user;
    this.userData = this.campaignDataTemp;
    console.log(this.campaignData);
    });
  }
  navigateDonate()
  {
    /* The reference is not to Angular itself but to an Angular Module called Angular UI.Router. 
    This module allows you to turn your Angular application into a State Machine, 
    and handle what appears on the view based on these states, rather than only on the URL parameters. 
    Many people consider this an essential Angular Module, and far more functional 
    than the default $routeProvider. */
    console.log('From view-campaign'+this.campaignID);
    this.router.navigate(['donate'+'/'+this.campaignID]);
  }
  navigateHistoryTransaction()
  {
    this.router.navigate(['campaign-transaction-history'+'/'+this.campaignID])
  }
  navigation(link)
  {
    this.router.navigate([link]);
  }
  reportCampaign()
  {
    const modalRef = this.modalService.open(NgbdModalContentReport,{centered: true} );
    modalRef.componentInstance.campaignId = this.campaignID;
  }

}


@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
        <h3>Report</h3>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form (ngSumbit)="sendReport()" #reportForm="ngForm">
        <div class="form-group reportDetail">
          <input name="detail"
          type="text"
          [(ngModel)]="report.detail"
          id = "detail"
          class="form-control"
          placeholder="Report detail"
          required #name="ngModel"
          >
        </div>
        <div class="errorCode" *ngIf="this.report.userId == null">
          *Please login
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <div *ngIf="this.report.userId == null;else normalButton">
        <button type="button" style="margin:5px;" class="btn btn-primary" (click)="sendReport()">Login</button>
        <button type="button" style="margin:5px;" class="btn btn-primary" [disabled]="this.report.userId == null" (click)="sendReport()">Send</button>
      </div>
      <ng-template #normalButton>
        <button type="button" class="btn btn-primary" [disabled]="!reportForm.form.valid" (click)="sendReport()">Send</button>
      </ng-template>
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
    .errorCode
    {
      margin-top: 1px;
      text-align: left;
      color:red;
    }
    `],
    })
export class NgbdModalContentReport 
{
  @Input() campaignId;

  report : Report;
  result : string;
  
  constructor(private activeModal: NgbActiveModal, 
    private router: Router,
    private reportService: ReportService,
    private actRoute: ActivatedRoute,)
  {
    this.report = new Report();
  }
  ngOnInit()
  {
    this.report.userId = sessionStorage.getItem("userId");
  }
  sendReport()
  {
    console.log("Sending report");
    this.report.userId = sessionStorage.getItem('userId');
    this.report.campaignId = this.campaignId;
    if(this.report.userId == null)
    {
      this.router.navigate(['/sign-in']);
      this.activeModal.close('Close click');
    }
    this.reportService.reportCampaign(this.report).subscribe(result=>
    {
      if(result)
      {
        this.activeModal.close('Close click');
      }
    })
  }
}