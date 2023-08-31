import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SupplierNameAndIdModel} from 'src/app/models/suppliernameandid.model';
import { SupplierProfileModel } from 'src/app/models/supplierprofile.model';
import { AddSupplierProfileModel } from 'src/app/models/addsupplierprofile.model';
import { SupplierIdAndDateModel } from 'src/app/models/supplieridanddate.model';
import { StringObjectModel } from 'src/app/models/stringobject.model';
import { SupplierContactsNameAndIDModel } from 'src/app/models/suppliercontactsnameandid.model';
import { SupplierContactsModel } from 'src/app/models/suppliercontacts.model';
import { environment} from '../../environments/environment';


const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  SupplierNameAndId:SupplierNameAndIdModel[]=[];
  getSupplierNameAndId:string='http://localhost:8080/supplierInfo/getSupplierNameAndId';
  


  constructor(private http:HttpClient) { }

  getDropdownList(){
    return this.http.get<string[]>(environment.master+'/supplierInfo/nameidstatecountryspecialitylist');
  }

  getSupplierProfile(id:string){
    return this.http.get<SupplierProfileModel>(environment.master+'/supplierInfo/supplierprofilebyid/'+id);
  }
  addSupplierProfile(data:AddSupplierProfileModel){
    return this.http.post<Object>(environment.master+'/supplierInfo/addsupplier',data);
  }
  addSupplierContact(data:SupplierContactsModel){
    return this.http.post<Object>(environment.master+'/supplierInfo/addSupplierContact',data);
  }
  getSupplierContactById(suppid:string,conid:number){
    return this.http.get<SupplierContactsModel>(environment.master+'/supplierInfo/suppliercontactsbyid/'+suppid+'/'+conid);
  }
  deleteSupplierById(data:SupplierIdAndDateModel){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data
    };
    return this.http.delete<string>(environment.master+'/supplierInfo/deletesupplier',options);
  }
  getCountryNameByState(state:string){
    return this.http.get<StringObjectModel>(environment.master+'/supplierInfo/countryname/'+state);
  }
  getSupplierContactsNameAndId(suppId:string){
    return this.http.get<SupplierContactsNameAndIDModel[]>(environment.master+'/supplierInfo/suppliercontactsnameandid/'+suppId);
  }
  deleteContactById(conid:number,date:string){
    return this.http.delete<string>(environment.master+'/supplierInfo/deletecontactbyid/'+conid+'/'+date);
  }
}
