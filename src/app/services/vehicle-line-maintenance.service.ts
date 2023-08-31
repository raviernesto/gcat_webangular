import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class VehicleLineMaintenanceService {

  constructor( private httpclient:HttpClient ) { }
  HttpOption={
    head: new HttpHeaders({
      'content-type':'application/json',
     
      'Access-Control-Allow-Origin': ' http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': ' POST, GET, OPTIONS, DELETE',
      'Access-Control-Max-Age': ' 3600',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With, remember-me',
'Authorization':
     'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYXRlbTEyMyIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfRU1Q'
    })
  }
  private baseURL=environment.transaction+'/VehLineMaintentance';
  // private baseURL= "http://localhost:8080/VehLineMaintentance";

  fetchVehicleLineMaintenance(){
    return this.httpclient.get(this.baseURL+'/fech')
      //responseType:'json'
   
  }
  vehLineMai(region:string,vehLine:string,producttype:string){
  
    return this.httpclient.get(this.baseURL+'/vehicledata?regionCode='+region +'&vehicleName='+ vehLine+'&productType='+producttype)
 }
 lineMain(veh:any){
   return this.httpclient.post(this.baseURL+'/vehiclesave',veh)
 }
 delete(veh:any){
   return this.httpclient.post(this.baseURL+'/delete',veh)
 }
}