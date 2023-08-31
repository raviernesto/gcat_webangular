import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IllworkService {

  constructor(private httpclient: HttpClient) { }
  private baseurl = environment.report+"/illuswq"; 
   //private baseurl ="http://localhost:7000/illuswq";
  reportNew(){
    return this.httpclient.get(this.baseurl + '/reportNew');
}
reportUpdate(){
  return this.httpclient.get(this.baseurl + '/reportUpdate');
}
reportAll(){
  return this.httpclient.get(this.baseurl + '/reportAll');
}
}
