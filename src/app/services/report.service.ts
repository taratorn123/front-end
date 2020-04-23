import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Report } from 'src/models/report.model';
import { Observable } from 'rxjs/Observable';
import { ReportNumber } from 'src/models/report-number.model'

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  reportUrl : string;
  getReporNumbertUrl : string;
  getReportDetailUrl: string;
  constructor(private http:HttpClient) 
  { 
    this.reportUrl = 'http://localhost:8080/reportCampaign'
    this.getReporNumbertUrl = 'http://localhost:8080/getReportNumber'
    this.getReportDetailUrl = 'http://localhost:8080/getReportDetail'
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
    console.log("Sending report detail request")
    return this.http.post<Report[]>(this.getReportDetailUrl,campaignId)
  }
}
