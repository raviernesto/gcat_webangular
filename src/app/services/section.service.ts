import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class SectionCopyService{

    constructor(private http: HttpClient) { }
    private baseURL = environment.wbs+"/wbs"

    onCopyLoad(sectionId: string) {
        return this.http.get(this.baseURL + "/sectioncopyload?sectionId=" + sectionId);
    }

    copySection(input:any){
        return this.http.post(this.baseURL + "/copysection",input);
    }
}