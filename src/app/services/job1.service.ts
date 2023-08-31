import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Job1TransCurDateInput, Job1TransDeleteInput, Job1TransNewDateInput, Job1TransVehicleLineInput } from '../models/job1.model';

@Injectable({
  providedIn: 'root'
})
export class Job1Service {

  constructor(private httpclient: HttpClient) { }
 private baseurl = environment.wbs+"/jobtiming";
 //private baseurl ="http://localhost:8080/jobtiming";

  fetchRegion() {
    return this.httpclient.get(this.baseurl + '/region')
    //responseType:'json'
  }

  fetchVehicleLine(input:Job1TransVehicleLineInput){
    return this.httpclient.post<any>(this.baseurl + '/vehline',input)
  }
  fetchS4pCode(vehicleLineDrop:any){
    console.log (vehicleLineDrop)
    return this.httpclient.get<any>(this.baseurl+'/s4p?vehicleLineDrop='+vehicleLineDrop)
  }
  fetchCurrDate(input:Job1TransCurDateInput){
    console.log("service/currdate"+input)
    return this.httpclient.post<any>(this.baseurl +'/curdate',input)
  }
 updateNewDate(input:Job1TransNewDateInput){
   console.log("service/newdate"+input)
   return this.httpclient.post<any>(this.baseurl+'/newdate',input)
 }
deleteDate(input:Job1TransDeleteInput){
  return this.httpclient.post<any>(this.baseurl+'/delete',input)
}

}