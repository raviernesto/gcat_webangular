import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseUpdate, ChangeCommodity, CommodityDetails, EngineeringBase } from 'src/app/development-commodity-setup/development-commodity-setup.class';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommodityService {

  constructor(private http: HttpClient) { }
  url = environment.commodity+'/commodity';
  getCommodity() {
    return this.http.get(this.url + "/init");
  }

  getCommodityList(vehicleType:string) {
    return this.http.get(this.url + "/commoditylist?vehicleType="+vehicleType);
  }

  getWqList(){
    return this.http.get(this.url + "/workqueuelist");
  }

  getCommodityVehicleType(vehicleType:string,commoditySearch:string) {
    return this.http.get(this.url + "/commList?vehicleType="+vehicleType+"&commodity="+commoditySearch);
  }

  getCommodityDetails(vehicleType:string,commoditySearch:string) {
    return this.http.get(this.url + "/commoditydetails?vehicleType="+vehicleType+"&commodity="+commoditySearch);
  }

  getNewBaseDetails(){
    return this.http.get(this.url + "/newbases");
  }

  getNewBaseCritDetails(baseCriteria:any){
      return this.http.post(this.url + "/newbasescrit",baseCriteria);
  }

  getAllBaseCritDetails(baseCriteria:any){
      return this.http.post(this.url + "/allbasescrit",baseCriteria);
  }

  saveCommodityDetails(commodityDetails:CommodityDetails){
    return this.http.post(this.url + "/savecommoditydetails",commodityDetails);
  }

  changeCommodity(changeCommodity:ChangeCommodity){
    return this.http.post(this.url + "/changecommodity",changeCommodity);
  }

  checkCommodityExists(commodity:any){
    return this.http.get(this.url + "/checkcommodityexists?commodity="+commodity);
  }

  checkBaseCommodity(baseSelectedDetails:any){
    return this.http.post(this.url + "/checkbasecommodity",baseSelectedDetails);
  }

  copyCommodity(copyCommodity:any){
    return this.http.post(this.url + "/copycommodity",copyCommodity);
  }

  commodityBaseCount(commodity:any,vehicleType:any){
    return this.http.get(this.url + "/commoditybasecount?commodity="+commodity+"&vehicleType="+vehicleType);
  }

  commodityDelete(commodity:any,vehicleType:any){
    return this.http.get(this.url + "/commoditydelete?commodity="+commodity+"&vehicleType="+vehicleType);
  }

  getBaseDetails(commodity:any,vehicleType:any,base:any){
    return this.http.get(this.url + "/basedetails?commodity="+commodity+"&vehicleType="+vehicleType+"&base="+base);
  }

  public addEngineeringBaseMaster(engineeringBase: EngineeringBase) {
    return this.http.post(this.url+"/addengineeringbase", engineeringBase);
  }
  
  public saveDesignation(baseUpdate:BaseUpdate){
    return this.http.post(this.url+"/saveDesignation", baseUpdate);
  }
}
