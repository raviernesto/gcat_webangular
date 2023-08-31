import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuditConsoModel } from '../models/auditconso.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditreportService {

  constructor(private http: HttpClient) { }
  private baseUrl:string=environment.report+"/auditconsoreport/";
  private baseUrl1:string=environment.report+"/auditSection/";
  private baseUrl2:string=environment.report+"/auditConsolidate/";

  getModel(vehtype:string,leadrgn:string,marketcode:string){
    return this.http.get(this.baseUrl+"getmodel?vehTypeC="+vehtype+"&leadRegion="
    +leadrgn+"&marketCode="+marketcode);
  }
  getvLineAndDesc(vehType:string){
    return this.http.get(this.baseUrl+"getvlinedesc?vehTypeC="+vehType);
  }
  getShowReportData(tempid:string,vline:string){
    return this.http.get(this.baseUrl+"showreport?tempId="+tempid+"&vLine="+vline);
  }
  getSection(lang:string,sectionid:string){
    return this.http.get(this.baseUrl+"getsection?lang="+lang+"&sectionId="+sectionid);
  }
  getSectionDescAndId(group:string,vLine:string){
    return this.http.get(this.baseUrl+"getsectionidanddesc?group="+group+"&vLine="+vLine);
  }
  getSectionProp(sectionid:string,lang:string){
    return this.http.get(this.baseUrl1+"showreport?sectionId="+sectionid+"&lang="+lang)
  }
  getConsoShowReport(data:AuditConsoModel){
    return this.http.post<Object>(this.baseUrl2+"showreport",data);
  }
  getSectIdByTempId(lang:string,tempId:string,vLine:string){
    let params=new HttpParams().set('lang',lang).set('tempId',tempId).set('vLine',vLine);
    return this.http.get(this.baseUrl+'getsectid',{params:params,responseType:'json'});
  }
}
