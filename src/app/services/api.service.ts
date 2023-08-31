import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkQueueFilter } from '../interfaces/part-workqueue';
import { environment} from '../../environments/environment';
export interface HttpOptions{
  headers?:HttpHeaders|{
    [header:string]:string|string[];
  }
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headersObject={
    "Content-type":"application/json"
  }
  constructor(private http:HttpClient) { }

  public get(
    path:string,
    params:HttpParams=new HttpParams(),
    ){
      const options={
        params
      }
      return this.http.get(environment.worqueue+path,options);
    }

    public post(
      path:string,
      body:object={},
    ){
      return this.http.post<WorkQueueFilter>(environment.worqueue+path,body);
    }

    public delete(
      path:string,
      params:HttpParams=new HttpParams(),
    ){
      const options={
        params
      }
      return this.http.delete(environment.worqueue+path,options);
    }
}
