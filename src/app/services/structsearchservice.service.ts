import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StructsearchserviceService {

  constructor(private httpclient:HttpClient) { }
  private url=environment.transaction+"/Struct";

  engBaseDropdown(engBase:any){
    console.log("engbase");
    return this.httpclient.post(this.url + "/structsearchengbasedropdown",engBase);
}

commodityDropdown(commodity:any){
  console.log("commodity");
  return this.httpclient.post(this.url + "/structsearchcommoditydropdown",commodity);
}

baseCommodityData(SelectedParts:any){
  console.log("BaseCommodityData");
  console.log(SelectedParts)
  let params=new HttpParams().set('engpBaseR',SelectedParts)
  return this.httpclient.get(this.url + "/basetocommodity",{params:params,responseType:'json'});
}

commodityTemplate(SelectedCommodity:any,vehicleType:any){
  console.log("commodityTemplate");
  console.log(SelectedCommodity);
  console.log(vehicleType);
  let params=new HttpParams().set('cmdtyValue',SelectedCommodity).set('type',vehicleType)
  return this.httpclient.get(this.url + "/commoditytotemplate",{params:params,responseType:'json'});
}

commoditySection(SelectedCommodity:any,Type:any){
  console.log("commoditySection");
  console.log(SelectedCommodity);
  console.log(Type);
  let params=new HttpParams().set('cmdtyValue',SelectedCommodity).set('type',Type)
  return this.httpclient.get(this.url + "/commoditytosection",{params:params,responseType:'json'});
}


}
