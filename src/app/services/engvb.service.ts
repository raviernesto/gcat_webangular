import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { VendorpartDetails } from '../engineering-base-to-vendor-part/engineering-base-to-vendor-part';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EngvbService {
  
  constructor(private httpclient:HttpClient) { }
  private url=environment.partInformation+"/engvb"
  fetchVendordropdown(){
    
    return this.httpclient.get(environment.partInformation+"/engvb/vendorpartsdropdown")
    //responseType:'json'
  }

  fetchVendorpartsdata(part:string,origin:string,seq:number){
    let params=new HttpParams().set('engpengnrgpartr',part).set('eiooriginc',origin).set('engpseqr',seq)
    
    return this.httpclient.get(environment.partInformation+"/engvb/vendorpartsdisplay",{params:params,responseType:'json'})
    //responseType:'json'
  }

  // getNewBaseDetails(){
  //   return this.httpclient.get(this.url + "/newbases");
  // }

  getNewBaseCritDetails(baseCriteria:any){
      console.log("New");
      return this.httpclient.post(environment.partInformation + "/engvb/newbasescrit",baseCriteria);
  }

  getAllBaseCritDetails(baseCriteria:any){
    console.log("All");
      return this.httpclient.post(environment.partInformation  + "/engvb/allbasescrit",baseCriteria);
  }

  saveVendorPartsDetails(vendorPartDetails :VendorpartDetails){
    console.log("SAVE");
    return this.httpclient.post(environment.partInformation+"/engvb/savevendorpartdetails",vendorPartDetails)
  }
}
