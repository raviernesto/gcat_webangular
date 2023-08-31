import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProducttypeclassService {

  constructor( private httpclient:HttpClient ) { }
  private baseURL=environment.transaction+"/ProductTypeClass"

  getProductTypeClass(){
    return this.httpclient.get(this.baseURL+'/first')
  }
  getProductTypeClassCar(){
    return this.httpclient.get(this.baseURL+'/car')
  }
  getProductTypeClassTruck(){
    return this.httpclient.get(this.baseURL+'/truck')
  }
}
