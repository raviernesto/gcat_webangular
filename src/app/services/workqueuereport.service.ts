import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkqueuereportService {
  typeDrop: any;

  constructor(private http: HttpClient) {
  }

  private baseURL = environment.report + '/WorkqueueReport';


  fetchWorkQueueVehicleLine() {
    return this.http.get(this.baseURL + '/fetchVehicleLine')
  }

  fetchWorkQueueReasonCode(typeDrop: any) {
    console.log(typeDrop);
    return this.http.get(this.baseURL + '/fetchReasonCode?typeDrop=' + typeDrop)
  }
  fetchWorkQueueType() {
    return this.http.get(this.baseURL + '/fetchType')
  }
  fetchWorkQueueAnalyst() {
    return this.http.get(this.baseURL + '/fetchAnalyst')
  }
  fetchWorkQueueShowReportSgtip03(Input: any) {
    console.log(Input)
    return this.http.post(this.baseURL + '/fetchShowReport', Input)
  }
  fetchWorkQueueLinkTable(Input1: any) {
    console.log(Input1)
    return this.http.post(this.baseURL + '/fetchLinkTable', Input1)
  }
}
