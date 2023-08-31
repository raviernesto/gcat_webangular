import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnassignedCommoditiesService {

 
constructor( private http :HttpClient) {
  console.log(environment.commodity);
 }
 private baseURL=environment.report+'/UnassignCmdtyReport';

 fetchUnassignCmdtyVehicleLine(){
  return this.http.get(this.baseURL + '/fetchUCVehicleLine')
}
fetchUnassignCmdtyPrefix(){
  return this.http.get(this.baseURL + '/fetchUCPrefix')
}
fetchUnassignCmdtyShowReportBoth(Input:any){
  console.log(Input)
  return this.http.post(this.baseURL + '/fetchUCShowReportBoth',Input)
}
fetchUnassignCmdtyShowReportPrefix(Input:any){
  console.log(Input)
  return this.http.post(this.baseURL + '/fetchUCShowReportPrefix',Input)
}
fetchUnassignCmdtyShowReportVehicleLine(Input:any){
  console.log(Input)
  return this.http.post(this.baseURL + '/fetchUCShowReportVehicleLine',Input)
}
}
