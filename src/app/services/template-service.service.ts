import { Injectable, ɵisObservable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateServiceService {

  constructor(private httpclient:HttpClient) { }
  //private url=environment.partInformation+"/partinfo/api/v1"
  private url=environment.wbs+"/template";

  getTemplate(templtId:string){
    
    return this.httpclient.get(this.url+"/onload?templtId="+templtId);
    //responseType:'json'
  }

  getTemplateComm(tempId:string){
    
    return this.httpclient.get(this.url+"/tempcomm?tempId="+tempId);
    //responseType:'json'
  }
  getTemplateComm2(tempId:string){
    
    return this.httpclient.get(this.url+"/tempcomm?tempId="+tempId);
    //responseType:'json'
  }

  getTemplateSelectValues(){
    return this.httpclient.get(this.url+"/TemplateSelect2");
  }
}
