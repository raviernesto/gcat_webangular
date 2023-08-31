import { Injectable, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { ContextMenuService } from 'primeng/api';
import { LexiconMangeServiceService } from 'src/app/services/lexicon-mange-service.service';
import { AvsTableFields, inputdataAvs, LexiProperty,lexiType, tableDetails } from './LexiconFields';
@Component({
  selector: 'app-lexiconmanagement',
  templateUrl: './lexiconmanagement.component.html',
  styleUrls: ['./lexiconmanagement.component.css'],
 
})
@Injectable({
  providedIn: 'root'
})
export class LexiconmanagementComponent implements OnInit {
  Type:any=[
    {Type:"C"},
    {Type:"T"}
  ]
  noSpecial: RegExp = /^[^<>*!]+$/
  alphanum:string='alphanum';
  lexicodeDrop:any=[
    
  ];
  addword:any="";
  lexiSearch:number=0;
  lang:string="EN";
  lexCodeAndPCode:string="";
  OthersORappScp: string="";
  lexiconCode:boolean=true;
propertycode:boolean=false;
lexiType:any;
lexiTypes:string="";
propertyc:string="";
prcode:string="";
disc:string="";
lexicode:string|RegExp="";
lexiconSearchDetails:tableDetails[]=[];
displayMaximizable:boolean=false;
lexiManageDeletePopup:boolean=false;
lexiconProCodAndLexCode:string="";
public letters = /^[0-9a-z]+$/;
//========================lexiconSearch=================
minorFeatureLexSrc:string="";
minorFeatureLexSrcDropValue:string="";
minorFeatureLexSrcDrop:[]=[];
lexPropertyLexSrc:string="";
propertyForLexSrcDrop:[]=[];
propertyForLexSrc:string="";
keyWordsLexSrc:string="";
othersLexSrc:string="";
//====================leximanagement====
lecionCode:string="";
lecionCodeType:string="";
lecionCodeDisc:string="";
lecionType:string="";

propertyLecionCode:string="";
propertyType:string="";
propertyLang:string="";
propertyShortDisc:string="";
propertyMicroDesc:string="";
propertyCommand:string="";
propertyLongDisc:string="";
propertyXLongDisc:string="";
propertyFlag:boolean=false;
displayModal:boolean=false;
groupAVSButtonField:boolean=true;
replaceButtonField:boolean=true;
//=============lexiTypefield
lexiTypefield:boolean=false;
propTypefield:boolean=false;
pfcFvalField:boolean=true;
constructor(private service:LexiconMangeServiceService ) { }

  type(types:string){
if(types=="lcode"){
this.lexiconCode=true;
this.propertycode=false;
}
if(types=="pcode"){
  this.lexiconCode=false;
this.propertycode=true;
}


  }
  ngOnInit(): void {this.approvel="Y";


    this.disableProperty(false);
//LexiPropertys:LexiProperty;
this.propertyForLexSrcDropdown();
this.getLexiTypeFoDrop();
this.loadGroupAvs();
// this.showCenterPart();
this.propertyType="empty";
  }

  getpfcData(){
    if(this.pfcSerch=="" || this.pfcSerch==null){
      console.log(this.pfcSerch)
this.lexiPopup("Please Enter Search Field");
    }else{
    this.service.pfcData(this.pfcSerch).subscribe((res:any)=>{
      this.valueDrop=res;
    })
  }
}
  LexiPropertys:LexiProperty | undefined;
inputData:{} | undefined;

approvel:string="A";
lexiManagePopup:boolean=false;
popupMsg:string="";
lexiPopup(msg:string){
this.popupMsg=msg;
  this.lexiManagePopup=true;
}
validCode(event:Event){
  let data=(event.target as HTMLInputElement).value
  console.log(data)
  let data1;
  if(data.length==5 ){
  if(this.lecionType=="APPL"){
   
   // data1=data.concat('A');
    this.propertyLecionCode=data+'A'
  // this.updateLexiCode(data1);
  console.log(this.propertyLecionCode)
   }else if(this.lecionType=="SPEC"){
    this.propertyLecionCode=data+'S'
   }else if(this.lecionType=="PCOT"){
    this.propertyLecionCode=data+'C'
   }else if(this.lecionType=="PTEM"){
    this.propertyLecionCode=data+'T'
   }else if(this.lecionType=="SGRP"){
    this.propertyLecionCode=data+'W'
   }else if(this.lecionType=="PFC"){
    this.propertyLecionCode=data+'P'
  }
  
  }
  
}

updateLexiCode(data:any){
this.propertyLecionCode=data;
}
openSearch(){
  console.log("open")
  localStorage.setItem('Screen',"lexiMange");
  this.lexiSearch++;
}
openSearchFromGrpAvs(){
  console.log("open")
  localStorage.setItem('Screen',"grpAvs");
  this.lexiSearch++;
}

closeSearch(){
  this.lexiSearch=0;
}

getSearchData(data:any){
console.log(data)
this.lecionCode=data.lexiCode;
this.lecionCodeType=data.type
this.lecionCodeDisc=data.lexiTypeDiscription
}

showModalDialog() {
  this.lexiManagePopup = false;
}
getByLexiconCode(){
  console.log(this.lecionCode)
  if(this.lecionCode==''){
    this.lexiPopup("Please enter the selection criteria")
  }else{
  this.service.getByLexiconCode(this.lecionCode,this.lang).subscribe((res:any)=>{
    console.log(res)
    if(res==''){
      this.lexiPopup("No Record Found!")
    }else if(res.length==1){
      this.propertyCheck=false;
      this.lecionCode=res[0].lexcC
      this.lecionCodeType=res[0].lextypTypeC
     // this.lecionCodeDisc=res[0].lextypTypeC
      this.lecionType=res[0].lextypTypeC
      this. propertyLecionCode=res[0].lexcC
      this.propertyType=res[0].propCodeC
      this. languageProp=res[0].langGtiC
      this.propertyShortDisc=res[0].lexcDescShrtX
      this.propertyMicroDesc=res[0].lexcDescM1X
      this. propertyCommand=res[0].lexcCommentX
      this. propertyLongDisc=res[0].lexcDescLongX
      this.propertyXLongDisc=res[0].lexcDescXlongX

      if(res[0].lexcDescLongX!="" || res[0].lexcDescLongX!=null){

        this.lexiDiscInReplace=res[0].lexcDescLongX
        this.lexiDiscInGropAvs=res[0].lexcDescLongX 
        console.log("inside lexcDescLongX-"+ res[0].lexcDescLongX)
       
      }
      if(res[0].lexcDescShrtX==null){
      }
      else{
      if(res[0].lexcDescShrtX!="" || res[0].lexcDescShrtX!=null){
      
        this.lexiDiscInReplace=res[0].lexcDescShrtX
        this.lexiDiscInGropAvs=res[0].lexcDescShrtX
        console.log("inside short-"+ res[0].lexcDescShrtX)
      }
    }
      if(res[0].lexcDescXlongX==null){
      }
      else{
      if(res[0].lexcDescXlongX!="" || res[0].lexcDescXlongX!=null){
      
        this.lexiDiscInReplace=res[0].lexcDescXlongX
        this.lexiDiscInGropAvs=res[0].lexcDescXlongX
        console.log("inside xlomgx-"+ res[0].lexcDescXlongX)
      }
    }

      console.log(res[0].approvedFlag)
      this.propertyFlag=res[0].approvedFlag

this.loadGroupAvs();
      
      if(res[0].approvedFlag=="Y"){
this.approvel="Y"
      }else if(res[0].approvedFlag=="N"){
        this.approvel="N"
      }
      console.log(res.length)

     this.saveButtonField=false;
     this.updateButtonField=false;
     this.deleteButtonField=false;
     this.replaceButtonField=false;
    }

  })
}
}

checkDisc(data:string){
//  if(data=='MFC'){
//   this.lecionCodeDisc
// 
let temp=this.lexiType.filter((list:any)=>list.key==data)

this.lecionCodeDisc=temp[0].value;
}

languageProp:string="";
languageDrop=[{
key:"B",value:"BRITISH ENGLISH"
},{
  key:"EN",value:"ENGLISH"
}]
propertyShortDiscField:boolean=false
propertyMicroDescfield:boolean=false
propertyCommandfield:boolean=false
propertyLongDiscfield:boolean=false
propertyXLongDiscfield:boolean=false
getbyType(type:any){
  console.log(type)
  this.service.getPropertyByLexiType(type).subscribe((res:any)=>{
    this.propertyForLexSrcDrop=res;
  })
  }
  getPropertyByLexiType(data:any){
    console.log(data)
   
this.propertyLecionCode=""
  if(data=='MFC' || data=='PFC'){
// this.mfc=true
// this.pfc=false;
this.propertyShortDiscField=true
this.propertyMicroDescfield=true
this.propertyCommandfield=false
this.propertyLongDiscfield=false
this.propertyXLongDiscfield=true
this.propertyShortDisc=""
this.propertyMicroDesc=""
this.propertyXLongDisc=""
this.getbyType(data);
  }else if(data=="APPL"){
    this.propertyShortDiscField=true
    this.propertyMicroDescfield=true
    this.propertyCommandfield=true
    this.propertyLongDiscfield=false
    this.propertyXLongDiscfield=true
    this.propertyShortDisc=""
this.propertyMicroDesc=""
this.propertyXLongDisc=""
this.propertyCommand=""
this.pfc=false
this.mfc=false
this.getbyType(data);
  }else if(data=="PCOT"){
    this.propertyShortDiscField=false
    this.propertyMicroDescfield=true
    this.propertyCommandfield=true
    this.propertyLongDiscfield=false
    this.propertyXLongDiscfield=true
   
this.propertyMicroDesc=""
this.propertyXLongDisc=""
this.propertyCommand=""
this.pfc=false
this.mfc=false
this.getbyType(data);
  }else if(data=="PTEM" ||data=="SGRPS" ){
    this.propertyShortDiscField=true
    this.propertyMicroDescfield=true
    this.propertyCommandfield=false
    this.propertyLongDiscfield=false
    this.propertyXLongDiscfield=true
    this.propertyShortDisc=""
this.propertyMicroDesc=""
this.propertyXLongDisc=""
this.pfc=false
this.mfc=false
this.getbyType(data);
  }else if(data=="SPEC"){
    this.propertyShortDiscField=true
    this.propertyMicroDescfield=true
    this.propertyCommandfield=true
    this.propertyLongDiscfield=true
    this.propertyXLongDiscfield=false
    this.propertyShortDisc=""
this.propertyMicroDesc=""
this.propertyXLongDisc=""
this.propertyCommand=""
this.pfc=false
this.mfc=false
this.getbyType(data);
  }
  else{
this.mfc=false;
this.pfc=false;
  }
}
  save(){
if(this.lexiTypes ==null ||this.lexiTypes==""){
  this.lexiPopup("Please choose Type")
}
    else if(this.propertyc ==null ||this.propertyc==""){
      console.log(this.propertyc)
      this.lexiPopup("Please enter Property ")
    }else{
    this.inputData={
      "propCodeC":this.propertyc,
      "propDescX":this.disc,
      "pLastupY":"1999-11-22",
      "pLastIdC":"GLOBTECH",
      "lextypTypeC":this.lexiTypes
    }
    this.service.saveProperty(this.inputData).subscribe((res:any)=>{
     
       if(res.errMsg){
        this.lexiPopup(res.errMsg)
      }else if(!res.errMsg){
        this.lexiPopup(res.sucMsg)
      }
    })
  }
}
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
         this.lexiPopup("No Record Found!")
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
     this.lexiPopup("Please enter your selection criteria in text box ")
  }else{
this.service.getProCodeForLexiCode(this.lexiconProCodAndLexCode,this.lang).subscribe((res:any)=>{

  console.log(res)

  if(res.errFlg){

    this.lexCodeAndPCode="";
this.lexicodeDrop=[];
     this.lexiPopup(res.errMsg)
  }else{
this.lexCodeAndPCode=res.propertyCode;
this.lexicodeDrop=res.selectedVos;
  }
})
  }
}
openlexiSerachforProCode(){
  localStorage.setItem('Screen',"proCode");
  this.lexiSearch++;

}
lexiProCodeSearchData(data:any){
this.prcode=data.proCode;
}
recordForLexSrc(){

  let input={
    lexiconCode:this.lexiconProCodAndLexCode,
    proCode:this.lexCodeAndPCode,
    minorFeatureLexSrc:this.minorFeatureLexSrc,
    minorlexiconCode:this.minorFeatureLexSrcDropValue,
    lexPropertyLexSrc:this.lexPropertyLexSrc,
    propertyForLexSrc:this.propertyForLexSrc,
    keyWordsLexSrc:this.keyWordsLexSrc,
    others:this.othersLexSrc
  }
  this.service.getLexiconSerachTable(input).subscribe((res:any)=>{

    console.log(res)
    this.lexiconSearchDetails=res

  })
  console.log(input)
}
searchByMinFea($event:string){
  console.log($event)
  if($event==''){
    this.minorFeatureLexSrcDrop=[]
  }else{
this.service.searchByMinFea($event,'EN').subscribe((res:any)=>{

  console.log(res)

  if(res.errFlg){

    this.minorFeatureLexSrc="";
    this.minorFeatureLexSrcDrop=res.selectedVos;
this.lexicodeDrop[0].value="No records";
     this.lexiPopup(res.errMsg)
  }else{
//this.minorFeatureLexSrc=res.propertyCode;
this.minorFeatureLexSrcDrop=res.selectedVos;
  }
})

}
}



propertyForLexSrcDropdown(){
this.service.propertyForLexSrcDropdown().subscribe((res:any)=>{
  this.propertyForLexSrcDrop=res;
})


}
languagePropfield:boolean=false
checked: boolean = false;
pfcSerch:string="";
disableProperty(data:any){
console.log(data)

if(data){
  this.propertyShortDiscField=false
   this.propertyMicroDescfield=false
   this.propertyCommandfield=false
   this.propertyLongDiscfield=false
   this.propertyXLongDiscfield=false
   this.lexiTypefield=false
   this.propTypefield=false
   this.languagePropfield=false;
   this.saveButtonField=false;
   this.updateButtonField=false;
   this.deleteButtonField=false;
   this.replaceButtonField=false
}else if(!data){
 if(this.lecionType=="" || this.lecionType==null){
   console.log(this.lecionType)
   
  
   this.propertyShortDiscField=true
    this.propertyMicroDescfield=true
    this.propertyCommandfield=true
    this.propertyLongDiscfield=true
    this.propertyXLongDiscfield=true
    this.lexiTypefield=true
    this.propTypefield=true
    this.languagePropfield=true
 }else{
  this.getPropertyByLexiType(this.lecionType)
 }

}
}
pfcSerchDrop=[{
  key:"AC"
},{
  key:"AX"
},{
  key:"BS"
},{
  key:"CA"
},{
  key:"DR"
},{
  key:"DS"
},{
  key:"EM"
},{
  key:"EN"
},{
  key:"ES"
},{
  key:"MD"
},{
  key:"SB"
},{
  key:"SE"
},{
  key:"SU"
},{
  key:"TR"
},{
  key:"VL"
},{
  key:"VS"
},{
  key:"WB"
}]
mfc:boolean=false
pfc:boolean=false
inptOfMfcSearch:string="";

//======================sourceDrop===
sourceDrop=[{value:"0"},{value:1},{value:2},{value:3},{value:4},{value:5},{value:6}]
sourceDrops:string='';
sourceDropField:boolean=false;
pfcsourceDrop(data:any){

  this.propertyLecionCode=this.pfcSerch+this.valueDrops+data+'P';
}
searchForPfc(data:any){
  this.pfcFvalField=false;
  this.propertyType=data
}

sourceDropChange(data:any){
let pre=this.valueDrops;

  if(this.valueDrops=="" ||this.valueDrops==null){
    this.lexiPopup("Please select Values")
  }else{
    console.log(pre.substring(0,1))
    let precode=(pre.substring(0,1))
switch(precode){
  case "W":
    this.propertyLecionCode=this.valueDrops + data;
    this.propertyType="WTERR"
    break;
case "0":
  this.propertyLecionCode=this.valueDrops + data;
  this.propertyType="ZTRIM"
  break;
  case "P":
    this.propertyLecionCode=this.valueDrops + data;
    this.propertyType="NPAIN"
    break;
case "X":
  this.propertyLecionCode=this.valueDrops + data;
  this.propertyType="XTERR"
  break;
  case "6":
    this.propertyLecionCode=this.valueDrops + data;
    this.propertyType="INFAB"
    break;

   
  default :
  this.propertyLecionCode=this.valueDrops + data;
  this.propertyType=this.valueDrops.substring(0,3)
  break;
}


  }
}
//===========================================valueDrop=====
valueDrop:any=[];
valueDrops:string='';
valueDropfield:boolean=false;
newButtonField:boolean=false;
saveButtonField:boolean=true;
updateButtonField:boolean=true;
deleteButtonField:boolean=true;

valueDropChange(data:any){

}
getvaluesFronsearch(){

  if(this.inptOfMfcSearch=='' || this.inptOfMfcSearch==null){
    this.lexiPopup("please enter search")
  }else {
   
    this.service.MfcData(this.inptOfMfcSearch).subscribe((res:any)=>{
      console.log(res)
      this.valueDrop=res})
  }
}
propertyCheck:boolean=true
newButton(){
  if(this.lecionType!=null || this.lecionType!=""){
    this.propertyCheck=false;
  }else{
this.propertyCheck=false;
this.lecionCode="";
this.lecionCodeType="";
this.lecionCodeDisc="";
this.lecionType="";
this.propertyLecionCode="";
this.propertyType="";
this.languageProp="";
this.propertyShortDisc="";
this.propertyMicroDesc="";
this.approvel="";
this.propertyCommand="";
this.propertyLongDisc="";
this.propertyXLongDisc="";
this.mfc=false;
this.pfc=false;
}
this.propertyCheck=false;
this.lecionCode="";
this.lecionCodeType="";
this.lecionCodeDisc="";
this.lecionType="";
this.propertyLecionCode="";
this.propertyType="";
this.languageProp="";
this.propertyShortDisc="";
this.propertyMicroDesc="";
this.approvel="";
this.propertyCommand="";
this.propertyLongDisc="";
this.propertyXLongDisc="";
}
checkValid(){
  if(this.lecionType=="MFC" || this.lecionType=="PFC" || this.lecionType=="PTEM" || this.lecionType=="SGRP" ||this.lecionType=="SGRPS"){
if(this.propertyLecionCode=="" || this.propertyLecionCode==null){
  this.lexiPopup("please Select Valid lexiCode")
}
else {
  this.saveLexiconData();
}

  }
  else if(this.lecionType=="APPL" ||this.lecionType=="SPEC"){
    if(this.propertyXLongDisc=="" || this.propertyXLongDisc==null){
      this.lexiPopup("please Select long disc")
    }
    else {
      this.saveLexiconData();
    }
}else if(this.lecionType=="PCOT"){
  if(this.propertyShortDisc=="" || this.propertyShortDisc==null){
    this.lexiPopup("please Enter Shord disc Type")
  }else if(this.propertyLongDisc=="" || this.propertyLongDisc==null){
    this.lexiPopup("please Enter Long Type")
  }
  else {
    this.saveLexiconData();
  }
}else {
  this.saveLexiconData();
}
}
saveLexiconData(){

  
  let input={"lexcC": 
  this.propertyLecionCode,
  "langGtiC": "B",
  "propCodeC": this.propertyType,
  "lextypTypeC": this.lecionType,
  "lexcDescShrtX": this.propertyShortDisc,
  "lexcDescLongX": this.propertyLongDisc,
  "lexcCommentX": this.propertyCommand,
  "lexcDescXlongX": this.propertyXLongDisc,
  
  "approvedFlag": this.approvel,
  "lexcDescM1X": this.propertyMicroDesc,
  "translate": "N",
  "plastupY": "2015-08-10",
  "plastIdC": "AMILEWIC"
}
this.service.saveNewLexiconData(input).subscribe((res:any)=>{
  
  if(res.errMsg){
    this.lexiPopup(res.errMsg)
    
  }else if(!res.errMsg){
    this.lexiPopup(res.sucMsg)
    
  }
})
  
}
newpropert(){
  this.prcode="";
  //this.lexiTypes="";
  this.disc="";
  this.propertyc="";
  this.lexiTypes="";
}
deleteProperty(){
  
  if(this.propertyc=='' || this.propertyc==null){
    this.lexiPopup("Please enter Property Type")
  }else{
    this.inputData={
      "propCodeC":this.propertyc,
      "propDescX":this.disc,
      "pLastupY":"1999-11-22",
      "pLastIdC":"GLOBTECH",
      "lextypTypeC":this.lexiTypes
    }
    this.service.deleteProperty(this.inputData).subscribe((res:any)=>{

     
       // this.lexiPopup(res.errMsg)
      
        this.lexiPopup(res.sucMsg)
      //}
  
    })
  }
}
updateProperty(){

  if(this.propertyc=='' || this.propertyc==null){
    this.lexiPopup("Please enter Property Type")
  }else{

  
  this.inputData={
    "propCodeC":this.propertyc,
    "propDescX":this.disc,
    "pLastupY":"1999-11-22",
    "pLastIdC":"GLOBTECH",
    "lextypTypeC":this.lexiTypes
  }

  this.service.updateProperty(this.inputData).subscribe((res:any)=>{

    if(res.errMsg){
      this.lexiPopup(res.errMsg)
    }else if(!res.errMsg){
      this.lexiPopup(res.sucMsg)
    }

  })
  }
}
deleteinput:any;
deleteLexiData(){
  if(this.propertyLecionCode=="" || this.propertyLecionCode==null){
    this.lexiPopup("Please enter lexicon code to delete")
  }else {
  let input={"lexcC": 
  this.propertyLecionCode,
  "langGtiC": "B",
  "propCodeC": this.propertyType,
  "lextypTypeC": this.lecionType,
  "lexcDescShrtX": this.propertyShortDisc,
  "lexcDescLongX": this.propertyLongDisc,
  "lexcCommentX": this.propertyCommand,
  "lexcDescXlongX": this.propertyXLongDisc,
  "approvedFlag": this.approvel,
  "lexcDescM1X": this.propertyMicroDesc,
  "translate": "N",
  "plastupY": "",
  "plastIdC": "AMILEWIC"
}

this.deleteinput=input
this.lexiManageDeletePopup=true
// this.service.deleteLexiData(input).subscribe((res:any)=>{
//   if(res.errMsg){
//     this.lexiPopup(res.errMsg)
//   }else if(!res.errMsg){
//     this.lecionCode="";
// this.lecionCodeType="";
// this.lecionCodeDisc="";
// this.lecionType="";
// this.propertyLecionCode="";
// this.propertyType="";
// this.languageProp="";
// this.propertyShortDisc="";
// this.propertyMicroDesc="";
// this.approvel="";
// this.propertyCommand="";
// this.propertyLongDisc="";
// this.propertyXLongDisc="";
// this.mfc=false;
// this.pfc=false;
//     this.lexiPopup(res.sucMsg)

//   }
// })
  }
}

 deleteAfterPupup(){
   this.lexiManageDeletePopup=false
  this.service.deleteLexiData(this.deleteinput).subscribe((res:any)=>{
    if(res.errMsg){
      this.lexiPopup(res.errMsg)
    }else if(!res.errMsg){
      this.lecionCode="";
  this.lecionCodeType="";
  this.lecionCodeDisc="";
  this.lecionType="";
  this.propertyLecionCode="";
  this.propertyType="";
  this.languageProp="";
  this.propertyShortDisc="";
  this.propertyMicroDesc="";
  this.approvel="";
  this.propertyCommand="";
  this.propertyLongDisc="";
  this.propertyXLongDisc="";
  this.mfc=false;
  this.pfc=false;
      this.lexiPopup(res.sucMsg)
  
    }
  })
 }

updateLexi(){
  if(this.propertyLecionCode=="" || this.propertyLecionCode==null){
    this.lexiPopup("Please enter lexicon code to Update ")
  }else {
  let input={"lexcC": 
  this.propertyLecionCode,
  "langGtiC": "B",
  "propCodeC": this.propertyType,
  "lextypTypeC": this.lecionType,
  "lexcDescShrtX": this.propertyShortDisc,
  "lexcDescLongX": this.propertyLongDisc,
  "lexcCommentX": this.propertyCommand,
  "lexcDescXlongX": this.propertyXLongDisc,
  
  "approvedFlag": this.approvel,
  "lexcDescM1X": this.propertyMicroDesc,
  "translate": "N",
  "plastupY": "",
  "plastIdC": "AMILEWIC"
}
this.service.updateLexiData(input).subscribe
((res:any)=>
{ if(res.errMsg){
    this.lexiPopup(res.errMsg)
  }else if(!res.errMsg){
    this.lexiPopup(res.sucMsg)
  }
})
  }
}
//========================group avs function====
lexiGroupAvsDeletePopup:boolean=false
displayGroupAvs:boolean=false;
lexiCodeInGropAvs:string="";
lexiTypeInGropAvs:string="";
lexiDiscInGropAvs:string="";
selectedAvs: AvsTableFields = new AvsTableFields;
lexiconGroupAvsTableList:AvsTableFields[]=[];
showGroupAvs(){

  this.lexiCodeInGropAvs=this.lecionCode;
  //this.lexiDiscInGropAvs=this.lecionType;
  this.lexiTypeInGropAvs=this.lecionType;
  this.displayGroupAvs=true;
}
deleteGroupAvs(){
  if(this.selectedAvs==undefined){
    this.lexiPopup("Please select data to delete")
  }else{
  console.log(this.selectedAvs)
  console.log(this.lexiCodeInGropAvs);
  console.log(this.selectedAvs.lexiCode)

  this.lexiGroupAvsDeletePopup=true
}
}

deleteGRAvs(){
  this.lexiGroupAvsDeletePopup=false
  this.service.deleteGrpAvs(this.lexiCodeInGropAvs,this.selectedAvs.lexiCode).subscribe((res:any)=>{
    if(res.errMsg){
      this.lexiPopup(res.errMsg)
    }else if(!res.errMsg){
      this.loadGroupAvs();
      this.lexiPopup(res.sucMsg)
    }
  })
}
  input: inputdataAvs = new inputdataAvs;
saveGroupAvs(){
 

//this.input.lexicode=this.lexiCodeInGropAvs

this.lexiconGroupAvsTableList.filter((list:AvsTableFields)=>list.lexi=this.lexiCodeInGropAvs);
  console.log(this.lexiconGroupAvsTableList);
  this.service.saveLexiGroup(this.lexiconGroupAvsTableList).subscribe((res:any)=>{
    this.lexiPopup(res.sucMsg);
  })
}
loadGroupAvs(){
 // this.groupAVSButtonField=false;
  this.service.loadGroupAvs(this.lecionCode,this.lang).subscribe((res:any)=>{
    console.log(res)
    if(res.lexiGroup!=""){
this.groupAVSButtonField=false;
console.log(res)
    }else{
      this.groupAVSButtonField=true;
    }
      this.lexiconGroupAvsTableList=res.lexiGroup;
  })
}
  lexiSearchInput: AvsTableFields = new AvsTableFields;

lexiGrpAvsSearchData(input:any){
  let temp:AvsTableFields= new AvsTableFields(
  )
  temp.lexi=this.lexiCodeInGropAvs;
  temp.lexiCode=input.lexiCode;
  temp.longDisc=input.lexiDescription;
  temp.proValue=input.proVal;
  temp.property=input.proCode;
  
  this.lexiconGroupAvsTableList.push(temp);
  console.log(input)

 
}
//===========================lexi replace===

lexiCodeInReplace:string="";
lexiTypeInReplace:string="";
lexiDiscInReplace:string="";
lexiCodeInWReplace:string="";
lexiTypeInWReplace:string="";
lexiDiscInWReplace:string="";
lexiconReplace(){

  if(this.lecionCodeType=='PCOT' ||this.lecionCodeType=='PTEM'){
    this.lexiPopup("Lexicon code is not valid for replacement")
    
  }else{
  this.lexiCodeInReplace=this.lecionCode;
  this.lexiTypeInReplace=this.lecionCodeType;
  
  let x=this.lexiType.filter((lexi:any)=>lexi.key==this.lecionCodeType);
console.log(x)

// if(this.propertyLongDisc!="" || this.propertyLongDisc!=null){

//   this.lexiDiscInReplace=this.propertyLongDisc
// }
// if(this.propertyShortDisc!="" || this.propertyShortDisc!=null){

//   this.lexiDiscInReplace=this.propertyShortDisc
// }
// if(this.propertyXLongDisc!="" || this.propertyXLongDisc!=null){

//   this.lexiDiscInReplace=this.propertyXLongDisc
// }
  //this.lexiDiscInReplace=x[0].value;
  this.showLexiReplace=true;
  this.lexiReplaceButtun=true;
  }
}
showLexiReplace:boolean=false;
lexiReplaceButtun:boolean=true;
replaceCode(){

  if(this.lexiTypeInWReplace=="PCOT" || this.lexiTypeInWReplace=="PTEM"){
    this.lexiPopup("Lexicon code is not valid for replacement")
  }else{
  this.service.replaceLexicon(this.lexiCodeInReplace,this.lexiCodeInWReplace).subscribe((res:any)=>{
    if(res.errMsg){
      this.lexiPopup(res.errMsg)
    }else if(!res.errMsg){
     
      this.lexiPopup(res.sucMsg)
    }
  })

  }
this.lexiCodeInWReplace="";
this.lexiTypeInWReplace="";
this.lexiDiscInWReplace="";
}
openSearchFromLexiReply(){
  localStorage.setItem('Screen',"lexiReplace");
  this.lexiSearch++;
}
lexilexiReplaceSearchData(data:any){
 this.lexiCodeInWReplace=data.lexiCode;
 this.lexiTypeInWReplace=data.type;
//  if(data.propertyLongDisc!="" || data.propertyLongDisc!=null){

//   this.lexiDiscInReplace=data.propertyLongDisc
// }
// if(data.propertyShortDisc!="" || data.propertyShortDisc!=null){

//   this.lexiDiscInReplace=data.propertyShortDisc
// }
// if(data.propertyXLongDisc!="" || data.propertyXLongDisc!=null){

//   this.lexiDiscInReplace=data.propertyXLongDisc
// }
 this.lexiDiscInWReplace=data.lexiDescription;
 this.lexiReplaceButtun=false;
}
fechDiscType(){
 
  this.service.getByLexiconCode(this.lexiCodeInWReplace,this.lang).subscribe((res:any)=>{
    console.log(res)
    if(res==''){
      this.lexiPopup("No Data Founds ! Enter a valid Lexicon Code")
    }else if(res.length==1){
      this.lexiReplaceButtun=false;
      this.lexiTypeInWReplace=res[0].lextypTypeC;
      if(res[0].lexcDescLongX==null){
      }else{
      if(res[0].lexcDescLongX!="" || res[0].lexcDescLongX!=null){

        this.lexiDiscInWReplace=res[0].lexcDescLongX
      }
    }
    if(res[0].lexcDescShrtX==null){
    }else{
      if(res[0].lexcDescShrtX!="" || res[0].lexcDescShrtX!=null){
      
        this.lexiDiscInWReplace=res[0].lexcDescShrtX
      }
    }
    if(res[0].lexcDescXlongX==null){
    }else{
      if(res[0].lexcDescXlongX!="" || res[0].lexcDescXlongX!=null){
      
        this.lexiDiscInWReplace=res[0].lexcDescXlongX
      }
    }
      let disc=this.lexiType.filter((list:any)=>list.key==res[0].lextypTypeC)
      console.log(disc)
      //this.lexiDiscInWReplace=res[0].
     
    }
  })

}
//===========================lexi replace===
// lexiconReplace(){
//   this.showLexiReplace=true;
// }
// showLexiReplace:boolean;
// replaceCode(){

// }
// openSearchFromLexiReply(){
  
// }
// // "lexcChkDigit": null,
// //   "pcLastupY": null,
// //   "propCodeValueC": null,
startsWith="startsWith"
display:any="block"
  display1:any="block"
  count:any=0;
  counts:any=0
  rotate:string="rotate(45deg)";
  rotate1:string="rotate(0deg)";
  br1:string="5px 5px 0px 0px"
  br2:string="5px"
  showCenterPart(){
    if(this.count==0){
      this.display="none"
      this.count=1;
      this.br1="5px "
      this.rotate="rotate(0deg)"
      // this.display1="none"
    }else{
      // this.br1="5px"
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
      this.br2="5px 5px 0px 0px"
      this.rotate1="rotate(45deg)";
      // this.display="none"
    }else{
      this.br2="5px"
      this.rotate1="rotate(0deg)";
      this.counts=0;
      this.display1="block"
    }
  }

 }
