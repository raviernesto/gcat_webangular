import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WbsCopy } from '../models/wbs.class';

@Injectable({
  providedIn: 'root'
})
export class WorkBreakdownStructureService {

  constructor(private http: HttpClient) { }
     private baseURL = environment.wbs+"/wbs"
    //private baseURL = "http://localhost:8080/wbs";

    wbsGroup(option:string) {
        return this.http.get(this.baseURL + "/wbsload?option="+option);
    }

    nodeExpandTemp(node: any) {
        return this.http.post(this.baseURL + "/expandtemplate", node);
    }

    nodeExpandComm(node: any) {
        return this.http.post(this.baseURL + "/expandcommodity", node);
    }

    nodeExpandSect1(node: any) {
        return this.http.post(this.baseURL + "/expandsectveh", node);
    }

    nodeExpandSect2(node: any) {
        return this.http.post(this.baseURL + "/expandsectpre", node);
    }

    optionLoad(type:string,commodity:string,vehLine:string){
        return this.http.get(this.baseURL + "/optionload?type="+type+"&commodity="+commodity+"&vehLine="+vehLine);
    }

    fetchWbsdropdown(){
        return this.http.get(this.baseURL+"/vehlinedropdown");
     }

     fetchprefix(){
        return this.http.get(this.baseURL+"/prefixdropdown");
     }

     saveCopy(copy:WbsCopy){
        return this.http.post(this.baseURL+"/savecopy",copy);
     }

     showProp(sectionId:string){
        return this.http.get(this.baseURL+"/showprop?sectionId="+sectionId);
     }

     assignSection(input:any) {
        return this.http.post(this.baseURL+"/assignsection",input);
      }
      detachIllCheck(input:any) {
        return this.http.get(this.baseURL+"/illstr?secIdr="+input);
      }
      detachIll(input:any) {
        return this.http.get(this.baseURL+"/update?secIdr="+input);
      }

      getreqIdR(illustrIdR:string) {
        return this.http.get(this.baseURL+"/reqIdR?illustrIdR="+illustrIdR);
        }

}
