import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewUsageService {
  
  constructor(private httpclient:HttpClient) { }
  private url=environment.usage+'/newusage/api';

  getMasterList(input:any){
    
    return this.httpclient.post(this.url+"/newusage",input);
  }
  delete(input:any){
    return this.httpclient.post(this.url+"/delete",input);
  }
 
}
