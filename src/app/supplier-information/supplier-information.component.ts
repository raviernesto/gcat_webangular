import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { SupplierNameAndIdModel } from '../models/suppliernameandid.model';
import { ApiserviceService } from '../services/apiservice.service';
import { SupplierIdAndDateModel } from '../models/supplieridanddate.model';
import { SupplierContactsModel } from '../models/suppliercontacts.model';
import { AddSupplierProfileModel } from '../models/addsupplierprofile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-information',
  templateUrl: './supplier-information.component.html',
  styleUrls: ['./supplier-information.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierInformationComponent implements OnInit {
  nameAndID:any[]=[];
  startsWith="startsWith";
  supplierObj:any;
  supplierProfileObj:any;
  supplierContactObj:any;
  suppliercode:string='';
  supplierName:string='';
  suppliercity:string='';
  supplierstate:any;
  supplieradd:string='';
  suppliercoun:any;
  supplierpin:string='';
  addSupplierProfileObj:AddSupplierProfileModel= new AddSupplierProfileModel();
  supplierIDAndDateObj:SupplierIdAndDateModel = new SupplierIdAndDateModel();
  states:any[]=[];
  countries:any[]=[];
  specialities:any[]=[];
  statesArr:any[]=[];
  countriesArr:any[]=[];
  specialitiesArr:any[]=[];
  supplierNameAndId:SupplierNameAndIdModel[]=[];
  contactIdAndName:any[]=[];
  contactId:any[]=[];
  contactname:any[]=[];
  i:any;
  contactObj:any;
  addSupplierContactObj:SupplierContactsModel=new SupplierContactsModel();
  fname:string="";
  lname:string="";
  speciality:any;
  phno:string="";
  faxno:string="";
  tabno:number=0;
  selectedIndex:number=0;
  alert:any={flag:false,msg:""};
  deletealert1:any={flag:false,msg:""};
  deletealert2:any={flag:false,msg:""};
  static OPEN_CLASS: string = 'active';

  constructor(private api:ApiserviceService,private router :Router) { }

  ngOnInit(): void {
    this.select();
    
  }
  select(){
    this.api.getDropdownList().subscribe((res:any)=>{
      console.log(res);
      this.nameAndID=res.nameAndId;
      this.states=res.states;
      this.countries=res.countries;
      this.specialities=res.specialities;
      
      for(this.i in this.states){
        var stateObj={"stateName":this.states[this.i]};
        this.statesArr.push(stateObj);
     }
     for(this.i in this.countries){
        var countryObj={"countryName":this.countries[this.i]};
        this.countriesArr.push(countryObj);
      }
      for(this.i in this.specialities){
        var specilaityObj={"speciality":this.specialities[this.i]};
        this.specialitiesArr.push(specilaityObj);
      }
    })
  }
  submit(){ 
    
    console.log(this.supplierObj);
    this.api.getSupplierProfile(this.supplierObj.supplierIDR).subscribe((res:any)=>{
      this.supplierProfileObj=res;
       console.log(this.supplierProfileObj);
      this.suppliercode=this.supplierProfileObj.supplierIDR;
      this.suppliercity=this.supplierProfileObj.supplierCityN;
      this.supplierName=this.supplierProfileObj.supplierDescX; 
      this.supplierstate={"stateName":this.supplierProfileObj.stprNameX};
      this.supplieradd=this.supplierProfileObj.supplierAddressX;
      this.suppliercoun={"countryName":this.supplierProfileObj.countryNameX};
      this.supplierpin=this.supplierProfileObj.supplierPostalC;
    })
    this.api.getSupplierContactsNameAndId(this.supplierObj.supplierIDR).subscribe((res:any)=>{
      if(res.length == 0 || res.contactId=='')
        this.alertPopup("No Contacts Found");
      this.contactIdAndName=res;
    })
  }
  // new(){
  //   if(this.selectedIndex==0)
  //     this.new1();
  //   else
  //     this.new2();
  // }
  new1(){
    this.supplierObj='';
    this.suppliercode='';
    this.suppliercity='';
    this.supplierName='';
    this.supplierstate='';
    this.supplieradd='';
    this.suppliercoun='';
    this.supplierpin='';
    //this.contactObj='';
    this.new2();
  }
  new2(){
    this.contactObj='';
    this.lname='';
    this.fname='';
    this.speciality='';
    this.phno='';
    this.faxno='';
  }
  // save(){
  //   if(this.selectedIndex==0)
  //     this.save1();
  //   else
  //     this.save2();
  // }
  alertPopup(data:string){
    this.alert.flag=true;
    this.alert.msg=data;
  }
  cancelpop(){
    this.alert.flag=false;
    this.deletealert1.flag=false;
    this.deletealert2.flag=false;
  }
  save1(){
    if(this.suppliercode=='')
      this.alertPopup("Please fill Supplier Code")
    else if(this.supplierName=='')
      this.alertPopup("Please fill Supplier Name")
    else if(this.supplieradd=='')
      this.alertPopup("Please fill Address")
    else if(this.supplierpin=='')
      this.alertPopup("Please fill Postal Code")
    else if(this.suppliercity=='')
      this.alertPopup("Please fill City")
    else if(this.supplierstate==''||this.supplierstate==null)
      this.alertPopup("Please fill State/County")
    else if(this.suppliercoun==''||this.suppliercoun==null)
      this.alertPopup("Please fill Country")
   
    else{
      this.addSupplierProfileObj.supplierIDR=this.suppliercode;
      this.addSupplierProfileObj.supplierCityN=this.suppliercity;
      this.addSupplierProfileObj.supplierDescX=this.supplierName;
      this.addSupplierProfileObj.stprNameX=this.supplierstate.stateName;
      this.addSupplierProfileObj.supplierAddressX=this.supplieradd;
      this.addSupplierProfileObj.countryNameX=this.suppliercoun.countryName;
      this.addSupplierProfileObj.supplierPostalC=this.supplierpin;
      this.api.addSupplierProfile(this.addSupplierProfileObj).subscribe((data:any)=>{
        this.alertPopup("Data "+data.msg);
        console.log(data);
        this.new1();
        this.select();
      })
    }
  }
  save2(){
    if(this.lname=='')
      this.alertPopup("Please fill Last Name")
    else if(this.fname=='')
      this.alertPopup("Please fill First Name")
    else if(this.phno=='')
      this.alertPopup("Please fill Phone Number")
    else if(this.speciality==''||this.speciality==null)
      this.alertPopup("Please fill Speciality")
    
    else{
      if(this.contactObj==null||this.contactObj==''){
        this.addSupplierContactObj.contactId=0;
        this.addSupplierContactObj.supplierIdR=this.supplierProfileObj.supplierIDR;
        this.addSupplierContactObj.contactLnameX=this.lname;
        this.addSupplierContactObj.contactFnameX=this.fname;
        this.addSupplierContactObj.cntctsplSpcaltyX=this.speciality.speciality;
        this.addSupplierContactObj.contactPhoneR=this.phno;
        if(this.faxno==''||this.faxno==null){
          this.addSupplierContactObj.contactFaxR= "Null";
        }
        else{
          this.addSupplierContactObj.contactFaxR=this.faxno;
        }
        this.api.addSupplierContact(this.addSupplierContactObj).subscribe((data:any)=>{
        console.log(data);
        this.alertPopup("Data Saved successfully");
        this.new2();
        this.api.getSupplierContactsNameAndId(this.supplierObj.supplierIDR).subscribe((res:any)=>{
          this.contactIdAndName=res;
        })
      })
      }
      else{
        this.addSupplierContactObj.contactId=this.contactObj.contactId;
        this.addSupplierContactObj.supplierIdR=this.supplierProfileObj.supplierIDR;
        this.addSupplierContactObj.contactLnameX=this.lname;
        this.addSupplierContactObj.contactFnameX=this.fname;
        this.addSupplierContactObj.cntctsplSpcaltyX=this.speciality.speciality;
        this.addSupplierContactObj.contactPhoneR=this.phno;
        this.addSupplierContactObj.contactFaxR=this.faxno;
        this.api.addSupplierContact(this.addSupplierContactObj).subscribe((data:any)=>{
        console.log(data);
        this.alertPopup("Data Updated successfully");
        this.new2();
        this.api.getSupplierContactsNameAndId(this.supplierObj.supplierIDR).subscribe((res:any)=>{
          this.contactIdAndName=res;
        })
      })
      }
    }
  }
  confirmselectfordelete1(){
    
    if(this.supplierObj==null||this.supplierObj==''){
      this.alertPopup("Please select Supplier Name");
    }
    else{
      if(this.contactIdAndName.length!=0){
        this.alertPopup("Selected supplier has active contacts available, Please delete the contacts before deleting supplier profile.");
      }
      else
        this.confirmdelete1();
    }
}
confirmselectfordelete2(){
    if(this.contactObj==null||this.contactObj==''){
      this.alertPopup("Please select Supplier Contact");
    }
    else{
      this.confirmdelete2();
    }
  
}
confirmdelete1(){
  let data="";
  data="Are you sure want to delete "+this.supplierProfileObj.supplierDescX;
  this.deletealert1.flag=true;
  this.deletealert1.msg=data;
}
confirmdelete2(){
  let data="";
  data="Are you sure want to delete "+this.contactObj.contactnameX;
  this.deletealert2.flag=true;
  this.deletealert2.msg=data;
}
  delete1(){
      this.supplierIDAndDateObj.supplierIDR=this.supplierProfileObj.supplierIDR;
      this.supplierIDAndDateObj.supplierLastupY=this.supplierProfileObj.supplierLastupY;
      this.api.deleteSupplierById(this.supplierIDAndDateObj).subscribe((res:any)=>{
        console.log(res);
        this.new1();
        this.select();
        this.cancelpop();
        this.alertPopup("Deleted successfully");
      })
  }
  delete2(){
    this.api.deleteContactById(this.contactObj.contactId,this.supplierContactObj.contactLastUpY).subscribe((res:any)=>{
      console.log(res);
      this.new2();
      this.api.getSupplierContactsNameAndId(this.supplierObj.supplierIDR).subscribe((res1:any)=>{
        this.contactIdAndName=res1;
        this.cancelpop();
        this.alertPopup("Deleted successfully");
      })
    })
  }
  getCountryName(state:any){
    console.log(state);
    this.api.getCountryNameByState(state.value.stateName).subscribe((res:any)=>{
      console.log(res);
      this.suppliercoun={"countryName":res.value};
    })
  }
  viewProfile(){
    this.api.getSupplierContactById(this.supplierProfileObj.supplierIDR,this.contactObj.contactId).subscribe((res:any)=>{
      console.log(res);
      this.supplierContactObj=res
      this.fname=this.supplierContactObj.contactFnameX;
      this.lname=this.supplierContactObj.contactLnameX;
      this.speciality={"speciality":this.supplierContactObj.cntctsplSpcaltyX};
      this.phno=this.supplierContactObj.contactPhoneR;
      if(this.supplierContactObj.contactFaxR==null)
        this.faxno="No Fax Number Found";
      else
        this.faxno=this.supplierContactObj.contactFaxR;
    })
  }
  tab(tabnumber:number){
    console.log(tabnumber);
    this.tabno=tabnumber;
  }
  onChange($event:any) {
    console.log($event.index);
     this.selectedIndex = $event.index;
  }
  closeClick(){
    this.router.navigate(['']);
  }

  display:any="block"
  display1:any="block"
  count:any=0;
  counts:any=0
  rotate:string="rotate(45deg)";
  rotate1:string="rotate(45deg)";
  br1:string="5px 5px 0px 0px"
  br2:string="5px 5px 0px 0px"
  showCenterPart(){
    if(this.count==0){
      this.display="none"
      this.count=1;
      this.br1="5px "
      this.rotate="rotate(0deg)"
    }else{
      this.br1="5px 5px 0px 0px"
      this.display="block"
      this.count=0;
      this.rotate="rotate(45deg)"
    }
  }
  showCenterPart2(){
    if(this.counts==0){
      this.display1="none"
      this.counts=1;
      this.br2="5px "
      this.rotate1="rotate(0deg)"
    }else{
      this.br2="5px 5px 0px 0px"
      this.display1="block"
      this.counts=0;
      this.rotate1="rotate(45deg)"
    }
  }

}