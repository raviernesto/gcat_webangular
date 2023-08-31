import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnassignedCommoditiesDetailsService {
  constructor(private http :HttpClient) {
    console.log(environment.commodity);
   }
   private baseURL=environment.report+'/UnassignCmdtyDet';
   fetchUnassignCmdtyVehicleLine(){
    return this.http.get(this.baseURL + '/fetchUCVehicleLine')
  }
  fetchUnassignCmdtyPrefix(){
    return this.http.get(this.baseURL + '/fetchUCPrefix')
  }
   fetchUnassignCmdtyDetailShowReportVehicleLine(Input:any){
    console.log(Input)
    return this.http.post(this.baseURL + '/fetchUCDShowReportVehicleLine',Input)
  }
  fetchUnassignCmdtyDetailShowReportBoth(Input:any){
    console.log(Input)
    return this.http.post(this.baseURL + '/fetchUCDShowReportBoth',Input)
  }
  fetchUnassignCmdtyDetailShowReportPrefix(Input:any){
    console.log(Input)
    return this.http.post(this.baseURL + '/fetchUCDShowReportPrefix',Input)
  }
}


