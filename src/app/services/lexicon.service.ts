import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LexiconService {
//private baseUrl ="http://localhost:8080";
   private baseUrl =environment.report;

  constructor(private http :HttpClient) { }
  getLex()
  {
    return this.http.get(this.baseUrl+'/getLexc');
    
  }
     getData(binding :any)
    {
    console.log(binding);
    return this.http.get(this.baseUrl+'/findLexcC/'+binding);
    };

    getCalib(binding:any)
    {
      console.log(binding);
      let params=new HttpParams().set("lexiCode",binding)
      return this.http.get(this.baseUrl+'/findCalib',{params}); 
    }
    getpdesc(binding:any)
    {
      console.log(binding);
      let params=new HttpParams().set("lexiCode",binding)
      return this.http.get(this.baseUrl+'/findPartDesc',{params}); 
    }
    getSpec(binding:any)
    {
      console.log(binding);
      let params=new HttpParams().set("lexiCode",binding)
      return this.http.get(this.baseUrl+'/findLexcCC',{params}); 
    }
    getWork(binding:any)
    {
      console.log(binding);
      let params=new HttpParams().set("lexiCode",binding)
      return this.http.get(this.baseUrl+'/findWorkQueue',{params}); 
    }
    getCmmdty(binding:any)
    {
      console.log(binding);
      let params=new HttpParams().set("lexiCode",binding)
      return this.http.get(this.baseUrl+'/findCmdty',{params}); 
    }
    getGroupAVS(binding:any, langCode:any)
    {
      console.log(binding);
      let params=new HttpParams().set("lexiCode",binding).set("langCode",langCode);
      return this.http.get(this.baseUrl+'/findGrAVS',{params}); 
    }
    
    getSingleAVS(binding:any, langCode:any)
    {
      console.log(binding);
      let params=new HttpParams().set("lexiCode",binding).set("langCode",langCode);
      return this.http.get(this.baseUrl+'/findSiAVS',{params}); 
    }
    downloadCommodityData(getData:any){
      let params=new HttpParams().set("lexiCode",getData);
      return this.http.get(this.baseUrl+"/download/lexiconExcel.xlsx",{params, responseType:"blob"})
    }
    downloadPartDescData(getData:any){
      let params=new HttpParams().set("lexiCode",getData);
      return this.http.get(this.baseUrl+"/download/lexiconExcelPartDesc.xlsx",{params, responseType:"blob"})
    }
    downloadWorkQueueData(getData:any){
      let params=new HttpParams().set("lexiCode",getData);
      return this.http.get(this.baseUrl+"/download/lexiconExcelWorkQueue.xlsx",{params, responseType:"blob"})
    }
    downloadSpecCommentData(getData:any){
      let params=new HttpParams().set("lexiCode",getData);
      return this.http.get(this.baseUrl+"/download/lexiconExcelSpecComment.xlsx",{params, responseType:"blob"})
    }
    downloadCalibrationData(getData:any){
      let params=new HttpParams().set("lexiCode",getData);
      return this.http.get(this.baseUrl+"/download/lexiconExcelCalibration.xlsx",{params, responseType:"blob"})
    }
    downloadSingleAvsData(getData1:any, getData2:any){
      let params=new HttpParams().set("lexiCode",getData1).set("langCode",getData2);
      
      return this.http.get(this.baseUrl+"/download/lexiconExcelCalibration.xlsx",{params, responseType:"blob"})
    }
    downloadGroupAvsData(getData1:any, getData2:any){
      let params=new HttpParams().set("lexiCode",getData1).set("langCode",getData2);
      return this.http.get(this.baseUrl+"/download/lexiconExcelCalibration.xlsx",{params, responseType:"blob"})
    }
  }

