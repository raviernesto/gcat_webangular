import { Component, Injectable, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
 import { TemplateServiceService } from '../services/template-service.service';

@Component({
  selector: 'app-template-data',
  templateUrl: './template-data.component.html',
  styleUrls: ['./template-data.component.scss']
})

@Injectable({
  providedIn: 'root',
  useValue:1
})

export class TemplateDataComponent implements OnInit {

  constructor( private primeng:PrimeNGConfig,private tempservice : TemplateServiceService) { }

  ngOnInit(): void {
    this.templateId=localStorage.getItem('templateId');
    
    console.log(this.templateId);
    this.getTemplate();
    this.getTemplateComm();
    
  }
  laptop:any;
  templateId:any;
  newTemplate:any;
  display:any="none"
  display1:any="none"

  count:any=0;
  counts:any=0;
  tempPopup:boolean=false;
  savePopup:boolean=false;
  DataSavedPopup:boolean=false;
  deletePopup:boolean=false;
  result:any;
  result1:any;
  countss:any=0;
  sectionSelected: number = -1;
  hello !:string;
  munch!:any;
  ProductType:any;
  TemplateName:any;
  HelpText:any;
  Notes:any;
  tempid2:any;
  tempradio:any;
  tempName2:any;
  temcom:any=[];
  selectTemplateValues:any=[];
  rotate:any;
  lexiSearch:number=0;
  display2:any="block"
  alert:any={
    flag:false,
    msg:"",
  }

  alertPopup(data:string){
    this.alert.flag=true;
    this.alert.msg=data;
  }
  showCenterPart(){
    if(this.count==0){
      this.display="block"
      this.count=1;
      this.rotate="rotate(45deg);"
    }else{
      this.display="none"
      this.count=0;
      this.rotate="rotate(0deg);"
    }
  }
  showCenterPart2(){
    if(this.counts==0){
      this.display1="block"
      this.counts=1;
    }else{
      this.counts=0;
      this.display1="none"
    }
  }
  showCenterPart3(){
    if(this.countss==0){
      this.display2="block"
      this.countss=1;
    }else{
      this.countss=0;
      this.display2="none"
     
    }
  }
  openSearch(){
    console.log("open")
    localStorage.setItem('Screen',"Template");
    this.lexiSearch++;
  }

  getLexDetails(data:any) {
   //  this.lexiSearch = 0;
   console.log(data);
   

    // console.log(data);
    // this.lexcDetails.lexcCode=data.lexiCode;
    if(data.type == "PTEM"){
     this.TemplateName=data.lexiDescription;}
     else {
      this.alertPopup("Please Enter Valid Type");
     }
    
    // this.lexcDetails.lexcType=data.type;
    // this.lexcDetails.propCode=data.proCode;
    // console.log(this.lexcDetails);
    // if (this.lexcDetails.lexcType != "MFC" && this.lexcDetails.lexcType != "PFC" && this.lexcDetails.lexcType != "APPL" && this.lexcDetails.lexcType != "SPEC") {

    //   this.alertPopup("Please choose PFC, MFC, SPEC and APPL comments only");
    // }
    // else {
    //   let count = 0;
    //   if (this.sectAdded.length > 0) {
    //     count=this.count();
    //   }
    //   if (count > 0) {
    //     this.alertPopup("Lexicon type is already added");
    //   } else {
    //     let input = { lexc: this.lexcDetails.lexcCode, propCode: this.lexcDetails.propCode, lexcType: this.lexcDetails.lexcType, lexcDesc: this.lexcDetails.lexcDesc }
    //     this.sect.push(input);
    //     this.section.sect.push(input);
    //     this.sectAdded.push(input);
    //     this.section.sectChange=true;
    //     this.isSave=true;
    //   }
    // }

  }

  getLexcClose() {
    this.lexiSearch = 0;
  }
  getTemplate(){
 
    this.tempservice.getTemplate(this.templateId).subscribe((res:any) => {this.result=res;
      this.templateId=this.result.templateId; 
      this.TemplateName=this.result.templateName;
      this.ProductType=this.result.productType; 
      this.HelpText=this.result.helpText;
      this.Notes=this.result.notes;
      this.tempid2=this.result.templateId; 
      this.tempName2=this.result.templateName;
      if(this.result.templateType=="NN"){
        console.log("test")
        this.tempradio="normal"
      }else if(this.result.templateType=="CN"){
        this.tempradio="coluredpart"
      }
      else{
        console.log("try")
      }
      console.log(this.templateId)
      console.log(res)     
      
     
  
    })
  
   }
   getTemplateComm(){
 
    this.tempservice.getTemplateComm(this.templateId).subscribe((res:any) => {this.result=res;
      this.temcom=this.result;
      console.log(this.templateId)
      console.log(res)     
      
     
  
    })
  
   }
   SelectTempaltepopup(){
     this.tempPopup=true;
     this.tempservice.getTemplateSelectValues().subscribe((res:any) => {this.result=res;
      this.selectTemplateValues=this.result;
      console.log(this.templateId)
      console.log(res)     
      
   })

}


savePopuptrue(){
  this.savePopup=true;
  console.log(this.savePopup)
}

clickedSection(event:any) {
  this.sectionSelected = event.index;
}

selectSection() {
  
    this.tempservice.getTemplateComm2(this.selectTemplateValues[this.sectionSelected].templateid||"").subscribe((res: any) => {
      console.log(res);
     
        this.result1 = res;
       
        console.log(this.result1);
        this.tempPopup = false;
        this.sectionSelected = -1;
      
    });
  
}

DataSavedPopuptrue(){
  
  this.DataSavedPopup=true;
}

deletePopuptrue(){
  this.deletePopup=true;
}

}

