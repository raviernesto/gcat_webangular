import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Opensectionmodel } from '../models/opensectionmodel';


@Injectable({
  providedIn: 'root'
})
export class AnalystcodeserviceService {

  constructor(private http :HttpClient) { }

  // private baseURL="http://localhost:8080/analytCode"
  private baseURL=environment.report+"/analytCode";

  getVehicleLine(){
    return this.http.get(this.baseURL + '/vehicleline')
  }
  
  getPrefix(){
    return this.http.get(this.baseURL + '/prefix')
  }

  getShowReport(opensectionmodel: Opensectionmodel){
    console.log(opensectionmodel);
    return this.http.post(this.baseURL + '/showReport',opensectionmodel)
  }
  getShowReportTable(Input1: any){
    return this.http.post(this.baseURL + '/show',Input1)
  }
}
