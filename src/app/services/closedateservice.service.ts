import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CloseDateInputDto, CloseDateS4pInputDto } from '../models/closedate.model';

@Injectable({
  providedIn: 'root'
})
export class ClosedateserviceService {


  constructor(private httpclient: HttpClient) { }
  private baseurl = environment.transaction+"/closedate";
 //private baseurl ="http://localhost:8080/closedate";
 fetchVehDrop(){
  return this.httpclient.get(this.baseurl + '/vehlist');
}
fetchS4pCodeDrop(request:CloseDateS4pInputDto){
  return this.httpclient.post(this.baseurl +'/s4pcode',request,{responseType:'json'});

}
fetchS4pDateDrop(request: CloseDateS4pInputDto){
  console.log("sssssssssssssssssssssssssssssss="+request)
  return this.httpclient.post(this.baseurl +'/s4pdate',request,{responseType:'json'});
}
setDate(request:CloseDateInputDto){
return this.httpclient.post(this.baseurl +'/insert',request);
}
}