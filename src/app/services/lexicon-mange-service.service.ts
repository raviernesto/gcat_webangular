import { Injectable } from '@angular/core';
import{HttpClient,HttpHandler,HttpHeaders,HttpParams}from '@angular/common/http';
import{Observable} from 'rxjs'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LexiconMangeServiceService {

  httpOption={
    head: new HttpHeaders({
      'content-type':'application/json',
     
      'Access-Control-Allow-Origin': ' http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': ' POST, GET, OPTIONS, DELETE',
      'Access-Control-Max-Age': ' 3600',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With, remember-me',
'Authorization':
     'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYXRlbTEyMyIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfRU1Q'
    })
  }

  constructor(private https:HttpClient) { }
  baseurl = environment.master+'/lexicon';
////baseurl:string='https://gcat-service-master-gcat11296.apps.pp101.caas.gcp.ford.com/lexicon';
//baseurl:string="http://localhost:8080/lexicon";
getPropertyByLexiType(lexiType:string){
  let params=new HttpParams().set('type',lexiType)
  return this.https.get(this.baseurl+'/propertyByType',{params:params,responseType:'json'})
}
  getlexiTypeForDropdown(){
   return this.https.get(this.baseurl+'/lexiType',{responseType:'json'})
  }

  getDatabyProCode(prcode:string){
    let params=new HttpParams().set('propertyCode',prcode)
    return this.https.get(this.baseurl+'/getProprtyData',{params:params,responseType:'json'})
  }

  saveProperty(inputData:any){
    return this.https.post(this.baseurl+'/savePropety',inputData,{responseType:'json'})
  }
  updateProperty(inputData:any){
    return this.https.post(this.baseurl+'/updatePropety',inputData,{responseType:'json'})
  }
  deleteProperty(inputData:any){
    return this.https.post(this.baseurl+'/deletePropCode',inputData,{responseType:'json'})
  }

getProCodeForLexiCode(Lexicode:string,lang:string){
  let params=new HttpParams().set('lexiCode',Lexicode).set('lang',lang)
  return this.https.get(this.baseurl+'/getLexiPrpertyCodeByLexiCode',{params:params,responseType:'json'})
}

searchByMinFea(searchWords:string,lang:string){
  let params=new HttpParams().set('searchWords',searchWords).set('lang',lang)
  return this.https.get(this.baseurl+'/getLexicodeByMinorFeature',{params:params,responseType:'json'})
}

propertyForLexSrcDropdown(){
  return this.https.get(this.baseurl+'/getLexiPropertyType',{responseType:'json'})
}
getVhLine(){
  return this.https.get(this.baseurl+'/vhline',{responseType:'json'})
}

  getLexiconSerachTable(inputData:any){
    return this.https.post(this.baseurl+'/getDetailsFroLexiSearch',inputData,{responseType:'json'})
  }

  getByLexiconCode(Lexicode:string,lang:string){
    let params=new HttpParams().set('lexiCode',Lexicode).set('lang',lang)
    return this.https.get(this.baseurl+'/fechLexiconmaster',{params:params,responseType:'json'})
  }

  getVHLinesForFilter(){
    return this.https.get(this.baseurl+'/vehicalLine',{responseType:'json'})
  }

  getLexiFamilyForFilter(vhType:string,vhLine:string){
    let params=new HttpParams().set('vhType',vhType).set('vhLine',vhLine)
    return this.https.get(this.baseurl+'/lexifamily',{params:params,responseType:'json'})
  }

  getFilterData(inputData:any){
    return this.https.post(this.baseurl+'/lexifilterdata',inputData,{responseType:'json'})
  }
  
  deleteFilterData(inputData:any){
    return this.https.post(this.baseurl+'/updatelexifilter',inputData,{responseType:'json'})
  }

  addFiltedData(inputData:any){
    return this.https.post(this.baseurl+'/addFilterData',inputData,{responseType:'json'})
  }

  saveNewLexiconData(inputData:any){
    return this.https.post(this.baseurl+'/savenewlexicon',inputData,{responseType:'json'})
  }

  updateLexiData(inputData:any){
    return this.https.put(this.baseurl+'/updatelexi',inputData,{responseType:'json'})
  }

  deleteLexiData(inputData:any){
    return this.https.post(this.baseurl+'/deletelexidata',inputData,{responseType:'json'})

  }
  
  MfcData(vhType:any){
    let params=new HttpParams().set('vhType',vhType)
    return this.https.get(this.baseurl+'/mfcData',{params:params,responseType:'json'})
  }

  pfcData(search:any){
    let params=new HttpParams().set('search',search)
    return this.https.get(this.baseurl+'/pfcData',{params:params,responseType:'json'})
  }

  loadGroupAvs(lexiCode:string,lang:string){
    let params=new HttpParams().set('lexiCode',lexiCode).set('lang',lang)
    return this.https.get(this.baseurl+'/groupAvsFech',{params:params,responseType:'json'})
  }

  saveLexiGroup(table:any){
    console.log(table)
return this.https.post(this.baseurl+'/groupavssave',table,{responseType:'json'})
  }

  deleteGrpAvs(lexiCode:any,lexiCode2:any){
    let params=new HttpParams().set('lexiCode',lexiCode).set('lexicode2',lexiCode2)
    return this.https.get(this.baseurl+'/groupavsdelete',{params:params,responseType:'json'})
  }

//   loadGroupAvs(lexiCode:string,lang:string){
//     let params=new HttpParams().set('lexiCode',lexiCode).set('lang',lang)
//     return this.https.get(this.baseurl+'/groupAvsFech',{params:params,responseType:'json'})
//   }

//   saveLexiGroup(table:any){
//     console.log(table)
// return this.https.post(this.baseurl+'/groupavssave',table,{responseType:'json'})
//   }

//   deleteGrpAvs(lexiCode:any,lexiCode2:any){
//     let params=new HttpParams().set('lexiCode',lexiCode).set('lexicode2',lexiCode2)
//     return this.https.get(this.baseurl+'/groupavsdelete',{params:params,responseType:'json'})
//   }

  replaceLexicon(lexiCode:any,lexiCodeRe:any){
    let params=new HttpParams().set('lexiCode',lexiCode).set('lexiCodeRe',lexiCodeRe)
    return this.https.get(this.baseurl+'/lexiReplace',{params:params,responseType:'json'})
  }
}
