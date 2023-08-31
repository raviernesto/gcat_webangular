import { isNgContainer } from '@angular/compiler';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkQueue } from '../interfaces/part-workqueue';
import { ContextService } from '../services/context.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import { CommodityCodeList, EngPart } from './context.class';
import { DatePipe } from '@angular/common';
import { PartWorkqueueComponent } from '../part-workqueue/part-workqueue.component';
import { PartWorkqueueService } from '../services/part-workqueue.service';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ContextComponent implements OnInit {
  // user:string="";
  vehicleName: any[] = [];
  showTable: boolean = false;
  vehicleDrop: any;
  s4p: any;
  vehicleLine: any[] = [];
  commodityCodeList: CommodityCodeList[] = [];
  selectedCommodity: any;
  vehicleType1: any;
  commodity: string = "";
  engPart: EngPart = { catalog: [], engPartCheck: "", effDate: "" };
  commodityType: string = "";
  part: any = [];
  vehicleType: any = [{ name: "C" }, { name: "T" }];
  spList: any;
  alert: any = { flag: false, msg: "" };
  spinner: boolean = false;
  selectedBase: any = [];
  rowSelected: number = -1;
  wq: WorkQueue = {};
  selected: any = {};
  buttonEnable: boolean = true;
  flag = false;
  date: Date | undefined;
  flag1 = false;
  inactivePartVis = false;
  inactivePart: string = "";
  totalCount: any;


  constructor(private context: ContextService, private utilitiesService: UtilitiesService, private router: Router, private datepipe: DatePipe, private wqservice: PartWorkqueueService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.context.fetchWorkqueueAssignmentReportVehicleLine().subscribe((res: any) => {
      this.vehicleLine = res;
      console.log(res);
    })
    this.context.sp().subscribe((res: any) => {
      this.spList = res;
      console.log(res);
    })
    this.showCenterPart();
    // this.route.queryParams.subscribe((params: any) => {
    //   console.log(params)
    //   this.user=params.engpart;
     
    // });
      // let Input1 = {
      //   "engpart":this.user
      // }
  }

  changeCommodityType() {
    this.flag1 = true;
    this.vehicleType1 = this.commodityType;
    console.log(this.vehicleType1.name);
    this.engPart.commType = this.vehicleType1.name
    this.context.getCommodityList(this.vehicleType1.name).subscribe((data: any) => {
      this.commodityCodeList = data;
      console.log(data);
    })
  }

  commodityChange() {
    this.selectedCommodity = this.commodity;
    this.engPart.commodity = this.selectedCommodity.commodityCode;
    console.log(this.engPart.commodity);
  }

  clickComm() {
    if (this.engPart.commType == null || this.engPart.commType == "" || this.engPart.commType == undefined) {
      this.alertPopup("Please select a Commodity Type");
      this.flag1 = true;
    }
  }

  changeVehicleLine() {
    this.engPart.vehLine = this.vehicleDrop.evlVehicleLineC;
    (<HTMLInputElement>document.getElementById("vehCheck")).checked = true;
    console.log(this.engPart.vehLine);
  }

  changeSp() {
    this.engPart.effCode = this.s4p.spCode;
    (<HTMLInputElement>document.getElementById("effCodeCheck")).checked = true;
    console.log(this.engPart.effCode);
  }

  changeDate() {
    (<HTMLInputElement>document.getElementById("effDateCheck")).checked = true;
    let date = this.datepipe.transform(this.date, "yyyy-MM-dd") || new Date(0);
    this.engPart.effDate = date.toString();
    console.log(this.engPart.effDate);
  }

  submit() {
    this.engPart.catalog = [];
    if ((<HTMLInputElement>document.getElementById("P")).checked) this.engPart.catalog.push("P");
    if ((<HTMLInputElement>document.getElementById("H")).checked) this.engPart.catalog.push("H");
    if ((<HTMLInputElement>document.getElementById("X")).checked) this.engPart.catalog.push("X");
    if ((<HTMLInputElement>document.getElementById("vehCheck")).checked) this.engPart.vehflag = true;
    else this.engPart.vehflag = false;
    if ((<HTMLInputElement>document.getElementById("effCodeCheck")).checked) this.engPart.effCodeCheck = true;
    else this.engPart.effCodeCheck = false;
    if ((<HTMLInputElement>document.getElementById("effDateCheck")).checked) this.engPart.effDateCheck = true;
    else this.engPart.effDateCheck = false;
    this.submit1();
  }

  setNull() {
    this.engPart.engPartCheck = "";
  }
  submit1() {
    if (this.engPart.engPartCheck == "engpart") {
      console.log(this.engPart.engPartNo);
      if (this.engPart.engPartNo == undefined)
        this.setNull();
      else if (this.engPart.engPartNo.trim().length == 0)
        this.engPart.engPartCheck = "";
      console.log(this.engPart.engPartCheck);
    } else if (this.engPart.engPartCheck == "finis") {
      if (this.engPart.finis == undefined)
        this.setNull();
      else if (this.engPart.finis.trim().length == 0) {
        this.engPart.engPartCheck = "";
      }
    } else if (this.engPart.engPartCheck == "serv") {
      if (this.engPart.service == undefined)
        this.engPart.engPartCheck = "";
      else if (this.engPart.service.trim().length == 0)
        this.setNull();
    }
    this.submit2();
  }

  submit2() {
    if (this.engPart.engPartCheck == "partner") {
      if (this.engPart.partner == undefined)
        this.engPart.engPartCheck = "";
      else if (this.engPart.partner.trim().length == 0)
        this.setNull();
    }
    if (this.engPart.engPartCheck == "enbase") {
      if (this.engPart.engBase == undefined)
        this.setNull();
      else if (this.engPart.engBase.trim().length == 0)
        this.engPart.engPartCheck = "";
    }
    this.submit3();
  }

  submit3() {
    console.log(this.engPart.engPartCheck + " " + !this.engPart.vehflag);
    if ((this.engPart.engPartCheck == "" || this.engPart.engPartCheck == undefined || this.engPart.engPartCheck == "") &&
      (this.engPart.commodity == null || this.engPart.commodity == undefined || this.engPart.commodity == "")) {
      this.flag1 = true;
      this.alertPopup("Please enter a selection criteria");
    }
    else if (this.engPart.engPartCheck == "enbase" && !this.engPart.vehflag) {
      this.alertPopup("Please select a Vehicle Line");
    }
    else {
      this.submitConfirm();
    }
  }

  submitConfirm() {
    console.log(this.engPart);
    this.spinner = true;
    this.utilitiesService.setLoading(true);
    this.showTable = false;
    this.selectedBase = {};
    this.context.showReport(this.engPart).subscribe((data: any) => {
      console.log(data);
      if (data.errMsg != null) {
        this.spinner = false;
        this.utilitiesService.setLoading(false);
        this.alertPopup(data.errMsg);
      }
      else if (data.reportList.length == 0) {
        this.alertPopup("No records Found");
        this.part = [];
        this.utilitiesService.setLoading(false);
        this.spinner = false;
      }
      else {
        if (this.engPart.engPartCheck == "engpart") {
          this.engPart.engBase = data.engBase;
          this.engPart.origin = data.origin;
          this.engPart.seq = data.seq;
        }
        this.part = data.reportList;
        this.totalCount=this.part.length;
        this.spinner = false;
        this.utilitiesService.setLoading(false);
        this.showTable = true;
        this.rowSelected = -1;
      }
    });

  }

  changeRadio(event: any) {
    console.log(event);
    if (event.target.value == "engpart") {
      (<HTMLInputElement>document.getElementById("engpart")).disabled = false;
      (<HTMLInputElement>document.getElementById("finis")).disabled = true;
      (<HTMLInputElement>document.getElementById("serv")).disabled = true;
      (<HTMLInputElement>document.getElementById("partner")).disabled = true;
      (<HTMLInputElement>document.getElementById("enbase")).disabled = true;
      this.flag = false;

    } else if (event.target.value == "finis") {
      (<HTMLInputElement>document.getElementById("engpart")).disabled = true;
      (<HTMLInputElement>document.getElementById("finis")).disabled = false;
      (<HTMLInputElement>document.getElementById("serv")).disabled = true;
      (<HTMLInputElement>document.getElementById("partner")).disabled = true;
      (<HTMLInputElement>document.getElementById("enbase")).disabled = true;
      this.flag = false;
    } else if (event.target.value == "serv") {
      (<HTMLInputElement>document.getElementById("engpart")).disabled = true;
      (<HTMLInputElement>document.getElementById("finis")).disabled = true;
      (<HTMLInputElement>document.getElementById("serv")).disabled = false;
      (<HTMLInputElement>document.getElementById("partner")).disabled = true;
      (<HTMLInputElement>document.getElementById("enbase")).disabled = true;
      this.flag = false;
    } else if (event.target.value == "partner") {
      (<HTMLInputElement>document.getElementById("engpart")).disabled = true;
      (<HTMLInputElement>document.getElementById("finis")).disabled = true;
      (<HTMLInputElement>document.getElementById("serv")).disabled = true;
      (<HTMLInputElement>document.getElementById("partner")).disabled = false;
      (<HTMLInputElement>document.getElementById("enbase")).disabled = true;
      this.flag = false;
    } else if (event.target.value == "enbase") {
      (<HTMLInputElement>document.getElementById("engpart")).disabled = true;
      (<HTMLInputElement>document.getElementById("finis")).disabled = true;
      (<HTMLInputElement>document.getElementById("serv")).disabled = true;
      (<HTMLInputElement>document.getElementById("partner")).disabled = true;
      (<HTMLInputElement>document.getElementById("enbase")).disabled = false;
      this.flag = true;
      this.flag1 = false;
    }
  }

  changeEngPart() {
    this.engPart.engPartCheck = "engpart";
  }

  changeFinis() {
    this.engPart.engPartCheck = "finis";
  }

  changeServ() {
    this.engPart.engPartCheck = "serv";
  }

  changePartner() {
    this.engPart.engPartCheck = "partner";
  }

  changeEnBase() {
    this.engPart.engPartCheck = "enbase";
  }

  reset() {
    this.engPart = { catalog: [], engPartCheck: "", effDate: "" };
    this.vehicleType1 = ""; this.commodityType = ""
    this.selectedCommodity = ""; this.commodity = "";
    this.vehicleDrop = "";
    this.s4p = "";
    this.date = undefined;
    this.selectedBase = {};
    this.showTable = false;
    this.flag1 = false;
    this.flag = false;
    (<HTMLInputElement>document.getElementById("vehCheck")).checked = false;
    (<HTMLInputElement>document.getElementById("effCodeCheck")).checked = false;
    (<HTMLInputElement>document.getElementById("effDateCheck")).checked = false;
  }

  clickedRows(event: any) {
    console.log(event.data);
    this.selected = event.data;
    this.buttonEnable = false;
  }

  wbs() {
    this.wq.engpCommodityC = this.selected.engpCommodityC;
    this.wq.cmdtyTypeC = this.selected.cmdtytypec;
    this.wq.evlVehicleLineC = this.selected.evlVehicleLineC;
    this.wq.engpEngnrgPartR = this.selected.engpEngnrgPartR;
    this.wq.sprfxprtPrefixR = this.selected.base;
    this.wq.eioOriginC = this.selected.eioOriginC;
    this.wq.engpSeqR = this.selected.engpSeqR;
    this.utilitiesService.setWorkQueue(this.wq);
    console.log("Redirected to WBS");
    this.router.navigateByUrl('/wbs');
  }

  partinfo() {
    console.log("Redirected to Part Info");
    this.utilitiesService.setWorkQueue(this.selected);
    this.router.navigateByUrl('/part-info');
  }

  usage() {
    console.log("Redirected to Usage");
    this.utilitiesService.setWorkQueue(this.selected);
    this.router.navigateByUrl('/usage');
  }

  dev() {
    console.log(this.selectedBase);
    this.alertPopup("Screen Development in progress");
  }
  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }

  popupOk() {
    this.alert.flag = false;
  }
  count: number = 0;
  display: any = "none";
  rotate!: string;
  br1: string = "5px";

  showCenterPart() {
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

  close() {
    let screen=localStorage.getItem('Screen');
    localStorage.setItem('Screen',"");
    if(screen=='Usage')
      this.router.navigateByUrl('/usage');
    else if(screen=='PartInfo')
      this.router.navigateByUrl('/part-info');
    else
      this.router.navigateByUrl('');
  }

  recover() {
    this.inactivePartVis = true;
  }


  inactivePartOk() {
    if (this.inactivePart == "") {
      this.alertPopup("Please enter a valid Engineering Part Number");
    } else {
      this.wqservice.validRecoverPart(this.inactivePart)
        .subscribe((data: any) => {
          if (data) {
            this.getRecoverInactivePart();
          } else {
            this.alertPopup("Invalid Engg. Part Number or No Inactive Usages exist.");
          }
        })
    }
  }

  getRecoverInactivePart() {
    this.wqservice.getRecoverInactivePart(this.inactivePart)
      .subscribe((data: any) => {
        console.log(data);
        let selectedWQ: WorkQueue = {};
        selectedWQ.engpEngnrgPartR = data.engpEngnrgPartR;
        selectedWQ.eioOriginC = data.eioOriginC;
        selectedWQ.engpSeqR = data.engpSeqR;
        selectedWQ.vehtypeCode = data.vehtypeCode;
        selectedWQ.pteioOriginC = data.pteioOriginC;
        selectedWQ.evlVehicleLineC = data.evlVehicleLineC;
        selectedWQ.engpCommodityC = data.engpCommodityC;
        selectedWQ.cmdtyTypeC = data.cmdtyTypeC;
        this.utilitiesService.setWorkQueue(selectedWQ);
        this.utilitiesService.setActivateInactive(true);
        this.router.navigate(['/usage']);
      })
  }

  copyMessage(val: any){
    const selBox = document.createElement('textarea');
      selBox.value = this.selected.engpEngnrgPartR;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.engpEngnrgPartR)
  }
  copyMessage1(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.vehtypeCode;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.vehtypeCode)
  }
  copyMessage2(val: any){
    const selBox = document.createElement('textarea');
      selBox.value = this.selected.evlVehicleLineC;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.evlVehicleLineC)
  }
  copyMessage3(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.evaCatlgstsc;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.evaCatlgstsc)
  }
  copyMessage4(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.base;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.base)
  }
  copyMessage5(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.motorCraft;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.motorCraft)
  }
  copyMessage6(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.osi;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.osi)
  }
  copyMessage7(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.evaPerUsage;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.evaPerUsage)
  }
  copyMessage8(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.my;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.my)
  }
  copyMessage9(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.effIn;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.effIn)
  }
  copyMessage10(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.effOut;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.effOut)
  }
  copyMessage11(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.app;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.app)
  }
  copyMessage12(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.spec;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.spec)
  }
  copyMessage13(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.primary;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.primary)
  }
  copyMessage14(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.minor;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.minor)
  }
  copyMessage15(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.unitmsrCode;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.unitmsrCode)
  }
  copyMessage16(val: any){
    const selBox = document.createElement('textarea');
     selBox.value = this.selected.nusageC;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(this.selected.nusageC)
  }

}