import { ThisReceiver } from '@angular/compiler';
import { Component, Injectable, OnInit } from '@angular/core';

import { LexiconMangeServiceService } from 'src/app/services/lexicon-mange-service.service';

import { TableFields } from './lexiconSearchFields';

import { Router } from '@angular/router';
import { LexiconmanagementComponent } from '../lexiconmanagement/lexiconmanagement.component';
import { DevelopmentCommoditySetupComponent } from '../development-commodity-setup/development-commodity-setup.component';
import { LexiconfiltermaintenanceComponent } from '../lexiconfiltermaintenance/lexiconfiltermaintenance.component';
import { CatalogSectionSetupComponent } from '../catalog-section-setup/catalog-section-setup.component';
import { UsageInfoComponent } from '../usage-info/usage-info.component';
import { TemplateDataComponent } from '../template-data/template-data.component';
////import{}
//import { CatalogSectionSetupComponent } from '../catalog-section-setup/catalog-section-setup.component';
@Component({
  selector: 'app-lexicon-search',
  templateUrl: './lexicon-search.component.html',
  styleUrls: ['./lexicon-search.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class LexiconSearchComponent implements OnInit {
  
  constructor(private service:LexiconMangeServiceService,
    private template:TemplateDataComponent,
    private b:Router,
    private lexiManage:LexiconmanagementComponent,
    private usage:UsageInfoComponent,
     private catalog:CatalogSectionSetupComponent,
     private commodity:DevelopmentCommoditySetupComponent ,private filter:LexiconfiltermaintenanceComponent) { }
  //TableFieldses:false;
  //TableFieldses:false;
  selectedFields!: TableFields;
  //LexiPropertys:LexiProperty;
  minorFeatureLexSrc:string="";
  minorFeatureLexSrcDropValue:string="";
  minorFeatureLexSrcDrop!: [];
  lexPropertyLexSrc:string="";
  propertyForLexSrcDrop!: [];
  propertyForLexSrc:string="";
  keyWordsLexSrc:string="";
  othersLexSrc:string="";
  alphanum:string='alphanum';
  lexicodeDrop:any=[
    
  ];
  lang:string="EN";
  lexCodeAndPCode:string="";
  OthersORappScp: string="";
  lexiconCode:boolean=true;
propertycode:boolean=false;
lexiType:any;
lexiTypes:string="";
  propertyc!: string;
  prcode!: string;
  disc!: string;
  lexicode!: string;
  lexiconSearchDetails!: TableFields[];
displayMaximizable:boolean=true;

lexiconProCodAndLexCode:string="";
appScp:boolean=false
//validation
lexifield:boolean=false;
APP_SCPfield:boolean=false;
Othersfield:boolean=false;
keyWordfield:boolean=false;
propTypefield:boolean=false;
lexiTypefield:boolean=false;
otherTesxArea:boolean=false;

  activeScreen!: string;
  ngOnInit(): void {
    this.displayMaximizable=true;
    this.propertyDropdown();
this.getLexiTypeFoDrop();

  }
  propertyDropdown(){
    this.service.propertyForLexSrcDropdown().subscribe((res:any)=>{
      console.log(res)
      this.propertyForLexSrcDrop=res;
    })}

  getLexiTypeFoDrop(){

    this.service.getlexiTypeForDropdown().subscribe((res:any)=>{
      this.lexiType=res;
      console.log(this.lexiType)
    })
  }
    getDatabyPrCode(prcode:string){
      this.service.getDatabyProCode(prcode).subscribe((res:any)=>{
        console.log(res)
  
        if(res==null){
          this.propertyc=" ";
        this.disc=" ";
        this.selcetionPopup("no data found")
        }else{
        this.propertyc=res.propCodeC;
        this.disc=res.propDescX;
        }
      })
  
    }
  
    showMaximizableDialog() {
      this.displayMaximizable = true;
  }
  
  getProCodeForLexiCode(){
    if(this.lexiconProCodAndLexCode==''){
      this.selcetionPopup("Please enter your selection criteria in text box ")
    }else{
  this.service.getProCodeForLexiCode(this.lexiconProCodAndLexCode,this.lang).subscribe((res:any)=>{
  
    console.log(res)
  
    if(res.errFlg){
  
      this.lexCodeAndPCode="";
  this.lexicodeDrop=[];
  this.selcetionPopup(res.errMsg)
    }else{
  //this.lexCodeAndPCode=res.propertyCode;
  this.lexicodeDrop=res.selectedVos;
    }
  })
    }
  }
checkFirstValid(){
  console.log(this.appScpmodel)
  console.log(this.othersModel)
  if(this.appScpmodel=="appScp"){
    console.log(this.appScpmodel)
    this.appScp=true
    this.OthersButton=false;
    
      }else if(this.othersModel=="others"){
        this.appScp=false
        this.OthersButton=true;
      }
}
  checkValid(){
    this.checkFirstValid();
    let input={
      lexiconCode:this.lexCodeAndPCode,
      proCode:this.propertyForLexSrc,
      minorFeatureLexSrc:this.minorFeatureLexSrc,
      minorlexiconCode:this.minorFeatureLexSrcDropValue,
      lexPropertyLexSrc:this.lexPropertyLexSrc,
      propertyForLexSrc:this.propertyForLexSrc,
      keyWordsLexSrc:this.keyWordsLexSrc,
      others:this.othersLexSrc,
     appAndSpe:this.appScp,
     othersFlag:false,
     lang:"EN"
    }
    
    if( Object.values(input).every(x => (x === null || x === '' || !x===true || x===this.lang))){
      this.selcetionPopup("Please select Selection Criteria");
    }else if(this.lexPropertyLexSrc=="PCOT"){
      // if(this.propertyForLexSrc==''){
      //   this.selcetionPopup("Please do your search by providing a keyword or Search criteria select property ");
      // }
       if(this.keyWordsLexSrc==""){
         if(this.othersLexSrc==""){
        this.selcetionPopup("Please do your search by providing a keyword or Search criteria ");
         }else{
          this.recordForLexSrc()
         }
      }else{
        this.recordForLexSrc()
      }
    }else if(this.lexPropertyLexSrc=="SPEC" || this.lexPropertyLexSrc=="APPL"){
      if(this.propertyForLexSrc==""){
      this.selcetionPopup("Please do your search by providing a property Search criteria ");
      }else{
        this.recordForLexSrc()
      }
  
    }else if(this.lexPropertyLexSrc=="MFC" ||this.lexPropertyLexSrc=="@@@@@" || this.lexPropertyLexSrc=="PFC" ||
     this.lexPropertyLexSrc=="PTEM" ||  this.lexPropertyLexSrc=="SGRPS" || this.lexPropertyLexSrc=="SGRP"  ){
      this.recordForLexSrc()
    }
    else if(this.OthersButton || this.appScp){
      if(this.keyWordsLexSrc=""){
        if(this.othersLexSrc==''){
          this.selcetionPopup("Please do your search by providing a keyword or others field");
        }else{
          this.recordForLexSrc()
        }
      }else{
        this.recordForLexSrc()
      }
    }else if(this.othersLexSrc!="" || this.keyWordsLexSrc!=""){
      if(!this.appScp && !this.OthersButton){
        if(this.keyWordsLexSrc!=""){
          this.recordForLexSrc()
        }else{
        console.log(!this.appScp , !this.OthersButton)
        this.selcetionPopup("Please do your search by providing a keyword or others field");
        } 
      }else{
        this.recordForLexSrc()
      }
    }
    else{
      this.recordForLexSrc()
    }
    }

  recordForLexSrc(){
  console.log(this.OthersORappScp)
  
  let input={
    lexiconCode:this.lexCodeAndPCode,
    proCode:this.propertyForLexSrc,
    minorFeatureLexSrc:this.minorFeatureLexSrc,
    minorlexiconCode:this.minorFeatureLexSrcDropValue,
    lexPropertyLexSrc:this.lexPropertyLexSrc,
    propertyForLexSrc:this.propertyForLexSrc,
    keyWordsLexSrc:this.keyWordsLexSrc,
    others:this.othersLexSrc,
   appAndSpe:this.appScp,
   othersFlag:false,
   lang:"EN"
  }
  
  

  
    this.service.getLexiconSerachTable(input).subscribe((res:any)=>{
  
      console.log(res)
     if(res==''){
      this.selcetionPopup("NO DATA FOUND");
     }
     else{
       this.roll=true;
      this.lexiconSearchDetails=res
      this.roll=false;
     }

    })
    console.log(input)
  
}
roll:boolean=false;
size:number=10
  selectedProduct1:Object={};
  CopyCode(){
    console.log(this.selectedProduct1)
   if(Object.keys(this.selectedProduct1).length==0){
    this.selcetionPopup("Please select the data from table");
   }else if(Object.keys(this.selectedProduct1).length==9){
    
    if(localStorage.getItem('Screen')=="Commodity"){
      this.commodity.getLexDetails(this.selectedProduct1);
     
     }else if(localStorage.getItem('Screen')=="lexiMange"){
    
     this.lexiManage.getSearchData(this.selectedProduct1);
     }else if(localStorage.getItem('Screen')=="lexiFilter"){
       this.filter.getFilterFromSearch(this.selectedProduct1);
     }else if(localStorage.getItem('Screen')=="grpAvs"){
        this.lexiManage.lexiGrpAvsSearchData(this.selectedProduct1);
     }else if(localStorage.getItem('Screen')=="proCode"){
      this.lexiManage.lexiProCodeSearchData(this.selectedProduct1);
    }else if(localStorage.getItem('Screen')=="lexiReplace"){
      this.lexiManage.lexilexiReplaceSearchData(this.selectedProduct1);
    }
    if(localStorage.getItem('Screen')=="Usage"){
      
     this.usage.getLexDetails(this.selectedProduct1);
     
      
    }else if(localStorage.getItem('Screen')=="Template"){
      this.template.getLexDetails(this.selectedProduct1);}
    else if(localStorage.getItem('Screen')=="Catalog Section"){
      this.catalog.getLexDetails(this.selectedProduct1);
   }
   }
  }

   CopyClose(){
    
    if(localStorage.getItem('Screen')=="Commodity"){
      localStorage.setItem('Screen',"");
      this.commodity.getLexcClose();
    }else if(localStorage.getItem('Screen')=="lexiMange"){
      localStorage.setItem('Screen',"");
      this.lexiManage.closeSearch();
      }else if(localStorage.getItem('Screen')=="lexiFilter"){
        this.filter.closeSearch();
      }else if(localStorage.getItem('Screen')=="grpAvs"){
        this.lexiManage.closeSearch();
      }else if(localStorage.getItem('Screen')=="proCode"){
        this.lexiManage.closeSearch();
      }else if(localStorage.getItem('Screen')=="lexiReplace"){
        this.lexiManage.closeSearch();
      }
      else if(localStorage.getItem('Screen')=="Usage"){
        
        this.usage.getLexcClose();
      }
      else if(localStorage.getItem('Screen')=="Template"){
        this.template.getLexcClose();}
      else if(localStorage.getItem('Screen')=="Catalog Section"){
        this.catalog.getLexcClose();

      }
   }
  
  
// CopyCode(){
//    if(Object.keys(this.selectedProduct1).length==0){
//       this.selcetionPopup("Please select the data from table");
//    }else if(Object.keys(this.selectedProduct1).length==9){
//      if(localStorage.getItem('Screen')=="Commodity"){
//       localStorage.setItem('Screen',"");
//       this.commodity.getLexDetails(this.selectedProduct1);
//      }
    
//    }
//   }
   
   



   
    
   
    
   
  
  popuptriger(){
     
  }
  searchByMinFea(){
    console.log(this.minorFeatureLexSrc)
    if(this.minorFeatureLexSrc==''){
      this.minorFeatureLexSrcDrop=[]
    }else{
  this.service.searchByMinFea(this.minorFeatureLexSrc,'EN').subscribe((res:any)=>{
  
    console.log(res)
  
    if(res.errFlg){
  
      this.minorFeatureLexSrc="";
      this.minorFeatureLexSrcDrop=res.selectedVos;
  this.lexicodeDrop[0].value="No records";
    
    }else{
  
  this.minorFeatureLexSrcDrop=res.selectedVos;
    }
  })
  
  }
}
lexicodeActive(event:string){

  if(event==''){
 this.Othersfield=false
this.keyWordfield=false
this.propTypefield=false
this.lexiTypefield=false
this.lexicodeDrop=[]
  console.log(event);
  }else{
    this. Othersfield=true
this.keyWordfield=true
this.propTypefield=true
this.lexiTypefield=true
this.minorFeatureLexSrc="";
this.minorFeatureLexSrcDrop=[]
this.lexPropertyLexSrc="";
this.propertyForLexSrc="";
this.keyWordsLexSrc="";
this.othersLexSrc="";
  }
 
}
minorFeatureActive(event:string){
  if(event==''){
    this.Othersfield=false
   this.keyWordfield=false
   this.propTypefield=false
   this.lexiTypefield=false
     console.log(event);
     }else{
       this. Othersfield=true
   this.keyWordfield=true
   this.propTypefield=true
   this.lexiTypefield=true
   this.lexiconProCodAndLexCode="";
   this.lexicodeDrop=[]
   this.lexPropertyLexSrc="";
   this.propertyForLexSrc="";
   this.keyWordsLexSrc="";
   this.othersLexSrc="";
     }
}
keywordActive(){
  this.othersLexSrc="";
}
othersFieldActive(){
  this.keyWordsLexSrc="";
}
getPropertyByLexiType(data:string){

  console.log(data);
  if(data=='APPL' || data=="SPEC"){
    this.appScpmodel="appscp";
    this.othersModel=''
    this.Othersfield=true;
  }else if(data!=null){
    console.log("s")
   this.othersModel="others";
    this.appScpmodel=''
    this.APP_SCPfield=true
  }
  if(this.lexPropertyLexSrc !=''){
  this.service.getPropertyByLexiType(this.lexPropertyLexSrc).subscribe((res:any)=>{
  
    if(res==''){
 this.propertyDropdown();
    }else{
      this.propertyForLexSrcDrop=res;
    }
    console.log(res)
    this.propertyForLexSrcDrop=res;
  })
  
}
}
  selectionPopup!: boolean;
  popupMsg!: string;
selcetionPopup(msg:string){
  this.popupMsg=msg
  this.selectionPopup=true
}
OthersButton:boolean=false;
othersModel:string='';
appScpmodel:string='';

radiobutt(data:any){
  if(data=='app'){
   
  this.othersModel='';
  }else if(data=='ort'){
    this.appScpmodel=''
  }
}
startsWith="startsWith"
display:any="block"
  display1:any="block"
  count:any=0;
  counts:any=0
  rotate:any;
  br1:string="5px"
  br2:string="5px"
  showCenterPart(){
    if(this.count==0){
      this.display="none"
      this.count=1;
      this.br1="5px 5px 0px 0px"
      this.rotate="rotate(45deg);"
      // this.display1="none"
    }else{
      this.br1="5px"
      this.display="block"
      this.count=0;
      this.rotate="rotate(0deg);"
    }
  }
  showCenterPart2(){
    if(this.counts==0){
      this.display1="none"
      this.counts=1;
      this.br2="5px 5px 0px 0px"
      // this.display="none"
    }else{
      this.br2="5px"
      this.counts=0;
      this.display1="block"
    }
  }
}
