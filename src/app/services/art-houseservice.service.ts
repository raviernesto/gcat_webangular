import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtHouseModel } from '../models/art-house.model';
import { ExternalIllustratorModel } from '../models/external.model';
import { environment } from 'src/environments/environment';





const headerOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ArtHouseserviceService {
    house: string = environment.illustration+'/ArtHouse/House'
    deletearthouse: string = environment.illustration+'/ArtHouse/deleteArtHouse/';
    external: string = environment.illustration+'/Art/getIllustrator';
    art: string = environment.illustration+"/Art/getArthouse";
    code: string = environment.illustration+"/ArtHouse/getArt";
    illustrator: string =environment.illustration+ '/Art/Code';
    baseurl: string = environment.illustration+'/Art';
    url: string = environment.illustration+'/ArtHouse/getArtName';
    delete: string = environment.illustration+'/Art/deleteArtHouseCode';
    update: string = environment.illustration+'/ArtHouse/artHousesave';

    constructor(private http: HttpClient) { }
    // private baseurl="http://localhost:8080/Art/deleteArtHouseCode"
    // deleteArtHouseCodeById(userIdC:String){
    // return this.http.get(this.baseurl+ '/deleteArtHouseCode/'+userIdC+'/'+arthouseC);




    postarthouse(artHouseModel: ArtHouseModel) {
        return this.http.post<ArtHouseModel>(this.house, artHouseModel)
    }
    deletearthouseById(id: string) {
        return this.http.get<ArtHouseModel>(this.deletearthouse + id);
    }
    deleteArtHouseCodeById(userId: string, arthouse: string) {
        var params = { userIdC: userId, arthouseC: arthouse };
        var config = { params: params };
        return this.http.get<ExternalIllustratorModel>(this.baseurl + '/deleteArtHouseCode/', config);

    }
    getillustrator() {
        return this.http.get<string[]>(this.external)
    }
    getArthouse() {
        return this.http.get<string[]>(this.art)
    }
    getArthouseName(arthouseCode: string) {
        var params = { arthouseC: arthouseCode };
        var config = { params: params };
        return this.http.get<ArtHouseModel>(this.url, config);
    }
    getArthouseCode() {
        return this.http.get<string[]>(this.code)
    }
    postillustrator(externalIllustratorModel: ExternalIllustratorModel) {
        return this.http.post<ExternalIllustratorModel>(this.illustrator, externalIllustratorModel)
    }
    getArthouseUpdate(arthouseCode: string, arthouseName: string) {
        var params = { arthouseC: arthouseCode, arthouseN: arthouseName };

        var config = { params: params };
        return this.http.get<ArtHouseModel>(this.update, config);

    }





}

