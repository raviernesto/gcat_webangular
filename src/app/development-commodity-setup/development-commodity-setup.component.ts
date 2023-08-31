import { Component, OnInit, ViewEncapsulation,Injectable, ViewChild } from '@angular/core';
import { CommodityService } from 'src/app/services/commodity.service';
import { CommodityCodeList, CommodityDetails, CommodityWq, LexcDesc, NewBaseDetails, ChangeCommodity, EngineeringBase, BaseUpdate } from '../models/development-commodity-setup.class';
import { Router } from '@angular/router';
import { Dropdown } from 'primeng/dropdown';
import { WorkQueue } from '../interfaces/part-workqueue';
import { UtilitiesService } from '../shared/services/utilities.service';

@Component({
  selector: 'app-development-commodity-setup',
  templateUrl: './development-commodity-setup.component.html',
  styleUrls: ['./development-commodity-setup.component.css'],
  encapsulation: ViewEncapsulation.None
})

@Injectable({
  providedIn: 'root'
})

export class DevelopmentCommoditySetupComponent implements OnInit {

  commodityIntDetails: CommodityDetails = {
    commodity: "", commodityS:"", commodityWq: "", vehicleType: "C", commodityName: "", newCommodity: false,
    primaryFeatures: [],
    generalEP: {},
    buildCommodity: { sCommodityCode: "", sCommodityName: "", sVehicleType: "", lexc: "", existingBaseDetailList: [], addedBaseDetailList: [], deleteBaseDetailList: [] },
    qualifiers: {}, summarize: {},
    status: { buildCommodity: "", general: "Y", primaryFeatures: "Y", qualifier: "Y", summary: "Y" }
  }
  
  @ViewChild('cc')
  dropdown1!: Dropdown; 

  @ViewChild('dd')
  dropdown!: Dropdown; 
  updateRow: number=0;
  count: number=0;
  display: string="none";
  rotate: string="rotate(0deg);";
  br1:string="5px";

  counts1: number=0;
  display1: string="none";
  rotate1: string="rotate(0deg);";
  br2:string="5px";
  

  startsWith="startsWith";


  constructor(private commodity: CommodityService,private router :Router,private utilitiesService:UtilitiesService) {
  }

  savePopup = false;
  chgComPopup = false;
  closePopup = false;
  isDisabledTask1 = false;
  isDisableComplete = false;
  clickBase: boolean = false;
  clickQual: boolean = false;
  commodityCodeList: CommodityCodeList[] = [];
  commodityWqList: CommodityWq[] = [];
  newBaseDetails: NewBaseDetails[] = [];
  lexcDetails: LexcDesc = {
    lexcType:"",
    lexcCode:"",
    lexcDesc:""
  };
  selectedCommodity: any = [];
  selectedWq: any = [];
  baseData: any = [];
  baseSelectedDetails: any = [];
  baseSelectedDetails1: any = [];
  basedeleteDetails: any = [];
  qualdeleteDetails: any = [];
  qualDeleteSelected: any = [];
  qualDeleteList: any = [];
  i: number = 0;
  deleteSelected: number = -1;
  priorityRow?: number;
  prPriority: any = [];
  qualifierAll: any = [];
  changeCommodity: ChangeCommodity = { commodity: "" };
  baseTransfer:any=[];
  deleteSection:any=[];
  deleteBaseSection:any=[];
  alert:any={flag:false,msg:""};
  confirm:any={flag:false,msg:"",id:0,base:{}};
  enggBase: boolean = false;
  lexiPopup:number=0;
  model: EngineeringBase = new EngineeringBase;
  baseUpdate:BaseUpdate={};
  baseUpdate1:BaseUpdate={};
  designationDropdown=[{value:"E"},{value:"N"},{value:"X"}];
  updateDesignation:any=[];
  designation="";
  assignBase=false;
  commoditychange:any;
  commoditychangewq:any;
  show1=false;
  show2=false;

  ngOnInit() {
    let vehicleType=localStorage.getItem('vehType') || "";
    let comm=localStorage.getItem('commodity');
    let screen=localStorage.getItem('Screen');
    localStorage.removeItem('vehType');
    localStorage.removeItem('commodity');
    localStorage.removeItem('Screen');
    console.log(vehicleType+"--"+comm+"--"+screen);
    if(screen=="Catalog Section" || screen=="Wbs") this.commodityIntDetails.vehicleType=vehicleType;
    console.log(this.commodityIntDetails.vehicleType);
    this.commodity.getCommodityList(this.commodityIntDetails.vehicleType).subscribe((data: any) => {
      this.commodityCodeList = data;
      console.log(data);
      console.log(data);
      if(screen=="Catalog Section" || screen=="Wbs"){
      console.log(comm);
      console.log(localStorage.getItem('vehType'));
      const filterdObj = this.commodityCodeList.filter((obj) => {
        return obj.commodityCode === comm;
      });
      console.log(filterdObj[0]);
      this.commodityIntDetails.commodityS=filterdObj[0];
      this.commodityIntDetails.commodity=this.commodityIntDetails.commodityS;
      this.selectedCommodity= filterdObj[0];
      (<HTMLInputElement>document.getElementById("commodity")).value = filterdObj[0].commodityCode==null?"":filterdObj[0].commodityCode;
      this.dropdown1.onChange.emit(filterdObj[0]);
      this.dropdown1.value=filterdObj[0];
      this.getCommodityDetails();
      this.counts1=0;
      this.showCenterParts();
      this.changeAllBase();
    }
    })
    
    this.commodity.getWqList().subscribe((data: any) => {
      this.commodityWqList = data;
      
      this.utilitiesService.selectedWorkQueue.subscribe((wq: WorkQueue) => {
        if (!!wq) {
          let wq1=wq;
          console.log(wq1);
          console.log(wq1.engpEngnrgPartR!=undefined);
          if(wq1.engpCommodityC!=undefined){
            const filterdObj = this.commodityWqList.filter((obj) => {
              return (obj.commodity === wq.engpCommodityC && obj.vehicleType===wq.cmdtyTypeC && obj.reasonCode===wq.reasonCodeC);
            });
            this.commodityIntDetails.commodityWq=filterdObj.length>0?filterdObj[0]:null;
            this.selectedWq= filterdObj.length>0?filterdObj[0]:null;
            this.dropdown.onChange.emit(filterdObj[0]);
            this.dropdown.value=filterdObj[0];
            this.changeAllBase();
          }
          
  
        }
        });
    });
    this.showCenterPart();
    this.counts1=0;
    this.showCenterParts();
  }

  changeVehicle(event: any) {
    console.log(event.target.value);
    this.commodityIntDetails.vehicleType = event.target.value;
    this.commodity.getCommodityList(this.commodityIntDetails.vehicleType).subscribe((data: any) => {
      this.commodityCodeList = data;
      console.log(data);
    })
  }

  updateVehicle() {
    console.log(this.commodityIntDetails.vehicleType);
    this.commodity.getCommodityList(this.commodityIntDetails.vehicleType).subscribe((data: any) => {
      this.commodityCodeList = data;
      console.log(data);
    })
  }

  changesVehicle(event: any) {
    console.log(event.target.value);
    if (this.commodityIntDetails.newCommodity) {
      this.commodityIntDetails.vehicleType = event.target.value;
      this.commodityIntDetails.buildCommodity.sVehicleType = this.commodityIntDetails.vehicleType;
    } else if(this.commodityIntDetails.buildCommodity.sCommodityCode.length>0) {
      if (event.target.value == "C") {
        this.alertPopup("You cannot replace the Truck version with a Car version.  Please click New to create a Car version.");
        this.commodityIntDetails.buildCommodity.sVehicleType = "T";
        (<HTMLInputElement>document.getElementById("sVehicleTypeT")).checked = true;
      }
      if (event.target.value == "T") {
        this.alertPopup("You cannot replace the Car version with a Truck version.  Please click New to create a Truck version.");
        this.commodityIntDetails.buildCommodity.sVehicleType = "C";
        (<HTMLInputElement>document.getElementById("sVehicleTypeC")).checked = true;
      }
    }
  }

  commodityChange(event:any) {
    console.log(event);
    this.commodityIntDetails.commodity=event.value===undefined?event:event.value;
    console.log(this.commodityIntDetails.commodity);
    this.commoditychangewq="";
    this.show1=true;
    this.show2=false;
    this.selectedCommodity = this.commodityIntDetails.commodity;
    this.selectedWq = '';
    this.commodityIntDetails.vehicleType = this.selectedCommodity.vehicleType;
    this.commodityIntDetails.commodityName = this.selectedCommodity.commodityName;
    this.getCommodityDetails();
    this.counts1=0;
    this.baseSelectedDetails=[];
    this.commodityIntDetails.buildCommodity.baseView="All";
    this.changeAllBase();
  }

  changeWq(event:any) {
    console.log(event);
    this.commodityIntDetails.commodityWq=event.value===undefined?event:event.value;
    console.log(this.commodityIntDetails.commodityWq);
    this.commoditychange="";
    this.show2=true;
    this.show1=false;
    this.selectedWq = this.commodityIntDetails.commodityWq;
    this.selectedCommodity = '';
    if(this.commodityIntDetails.commodityWq!=null){
    this.commodityIntDetails.commodityName = this.selectedWq.desc;
    this.commodityIntDetails.vehicleType = this.selectedWq.vehicleType;
    }
    this.getCommodityDetails();
    this.changeAllBase();
  }

  getCommodityDetails() {
    console.log(this.selectedCommodity);
    console.log(this.selectedWq);
    if ((this.selectedCommodity == '' || this.selectedCommodity == null )&& (this.selectedWq == '' || this.selectedWq == null)) {
      console.log("Select a Commodity to continue");
    } else {

      if (this.selectedCommodity == '') {
        this.commodityIntDetails.vehicleType = this.selectedWq.vehicleType;
        this.commodityIntDetails.commodity = this.selectedWq.commodity;
      }

      if (this.selectedWq == '') {
        this.commodityIntDetails.commodity = this.selectedCommodity.commodityCode;
        this.commodityIntDetails.commodityName = this.selectedCommodity.commodityDesc;
      }
      console.log(this.commodityIntDetails.vehicleType + " " + this.commodityIntDetails.commodity);
      this.commodity.getCommodityDetails(this.commodityIntDetails.vehicleType, this.commodityIntDetails.commodity).subscribe((data: any) => {
        this.commodityIntDetails = data;
        this.setCommoditydetails();
      })
    }
  }

  setCommoditydetails(){
    //Build Commodity
    (<HTMLInputElement>document.getElementById("commodity")).value = this.selectedCommodity.commodityCode;
    this.commodityIntDetails.commodity= this.selectedCommodity.commodityCode;
    this.commodityIntDetails.buildCommodity.sCommodityCode = this.selectedCommodity.commodityCode;
    this.commodityIntDetails.buildCommodity.sCommodityName = this.commodityIntDetails.commodityName;
    this.commodityIntDetails.buildCommodity.sVehicleType = this.commodityIntDetails.vehicleType;
    if (this.selectedCommodity == '') {
      (<HTMLInputElement>document.getElementById("commodity")).value = this.selectedWq.commodity;
      this.commodityIntDetails.commodity= this.selectedWq.commodity;
      this.commodityIntDetails.buildCommodity.sCommodityCode = this.selectedWq.commodity;
      this.commodityIntDetails.buildCommodity.sCommodityName = this.selectedWq.desc;
    }
    this.commodityIntDetails.buildCommodity.baseView="All";
    console.log(this.commodityIntDetails);
    //this.setGeneralEP();
    //this.setSummarization();

    //Qualifiers
    // this.qualifierAll = [];
    // this.qualifierAll = this.qualifierAll.concat(this.commodityIntDetails.qualifiers.qualifierA);
    // this.qualifierAll = this.qualifierAll.concat(this.commodityIntDetails.qualifiers.qualifierS);
    // this.qualifierAll = this.qualifierAll.concat(this.commodityIntDetails.qualifiers.qualifierM);
  }

  setGeneralEP() {
    //Part List is two way binded
    //Indicator
    if (this.commodityIntDetails.generalEP.geCalibration == "Y") { (<HTMLInputElement>document.getElementById("geCalibration")).checked = true; }
    else (<HTMLInputElement>document.getElementById("geCalibration")).checked = false;
    if (this.commodityIntDetails.generalEP.geKit == "Y") { (<HTMLInputElement>document.getElementById("geKit")).checked = true; }
    else (<HTMLInputElement>document.getElementById("geKit")).checked =false;
    if (this.commodityIntDetails.generalEP.geIllustrated == "Y") { (<HTMLInputElement>document.getElementById("geIllustrated")).checked = true; }
    else (<HTMLInputElement>document.getElementById("geIllustrated")).checked =false;
    if (this.commodityIntDetails.generalEP.geServiced == "Y") { (<HTMLInputElement>document.getElementById("geServiced")).checked = true; }
    else (<HTMLInputElement>document.getElementById("geServiced")).checked =false;
    if (this.commodityIntDetails.generalEP.geVisual == "Y") { (<HTMLInputElement>document.getElementById("geVisual")).checked = true; }
    else (<HTMLInputElement>document.getElementById("geVisual")).checked =false;

    //Color is two way binded
    this.setGeneralEP2();
 }

  setGeneralEP2(){
      //Special Extraction
      if (this.commodityIntDetails.generalEP.geAccessory == "Y") { (<HTMLInputElement>document.getElementById("accessory")).checked = true; }
      else (<HTMLInputElement>document.getElementById("accessory")).checked =false;
      if (this.commodityIntDetails.generalEP.geCrashRepair == "Y") { (<HTMLInputElement>document.getElementById("crashRepair")).checked = true; }
      else (<HTMLInputElement>document.getElementById("crashRepair")).checked =false;
      if (this.commodityIntDetails.generalEP.geExchange == "Y") { (<HTMLInputElement>document.getElementById("exchange")).checked = true; }
      else (<HTMLInputElement>document.getElementById("exchange")).checked =false;
      if (this.commodityIntDetails.generalEP.geFastMovingPart == "Y") { (<HTMLInputElement>document.getElementById("fastMovPart")).checked = true; }
      else (<HTMLInputElement>document.getElementById("fastMovPart")).checked =false;
      if (this.commodityIntDetails.generalEP.geInitialStock == "Y") { (<HTMLInputElement>document.getElementById("intStock")).checked = true; }
      else (<HTMLInputElement>document.getElementById("intStock")).checked =false;
      if (this.commodityIntDetails.generalEP.geMotorcraft == "Y") { (<HTMLInputElement>document.getElementById("motorCraft")).checked = true; }
      else (<HTMLInputElement>document.getElementById("motorCraft")).checked =false;
  
 }
  setSummarization() {
    //Simplification Control When
    this.commodityIntDetails.summarize.simpleWhenCodes = "6";
    if (Number(this.commodityIntDetails.summarize.simpleWhen) < 99 && Number(this.commodityIntDetails.summarize.simpleWhen) > 0) {
      (<HTMLInputElement>document.getElementById("simpleWhenCodesRadio")).checked = true;
      this.commodityIntDetails.summarize.simpleWhenCodes = this.commodityIntDetails.summarize.simpleWhen;
    }

    //Summarization Control When
    this.commodityIntDetails.summarize.sumWhenLines = "4";
    if (Number(this.commodityIntDetails.summarize.sumWhen) < 99 && Number(this.commodityIntDetails.summarize.sumWhen) > 0) {
      (<HTMLInputElement>document.getElementById("sumWhenLinesRadio")).checked = true;
      this.commodityIntDetails.summarize.sumWhenLines = this.commodityIntDetails.summarize.sumWhen;
    }

  }

  setStatus() {
    // if (this.commodityIntDetails.newCommodity) this.commodityIntDetails.status.status = "I";
    // if (this.commodityIntDetails.status.buildCommodity == "Y") (<HTMLInputElement>document.getElementById("task1")).checked = true;
    // else (<HTMLInputElement>document.getElementById("task1")).checked = false;
    // if (this.commodityIntDetails.status.general == "Y") (<HTMLInputElement>document.getElementById("task2")).checked = true;
    // else (<HTMLInputElement>document.getElementById("task2")).checked = false;
    // if (this.commodityIntDetails.status.primaryFeatures == "Y") (<HTMLInputElement>document.getElementById("task3")).checked = true;
    // else (<HTMLInputElement>document.getElementById("task3")).checked = false;
    // if (this.commodityIntDetails.status.qualifier == "Y") (<HTMLInputElement>document.getElementById("task4")).checked = true;
    // else (<HTMLInputElement>document.getElementById("task4")).checked = false;
    // if (this.commodityIntDetails.status.summary == "Y") (<HTMLInputElement>document.getElementById("task5")).checked = true;
    // else (<HTMLInputElement>document.getElementById("task5")).checked = false;
  }

  clickedRows(event:any){
    console.log(event.data);
    let count=0;
      for(this.i=0;this.i<this.baseSelectedDetails1.length;this.i++){
        if((this.baseSelectedDetails1[this.i].base==event.data.base && this.baseSelectedDetails1[this.i].origin==event.data.origin))
          count++;
      }
      for(this.i=0;this.i<this.commodityIntDetails.buildCommodity.existingBaseDetailList.length;this.i++){
        if((this.commodityIntDetails.buildCommodity.existingBaseDetailList[this.i].base==event.data.base 
          && this.commodityIntDetails.buildCommodity.existingBaseDetailList[this.i].origin==event.data.origin))
          count++;
      }
      if (count>0) {
        this.alertPopup(event.data.base + ","+event.data.origin+" is already added to the bases");
        this.baseSelectedDetails.splice(this.baseSelectedDetails.length-1,1);
      } 
      else {
        for (this.i = 0; this.i < this.baseSelectedDetails.length; this.i++) {
          this.baseSelectedDetails[this.i].vehicleType = this.commodityIntDetails.buildCommodity.sVehicleType;
        }
      }
    console.log(this.baseSelectedDetails);
  }

  
  transferSelectedBase() {
    this.saveBC();
    console.log(this.baseSelectedDetails.length);
    if (this.baseSelectedDetails.length == 0) {
      this.alertPopup("Please Select at least one Base");
      this.commodityIntDetails.enableSave=false;
    } else if (this.commodityIntDetails.buildCommodity.sCommodityCode == "" && this.commodityIntDetails.buildCommodity.sCommodityName == "") {
      if (!this.commodityIntDetails.newCommodity){
        this.alertPopup("Please Click on the New Button first");
        this.commodityIntDetails.enableSave=false;
      }
      else if (this.commodityIntDetails.buildCommodity.sVehicleType == "") {
        this.alertPopup("Please Select a Vehicle Type");
        this.commodityIntDetails.enableSave=false;
      } else {
        this.commodityExists();
      }
    }
    else {
      this.transferBase();
      this.baseSelectedDetails=[];
    }
  }

  transferBase(){
    console.log(this.baseSelectedDetails);
    this.commodity.checkBaseCommodity(this.baseSelectedDetails).subscribe((data: any) => {
      console.log(this.baseSelectedDetails);
      console.log(data);
      for (this.i = 0; this.i < data.length; this.i++) {
        let base:any=data[this.i];
        console.log(base.commodities);
        if (base.commodities!=""){
          this.confirmPopup1("Base : " + base.base + " Origin : " + base.origin + " already belongs to these commodities " + base.commodities+" Do you want to add to "
            +this.commodityIntDetails.buildCommodity.sCommodityCode.toUpperCase()+"?",base);
        }else
          this.transferConfirm(base);
      }
    });
  }

  confirmPopup1(msg:any,base:any){
    this.confirm.id=1;
    this.confirm.msg=msg;
    this.confirm.base=base;
    this.confirm.flag=true;
  }

  confirmOk(){
    this.confirm.flag=false;
    if(this.confirm.id==1)
      this.transferConfirm(this.confirm.base);
    if(this.confirm.id==2)
      this.copyCommodity(this.baseSelectedDetails[0].base,"C","T");
    if(this.confirm.id==3)
      this.copyCommodity(this.baseSelectedDetails[0].base,"T","C");
    if(this.confirm.id==4){
      this.commodity.commodityDelete(this.commodityIntDetails.buildCommodity.sCommodityCode,this.commodityIntDetails.buildCommodity.sVehicleType).subscribe((data:any)=>{
        if(data){
          this.alertPopup("Data Delete Successful");
          this.commodityIntDetails.enableSave=false;
          this.resett();
          this.updateVehicle();
        }
        else{
          this.alertPopup("Data Delete Failed");
          this.updateVehicle();
        }
      });
    }
    if(this.confirm.id==5){
      this.chgComPopup=false;
        this.save();
        // this.router.navigateByUrl('/home'); 
    }
    if(this.confirm.id==6){
      this.deleteConfirm();
    }
  }

  confirmCancel(){
    this.confirm.flag=false;
    if(this.confirm.id==1)
      this.baseSelectedDetails.splice(this.confirm.base,1);
    if(this.confirm.id==5){
        this.commodityIntDetails.enableSave = false;
        this.baseSelectedDetails=[];
        this.baseSelectedDetails1=[];
        this.basedeleteDetails=[];
        this.deleteSelected=-1;
      }
      if(this.confirm.id==8){
        this.router.navigateByUrl('/home');
      }
  }

  transferConfirm(baseDetails:any){
    this.commodityIntDetails.buildCommodity.baseChange = true;
    this.commodityIntDetails.buildCommodity.changes = true;
    this.commodityIntDetails.enableSave = true;
    this.commodityIntDetails.buildCommodity.existingBaseDetailList?.push(baseDetails);
    this.baseSelectedDetails1.push(baseDetails);
    console.log(this.commodityIntDetails.buildCommodity.existingBaseDetailList);
    console.log(this.baseSelectedDetails1);
    console.log(this.baseSelectedDetails);
    
  }

  commodityExists() {
    console.log(this.baseSelectedDetails[0].base);
    this.commodity.checkCommodityExists(this.baseSelectedDetails[0].base).subscribe((res: any) => {
      let data = res.vehicleType;
      if (data == "B"){
        this.alertPopup("A Car and Truck version of Commodity " + this.baseSelectedDetails[0].base + " already exists");
        this.baseSelectedDetails=[];
      }
      else if (data == "C") {
        console.log(this.commodityIntDetails.buildCommodity.sVehicleType == data);
        if (this.commodityIntDetails.buildCommodity.sVehicleType == "T") {
          this.confirmPopup2("A Car version of Commodity " + this.baseSelectedDetails[0].base + "  already exists. Do you want to copy it to Truck Cmdty type?",2);  
        } else if (this.commodityIntDetails.buildCommodity.sVehicleType == data){
            this.alertPopup("A Car version of Commodity " + this.baseSelectedDetails[0].base + " already exists");
            this.baseSelectedDetails=[];
          }
      }
      else if (data == "T") {
        if (this.commodityIntDetails.buildCommodity.sVehicleType == "C") {
          this.confirmPopup2("A Truck version of Commodity " + this.baseSelectedDetails[0].base + "  already exists. Do you want to copy it to Car Cmdty type?",3);
        } else if (this.commodityIntDetails.buildCommodity.sVehicleType == data){
           this.alertPopup("A Truck version of Commodity " + this.commodityIntDetails.buildCommodity.sCommodityCode + " already exists");
           this.baseSelectedDetails=[];
        }
      }else{
        this.transferBase();
      }
    });
  }

  confirmPopup2(msg:string,id:number){
    this.confirm.id=id;
    this.confirm.flag=true;
    this.confirm.msg=msg;
  }

  copyCommodity(newcommodity:string,oldvehicle:string,newvehicle:string){
    let copyCommodity:ChangeCommodity={commodity:newcommodity};
    copyCommodity.oldVehicleType=oldvehicle;
    copyCommodity.vehicleType=newvehicle;
    console.log(copyCommodity);
    this.commodity.copyCommodity(copyCommodity).subscribe((data:any)=>{
      this.commodityIntDetails=data;
      this.setCommoditydetails();
      this.commodityIntDetails.buildCommodity.sCommodityCode = data.commodity;
      this.commodityIntDetails.buildCommodity.sCommodityName = data.commodityName;
      (<HTMLInputElement>document.getElementById("commodity")).value = this.commodityIntDetails.buildCommodity.sCommodityCode;
      this.selectedCommodity.commodity=data.commodity;
      this.commodityIntDetails.commodity = this.commodityIntDetails.buildCommodity.sCommodityCode;
      this.commodityIntDetails.commodityName = data.commodityName;
    });

  }

  clickedRowPr(selectedRow: number) {
    this.priorityRow = selectedRow;
    this.prPriority.id = selectedRow;
    this.prPriority.data = this.commodityIntDetails.primaryFeatures[selectedRow];
    console.log(this.prPriority.data);
  }

  clickedQual(selectedRow: number) {
    this.clickQual = true;
    this.clickBase = false;
    this.qualDeleteSelected = selectedRow;
  }

 

  clickedBase(event:any) {
    let selectedRow: number=event.index;
    if(this.deleteSelected!=selectedRow){
      this.clickBase = true;
      this.clickQual = false;
      this.deleteSelected = selectedRow;
      this.commodityIntDetails.buildCommodity.existingBaseDetailList[selectedRow].flag=!this.commodityIntDetails.buildCommodity.existingBaseDetailList[selectedRow].flag;
    }else{
      this.clickBase = false;
      this.deleteSelected = -1;
      this.commodityIntDetails.buildCommodity.existingBaseDetailList[selectedRow].flag=!this.commodityIntDetails.buildCommodity.existingBaseDetailList[selectedRow].flag;
    }
    
  }

  changePriority() {
    this.commodityIntDetails.enableSave = true;
    this.commodityIntDetails.changesInPF = true;
    this.commodityIntDetails.primaryFeatures[this.prPriority.id].changes = true;
    this.commodityIntDetails.primaryFeatures[this.prPriority.id].recommended = !(this.commodityIntDetails.primaryFeatures[this.prPriority.id].recommended);
    this.commodityIntDetails.primaryFeatures[this.prPriority.id].discretionary = !(this.commodityIntDetails.primaryFeatures[this.prPriority.id].discretionary);
    console.log(this.commodityIntDetails.primaryFeatures[this.prPriority.id]);
    this.prPriority.data = this.commodityIntDetails.primaryFeatures[this.prPriority.id];
  }

  changeClass(event: any) {
    console.log(event.target.value);
    if (event.target.value == "BODY") {
      if (this.commodityIntDetails.buildCommodity.sCommodityCode.startsWith("<")) {
        this.commodityIntDetails.buildCommodity.classType="BODY";
        this.commodityIntDetails.buildCommodity.classChange = true;
      } else {
        this.alertPopup("Please append your Commodity with < for body class");
      }
    }
    if (event.target.value == "CHASSIS") {
      if (this.commodityIntDetails.buildCommodity.sCommodityCode.startsWith("<")) {
        this.alertPopup("You cannot append Commodity with '<' for Chassis. This applies only for Body Class");
      } else {
        this.commodityIntDetails.buildCommodity.classType="CHASSIS";
        this.commodityIntDetails.buildCommodity.classChange = true;
      }
    }
    console.log(this.commodityIntDetails.buildCommodity.classType);
  }

  baseCritClick() {
    (<HTMLInputElement>document.getElementById("newBase")).checked = false;
    (<HTMLInputElement>document.getElementById("allBase")).checked = false;
  }

  changeBaseNew() {
    this.commodityIntDetails.buildCommodity.baseCriteria = (<HTMLInputElement>document.getElementById("baseCriteria")).value;
    console.log(this.commodityIntDetails.buildCommodity.baseCriteria);
    if (this.commodityIntDetails.buildCommodity.baseCriteria == '') {
      console.log("Base criteria is not given");
      this.commodity.getNewBaseDetails().subscribe((data: any) => {
        this.newBaseDetails = data;
        console.log(data);
      })
    } else {
      console.log("Base criteria is " + this.commodityIntDetails.buildCommodity.baseCriteria);
      this.commodity.getNewBaseCritDetails(this.commodityIntDetails.buildCommodity.baseCriteria).subscribe((data: any) => {
        if (data.length ==0)
          this.alertPopup("No records found for Base Selection Criteria");
        this.newBaseDetails = data;
        console.log(data);
      })
    }
  }

  changeBaseAll() {
    this.commodityIntDetails.buildCommodity.baseCriteria = (<HTMLInputElement>document.getElementById("baseCriteria")).value;
    if (this.commodityIntDetails.buildCommodity.baseCriteria == '') {
      this.alertPopup("Please enter Base Selection Criteria");
      (<HTMLInputElement>document.getElementById("allBase")).checked=false;
    } else {
      console.log(this.commodityIntDetails.buildCommodity.baseCriteria + " " + this.commodityIntDetails.buildCommodity.baseView);
      this.commodity.getAllBaseCritDetails(this.commodityIntDetails.buildCommodity.baseCriteria).subscribe((data: any) => {
        if (data.length ==0)
          this.alertPopup("No records found for Base Selection Criteria");
        this.newBaseDetails = data;
      })
    }
  }

  changeAllBase(){
    this.commodity.getAllBaseCritDetails("00").subscribe((data1: any) => {
      console.log(data1.length);
      if (data1.length ==0)
        this.alertPopup("No records found for Base Selection Criteria");
      this.newBaseDetails = data1;
    })
  }

  getBaseDetails() {
    this.commodity.getNewBaseCritDetails(this.commodityIntDetails.buildCommodity.baseCriteria).subscribe((data: any) => {
      this.newBaseDetails = data;
      console.log(data);
    })
  }

  changeCalibration() {
    if ((<HTMLInputElement>document.getElementById("geCalibration")).checked) this.commodityIntDetails.generalEP.geCalibration = "Y";
    else this.commodityIntDetails.generalEP.geCalibration = "N";
  }

  changeKit() {
    if ((<HTMLInputElement>document.getElementById("geKit")).checked) this.commodityIntDetails.generalEP.geKit = "Y";
    else this.commodityIntDetails.generalEP.geKit = "N";
  }

  changeIllustrated() {
    if ((<HTMLInputElement>document.getElementById("geIllustrated")).checked) this.commodityIntDetails.generalEP.geIllustrated = "Y";
    else this.commodityIntDetails.generalEP.geIllustrated = "N";
  }

  changeServiced() {
    if ((<HTMLInputElement>document.getElementById("geServiced")).checked) this.commodityIntDetails.generalEP.geServiced = "Y";
    else this.commodityIntDetails.generalEP.geServiced = "N";
  }

  changeVisual() {
    if ((<HTMLInputElement>document.getElementById("geVisual")).checked) this.commodityIntDetails.generalEP.geVisual = "Y";
    else this.commodityIntDetails.generalEP.geVisual = "N";
  }

  changeAccessory() {
    if ((<HTMLInputElement>document.getElementById("accessory")).checked) this.commodityIntDetails.generalEP.geAccessory = "Y";
    else this.commodityIntDetails.generalEP.geAccessory = "N";
  }

  changeCrashRepair() {
    if ((<HTMLInputElement>document.getElementById("crashRepair")).checked) this.commodityIntDetails.generalEP.geCrashRepair = "Y";
    else this.commodityIntDetails.generalEP.geCrashRepair = "N";
  }

  changeExchange() {
    if ((<HTMLInputElement>document.getElementById("exchange")).checked) this.commodityIntDetails.generalEP.geExchange = "Y";
    else this.commodityIntDetails.generalEP.geExchange = "N";
  }

  changeFastMovingPart() {
    if ((<HTMLInputElement>document.getElementById("fastMovPart")).checked) this.commodityIntDetails.generalEP.geFastMovingPart = "Y";
    else this.commodityIntDetails.generalEP.geFastMovingPart = "N";
  }

  changeInitialStock() {
    if ((<HTMLInputElement>document.getElementById("intStock")).checked) this.commodityIntDetails.generalEP.geInitialStock = "Y";
    else this.commodityIntDetails.generalEP.geInitialStock = "N";
  }

  changeMotorcraft() {
    if ((<HTMLInputElement>document.getElementById("motorCraft")).checked) this.commodityIntDetails.generalEP.geMotorcraft = "Y";
    else this.commodityIntDetails.generalEP.geMotorcraft = "N";
  }

  changeQualifier(event: any) {
    console.log(event.target.value);
    if (event.target.value == "All") {
      this.qualifierAll = [];
      this.qualifierAll = this.qualifierAll.concat(this.commodityIntDetails.qualifiers.qualifierA);
      this.qualifierAll = this.qualifierAll.concat(this.commodityIntDetails.qualifiers.qualifierS);
      this.qualifierAll = this.qualifierAll.concat(this.commodityIntDetails.qualifiers.qualifierM);
    } else if (event.target.value == "A") {
      this.qualifierAll = this.commodityIntDetails.qualifiers.qualifierA;
    } else if (event.target.value == "S") {
      this.qualifierAll = this.commodityIntDetails.qualifiers.qualifierS;
    } else if (event.target.value == "M") {
      this.qualifierAll = this.commodityIntDetails.qualifiers.qualifierM;
    }
  }

  searchQualifier() {
    this.commodityIntDetails.enableSave = true;
    this.commodityIntDetails.qualifiers.changes = true;
    this.commodityIntDetails.qualifiers.qualifierAdded = [
      { type: "MFC", propCode: "AU", propDesc: "Audio Systems", recommended: true },
      { type: "APPL", propCode: "INFAB", propDesc: "Interior Fabric", recommended: true },
      { type: "SPEC", propCode: "BL", propDesc: "Plant Build", recommended: true }
    ];
    this.qualifierAll = this.qualifierAll.concat(this.commodityIntDetails.qualifiers.qualifierAdded);
  }

  saveBC() {
    this.commodityIntDetails.buildCommodity.changes = true;
    this.commodityIntDetails.enableSave = true;
  }

  getLexDetails(data:any){
    this.lexiPopup=0;
    console.log(data);
    this.lexcDetails.lexcCode=data.lexiCode;
    this.lexcDetails.lexcDesc=data.lexiDescription;
    this.lexcDetails.lexcType=data.type;
    console.log(this.lexcDetails);
    if (this.lexcDetails.lexcType == "PCOT" || this.lexcDetails.lexcType == "PCOM") {
      if (this.lexcDetails.lexcDesc == "") {
        this.alertPopup("Please choose Lexicon Description from Lexicon Search screen as there is no description available for this Lexicon Code");
      } else if (this.lexcDetails.lexcDesc == this.commodityIntDetails.buildCommodity.sCommodityName &&
        this.lexcDetails.lexcCode == this.commodityIntDetails.buildCommodity.lexc) {
        this.alertPopup("Selected Lexicon is already on Commodity Setup screen.");
      } else {
        this.commodityIntDetails.buildCommodity.sCommodityName = this.lexcDetails.lexcDesc;
        this.commodityIntDetails.buildCommodity.lexc = this.lexcDetails.lexcCode;
        this.commodityIntDetails.buildCommodity.changes=true;
        this.commodityIntDetails.buildCommodity.nameChange=true;
      }
    } else {
      this.alertPopup("Invalid Lexicon Type : "+this.lexcDetails.lexcType +", please select a Commodity Name using the Lexicon Search screen.");
    }
  }

  getLexcClose(){
    this.lexiPopup=0;
  }

  getLexDesc() {
    this.lexiPopup++;
    console.log(this.lexiPopup); 
    localStorage.setItem('Screen',"Commodity");
  }

  commodityNamechange() {
    this.alertPopup("Please select a Commodity Name using the Lexicon Search screen");
  }

  saveGE() {
    this.commodityIntDetails.enableSave = true;
    this.commodityIntDetails.generalEP.geChanges = true;
  }

  getsimpleWhen() {
    this.commodityIntDetails.summarize.simpleWhen = this.commodityIntDetails.summarize.simpleWhenCodes;
  }

  getsumWhen() {
    this.commodityIntDetails.summarize.sumWhen = this.commodityIntDetails.summarize.sumWhenLines;
  }
  saveSummarize() {
    this.commodityIntDetails.enableSave = true;
    this.commodityIntDetails.summarize.change = true;
  }

  changeTask() {
    this.commodityIntDetails.status.changes = true;
    if ((<HTMLInputElement>document.getElementById("task1")).checked)
      // && (<HTMLInputElement>document.getElementById("task2")).checked
      // && (<HTMLInputElement>document.getElementById("task3")).checked
      // && (<HTMLInputElement>document.getElementById("task4")).checked
      // && (<HTMLInputElement>document.getElementById("task5")).checked)
      this.commodityIntDetails.status.status = "C";
    else
      this.commodityIntDetails.status.status = "I";
  }

  changeTask1() {
    if ((<HTMLInputElement>document.getElementById("task1")).checked) this.commodityIntDetails.status.buildCommodity = "Y";
    else this.commodityIntDetails.status.buildCommodity = "N";
  }
  changeTask2() {
    if ((<HTMLInputElement>document.getElementById("task2")).checked) this.commodityIntDetails.status.general = "Y";
    else this.commodityIntDetails.status.general = "N";
  }
  changeTask3() {
    if ((<HTMLInputElement>document.getElementById("task3")).checked) this.commodityIntDetails.status.primaryFeatures = "Y";
    else this.commodityIntDetails.status.primaryFeatures = "N";
  }
  changeTask4() {
    if ((<HTMLInputElement>document.getElementById("task4")).checked) this.commodityIntDetails.status.qualifier = "Y";
    else this.commodityIntDetails.status.qualifier = "N";
  }
  changeTask5() {
    if ((<HTMLInputElement>document.getElementById("task5")).checked) this.commodityIntDetails.status.summary = "Y";
    else this.commodityIntDetails.status.summary = "N";
  }

  changeStatus(event: any) {
    console.log(event.target.value);
    this.commodityIntDetails.status.changes = true;
    if (event.target.value == "C") {
      (<HTMLInputElement>document.getElementById("task1")).checked = true;
      // (<HTMLInputElement>document.getElementById("task2")).checked = true;
      // (<HTMLInputElement>document.getElementById("task3")).checked = true;
      // (<HTMLInputElement>document.getElementById("task4")).checked = true;
      // (<HTMLInputElement>document.getElementById("task5")).checked = true;

      this.commodityIntDetails.status.status = "C";
      this.commodityIntDetails.status.buildCommodity = "Y";
      this.commodityIntDetails.status.general = "Y";
      this.commodityIntDetails.status.primaryFeatures = "Y";
      this.commodityIntDetails.status.qualifier = "Y";
      this.commodityIntDetails.status.summary = "Y";
    }
    if (event.target.value == "I")
      this.commodityIntDetails.status.status = "I";
  }

  save() {
    if (this.commodityIntDetails.newCommodity) {
      console.log(this.commodityIntDetails.buildCommodity);
      if (this.commodityIntDetails.buildCommodity.sCommodityCode == "")
        this.alertPopup("Please Select an Existing Commodity or Create a New Commodity.");
      else if(this.commodityIntDetails.buildCommodity.sCommodityCode.length>8)
        this.alertPopup("Please make your Commodity 8 Char long and append it with < for body class");
      else if (this.commodityIntDetails.buildCommodity.sCommodityName == "")
        this.alertPopup("Must select a Commodity Name using the Lexicon Search screen before saving.");
      else if (this.commodityIntDetails.buildCommodity.classType == undefined)
        this.alertPopup("Please select a Class in the Build Commodity tab before saving.");
      else if (this.commodityIntDetails.buildCommodity.sVehicleType == "")
        this.alertPopup("Please select a Vehicle Type");
      else if(this.commodityIntDetails.buildCommodity.classType=="BODY" && !this.commodityIntDetails.buildCommodity.sCommodityCode.startsWith("<"))
        this.alertPopup("Please append your Commodity with < for body class");
      else if (this.commodityIntDetails.buildCommodity.sCommodityCode.startsWith("<")) 
        this.alertPopup("You cannot append Commodity with '<' for Chassis. This applies only for Body Class");
      else {
        this.commodity.checkCommodityExists(this.commodityIntDetails.buildCommodity.sCommodityCode).subscribe((res: any) => {
          let data = res.vehicleType;
          if (data == "B" || data== this.commodityIntDetails.buildCommodity.sVehicleType){
            this.alertPopup(this.commodityIntDetails.buildCommodity.sCommodityCode.toUpperCase()+" already exists. Please enter a different Commodity Name");
          }else{
            this.chgComPopup=false;
            this.savePopup = true;
            this.disableTask1();
          }
          });
      }
    } else {
      if(this.commodityIntDetails.buildCommodity.sCommodityCode=="")
        this.alertPopup("Please Select an Existing Commodity or create a New Commodity");
      else if (this.commodityIntDetails.enableSave) {
        this.savePopup = true;
        this.disableTask1();
      } else
        this.alertPopup("No changes has been done to commodity " + this.commodityIntDetails.buildCommodity.sCommodityCode + " to save");
    }

  }

  disableTask1() {
    console.log(this.commodityIntDetails.buildCommodity.existingBaseDetailList?.length);
    if (this.commodityIntDetails.buildCommodity.existingBaseDetailList?.length == 0) {
      this.isDisabledTask1 = true;
      this.isDisableComplete = true;
      this.commodityIntDetails.status.status = "I";
      this.assignBase=false;
      (<HTMLInputElement>document.getElementById("task1")).checked = false;
      this.commodityIntDetails.status.buildCommodity = "";
    }
    else {
      this.isDisabledTask1 = false;
      this.isDisableComplete = true;
      this.commodityIntDetails.status.status = "C";
      this.assignBase=true;
      this.commodityIntDetails.status.buildCommodity = "Y";
    }
  }

  cancelSave() {
    this.savePopup = false;
  }

  saveCommodity() {
    if (this.commodityIntDetails.newCommodity) {
      this.commodityIntDetails.buildCommodity.sCommodityCode=this.commodityIntDetails.buildCommodity.sCommodityCode.toUpperCase();
      this.commodityIntDetails.commodity = this.commodityIntDetails.buildCommodity.sCommodityCode;
      (<HTMLInputElement>document.getElementById("commodity")).value = this.commodityIntDetails.buildCommodity.sCommodityCode;
      this.commodityIntDetails.commodityName = this.commodityIntDetails.buildCommodity.sCommodityName;
      this.commodityIntDetails.vehicleType = this.commodityIntDetails.buildCommodity.sVehicleType;
      this.commodityIntDetails.buildCommodity.addedBaseDetailList = this.baseSelectedDetails1;
      this.commodityIntDetails.buildCommodity.deleteBaseDetailList = this.basedeleteDetails;
      this.commodityIntDetails.qualifiers.qualifierDeleted = this.qualdeleteDetails;
      console.log(this.commodityIntDetails);
      this.commodity.saveCommodityDetails(this.commodityIntDetails).subscribe();
      this.savePopup = false;
      this.commodityIntDetails.enableSave = false;
      this.alertPopup("Data Saved Successfully");
      this.updateVehicle();
      this.commodityIntDetails.newCommodity=false;
    } else {
      if (this.selectedCommodity == '') this.commodityIntDetails.commodity = this.selectedWq.commodity;
      this.commodityIntDetails.commodity = this.commodityIntDetails.buildCommodity.sCommodityCode;
      console.log(this.commodityIntDetails.commodity +" "+this.commodityIntDetails.buildCommodity.sCommodityCode);
      this.commodityIntDetails.generalEP.commodity = this.commodityIntDetails.buildCommodity.sCommodityCode;
      this.commodityIntDetails.generalEP.vehicleType = this.commodityIntDetails.vehicleType;
      this.commodityIntDetails.summarize.commodity = this.commodityIntDetails.buildCommodity.sCommodityCode;
      this.commodityIntDetails.summarize.vehicleType = this.commodityIntDetails.vehicleType;
      this.commodityIntDetails.buildCommodity.addedBaseDetailList = this.baseSelectedDetails1;
      this.commodityIntDetails.buildCommodity.deleteBaseDetailList = this.basedeleteDetails;
      this.commodityIntDetails.qualifiers.qualifierDeleted = this.qualdeleteDetails;
      console.log(this.commodityIntDetails);
      this.commodity.saveCommodityDetails(this.commodityIntDetails).subscribe();
      this.savePopup = false;
      this.commodityIntDetails.enableSave = false;
      this.alertPopup("Data Saved Successfully");
    }
  }

  resett(){
    this.commodityIntDetails = {
        commodity: "", commodityS:"",commodityWq: "", vehicleType: "C", commodityName: "", newCommodity: false,
        primaryFeatures: [],
        generalEP: { geChanges: true, geRemarks: "", geStatus: "I", geCalibration: "N", geKit: "N", geIllustrated: "N", geServiced: "N", geVisual: "N", geColor: "N/A", gePartList: "N/A", geAccessory: "N", geCrashRepair: "N", geExchange: "N", geFastMovingPart: "N", geInitialStock: "N", geMotorcraft: "N", },
        buildCommodity: { sCommodityCode: "", sCommodityName: "", sVehicleType: "", lexc: "", existingBaseDetailList: [], addedBaseDetailList: [], deleteBaseDetailList: [] },
        qualifiers: {},
        summarize: { change: true, simpleWhen: "6", simpleHow: "BOTH", sumWhen: "4", sumHow: "BOTH" },
        status: { changes: true, status: "I", buildCommodity: "N", general: "Y", primaryFeatures: "Y", qualifier: "Y", summary: "Y", }
      };
      this.commodityIntDetails.enableSave = false;
        this.baseSelectedDetails=[];
        this.baseSelectedDetails1=[];
        this.basedeleteDetails=[];
        this.deleteSelected=-1;
        this.newBaseDetails=[];

    this.commodityIntDetails.newCommodity = false;
    this.commodityIntDetails.commodity = "";
    this.commoditychangewq="";
    this.commoditychange="";
    (<HTMLInputElement>document.getElementById("sCommodity")).readOnly = true;
  }

  newComm() {
    if(this.commodityIntDetails.enableSave)
      this.changesFound();
    else{
    this.commodityIntDetails = {
      commodity: "", commodityS:"",commodityWq: "", vehicleType: "C", commodityName: "", newCommodity: false,
      primaryFeatures: [],
      generalEP: { geChanges: true, geRemarks: "", geStatus: "I", geCalibration: "N", geKit: "N", geIllustrated: "N", geServiced: "N", geVisual: "N", geColor: "N/A", gePartList: "N/A", geAccessory: "N", geCrashRepair: "N", geExchange: "N", geFastMovingPart: "N", geInitialStock: "N", geMotorcraft: "N", },
      buildCommodity: { sCommodityCode: "", sCommodityName: "", sVehicleType: "", lexc: "", existingBaseDetailList: [], addedBaseDetailList: [], deleteBaseDetailList: [] },
      qualifiers: {},
      summarize: { change: true, simpleWhen: "6", simpleHow: "BOTH", sumWhen: "4", sumHow: "BOTH" },
      status: { changes: true, status: "I", buildCommodity: "N", general: "Y", primaryFeatures: "Y", qualifier: "Y", summary: "Y", }
    };
    this.qualifierAll = [];
    this.commodityIntDetails.enableSave = false;
        this.baseSelectedDetails=[];
        this.baseSelectedDetails1=[];
        this.basedeleteDetails=[];
        this.deleteSelected=-1;
        this.newBaseDetails=[];

    this.commodityIntDetails.newCommodity = true;
    (<HTMLInputElement>document.getElementById("sCommodity")).readOnly = false;
    //this.getNewCommodityValues();
  }
  }

  getNewCommodityValues(){
    this.commodityIntDetails.generalEP.geStatus = "Incomplete";

    (<HTMLInputElement>document.getElementById("geCalibration")).checked = false;
    (<HTMLInputElement>document.getElementById("geKit")).checked = false;
    (<HTMLInputElement>document.getElementById("geIllustrated")).checked = false;
    (<HTMLInputElement>document.getElementById("geServiced")).checked = false;
    (<HTMLInputElement>document.getElementById("geVisual")).checked = false;

    (<HTMLInputElement>document.getElementById("accessory")).checked = false;
    (<HTMLInputElement>document.getElementById("crashRepair")).checked = false;
    (<HTMLInputElement>document.getElementById("exchange")).checked = false;
    (<HTMLInputElement>document.getElementById("fastMovPart")).checked = false;
    (<HTMLInputElement>document.getElementById("intStock")).checked = false;
    (<HTMLInputElement>document.getElementById("motorCraft")).checked = false;

    (<HTMLInputElement>document.getElementById("simpleWhenCodesRadio")).checked = true;
    (<HTMLInputElement>document.getElementById("sumWhenLinesRadio")).checked = true;

    this.commodityIntDetails.summarize.simpleWhenCodes = "6";
    this.commodityIntDetails.summarize.sumWhenLines = "4";

    (<HTMLInputElement>document.getElementById("qualAll")).checked = true;
  
    this.commodityIntDetails.summarize.sumWhenLines = "4";
    this.commodityIntDetails.summarize.simpleWhenCodes = "6";
  }


  deleteRow() {
    if (this.clickBase) {
        this.commodity.getBaseDetails(this.commodityIntDetails.buildCommodity.sCommodityCode,this.commodityIntDetails.buildCommodity.sVehicleType,this.commodityIntDetails.buildCommodity.existingBaseDetailList[this.deleteSelected].base).subscribe((data:any)=>{
          if(data.length>0){
            this.deleteBaseSection.base=data;
            this.deleteBaseSection.message1="You can't delete a Base until all corresponding GCAT Usages are De-Summarized.";
            this.deleteBaseSection.message2="Here are the affected Engineering Parts and GCAT Usages";
            this.deleteBaseSection.message3="Please De-Summarize the GCAT Usages. Access Usage Info via PIC";
            this.deleteBaseSection.flag=true;
            this.clickBase=false;
          }else{
            this.confirmPopup6("Are you sure to delete the selected Base : "+
            this.commodityIntDetails.buildCommodity.existingBaseDetailList[this.deleteSelected].base+
            ", Origin : "+this.commodityIntDetails.buildCommodity.existingBaseDetailList[this.deleteSelected].origin+" ?");
          }
        });
    }
    else if (this.clickQual) {
      this.deleteQualRow();
    }else if (this.commodityIntDetails.buildCommodity.sCommodityCode==""){
      this.alertPopup("Please Select a Commodity or a Base to Delete");
    }else if(this.commodityIntDetails.buildCommodity.sVehicleType==""){
      this.alertPopup("Please Select a Product Type before clicking Delete");
    }else{
      this.deleteCheck();
    }
  }

  deleteCheck(){
    this.commodity.commodityBaseCount(this.commodityIntDetails.buildCommodity.sCommodityCode,this.commodityIntDetails.buildCommodity.sVehicleType).subscribe((data:any)=>{
      if(this.commodityIntDetails.buildCommodity.existingBaseDetailList.length>0)
       this.alertPopup("Please delete all the Bases before deleting this Commodity");
      else if(data.sectionFlag){
        this.deleteSection.sections=data.sections;
        this.deleteSection.message1="The Commodity " +this.commodityIntDetails.buildCommodity.sCommodityCode+ " belongs to following Sections.";
        this.deleteSection.message2="Please delete the Commodity " +this.commodityIntDetails.buildCommodity.sCommodityCode+ " from above Sections";
        this.deleteSection.flag=true;
      }else if(data.templateFlag){
        this.alertPopup("The Commodity " +this.commodityIntDetails.buildCommodity.sCommodityCode+ " belongs to following Templates : "+data.templates +
        " Please delete the Commodity " +this.commodityIntDetails.buildCommodity.sCommodityCode+ " from above Templates.");
      }else{
        this.confirmPopup4("Are you sure you want to delete the Commodity and all of its relationships?");
      }
    });
  
  }

  deleteConfirm(){
    this.commodityIntDetails.enableSave = true;
          this.commodityIntDetails.buildCommodity.changes = true;
          this.basedeleteDetails.push(this.commodityIntDetails.buildCommodity.existingBaseDetailList[this.deleteSelected]);
          console.log(this.basedeleteDetails);
          this.commodityIntDetails.buildCommodity.existingBaseDetailList.splice(this.deleteSelected, 1);
          this.baseSelectedDetails1.pop(this.deleteSelected);
          console.log(this.basedeleteDetails);
          this.deleteSelected=-1;
          this.clickBase=false;
  }
  confirmPopup4(msg:string){
    this.confirm.id=4;
    this.confirm.flag=true;
    this.confirm.msg=msg;
  }
  
  confirmPopup6(msg:string){
    this.confirm.id=6;
    this.confirm.flag=true;
    this.confirm.msg=msg;
  }

  alertOk(){
    this.alert.flag=false;
  }

  deleteOk(){
    this.deleteSection.flag=false;
    this.deleteBaseSection.flag=false;
  }

  deleteQualRow() {
    this.commodityIntDetails.enableSave = true;
    this.commodityIntDetails.qualifiers.changes = true;
    this.qualdeleteDetails.push(this.qualifierAll[this.qualDeleteSelected]);
    this.qualDeleteList = this.qualifierAll[this.qualDeleteSelected];
    if ((<HTMLInputElement>document.getElementById("qualAll")).checked) {
      this.qualifierAll.splice(this.qualDeleteSelected, 1);
      if (this.qualDeleteList.type == "APPL")
        this.commodityIntDetails.qualifiers.qualifierA?.pop(this.qualDeleteList);
      if (this.qualDeleteList.type == "SPEC")
        this.commodityIntDetails.qualifiers.qualifierS?.pop(this.qualDeleteList);
      if (this.qualDeleteList.type == "MFC")
        this.commodityIntDetails.qualifiers.qualifierM?.pop(this.qualDeleteList);
      this.clickQual=false;
    }

    if ((<HTMLInputElement>document.getElementById("qualA")).checked)
      this.commodityIntDetails.qualifiers.qualifierA?.splice(this.qualifierAll[this.qualDeleteSelected], 1);
    if ((<HTMLInputElement>document.getElementById("qualS")).checked)
      this.commodityIntDetails.qualifiers.qualifierS?.splice(this.qualifierAll[this.qualDeleteSelected], 1);
    if ((<HTMLInputElement>document.getElementById("qualM")).checked)
      this.commodityIntDetails.qualifiers.qualifierM?.splice(this.qualifierAll[this.qualDeleteSelected], 1);

  }

  confirmPopup(data:string,id:number){
    this.confirm.id=id;
    this.confirm.flag=true;
    this.confirm.data=data;
  }

  confirmPopup5(msg:string){
    this.confirm.id=5;
    this.confirm.msg=msg;
    this.confirm.flag=true;
  }

  changesFound() {
    if (this.commodityIntDetails.enableSave) {
      this.confirmPopup5("Would you like to save the changes before closing the screen?");
    } 
  }

  confirmPopup8(msg:string){
    this.confirm.id=8;
    this.confirm.msg=msg;
    this.confirm.flag=true;
  }

  changesClose(){
      this.router.navigateByUrl('/');
  }

  isChangesAvailable(event: any) {
    let num = event.target.value;
    if (num == 4) {
      this.checkCommChg();
    }
    else if (num == 8)
      this.changesClose();
  }

  cancelchgComm() {
    this.chgComPopup = false;
  }

  checkCommChg() {
      if (this.commodityIntDetails.buildCommodity.sCommodityName != ""
        &&  this.commodityIntDetails.buildCommodity.sVehicleType !="") {
          this.changeCommodity.vehicleType = this.commodityIntDetails.vehicleType;
          this.chgComPopup = true;
      } else {
        this.chgComPopup = false;
        this.alertPopup("Please Reselect the Commodity from the Selection Criteria");
      }
  }

  alertPopup(data:string){
    this.alert.flag=true;
    this.alert.msg=data;
  }

  saveChgComm() {
    console.log(this.changeCommodity.commodity);
    if (this.changeCommodity.commodity == undefined || this.changeCommodity.commodity == null || this.changeCommodity.commodity == ""){
      this.alertPopup("Please enter a commodity to change")
    }else if(this.changeCommodity.commodity.length>8){
      this.alertPopup("Please make your Commodity 8 Char long and append it with < for body class");
    }
    else {
      this.changeCommodity.oldCommodity = this.commodityIntDetails.buildCommodity.sCommodityCode;
      this.changeCommodity.commodity=this.changeCommodity.commodity.toUpperCase();
      console.log(this.changeCommodity);
      this.commodity.changeCommodity(this.changeCommodity).subscribe((data: any) => {
        if (data.flag) {
          this.alertPopup(data.message);
        } else {
          this.commodityIntDetails.buildCommodity.sCommodityCode = this.changeCommodity.commodity;
          (<HTMLInputElement>document.getElementById("commodity")).value = this.commodityIntDetails.buildCommodity.sCommodityCode;
        // this.selectedCommodity.commodity=data.commodity;
        this.commodityIntDetails.commodity = this.commodityIntDetails.buildCommodity.sCommodityCode;
          this.chgComPopup = false;
          this.changeCommodity.commodity = "";
          this.alertPopup("Data Saved Successfully");
          this.updateVehicle();
        }
      });
    }
  }

  EnggBase() {
    this.enggBase = true;
  }

  reset() {
    this.model.engpBaseR = '';
    this.model.engBaseEioOrigC = 'WERS';
    this.model.engBaseNewF = 'N';
    this.model.engBaseDescX = '';
  }

  saveEngbase() {

    if (this.model.engpBaseR == "") {
      this.alertPopup("Please Insert Base No");
    }
    else if (this.model.engBaseDescX == "") {
      this.alertPopup("Please Insert Description");
    }
    else {
      this.model.engpBaseR=this.model.engpBaseR.toUpperCase();
      this.commodity.addEngineeringBaseMaster(this.model).subscribe(

        (data: any) => {
          this.alertPopup(data.msg);
        }
      );
    }
  }
  engBaseinit(){
    this.model.engBaseEioOrigC = "WERS"
    this.model.engBaseNewF = "N"
  }

  wbs(){
    this.router.navigate(['/wbs']);
  } 

  clickWq(){
   this.router.navigate(['/part-work']);
  }

  baseDoubleClick(selectedRow:number){
    this.updateRow=selectedRow;
    this.baseUpdate.commodity=this.commodityIntDetails.buildCommodity.sCommodityCode;
    this.baseUpdate.vehicleType=this.commodityIntDetails.buildCommodity.sVehicleType;
    console.log(this.commodityIntDetails.buildCommodity.existingBaseDetailList[selectedRow].desc);
    this.updateDesignation=this.commodityIntDetails.buildCommodity.existingBaseDetailList[selectedRow].desc;
    this.baseUpdate.base=this.commodityIntDetails.buildCommodity.existingBaseDetailList[selectedRow].base;
    this.baseUpdate.origin=this.commodityIntDetails.buildCommodity.existingBaseDetailList[selectedRow].origin;
    console.log(this.baseUpdate);
    this.baseUpdate.flag=true;
  }

  baseDoubleClicks(event:any){
    console.log(event);
  }
  changeDesignation(){
    this.updateDesignation=this.baseUpdate1.designation;
    this.baseUpdate.designation=this.updateDesignation.value;
    console.log(this.baseUpdate);
  }

  saveDesignation(){
    if(this.baseUpdate.designation==undefined){
      this.alertPopup("Please Select a Designation for the Base : "+this.baseUpdate.base);
    }else{
    this.commodity.saveDesignation(this.baseUpdate).subscribe((data:any)=>{
      console.log(data);
      this.commodityIntDetails.buildCommodity.existingBaseDetailList[this.updateRow].desc=data.designation;
      this.baseUpdate.flag=data.flag;
      this.deleteSelected =-1;
      this.alertPopup("Data Saved Successfully");
    });
  }
  }

  cancelUpdate(){
    this.baseUpdate.flag=false;
  }
  popupOk(){
    this.alert.flag=false;
  }

  showCenterPart(){
    
    if(this.count==0){
      this.display="block"
      this.count=1;
      this.br1="5px 5px 0px 0px"
      this.rotate="rotate(45deg)"
    }else{
      this.display="none"
      this.count=0;
      this.rotate="rotate(0deg)"
      this.br1="5px 5px 5px 5px"
    }
  }

  showCenterParts(){
    console.log("Lock"+this.counts1);
    if(this.counts1==0){
      this.display1="block"
      this.counts1=1;
      this.rotate1="rotate(45deg)"
      this.br2="5px 5px 0px 0px"
    }else{
      this.display1="none"
      this.counts1=0;
      this.rotate1="rotate(0deg)"
      this.br2="5px 5px 5px 5px"
    }
}
}