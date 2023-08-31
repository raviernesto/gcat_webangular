import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddGcatWQReqDto, BrowseReqFileDto, GetGCATReqFileReqDto, IrpDateDto, ReqFileIo4Dto, SetGcatIllusFileReqDto, SetGcatWQReqDto } from '../interfaces/irp';
import { ConfigService } from '../shared/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class IrpReviewService {

  private BASE_URL = environment.illustration;

  constructor(private http: HttpClient,
    private configServie:ConfigService) { }
    getUserRoles(userId:string){
      const params = new HttpParams({
        fromObject: {
          userId
        }
    });
      return this.get("/irpreview/api/userroles",params);
     
    }
    getGcatSection(sectSectionIdR:any){
      const params = new HttpParams({
        fromObject: {
          sectSectionIdR,
        }
    });
      return this
      .get("/irpreview/api/gcatsection",params);
     
    }
    getGcatIllustrated(sectSectionIdR:any,reqIdR:any,illstrIdR:any,langGtiC:any){
      const params = new HttpParams({
        fromObject: {
          sectSectionIdR,
          reqIdR,
          illstrIdR,
          langGtiC
        }
    });
      return this
      .get("/irpreview/api/gcatillustrated",params);
    }
    getGcatIrpFile(reqIdR:any){
      const params = new HttpParams({
        fromObject: {
          reqIdR,
        }
    });
    return this
    .get("/irpreview/api/gcatirpfile",params);
    }
    getGcatIrpDate(reqIdR:any){
      const params = new HttpParams({
        fromObject: {
          reqIdR,
        }
    });
    return this
    .get("/irpreview/api/gcatirpdate",params);
    }
    getGcatIllustrator(roleCodeC:any){
      const params = new HttpParams({
        fromObject: {
          roleCodeC,
        }
    });
    return this
    .get("/irpreview/api/illustrator",params);
    }
    getExtIllustrator(){
      return this.http.get<any>(this.BASE_URL+'/irpreview/api/extillustrator');
    }
    getArtHouse(userIdC:any){
      const params = new HttpParams({
        fromObject: {
          userIdC,
        }
    });
    return this
    .get("/irpreview/api/arthouse",params);
    }

    getIRPSection(reqIdR:any){
      const params = new HttpParams({
        fromObject: {
          reqIdR,
        }
    });
      return this
      .get("/irpreview/api/irpsection",params);
    }
    getEffectiveDate(reqIdR:any){
      const params = new HttpParams({
        fromObject: {
          reqIdR,
        }
    });
      return this
      .get("/irpreview/api/effectivedate",params);
    }
    updateIrpEffectDate(reqIdR:any,effDt:any){
      const params = new HttpParams({
        fromObject: {
          reqIdR,
          effDt
        }
    });
      return this
      .get("/irpreview/api/updateeffectivedt",params);
    }

    delGCATReqFile(reqIdR:any,reqfileNameX:any,reqfileTypeC:any){
      const params = new HttpParams({
        fromObject: {
          reqIdR,
          reqfileNameX,
          reqfileTypeC
        }
    });
      return this
      .delete("/irpreview/api/deletegcatreqfile",params);
    }
    getGCATReqFile(reqIdR:any,reqfileNameX:any,reqfileTypeC:any){
    let dto:GetGCATReqFileReqDto={
      reqIdR:reqIdR,
      reqfileNameX:reqfileNameX,
      reqfileTypeC:reqfileTypeC
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    // return this.http.post(this.BASE_URL+
    //   '/irpreview/api/getgcatreqfile',dto, 
    //   { headers, responseType: 'blob' as 'json'}
    // ).pipe( catchError(this.configServie.handleError));
    return this.post("/irpreview/api/getgcatreqfile",dto);

    }
    setGcatWQ(dto:SetGcatWQReqDto){
      return this.post("/irpreview/api/setgcatwq",dto);
    }
    getGcatIllusStatus(illstrIdR:any){
      const params = new HttpParams({
        fromObject: {
          illstrIdR,
        }
    });
      return this
      .get("/irpreview/api/gcatillusStatus",params);
    }
    setGcatIllusId(plastIdC:any,sectSectionIdR:any,oldIllstrIdR:any,illstrIdR:any){
      const params = new HttpParams({
        fromObject: {
          illstrIdR,
          plastIdC,
          sectSectionIdR,
          oldIllstrIdR,
          
        }
    });
      return this
      .get("/irpreview/api/setgcatillusid",params);
    }

    setGcatIllstr(unitTypeC:any,statusCodeC:any,illstrIdR:any,pLastIdC:any){
      const params = new HttpParams({
        fromObject: {
          unitTypeC,
          statusCodeC,
          illstrIdR,
          pLastIdC
        }
    });
      return this
      .get("/irpreview/api/setgcatillstr",params);
    }
    setGcatIRP(statusCodeC:any,reqIdR:any,reqCurrOwnerC:any,reqExtIllusIdC:any,reqIntIllusIdC:any,unitTypeC:any){
      const params = new HttpParams({
        fromObject: {
          reqIdR,
          statusCodeC,
          reqCurrOwnerC,
          reqExtIllusIdC,
          reqIntIllusIdC,
          unitTypeC
        }
    });
      return this
      .get("/irpreview/api/setgcatirp",params);
      
    }
    delGcatWq(illstrIdR:any,reqIdR:any,userIdC:any){
      const params = new HttpParams({
        fromObject: {
          illstrIdR,
          reqIdR,
          userIdC,
        }
    });
      return this
      .get("/irpreview/api/delGcatWq",params);
    }
    setSectionillDate(sectSectionIdR: any ) {
      const params = new HttpParams({
        fromObject: {
          sectSectionIdR,
        }
    });
      return this
      .get("/irpreview/api/setsectionilldate",params);
    }
    setGcatIllsRevisionNo(illstrIdR:any){
      const params = new HttpParams({
        fromObject: {
          illstrIdR
        }
    });
      return this
      .get("/irpreview/api/setgcatillsrevisionno",params);
    }
    delGcatUnavailIllCmdty(illstrIdR:any,illstrPublishY:any){
      const params = new HttpParams({
        fromObject: {
          illstrIdR,
          illstrPublishY
        }
    });
      return this
      .get("/irpreview/api/deleteunavailIllCmdty",params);
    }
    delGcatIllusFile(fileStatusCdC:any,illstrIdR:any,filePublishY:any){
      const params = new HttpParams({
        fromObject: {
          fileStatusCdC,
          illstrIdR,
          filePublishY,
        }
    });
      return this
      .get("/irpreview/api/delgcatillusfile",params);
    }
    addGcatWQ(dto:AddGcatWQReqDto){
      return this.post("/irpreview/api/addgcatwq",dto);
    }
    setGcatIllusFile(dto:SetGcatIllusFileReqDto){
      return this.post("/irpreview/api/setgcatillusfile",dto);
    }

    addGcatIrPDate(dto:IrpDateDto){
      return this.post("/irpreview/api/gcatirpdate",dto);
    }
    getSectionProperty(reqIdR: any, langGtiC: any) {
      return this.http.get(this.BASE_URL + "/irpreview/api/textIrpSection?reqIdR=" + reqIdR + "&langGtiC=" + langGtiC);
    }

    browseReqFile(dto:BrowseReqFileDto){
      return this.post("/irpreview/api/browsereqfile",dto);
    //     const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    // return this.http.post(this.BASE_URL+
    //   '/irpreview/api/browsereqfile',dto, 
    //   { headers, responseType: 'blob' as 'json'}
    // ).pipe( catchError(this.configServie.handleError));
    }
    openFile(dto:GetGCATReqFileReqDto){
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.BASE_URL+
      '/irpreview/api/openFile',dto, 
      { headers, responseType: 'blob' as 'json'}
    ).pipe( catchError(this.configServie.handleError));
    }

    getUploadedFileValue(files: File,reqIdR:any,fileName:any,fileType:any): Observable<any> {
      console.log("ser")
      const formData: FormData = new FormData();
      formData.append('files', files);
      formData.append('reqIdR', reqIdR);
      formData.append('fileName', fileName);
      formData.append('fileType', fileType);
      return this.http.post(this.BASE_URL + "/irpreview/api/uploadFile", formData );
    }
    addReqFile(dto:ReqFileIo4Dto){
      return this.post("/irpreview/api/addReqFile",dto);
    }
    getGcatRoleCode(roleCodeC:any){
      const params = new HttpParams({
        fromObject: {
          roleCodeC
        }
    });
      return this
      .get("/irpreview/api/gcatrolecode",params);
    }
    getRequester(pLanguage:any,pUtiltTitleP:any){
      const params = new HttpParams({
        fromObject: {
          pLanguage,pUtiltTitleP
        }
    });
    return this
    .get("/irpreview/api/requester",params);
    }
    setGcatReqDate(reqdtY:any,plastIdC:any,dttypeC:any,reqIdR:any){
      const params = new HttpParams({
        fromObject: {
          reqdtY,
          plastIdC,
          dttypeC,
          reqIdR
        }
    });
      return this
      .get("/irpreview/api/setgcatreqtate",params);
    }
    updateI02DownldStatus(reqIdR:any,downldStatusC:any){
      const params = new HttpParams({
        fromObject: {
          reqIdR,
          downldStatusC
        }
    });
      return this
      .get("/irpreview/api/updatedownloadstatus",params);
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

    public delete(
      path: string,
      params: HttpParams = new HttpParams(),
    ): Observable<any> {
      const options = {
        params
      }
      return this.http.delete(this.BASE_URL + path, options)
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