import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IllustrationstatusService {

  constructor( private http :HttpClient ) {}
   
  // private baseURL="http://localhost:8080/IllustrationStatus"
   private baseURL=environment.report+'/IllustrationStatus';

  fetchIllustrationStatus(){
    return this.http.get(this.baseURL + '/fetchVehicleLine')
  }
  
  fetchIllustrationPrefix(){
    return this.http.get(this.baseURL + '/fetchPrefix')
  }

  fetchNoOfSec(illustrationStatus:any){
    return this.http.post(this.baseURL + '/fetchShowReport',illustrationStatus)
  }

  fetchArtTable(illustrationStatus:any){
    return this.http.post(this.baseURL + '/fetchArtTable',illustrationStatus)
  }
  fetchComplTable(illustrationStatus:any){
    return this.http.post(this.baseURL + '/fetchComplTable',illustrationStatus)
  }
  fetchAnalystTable(illustrationStatus:any){
    return this.http.post(this.baseURL + '/fetchAnalystTable',illustrationStatus)
  }
  fetchSecWitOutIlluTable(illustrationStatus:any){
    return this.http.post(this.baseURL + '/fetchWithOutIlluTable',illustrationStatus)
  }
  fetchRejIlluTable(illustrationStatus:any){
    return this.http.post(this.baseURL + '/fetchRejIlluTable',illustrationStatus)
  }
  fetchWitCoorTable(illustrationStatus:any){
    return this.http.post(this.baseURL + '/fetchWitCoorTable',illustrationStatus)
  }
  fetchOpenIrpsTable(illustrationStatus:any){
    return this.http.post(this.baseURL + '/fetchOpenIrpsTable',illustrationStatus)
  }
  fetchPercentage(illustrationStatus:any){
    return this.http.post(this.baseURL + '/fetchPercentage',illustrationStatus)
  }
}
