import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehlineworkloadService {

  constructor(private httpclient:HttpClient) { }

  // private burl="http://localhost:8080/vehlineWL/"
  private url=environment.report+"/vehlineWL/";
  
  
  fetchdropdown(){
    
    return this.httpclient.get(this.url+"vehlinewldropdown")
    
  }

  fetchtabledata(Input:any){
    console.log(Input);
    
    console.log("service");
    
    return this.httpclient.post(this.url +"templatedata",Input)
//responseType:'json'
  }

 
}
