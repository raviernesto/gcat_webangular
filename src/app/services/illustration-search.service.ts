
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommodityDto, TemplateDto, VehicleDto } from '../models/illustration-search.class';

@Injectable({
    providedIn: 'root'
})
export class IllustrationSearchService {
  
  constructor(private http: HttpClient) { }
    
  private baseURL = environment.illustration+"/illsearch";

  getVehicleLine(vehType:string){
    return this.http.get(this.baseURL+"/vehlist?vehType="+vehType);
  }

  getPrefixDesc(){
    return this.http.get(this.baseURL+"/prefixlist");
  }

  getIllusVeh(vehicle:VehicleDto){
    return this.http.post(this.baseURL+"/vehillus",vehicle);
  }

  getCommList(){
    return this.http.get(this.baseURL+"/commlist");
  }

  getIllusComm(commodity:CommodityDto){
    return this.http.get(this.baseURL+"/commillus?comm="+commodity.commodity+"&vehicle="+commodity.vehType);
  }

  getTempList(){
    return this.http.get(this.baseURL+"/templist");
  }

  getIllusTemp(template:TemplateDto){
    return this.http.get(this.baseURL+"/tempillus?template="+template.template+"&vehicle="+template.vehType);
  }

  getIllusNoSec(){
    return this.http.get(this.baseURL+"/nosecillus");
  }

  getIllusList(){
    return this.http.get(this.baseURL+"/illuslist");
  }

  getIllusId(illId:string){
    return this.http.get(this.baseURL+"/illusid?illId="+illId);
  }

  getPdf(illId:string){
    return this.http.get(this.baseURL+"/pdf?illId="+illId);
}

  getImage(illId:string){
      return this.http.get(this.baseURL+"/image?illId="+illId);
  }

  getIrp(illId:string){
    return this.http.get(this.baseURL+"/irplist?illId="+illId);
  }
    
}