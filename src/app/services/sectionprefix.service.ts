import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sectionprefixsave } from '../models/sectionprefixsave';


@Injectable({
  providedIn: 'root'
})
export class SectionprefixService {

  constructor(private htttpclient: HttpClient) { }


  private baseURL = environment.master+"/sectionPrefix"

  public getCommoditySuffix(){

    return this.htttpclient.get<any>(this.baseURL + "/sectionprefix");
   
  }

  public getAllfeaturesValue(){

    return this.htttpclient.get<any>(this.baseURL + "/sectionprefixtable");
   
  }

  public getSelectButton(famprefxPrefixC:string){
    console.log(famprefxPrefixC);
    return this.htttpclient.post<any>(this.baseURL + "/section", famprefxPrefixC);
   
  }

  public savePrefixCode(sectionprefixsave:Sectionprefixsave,famprefxPrefixC:string){
    return this.htttpclient.post<any>(this.baseURL + "/save?famprefxPrefixC="+famprefxPrefixC,sectionprefixsave);
  }

  // getCommodityDetails(vehicleType:string,commoditySearch:string) {
  //   return this.http.get(this.url + "/commoditydetails?vehicleType="+vehicleType+"&commodity="+commoditySearch);
  // }


}
