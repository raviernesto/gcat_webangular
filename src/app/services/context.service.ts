
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EngPart } from '../models/context.class';
@Injectable({
    providedIn: 'root'
})
export class ContextService {
    constructor(private http: HttpClient) { }
    private baseURL = environment.partInformation+"/partincontext";
// private baseURL = "https://localhost:8080/partincontext";

    getCommodityList(vehicleType:string) {
        return this.http.get(this.baseURL + "/commoditylist?vehicleType="+vehicleType);
      }
    
    fetchWorkqueueAssignmentReportVehicleLine() {
        return this.http.get(this.baseURL + '/fetchVehicleLine')
    }

    showReport(engPart:EngPart) {
        return this.http.post(this.baseURL + '/showReport',engPart)
    }

    sp(){
        return this.http.get(this.baseURL + '/spCode')
    }
}