import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Basedetails, Commoditydetails, CommoditySection, CommodityTemplate, Details, Vehicletype } from './structsearch';
import { StructsearchserviceService} from '../services/structsearchservice.service'; 



@Component({
  selector: 'app-structuresearch',
  templateUrl: './structuresearch.component.html',
  styleUrls: ['./structuresearch.component.css']
})

export class StructuresearchComponent implements OnInit {
  data:any;
  productType:any[];
  baseToCommodity:boolean=false;
  commodityToTemplate:boolean=false;
  commodityToSection:boolean=false;
  startsWith="startsWith";
  bgcolor1: string | undefined;
  bgcolor2: string | undefined;
  bgcolor3: string | undefined;
  color1:string |undefined
  color2:string |undefined
  color3:string |undefined
  vehicleType:string="";
  types:Vehicletype[]=[];
  selectedType:string="";
  engBase:string="";
  commodity:string="";
  SelectedParts:string="";
  SelectedCommodity:string="";
  engpBaseR:string="";
  engpCommodity:string="";
  dropdownvalue:any;
  datas:any;
  baseDetails:Basedetails[]=[];
  SelectedProductType:string="";
  commoditySection:CommoditySection[]=[];
  commodityTemplate:CommodityTemplate[]=[];
  details:Details[]=[];
  buttonDisabled: boolean=true;
  templatedisable:boolean=true;
  commodityDetails:Commoditydetails[]=[];
  alert:any={
    flag:false,
    msg:""
  }
  arr:number[]=[];
  temp:any;
  table1:number=0;
  table2:number=0;
  table3:number=0;
 
  
  constructor(private StructServ:StructsearchserviceService,private router: Router,) { 
    // this.types=[
    //   {name:'C'},{name:'T'}];
      this.productType=[
      
        { name: 'C',value:"C" },
        { name: 'T',value:"T" },
        ,
      ];
  }

  ngOnInit(): void {
    this.showCenterPart();
    
  }

alertpopup(data:any){
  this.alert.flag=true;
  this.alert.msg=data;
}


  engBaseDroplist(){
    this.engBase=(<HTMLInputElement>document.getElementById("engBase")).value;
    if (this.engBase == '') {
      console.log("Eng Base is not given");
      this.alertpopup("Eng Base Is Not Given");
    } else {
      this.buttonDisabled=false;
      this.StructServ.engBaseDropdown(this.engBase).subscribe((data:any)=>{
        this.dropdownvalue=data;
      
        console.log(this.dropdownvalue);
      })
      
      
  
    } 

  }
 
 

  
  resetbase(){
    this.engBase='';
    this.dropdownvalue='';
    this.buttonDisabled=true;
  }

 
  
  commodityDroplist(){
    this.commodity=(<HTMLInputElement>document.getElementById("commodity")).value;
    if (this.commodity == '') {
      console.log("commodity is not given");
      this.alertpopup("Commodity Is Not Given");
    } else {
      this.templatedisable=false;
      this.StructServ.commodityDropdown(this.commodity).subscribe((data:any)=>{
       this.dropdownvalue=data;
       
        
       console.log(this.dropdownvalue);
      })
    }
  }


  resettemplate() {
  
    this.commodity='';
    this.dropdownvalue='';
    this.vehicleType='';
    this.templatedisable=true;
    this.SelectedProductType='';
    this.engBase='';
    this.dropdownvalue='';
    this.buttonDisabled=true;
    this.table2=0;
    this.table1=0;
    this.table3=0;
  }

  
  
 baseCommodity(){
   console.log(this.SelectedParts);
    this.StructServ.baseCommodityData(this.SelectedParts).subscribe((data:any)=>{
      if(data.length ==0){
        this.alertpopup("No Records Found");
       }
      this.details=data;
      console.log(data);
   })
   this.table1=1;
  }
  commodityTemplateData(){
    console.log(this.SelectedCommodity)
    console.log(this.SelectedProductType+" type");
    if(this.SelectedProductType==""){
      this.alertpopup("Product Type Not Selected");
    }
    else{
     this.StructServ.commodityTemplate(this.SelectedCommodity,this.SelectedProductType).subscribe((data:any)=>{
      if(data.length ==0){
        this.alertpopup("No Records Found");
       }
       this.commodityTemplate=data;
       console.log(data);
    })
   }
   this.table2=1;
  }

   commoditySectionData(){
    console.log(this.SelectedCommodity)
    console.log(this.SelectedProductType+"type");
    if(this.SelectedProductType==""){
      this.alertpopup("Product Type Not Selected");
    }
    else{
     this.StructServ.commoditySection(this.SelectedCommodity,this.SelectedProductType).subscribe((data:any)=>{
         
      if(data.length ==0){
      this.alertpopup("No Records Found");
     }
       this.commoditySection=data;
       console.log(data);
    })
   }
   this.table3=1;
  }

  
 
   gotocommodity(){
    this.router.navigateByUrl('/devcommmodity');
  }
  
  gotowrkque(){
      this.router.navigateByUrl('/part-work');
  }

  gotoillustration(){
    this.router.navigateByUrl('/illsearch');
  }
  gopic(){
    this.router.navigateByUrl('/part-info');
  }
gowbs(){
  this.router.navigateByUrl('/wbs');
}
close(){
  this.router.navigateByUrl('/');
}

id:any ="base";
tabChange(ids:any){
  this.id=ids;
  console.log(this.id);
}
display:any="none"
  display1:any="none"
  count:any=0;
  counts:any=0
  rotate:string="rotate(45deg)";
  rotate1:string="rotate(0deg)";
  rotate2:string="rotate(0deg)";
  count2:any=0;
  display2:any="none"
  br1:string="5px"
  br2:string="5px"
  br3:string="5px"
  showCenterPart(){
    if(this.count==0){
      this.display="block"
      this.count=1;
      this.rotate="rotate(45deg)"
      this.br1="5px 5px 0px 0px"
    }else{
      this.display="none"
      this.count=0;
      this.rotate="rotate(0deg)"
      this.br1="5px"
    }
  }
  showCenterPart2(){
    if(this.counts==0){
      this.display1="block"
      this.counts=1;
      this.rotate1="rotate(45deg)"
      this.br2="5px 5px 0px 0px"
    }else{
      this.counts=0;
      this.display1="none"
      this.br2="5px"
      this.rotate1="rotate(0deg)"
    }
  }
  showCenterPart3(){
    if(this.count2==0){
      this.display2="block"
      this.count2=1;
      this.rotate2="rotate(45deg)"
      this.br3="5px 5px 0px 0px"
    }else{
      this.count2=0;
      this.display2="none"
      this.br3="5px"
      this.rotate2="rotate(0deg)"
    }
  }
}
