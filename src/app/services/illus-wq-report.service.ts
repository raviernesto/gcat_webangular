import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { wqReportInput } from '../models/illusWQReportModel';

@Injectable({
  providedIn: 'root'
})
export class IllusWqReportService {

  constructor( private https:HttpClient) { }
  // fetchVehicleLine(input:Job1TransVehicleLineInput){
  //   return this.httpclient.post<any>(this.baseurl + '/vehline',input)
  // }

  getCode(input:wqReportInput){

    return this.https.post<any>(environment.report+"/IllustrationWorkQueueReport/wq",input)
    // return this.https.get<any>("http://localhost:8080/wq",input)
  }
}
