import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SaveCommodityModel } from '../models/savecommodity.model';
import { environment } from 'src/environments/environment';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AssigncommtousageapiService {

  getwersname:string=environment.commodity+'/commodity/getwersname';
  getcommtype:string=environment.commodity+'/commodity/getusgcommtype';
  getusagecomm:string=environment.commodity+'/commodity/getusgcomm';
  getcommgrid:string=environment.commodity+'/commodity/getcommoditygrid';
  onsavecomm:string=environment.commodity+'/commodity/savecommoditygrid';
  constructor(private http:HttpClient) { }

  getDescription(engPart:string,originC:string,seqR:number){
    var params = {engpPartR:engPart,eioOriginC:originC,engpSeqR:seqR};
    var config = { params: params };
    return this.http.get<Object>(this.getwersname,config);
  }
  getCommType(vehicletype:string,origin:string){
    var params= {vehicleTypeC:vehicletype,originC:origin};
    var config = { params: params };
    return this.http.get<Object>(this.getcommtype,config);
  }
  getUsageCommodity(engppartr:string,eioorigin:string,seqr:number){
    var params={engpPartR:engppartr,eioOriginC:eioorigin,engpSeqR:seqr};
    var config = { params: params };
    return this.http.get<Object>(this.getusagecomm,config);
  }
  getCommGrid(engpbase:string,engEioOrig:string,cmdtyType:string){
    var params={engpBase:engpbase,engBaseEioOrig:engEioOrig,cmdtyType:cmdtyType};
    var config = { params: params };
    return this.http.get<Object>(this.getcommgrid,config);
  }
  onSaveCommodity(data:SaveCommodityModel){
    return this.http.post<Object>(this.onsavecomm,data);
  }
}
