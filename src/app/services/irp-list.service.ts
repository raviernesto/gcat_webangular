import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IrpListReqDto } from '../models/irp';
import { ConfigService } from '../shared/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class IrpListService {
  private BASE_URL = environment.illustration;
  constructor(  private http: HttpClient,
    private configServie:ConfigService) { }

    getRequesterId() {
      return this.http.get<any>(this.BASE_URL+'/irplist/api/requesters');
    }

   
    getCurrentOwner(reqTypeC:string,reqCurrOwnerC:string){
      const params = new HttpParams({
        fromObject: {
          reqTypeC,
          reqCurrOwnerC
        }
    });
      return this
      .get("/irplist/api/currentowner",params);
     
    }
    getIrpStatus(unitTypeC:any){
      const params = new HttpParams({
        fromObject: {
          unitTypeC,
        }
    });
      return this
      .get("/irplist/api/producttypeoriginlist",params);
    }
    getVehicleLines(){
      return this.http.get<any>(this.BASE_URL+"/irplist/api/vehicleline");
    }

    getPrefix(){
      return this.http.get<any>(this.BASE_URL+"/irplist/api/prefix");
    }

    getTemplateId(sectVehicleLineC:any){
      const params = new HttpParams({
        fromObject: {
          sectVehicleLineC,
        }
    });
      return this
      .get("/irplist/api/templateid",params);
    }


    getIrpList(dto:IrpListReqDto){
      return this.post("/irplist/api/irplist",dto);
    }

    setIllusOwner(reqIdR:any,reqCurrOwnerC:any){
      const params = new HttpParams({
        fromObject: {
          reqIdR,
          reqCurrOwnerC,
        }
    });
      return this
      .get("/irpreview/api/setgcatillsowner",params);
    }
    getGcatIrp2(reqIdR:any, illstrIdR:any){
      const params = new HttpParams({
        fromObject: {
          reqIdR,
          illstrIdR,
        }
    });
      return this
      .get("/irpreview/api/gcatirp2",params);
    }
    public get(
      path: string,
      params: HttpParams = new HttpParams(),
    ): Observable<any> {
      const options = {
        params
      }
      return this.http.get(this.BASE_URL + path, options)
      .pipe(
        catchError(this.configServie.handleError)
      );;
    }
  
    public post(
      path: string,
      body: object = {},
    ): Observable<any> {
      return this.http.post<any>(this.BASE_URL + path, body)
      .pipe(
        catchError(this.configServie.handleError)
      );
    }
}
