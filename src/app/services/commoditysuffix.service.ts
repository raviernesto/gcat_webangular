import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Commoditysuffixmodel } from '../models/commoditysuffixmodel';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommoditysuffixService {

  
  

  constructor(private htttpclient: HttpClient) { }

  private baseURL = environment.commodity+"/commodity"

  public getSuffixC(commoditysuffix: Commoditysuffixmodel) {

    return this.htttpclient.post<any>(this.baseURL + "/commoditysuffixc", commoditysuffix);
   
  }

public getSuffixTable(commoditysuffix: Commoditysuffixmodel) {

    return this.htttpclient.post<any>(this.baseURL + "/commoditysuffixtable", commoditysuffix);
}

public SuffixSave(commoditysuffix: Commoditysuffixmodel) {
  
  return this.htttpclient.post<any>(this.baseURL + "/commoditysave", commoditysuffix);
}


public deleteCommoditySuffix(commoditysuffix: Commoditysuffixmodel){
  return this.htttpclient.post<any>(this.baseURL + "/commoditydeleted", commoditysuffix);
}



// getDescription(engPart:string,originC:string,seqR:number):Observable<Object>{
//   var params = {engpPartR:engPart,eioOriginC:originC,engpSeqR:seqR};
//   var config = { params: params };
//   return this.http.get<Object>(this.getwersname,config);
// }
// 


// public deleteCommoditySuffix(sectSectionIdR:string,cmdtyTypeC:string,engpCommodityC:string,engpEngnrgPartP:string,eioOriginC:string,engpSeqR:string){
// let params =new HttpParams().set('sectSectionIdR',sectSectionIdR).set('cmdtyTypeC',cmdtyTypeC).set('engpCommodityC',engpCommodityC).set('engpEngnrgPartP',engpEngnrgPartP).set('eioOriginC',eioOriginC).set('engpSeqR',engpSeqR)
// return this.htttpclient.get(this.baseURL + "/deleteCommodity", {params:params,responseType:'json'});
// }

// public deleteCommoditySuffix(sectSection:string,cmdtyType:string,engpCommodity:string,engpEngnrgPart:string,eioOrigin:string,engpSeq:number):Observable<Object>{
//   var params ={sectSectionIdR:sectSection,cmdtyTypeC:cmdtyType,engpCommodityC:engpCommodity,engpEngnrgPartP:engpEngnrgPart,eioOriginC:eioOrigin,engpSeqR:engpSeq};
//   var config = { params: params };
//   return this.htttpclient.get<Object>(this.baseURL + "/deleteCommodity",config);
// }




}
