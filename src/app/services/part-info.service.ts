import { Injectable, ɵisObservable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartInfoService {

  constructor(private httpclient:HttpClient) { }
  // private url="http://localhost:8080/partinfo/api/v1"
  private url=environment.partInformation+"/partinfo/api/v1"
  getEngineeringpPart(EngineeringPartNo:string){
    console.log(EngineeringPartNo);
    
    return this.httpclient.get(this.url+"/EngineeringPart/"+EngineeringPartNo);
    //responseType:'json'
  }
  getServicePart(ServicePartNo:string){
    
    return this.httpclient.get(this.url+"/ServicePart/"+ServicePartNo);
    //responseType:'json'
  }
  getPartnerPart(PartnerPartNo:string){
    
    return this.httpclient.get(this.url+"/PartnerPart/"+PartnerPartNo);
    //responseType:'json'
  }
  errorHandler(error:HttpErrorResponse){
    return error.message;

  }
  deletePart(EngineeringPartNo:string) {
    
    return this.httpclient.get<string>(this.url+"/DeletePart/"+EngineeringPartNo);
    //responseType:'json'

    // downloadGroupAvsData(getData1:any, getData2:any){
    //   let params=new HttpParams().set("lexiCode",getData1).set("langCode",getData2);
    //   return this.http.get("http://localhost:8080/download/lexiconExcelCalibration.xlsx",{params, responseType:"blob"})
    // }
  
   // return this.httpclient.get<string>(this.url+"/DeletePart/"+EngineeringPartNo, {responseType: "text"});
  }
  getServicePartAll(EngineeringPartNo:string){
    console.log(EngineeringPartNo);
    return this.httpclient.post(this.url+"/ServicePartAll",EngineeringPartNo);
  }

}
