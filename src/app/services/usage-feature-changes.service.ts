import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsageFeatureChangesService {

  
  constructor(private httpclient :HttpClient) { }
  private url=environment.usage+'/usageFeatureChanges/api';

  
  getSingleValue(input:any){
    return this.httpclient.post(this.url+"/usagefeatures",input);
  }

  getMasterList(input:any){
    
    return this.httpclient.post(this.url+"/usagefeature",input);
  }
  update(input:any){
    return this.httpclient.post(this.url+"/update",input);
  }
  
 
}
