import { Component, Injectable, Input, OnInit, SimpleChanges } from '@angular/core';
import { LexiconMangeServiceService } from 'src/app/services/lexicon-mange-service.service';
import { FilterTable } from '../lexiconmanagement/LexiconFields';
import{LexiconSearchComponent}from '../lexicon-search/lexicon-search.component';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-lexiconfiltermaintenance',
  templateUrl: './lexiconfiltermaintenance.component.html',
  styleUrls: ['./lexiconfiltermaintenance.component.css'],
  
})
@Injectable({
  providedIn: 'root'
})
export class LexiconfiltermaintenanceComponent implements OnInit {
  
  Type:any=[
    {Type:"C"},
    {Type:"T"}
  ]
  Vehicle:any=[
    {Vehicle:"A"},
    {Vehicle:"B"}
  ]
  lexicon = [
    {template: " ",utc:" ",cna:" ",prs:" ",nsp:" ",nsr:" "},
    
    ];
    lexiSearch:number=0;
    // @Input()ChildItem:string
    currentItem="lexi";
    vehicleLines:any=[];
    lexiFamilys:any=[];
    vehicleLine:string="";
    vhType:string="";
    lexiFamily:string="";
    lexiFilterDetails:FilterTable[]=[];
    selectedProduct1:any='';
    lexiCode:string="";
    userId:string="PKAMATC2";
    alphanum:string='alphanum';
  constructor(private service:LexiconMangeServiceService,private router:Router) { }
  
  ngOnInit(): void {
this.getVhlLes();

  }
  showModalDialog() {
    this.selectionPopup = false;
  }
  pass(data:any){
    console.log(data)
    this.lexiCode=data.lexiCode;
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    //this.lexiCode=changes.lexiCode
  }
 
 addItem(data:any){
   console.log(data)
 }
 getVhlLes(){

  this.service.getVHLinesForFilter().subscribe((res:any)=>{

    console.log(res)
this.vehicleLines=res;

  })
 }
//  <p-dropdown [options]="lexiFamilys"  [(ngModel)]="lexiFamily" (ngModelChange)="lexiFamilysChnges()" placeholder="Select a Family" optionLabel="value" optionValue="value"></p-dropdown>
lexiFamilysChnges(){

}
getLexiFamily(){

  console.log(this.vhType)
  console.log(this.vehicleLine)
  if(this.vhType ==''|| this.vehicleLine=='' ){
this.selcetionPopup("Please select the item in combo box")
  }
  else{
  this.service.getLexiFamilyForFilter(this.vhType,this.vehicleLine).subscribe((res:any)=>{

    this.lexiFamilys=res;
  })
  }
}
openSearch(){
  if(this.lexiFamily=="" ||this.lexiFamily==null){
    this.selcetionPopup("Please select combo box")
  }else{
  localStorage.setItem('Screen',"lexiFilter");
  this.lexiSearch++;
  }
}

closeSearch(){
  this.lexiSearch=0;
}
getFilterFromSearch(data:any){
  console.log(data)
 if(data.type=="MFC" ||data.type=="PFC" ){
  console.log(data)
  
let temp=this.lexiFilterDetails.filter((item: FilterTable)=>item.lexiCode==data.lexiCode);
 
console.log(temp);
if(temp.length!=0){
  this.selcetionPopup("Already exist in lexiconFilter(L31) Table!.")
}
  let inputs={
    lexiCode:data.lexiCode,
    vhType:this.vhType,
    vhLine:this.vehicleLine,
    lexiFamily:data.proCode,
    lang:"EN"
  }
  if(data.proCode==this.lexiFamily)
   this.service.addFiltedData(inputs).subscribe((res:any)=>{
    if(res.errFlg){
      this.selcetionPopup(res.errMsg)
    }
   
console.log(res)
    
    this.getFilterDetails();

     })
console.log(inputs)
  this.service.getFilterData(inputs).subscribe((res:any)=>{
console.log(res)
    if(res.filterResponceVos==''){
      this.selcetionPopup("Please select Valid Lexicon Type")
    }else{
    this.lexiFilterDetails=res.filterResponceVos;
    this.lexiFamily=data.proCode;
    }
  })
 }else{
  this.selcetionPopup("Please select Valid lexicon Type")
 }
}

// getSearchData(data:any){
// console.log(data)
// this.lecionCode=data.lexiCode;
// this.lecionCodeType=data.type
// this.lecionCodeDisc=data.lexiTypeDiscription
// }

selectionPopup:boolean=false;
popupMsg:string="";
selcetionPopup(msg:string){
  this.popupMsg=msg
  this.selectionPopup=true
}

getFilterDetails(){

if(this.lexiFamily=="" || !this.lexiFamily==null){
  this.selcetionPopup("Please select the combo box")
}else{
  let inputs={
    
    vhType:this.vhType,
    vhLine:this.vehicleLine,
    lexiFamily:this.lexiFamily,
    lang:"EN"
  }

  this.service.getFilterData(inputs).subscribe((res:any)=>{

    if(res.filterResponceVos==''){
      this.selcetionPopup("No record found")
    }else{
    this.lexiFilterDetails=res.filterResponceVos;
    }
  })
}
}
deleteFilter(){
  if(this.selectedProduct1==''){
    this.selcetionPopup("Please select Property to Delete")
  }else{
    this.lexiFilterDeletePopup=true
  }
}
deleteSlectedFilter(){
  if(this.selectedProduct1==''){
    this.selcetionPopup("Please select Property to Delete")
  }else{
  console.log(this.selectedProduct1)
  this.service.deleteFilterData(this.selectedProduct1).subscribe((res:any)=>{

    console.log(res)
    this.getFilterDetails();
    this.lexiFilterDeletePopup=false
  })
}
}
valueinLexicode(event:any){
  this.selectedProduct1=[];
  
}
lexiFilterDeletePopup:boolean=false
add(){
  console.log(this.selectedProduct1)
  if(this.selectedProduct1=='' ){
    if(this.lexiCode==''){
      console.log(this.lexiCode)
    
      this.selcetionPopup("Please enter valid lexicon code")
    }else{
      console.log(this.lexiCode)
     if(this.lexiFamily==''){
      this.selcetionPopup("Please select combo box fields")
     }else{
     let inputs={
      "sno": 0,
      "lexiCode": this.lexiCode,
      "lexType": '',
      "lexiFamily": this.lexiFamily,
      "vhType": this.vhType,
      "vhLine": this.vehicleLine,
      "lexiDisc": '',
      "flag": '',
      "actionBy": this.userId,
      "actionDate": '',
      "lang":"EN"
     }
     
     this.service.addFiltedData(inputs).subscribe((res:any)=>{
       console.log(res.filterResponceVos.length)
if(res.filterResponceVos.length!=0){
      let temp=this.lexiFilterDetails.filter((item: FilterTable)=>item.lexiCode==res.filterResponceVos[0].lexiCode);

console.log(temp);
if(temp.length!=0){
  this.selcetionPopup("Already exist in lexiconFilter(L31) Table!.")
}else{
  if(res.errFlg){
    this.selcetionPopup(res.errMsg)
  }else{

    this.selcetionPopup("Lexicon code is added successfully")
    console.log(res.filterResponceVos)
    //this.lexiFilterDetails=res.filterResponceVos;
    let inputs={
    
      vhType:res.filterResponceVos[0].vhType,
      vhLine:res.filterResponceVos[0].vhLine,
      lexiFamily:res.filterResponceVos[0].lexiFamily,
      lang:"EN"
    }
  
    this.service.getFilterData(inputs).subscribe((res:any)=>{
  
      if(res.filterResponceVos==''){
        this.selcetionPopup("No record found")
      }else{
        this.lexiFamily=res.filterResponceVos[0].lexiFamily
      this.lexiFilterDetails=res.filterResponceVos;
      }
    })
  }
}
}else{
  this.selcetionPopup(res.errMsg)
}
      console.log(res)
    
     })
    }
    }
  }else{
    if(this.selectedProduct1.flag=='D'){
      this.service.deleteFilterData(this.selectedProduct1).subscribe((res:any)=>{

        console.log(res)
        this.getFilterDetails();
        this.selectedProduct1=[];
      })
    }else{
      this.selcetionPopup("Selected Code is alredy exists")
    }
  }
}
}
