import {  HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MstatusService {
  constructor(private httpclient: HttpClient) { }
// private baseurl = "http://localhost:8080/Mstatus"
private baseurl=environment.report+"/Mstatus";



fetchmstatus(vehicleType: string){

  return this.httpclient.get(this.baseurl + '/vehiclelist?vehicleType='+vehicleType)

  
}
showtable(veh:any,reg:any,vehicleDrop:any,groupDrop:any) {
  console.log("service ="+veh+reg+vehicleDrop+groupDrop)
let Params = new HttpParams().set('vehicleType',veh).set('region',reg)
.set('vehicleDrop',vehicleDrop).set('groupDrop',groupDrop)
  return this.httpclient.get(this.baseurl + "/showreport",
  {params:Params,responseType:'json'})

}
}
