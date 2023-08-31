
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CatalogService {
    constructor(private http: HttpClient) { }
     private baseURL = environment.wbs+"/wbs"
    //private baseURL = "http://localhost:8080/wbs";

    onLoad(sectionId: string) {
        return this.http.get(this.baseURL + "/onload?sectionId=" + sectionId);
    }

    tempComm(tempId: string, type: string) {
        return this.http.get(this.baseURL + "/tempcomm?tempId="+tempId+"&type="+type);
    }

    tempSect(tempId: string, type: string) {
        return this.http.get(this.baseURL + "/tempsect?tempId="+tempId+"&type="+type);
    }

    commTemp(sectionId: string, type: string){
        return this.http.get(this.baseURL + "/commtemp?sectionId="+sectionId+"&type="+type);
    }

    spChange(spCode:any){
        return this.http.post(this.baseURL + "/spchange",spCode);
    }

    secDetails(sec:any){
        return this.http.post(this.baseURL + "/secdetails",sec);
    }

    getCommDetails(sectionId:string,commodity:string,type:string){
        return this.http.get(this.baseURL + "/deletecomm?sectionId="+sectionId+"&commodity="+commodity+"&type="+type);
    }
    
    saveSection(section:any){
        return this.http.post(this.baseURL + "/savesection",section);
    }

    createIll(sectionId:string,region:string){
        return this.http.get(this.baseURL + "/createill?sectionId="+sectionId+"&region="+region);
    }

    newtemplate(tempId: string, type: string,vehLine: string,prefix: string) {
        return this.http.get(this.baseURL + "/newTemplate?tempId="+tempId+"&vehType="+type+"&vehLine="+vehLine+"&prefix="+prefix);
        }
}