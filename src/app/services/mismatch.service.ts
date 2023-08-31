import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { GetGCATReqFileReqDto } from '../interfaces/irp';
import { ComMismatchVehTableinputDto, ComMismmatchPreTableInputDto } from '../models/mismatch.model';
import { ConfigService } from '../shared/services/config.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MismatchService {
 
  constructor(private httpclient: HttpClient,private configServie:ConfigService) { }
  // private baseurl ="http://localhost:8080/mismatch";
     private baseurl=environment.report+"/mismatch";
  fetchVehDrop(vehicleType:string){
      return this.httpclient.post(this.baseurl + '/vehiclelist', vehicleType)
  }
  fetchtable(illustration:string){
      return this.httpclient.post(this.baseurl + '/fetchtable', illustration)
  }
  fetchPreDrop(){
      return this.httpclient.get(this.baseurl + '/fetchPrefix');
  }
  showReportVeh(input:ComMismatchVehTableinputDto){
      return this.httpclient.post(this.baseurl +'/fetchvehtable',input);
  }
  showReportGrp(input: ComMismatchVehTableinputDto){
      return this.httpclient.post(this.baseurl +'/fetchgrptable',input);
  }
  showReportPre(input: ComMismmatchPreTableInputDto){
      return this.httpclient.post(this.baseurl +'/fetchprefixtable',input);
  }
  openFile(dto:GetGCATReqFileReqDto){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  return this.httpclient.post(this.baseurl+
    '/openFile',dto, 
    { headers, responseType: 'blob' as 'json'}
  ).pipe( catchError(this.configServie.handleError));
  }
  getGCATReqFile(reqIdR:any,reqfileNameX:any,reqfileTypeC:any){
    let dto:GetGCATReqFileReqDto={
      reqIdR:reqIdR,
      reqfileNameX:reqfileNameX,
      reqfileTypeC:reqfileTypeC
    }
  }
  getUploadedFileValue(files: File,reqIdR:any,fileName:any,fileType:any): Observable<any> {
    console.log("ser")
    const formData: FormData = new FormData();
    formData.append('files', files);
    formData.append('reqIdR', reqIdR);
    formData.append('fileName', fileName);
    formData.append('fileType', fileType);
    return this.httpclient.post(this.baseurl + "/uploadFile", formData );
  }
}