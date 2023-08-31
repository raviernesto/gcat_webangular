import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WorkqueueAssignmentReportService {

  constructor(private http :HttpClient) { }
  // private baseURL='http://localhost:8080/WorkqueueAssignmentReport';
  private baseURL=environment.report+'/WorkqueueAssignmentReport';

  
  
  fetchWorkqueueAssignmentReportVehicleLine(){
    return this.http.get(this.baseURL + '/fetchVehicleLine')
  }

  fetchWorkqueueAssignmentReportProductType(){
    return this.http.get(this.baseURL + '/fetchProductType')
  }

  fetchWorkqueueAssignmentReportReasonCode(){
    return this.http.get(this.baseURL + '/fetchReasonCode')
  }
  fetchWorkqueueAssignmentReportAnalyst(){
    return this.http.get(this.baseURL + '/fetchAnalyst')
  }
  fetchWorkqueueAssignmentReportShowReport(workqueueAssignmentReport:any){
    return this.http.post(this.baseURL + '/fetchShowReport',workqueueAssignmentReport)
  }
 
}
