import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Report } from 'src/models/report.model';
import { Observable } from 'rxjs/Observable';
import { ReportNumber } from 'src/models/report-number.model'
import { GlobalConstantsService } from '../global-constants.service'
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  reportUrl : string;
  getReporNumbertUrl : string;
  getReportDetailUrl: string;
  constructor(private http:HttpClient) 
  { 
    this.reportUrl = GlobalConstantsService.apiURL+'reportCampaign'
    this.getReporNumbertUrl = GlobalConstantsService.apiURL+'getReportNumber'
    this.getReportDetailUrl = GlobalConstantsService.apiURL+'getReportDetail'
  }
  public reportCampaign(report : Report)
  {
    return this.http.post<boolean>(this.reportUrl,report);
  }
  public getReportNumber()
  {
    return this.http.get<ReportNumber[]>(this.getReporNumbertUrl);
  }
  public getReportDetail(campaignId : String)
  {
    return this.http.post<Report[]>(this.getReportDetailUrl,campaignId)
  }
}
