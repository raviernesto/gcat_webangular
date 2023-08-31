import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GcatIrp2ResDto, GetGCATReqFileReqDto, ReqFileIo4Dto } from '../interfaces/irp';
import { ComMismatchVehTableinputDto, ComMismmatchPreTableInputDto } from '../models/mismatch.model';
import {  MismatchService } from '../services/mismatch.service';

@Component({
  selector: 'app-commodity-mismatch',
  templateUrl: './commodity-mismatch.component.html',
  styleUrls: ['./commodity-mismatch.component.css']
})
export class CommodityMismatchComponent implements OnInit {
  comMismatchVehTableinputDto: ComMismatchVehTableinputDto = new ComMismatchVehTableinputDto;
  comMismmatchPreTableInputDto: ComMismmatchPreTableInputDto = new ComMismmatchPreTableInputDto;
  showTable: boolean = false;
  showTable2:boolean=false;
  show: boolean = false;
  productType: any[];//car truck option
  vehicleType: any;//car truck ngmodel
  vehicledrop: any;//4A ngmodel
  vehicleLine: any[] = [];//4A option
  prefixDropdown: any[] = [];
  prefix: any={};
  selectedIrp: GcatIrp2ResDto = {};
  irpNumber:any=0;
  userlogin: string = "PKAMATC2";
  noteChange:boolean=false;
  isEditor: boolean = false;
  isEditor1:boolean=false;
  isEditor2:boolean=false;
  text1:any;
  text2:any;
  text3:any;
  vehType!:string;
  vehLine!:string;
  pre!:string;
  parts1 = [];
  parts2 = [];
  parts :any[]=[];
  notesHeader!:string;
  constructor(private mismatch: MismatchService, private route: Router) {
    this.productType = [
      { name: 'C', value: 'Car' },
      { name: 'T', value: 'Truck' }
    ];
  }

  ngOnInit(): void {
  }

  changeVehicleDrop() {
    this.show = false;
    this.mismatch.fetchVehDrop(this.vehicleType.name).subscribe((res: any) => {
      this.vehicleLine=res;
     
      console.log(this.vehicleLine);
    })
    this.prefixDropdown=[];
    this.showTable2=false;
  }
  changePrefix() {
    this.show = true;
    this.mismatch.fetchPreDrop().subscribe((res: any) => {
      this.prefixDropdown=res;
      console.log(this.prefixDropdown);
    })
    this.vehicleLine=[];
    this.showTable=false;
  }
  refresh(){
    window.location.reload();
  }
  productTypeDrop() {
    console.log(this.vehicleType)
  }

  submit() {
    
    this.showTable = true;
    this.comMismatchVehTableinputDto.vehType = this.vehicleType.name;
    this.vehType="Commodity Type >>> "+this.vehicleType.name ;
    this.comMismatchVehTableinputDto.vehLine = (this.vehicledrop==null)?"":this.vehicledrop.evlVehicleLineC;
    this.vehLine="Vehicle Line >>> "+((this.vehicledrop==null)?"All":this.vehicledrop.prtpeioDescX);
    this.mismatch.showReportVeh(this.comMismatchVehTableinputDto).subscribe((res: any) => {
      this.parts = res;
      console.log(this.parts);
    })
    this.comMismatchVehTableinputDto.vehType = this.vehicleType.name;
    this.vehType="Commodity Type >>> "+this.vehicleType.name ;
    this.comMismatchVehTableinputDto.vehLine = (this.vehicledrop==null)?"":this.vehicledrop.evlVehicleLineC;
    this.vehLine="Vehicle Line >>> "+((this.vehicledrop==null)?"All":this.vehicledrop.prtpeioDescX);
    this.mismatch.showReportGrp(this.comMismatchVehTableinputDto).subscribe((res: any) => {
      this.parts1 = res;
      console.log(this.parts1);
    })
  
  }

submit1(){
  if(this.vehicleType==null||this.vehicleType==''){
    this.alertPopup("Please select mandatory field");
  }
else{
  this.showTable2 = true;
  this.comMismmatchPreTableInputDto.vehType = this.vehicleType.name; 
  this.vehType="Commodity Type >>> "+this.vehicleType.name ;
  this.comMismmatchPreTableInputDto.prefix = this.prefix.famprfxPrefixC;
  this.pre="Prefix >>> "+this.prefix.famprfxPrefixC;
  console.log(this.comMismmatchPreTableInputDto)
  this.mismatch.showReportPre(this.comMismmatchPreTableInputDto).subscribe((res: any) => {
    this.parts2 = res;
    console.log(this.parts2);
  })
}
} 


next(vehicleLine:string,irpNumber:string,illustration:string,section:string){
  console.log("alert :"+vehicleLine+irpNumber+illustration+section)
  let tableInput1 = {
    "vehline": vehicleLine, "irp": irpNumber, "ill": illustration,
    "sec": section, }
       localStorage.setItem('vehline',vehicleLine);
       localStorage.setItem('irp',irpNumber);
       localStorage.setItem('ill',illustration);
       localStorage.setItem('sec',section);
       localStorage.setItem('display',"one");
     //window.open("http://localhost:27327/mismatch")
    window.open(environment.dev+'/mismatch');
  
  }
  next1(prefix:string,irpNumber:string,illustration:string,section:string){
    console.log("alert :"+prefix+irpNumber+illustration+section)
    let tableInput2= {
      "prefix":prefix, "irp1": irpNumber, "ill1": illustration,
      "sec1": section, }
      localStorage.setItem('prefix',prefix);
       localStorage.setItem('irp1',irpNumber);
       localStorage.setItem('ill1',illustration);
       localStorage.setItem('sec1',section);
       localStorage.setItem('display',"two");
      // window.open("http://localhost:27327/mismatch")
         window.open(environment.dev+'/mismatch');
     
  }
  next2(prefix:string,irpNumber:string,illustration:string,section:string){
    console.log("alert :"+prefix+irpNumber+illustration+section)
    let tableInput3 = {
      "prefix1":prefix, "irp2": irpNumber, "ill2": illustration,
      "sec2": section }
      localStorage.setItem('prefix1',prefix);
       localStorage.setItem('irp2',irpNumber);
       localStorage.setItem('ill2',illustration);
       localStorage.setItem('sec2',section);
       localStorage.setItem('display',"three");
      // window.open("http://localhost:27327/mismatch")
         window.open(environment.dev+'/mismatch');
     
  }
   notes(irpNumber:any){
    let dto: GetGCATReqFileReqDto = {};
    this.irpNumber=irpNumber;
    dto.reqIdR =irpNumber;
    dto.reqfileNameX = irpNumber + "";
    dto.reqfileTypeC = "txt";
    this.mismatch.openFile(dto)
      .subscribe((data: any) => {
        if (data) {
          const file = new Blob([data], { type: 'application/txt' });;
          let fileReader = new FileReader();
          fileReader.onload = (e) => {
            console.log(fileReader.result);
            this.text1 = fileReader.result;
            console.log(this.text1);
            this.notesHeader="IRP "+ irpNumber  + " User Notes";
            this.isEditor = true;
          }
          fileReader.readAsText(file);
        } else {
          this.alertPopup("File Not Found.");
        }
      })
    }
    alert: any = {
      flag: false,
      msg: "",
    }
    alertPopup(data: string) {
      this.alert.flag = true;
      this.alert.msg = data;
    }
    cancelpop(){
      this.alert.flag=false;
    }
   notes1(irpNumber:any){
    let dto: GetGCATReqFileReqDto = {};
    this.irpNumber=irpNumber;
    dto.reqIdR = irpNumber;
    dto.reqfileNameX = irpNumber + "";
    dto.reqfileTypeC = "txt";
    this.mismatch.openFile(dto)
      .subscribe((data: any) => {
        if (data) {
          const file = new Blob([data], { type: 'application/txt' });;
          let fileReader = new FileReader();
          fileReader.onload = (e) => {
            console.log(fileReader.result);
            this.text2 = fileReader.result;
            this.notesHeader="IRP "+ irpNumber  + " User Notes";
            this.isEditor1 = true;
          }
          fileReader.readAsText(file);
        } else {
          this.alertPopup("File Not Found.");
        }
      })
  }
  notes2(irpNumber:any){
   let dto: GetGCATReqFileReqDto = {};
   this.irpNumber=irpNumber;
    dto.reqIdR = irpNumber;
    dto.reqfileNameX = irpNumber + "";
    dto.reqfileTypeC = "txt";
    this.mismatch.openFile(dto)
      .subscribe((data: any) => {
        if (data) {
          const file = new Blob([data], { type: 'application/txt' });;
          let fileReader = new FileReader();
          fileReader.onload = (e) => {
            console.log(fileReader.result);
            this.text3 = fileReader.result;
            this.notesHeader="IRP "+ irpNumber  + " User Notes";
            this.isEditor2 = true;
          }
          fileReader.readAsText(file);
        } else {
          this.alertPopup("File Not Found.");
        }
      })
  }
  addReqFile(type: any, irpFile: File, name: any) {
    let dto: ReqFileIo4Dto = {
      reqIdR:this.irpNumber,
      reqfileMarkedF: "",
      reqfileTypeC: type,
      reqfileNameX: name,
      plastupY: "",
      plastIdC: this.userlogin
    }
    
          this.mismatch.getUploadedFileValue(irpFile, this.irpNumber, name, type)
            .subscribe((data2: any) => {
              if (data2) {
                this.alertPopup("Notes Uploaded Successfully");   
              }
            })
        }
     
  expFile() {
    this.isEditor = false;
    const bFile = new Blob([this.text1], { type: 'text/plain' });
    const file = new File([bFile], this.irpNumber + '.txt');
    this.addReqFile("txt", file,this.irpNumber + "");
  }
    
  expFile1() {
    this.isEditor1 = false;
    const bFile = new Blob([this.text2], { type: 'text/plain' });
    const file = new File([bFile], this.irpNumber + '.txt');
    this.addReqFile("txt", file,this.irpNumber + "");
  }
     
  expFile2() {
    this.isEditor2 = false;
    const bFile = new Blob([this.text3], { type: 'text/plain' });
    const file = new File([bFile], this.irpNumber + '.txt');
    this.addReqFile("txt", file,this.irpNumber + "");
  }
 home(){
   this.route.navigate(['']);
 }
 notesChanges(){
  this.noteChange=true;
  }
  cancelpop1(){
    this.alert1.flag=false;
  }

  alert1: any = {
    flag: false,
    msg: "",
  }
  alertPopup1(data: string) {
    this.alert1.flag = true;
    this.alert1.msg = data;
  }
input=0;
 confirmalert1(i:number){
   this.input=i;
  let data = "";
  this.isEditor=false;
  if(this.noteChange){
  this.noteChange=true;
  data = "Do you want to save changes before closing?";
  this.alert1.flag = true;
this.alert1.msg = data;
  }
 }
 confirmalert2(i:number){
  this.input=i;
 let data = "";
 this.isEditor1=false;
 if(this.noteChange){
 this.noteChange=true;
 data = "Do you want to save changes before closing?";
 this.alert1.flag = true;
this.alert1.msg = data;
 }
}
confirmalert3(i:number){
  this.input=i;
 let data = "";
 this.isEditor2=false;
 if(this.noteChange){
 this.noteChange=true;
 data = "Do you want to save changes before closing?";
 this.alert1.flag = true;
this.alert1.msg = data;
 }
}
 sample(){
   if(this.input==1){
     this.expFile();
     }
     else if (this.input==2){
      this.expFile1();
   }
   else if(this.input==3){
     this.expFile2();
   }
 }

display: any = "block"
count: any = 0;
rotate: string = "rotate(45deg)";
br1: string = "5px"

showCenterPart(){
  if (this.count == 0) {
    this.display = "block"
    this.count = 1;
    this.rotate = "rotate(45deg)"
    this.br1 = "5px 5px 0px 0px"
  } else {
    this.display = "none"
    this.count = 0;
    this.rotate = "rotate(0deg)"
    this.br1 = "5px"
  }
}
  }


  