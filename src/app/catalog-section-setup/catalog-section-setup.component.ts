import { Component, Injectable, OnInit } from '@angular/core';
import { DevelopmentCommoditySetupComponent } from '../development-commodity-setup/development-commodity-setup.component';
import { Section, Templates, TempSection } from '../models/catalog-section.class';
import { CatalogService } from '../services/catalog-section.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-catalog-section-setup',
  templateUrl: './catalog-section-setup.component.html',
  styleUrls: ['./catalog-section-setup.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class CatalogSectionSetupComponent implements OnInit {

  constructor(private catalog: CatalogService, private commodity: DevelopmentCommoditySetupComponent, private router: Router, private app: AppComponent, private datapipe: DatePipe) { }

  sectionId: string = "";
  isSave: boolean = false;
  tabNumber: number = 1;
  lexiPopup: number = 0;
  section: Section = { identity: "", sectionId: "", tempId: "", suffix: "", commodity: "", temp: [], sect: [], effIndate: "", effOutdate: "" };
  tempTable: any = [];
  tempTable1: any = [];
  tempConfirm: any = [];
  tempAdded: any = [];
  tempDeleted: any = [];
  sect: any = [];
  sectAdded: any = [];
  sectDeleted: any = [];
  prefix: any = [];
  prefixAdded: any = [];
  prefixDeleted: any = [];
  s4pIn: any = { spCode: "" };
  s4pOut: any = { spCode: "" };
  spList: any;
  vehOrPrefix: boolean = true;
  tempSectionPopup: boolean = false;
  tempSect: TempSection[] = [];
  sectionSelected: number = -1;
  deleteSelected: number = -1;
  selectedComm: number = -1;
  deleteSect: number = -1;
  deletePre: number = -1;
  alert: any = { flag: false, msg: "" };
  confirm:any={flag:false,msg:""};
  ill: any = { flag: false, msg: "" };
  suffix: string = "";
  effIndate: string = "";
  effOutdate: string = "";
  savePopup = false;
  sectDetails: any = [];
  lexcDetails: any = {};
  exclude: number = 1;
  cmdty: boolean = false;
  checkE: boolean = false;
  checkN: boolean = false;
  checkS: boolean = false;
  checkA: boolean = false;
  deleteCommodity: any = [];
  selectedPrefix: any;
  selectedSect: any;
  selectDelete: any;
  startsWith = "startsWith";
  buttonEnable = true;
  true = true;
  effIn: Date | undefined;
  effOut: Date | undefined;
  illFlag = false;
  illId = null;
  illRegion = "N";
  counts: number = 1;
  display: string = "block";
  rotate: string = "rotate(45deg);";
  br1: string = "5px";
  counts1: number = 0;
  display1: string = "none";
  rotate1: string = "rotate(0deg);";
  br2: string = "5px";

  ngOnInit(): void {
    this.showCenterParts();
    let sectionId = localStorage.getItem('sectionId') || "";
    let newSection = localStorage.getItem('newSection') == "true" ? true : false;
    console.log("Start");
    console.log(sectionId + " " + newSection);
    this.section.sectionId = sectionId;
    this.section.newSection = newSection;
    this.section = { identity: "", sectionId: "", tempId: "", suffix: "", commodity: "", temp: [], sect: [], effIndate: "", effOutdate: "" };
    if(sectionId=="0"){
      this.newTemplate();
    }else{
    this.catalog.onLoad(sectionId).subscribe((res: any) => {
      this.section = res;
      if (this.section.errMsg != null) {
        this.alertPopup(this.section.errMsg);
      } else {
        this.tempTable = this.section.temp;
        this.spList = res.spList;
        let unique = [...new Set(this.spList)];
        this.spList = unique;
        console.log(this.section.group)
        if (this.section.group == "3") this.prefix = this.section.prefixs;
        else this.sect = this.section.sect;
        console.log(this.prefix)
        if (this.section.vehLine == null)
          this.vehOrPrefix = false;
        this.section.newSection = newSection;
        console.log(res);
        if (!this.section.newSection) {
          this.newSection();
        } else {
          this.section.effIncode = " ";
          this.section.effOutcode = " ";
          this.section.effIndate = "";
          this.section.effOutdate = "";
          this.section.sectFeat = "N";
          this.section.sectComm = "N";
        }
        this.setRegion();
      }
    })
  }
  }

  newSection() {
    this.sectionId = this.section.sectionId;
    this.s4pIn.spCode = this.section.effIncode;
    this.s4pOut.spCode = this.section.effOutcode;
    console.log(this.s4pIn.spCode + " " + this.s4pOut.spCode)
    if (this.section.effIndate != null && this.section.effIndate.length > 0) this.effIn = new Date(Number(this.section.effIndate.substring(0, 4)), Number(this.section.effIndate.substring(5, 7)) - 1, Number(this.section.effIndate.substring(8, 10)));
    if (this.section.effOutdate != null && this.section.effOutdate.length > 0) this.effOut = new Date(Number(this.section.effIndate.substring(0, 4)), Number(this.section.effOutdate.substring(5, 7)) - 1, Number(this.section.effOutdate.substring(8, 10)));
    this.tempConfirm = this.section.temp;
    this.tempTable = [];
  }

  setRegion() {
    console.log("Set Region");
    if (this.section.identity.includes("E")) {
      this.checkE = true;
    }
    else this.checkE = false;
    if (this.section.identity.includes("N")) this.checkN = true;
    else this.checkN = false;
    if (this.section.identity.includes("S")) this.checkS = true;
    else this.checkS = false;
    if (this.section.identity.includes("A")) this.checkA = true;
    else this.checkA = false;
    if (this.section.commodity == "C")
      (<HTMLInputElement>document.getElementById("T")).disabled = true;
    if (this.section.commodity == "T")
      (<HTMLInputElement>document.getElementById("C")).disabled = true;
  }

  newTemplate(){
    let vehLine=localStorage.getItem('vehLine')||"";
    let vehDesc=localStorage.getItem('vehDesc')||"";
    let prefix=localStorage.getItem('prefix')||"";
    let preDesc=localStorage.getItem('preDesc')||"";
    let tempId=localStorage.getItem('tempId')||"";
    let type=localStorage.getItem('type')||"";
    console.log(tempId,type,vehLine,prefix);
    this.catalog.newtemplate(tempId,type,vehLine,prefix).subscribe((res: any) => {
      console.log(res);
      if(res!=null){
      this.section = res;
      this.section.newSection=true;
      this.section.commodity=type;
      this.section.prefix=prefix;
      this.section.prefixDesc=prefix+"-"+preDesc;
      this.section.vehLine=vehLine;
      this.section.vehDesc=vehLine+"-"+vehDesc;
      this.section.tempId=tempId;
      this.section.group=vehLine==""?"3":"1";
      this.vehOrPrefix=this.section.group=="3"?false:this.true;
      this.section.identity="";
      this.section.sectFeat="N";
      this.section.sectComm="N";
      this.tempTable = this.section.temp;
      this.spList = res.spList;
      this.section.effIncode=" ";
      this.section.effOutcode=" ";
      }else{
        this.alertPopup("Unable to load Template");
      }
    });
  }
  tab1() {
    this.tabNumber = 1;
  }

  tab2() {
    this.tabNumber = 2;
  }

  changeSpIn() {
    this.enableSave();
    console.log(this.s4pIn);
    let input = { type: this.section.commodity, vehLine: this.section.vehLine, s4p: this.s4pIn.spCode };
    this.catalog.spChange(input).subscribe((data: any) => {
      this.section.effIndate = data.date
      console.log(this.section.effIndate)
      this.section.effIncode = this.s4pIn.spCode;
      this.effIn = new Date(Number(this.section.effIndate.substring(0, 4)), Number(this.section.effIndate.substring(5, 7)) - 1, Number(this.section.effIndate.substring(8, 10)));
      console.log(this.effIn);
    });
  }

  changeSpInCal() {
    console.log("In Date Change");
    this.enableSave();
    let date = this.datapipe.transform(this.effIn, "yyyy-MM-dd") || new Date(0);
    this.section.effIndate = date?.toString();
    console.log(this.section.effIndate);
  }

  changeSpOut() {
    this.enableSave();
    console.log(this.s4pOut);
    let input = { type: this.section.commodity, vehLine: this.section.vehLine, s4p: this.s4pOut.spCode };
    this.catalog.spChange(input).subscribe((data: any) => {
      this.section.effOutdate = data.date
      console.log(this.section.effOutdate)
      this.section.effOutcode = this.s4pOut.spCode;
      this.effOut = new Date(Number(this.section.effOutdate.substring(0, 4)), Number(this.section.effOutdate.substring(5, 7)) - 1, Number(this.section.effOutdate.substring(8, 10)));
      console.log(this.effOut);
    });
  }

  changeSpOutCal() {
    console.log("Out Date Change");
    this.enableSave();
    let date = this.datapipe.transform(this.effOut, "yyyy-MM-dd") || new Date(0);
    this.section.effOutdate = date?.toString();
    console.log(this.section.effOutdate);
  }

  buildTab1() {
    this.catalog.tempComm(this.section.tempId, this.section.commodity).subscribe((res: any) => {
      this.tempTable = res;
      this.tempTable1 = [];
      console.log(res);
    });

  }

  buildTab2() {
    this.tempSectionPopup = true;
    console.log("Inside Sect");
    this.catalog.tempSect(this.section.tempId, this.section.commodity).subscribe((res: any) => {
      this.tempSect = res;
      console.log(res);
    });
  }

  // tempSection() {
  //   // console.log("Inside Sect");
  //   // this.catalog.tempSect(this.section.tempId, this.section.commodity).subscribe((res: any) => {
  //   //   this.tempSect = res;
  //   //   console.log(res);
  //   // });
  // }

  clickedSection(event: any) {
    this.sectionSelected = event.index;
  }

  selectSection() {
    if (this.sectionSelected == -1) {
      this.alertPopup("Select a Section to Proceed");
    } else {
      this.catalog.commTemp(this.tempSect[this.sectionSelected].sectId || "", this.section.commodity).subscribe((res: any) => {
        console.log(res);
        if (res.length == 0) {
          this.alertPopup("No records found");
        } else {
          this.tempTable = res;
          this.tempTable1 = [];
          console.log(this.tempTable);
          this.tempSectionPopup = false;
          this.sectionSelected = -1;
        }
      });
    }
  }

  cancelSection() {
    this.sectionSelected = -1;
    this.tempSectionPopup = false;
  }

  clickedRow(event: any) {
    let selectedRow: number = event.index;
    console.log(this.tempTable[selectedRow]);
    console.log(this.tempTable1);
  }

  transferSelected() {
    this.isSave = true;
    this.section.tempChange = true;
    for (const element of this.tempTable1) {
      let count = 0;
      for (const element1 of this.tempConfirm)
        if (element1.commodity == element.commodity)
          count++;
      if (count > 0)
        this.alertPopup("Commodity " + element.commodity + " is already added");
      else
        this.tempConfirm.push(element);
    }
    this.tempTable1 = [];
  }

  transferAll() {
    this.section.tempChange = true;
    for (const element of this.tempTable)
      if (!this.tempConfirm.includes(element)) {
        this.tempConfirm.push(element);
        this.tempAdded.push(element);
      }
    console.log(this.tempConfirm);
  }

  clickedDelete(event: any) {
    let selectedRow: number = event.index;
    if (this.deleteSelected == selectedRow) this.deleteSelected = -1;
    else this.deleteSelected = selectedRow;
    console.log(this.deleteSelected);
    console.log(this.tempConfirm[this.deleteSelected]);
  }

  clickedRowPre(event: any) {
    let i: number = event.index;
    if (this.deletePre == i) this.deletePre = -1;
    else this.deletePre = i;
    console.log(this.deletePre);
    console.log(this.prefix[this.deletePre]);
    if (this.prefix[this.deletePre].exclude)
      this.exclude = 2;
    else
      this.exclude = 3;

  }

  excludes() {
    console.log(this.sectionId)
    if (this.sectionId == "")
      this.alertPopup("Select or create a new record. The Section Id is missing");
    else {
      this.isSave = true;
      this.section.preChange = true;
      this.prefix[this.deletePre].exclude = !this.prefix[this.deletePre].exclude;
      let i;
      let count = -1;
      for (i = 0; i < this.prefixAdded.length; i++) {
        console.log(this.prefixAdded[i].lexc + " " + this.prefix[this.deletePre].lexc);
        if (this.prefixAdded[i].lexc == this.prefix[this.deletePre].lexc)
          count = i;
      }
      console.log(count);
      console.log(this.prefix[this.deletePre]);
      if (count == -1)
        this.prefixAdded.push(this.prefix[this.deletePre]);
      else
        this.prefixAdded.splice(this.deleteSelected, 1);
      this.deletePre = -1;
      this.selectedPrefix = "";
    }
  }

  clickedRowSect(event: any) {
    let i: number = event.index;
    if (this.deleteSect == i) this.deleteSect = -1;
    else this.deleteSect = i;
    console.log(this.deleteSect);
    console.log(this.sect[this.deleteSect]);
  }

  deleteConfirm(){
    this.confirm.msg="Are you sure to delete the row?";
    this.confirm.flag=true;
  }

  confirmOk(){
    this.deleteRow();
    this.confirm.flag=false;
  }

  confirmCancel(){
    this.confirm.flag=false;
  }

  deleteRow() {
    console.log(this.deleteSelected + "-" + this.deleteSect);
    if (this.deleteSelected == -1 && this.deleteSect == -1)
      if (this.section.newSection)
        this.alertPopup("Please select a row to delete");
      else {
        if (this.tempConfirm.length > 0)
          this.alertPopup("Please delete all the Commodities before deleting the section");
      }

    else {
      if (this.deleteSelected != -1) {
        if (this.section.newSection) {
          this.deleteComm();
        }
        else {
          this.deleteUsage();
        }
      }
      this.deleteSects();
    }

  }

  deleteComm() {
    this.tempDeleted.push(this.tempConfirm[this.deleteSelected]);
    this.tempConfirm.splice(this.deleteSelected, 1);
    this.deleteSelected = -1;
    this.selectDelete = "";
    this.isSave = true;
    this.section.tempChange = true;
    console.log(this.tempDeleted);
  }

  deleteUsage() {
    this.catalog.getCommDetails(this.section.sectionId, this.tempConfirm[this.deleteSelected].commodity, this.section.commodity).subscribe((data: any) => {
      if (data.length > 0) {
        console.log(data);
        this.deleteCommodity.commodity = data;
        this.deleteCommodity.message1 = "You can't delete a Commodity until all corresponding GCAT Usages are De-Summarized.";
        this.deleteCommodity.message2 = "Please De-Summarize the GCAT Usages. Access Usage Info via PIC";
        this.deleteCommodity.message3 = "Here are the affected Engineering Parts:";
        this.deleteCommodity.flag = true;
        this.deleteSelected = -1;
      } else
        this.deleteComm();
    });
  }

  deleteSects() {
    if (this.deleteSect != -1) {
      this.sectDeleted.push(this.sect[this.deleteSect]);
      this.sect.splice(this.deleteSect, 1);
      this.deleteSect = -1;
      this.selectedSect = "";
      this.isSave = true;
      this.section.sectChange = true;
      console.log(this.sectAdded);
      console.log(this.sectDeleted);
    }
  }

  deleteCommOk() {
    this.deleteCommodity.flag = false;
  }

  getLexDetails(data: any) {
    this.lexiPopup = 0;

    console.log(data);
    this.lexcDetails.lexcCode = data.lexiCode;
    this.lexcDetails.lexcDesc = data.lexiDescription;
    this.lexcDetails.lexcType = data.type;
    this.lexcDetails.propCode = data.proCode;
    console.log(this.lexcDetails);
    if (this.lexcDetails.lexcType != "MFC" && this.lexcDetails.lexcType != "PFC" && this.lexcDetails.lexcType != "APPL" && this.lexcDetails.lexcType != "SPEC") {

      this.alertPopup("Please choose PFC, MFC, SPEC and APPL comments only");
    }
    else {
      let count = 0;
      if (this.sectAdded.length > 0) {
        count = this.count();
      }
      if (count > 0) {
        this.alertPopup("Lexicon type is already added");
      } else {
        let input = { lexc: this.lexcDetails.lexcCode, propCode: this.lexcDetails.propCode, lexcType: this.lexcDetails.lexcType, lexcDesc: this.lexcDetails.lexcDesc }
        this.sect.push(input);
        this.section.sect.push(input);
        this.sectAdded.push(input);
        this.section.sectChange = true;
        this.isSave = true;
      }
    }

  }

  count() {
    let count = 0;
    for (const element of this.sectAdded) {
      if (element.lexc == this.lexcDetails.lexcCode && element.propCode == this.lexcDetails.propCode
        && element.lexcType == this.lexcDetails.lexcType)
        count++;
    }
    return count;
  }
  getLexDesc() {
    this.lexiPopup++;
    console.log(this.lexiPopup);
    localStorage.setItem('Screen', "Catalog Section");
  }

  getLexcClose() {
    this.lexiPopup = 0;
  }

  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }

  illPopup(data: string) {
    this.ill.flag = true;
    this.ill.msg = data;
    this.illFlag = false;
  }

  closeOk() {
    this.alert.flag = false;
    if (this.illFlag) {
      if (this.section.status == "C" && this.illId == null) {
        this.illPopup("There is no Illustration attached to this Section. Do you want to Create a New IRP for New Illustration at this time?");
      } else if (this.section.status == "C" && this.illId != null) {
        this.illPopup("There is an Illustration [" + this.illId + "] attached to this Section. Do you want to Create a New IRP for Illustration [" + this.illId + "] at this time?");
      }
    }
  }

  illOk() {
    this.illFlag = false;
    this.catalog.createIll(this.section.sectionId, this.illRegion).subscribe((data: any) => {
      if (data.data != null)
        this.alertPopup("Illustration " + data.data + " is created against the section " + this.section.sectionId);
      this.ill.flag = false;
    });
  }

  illClose() {
    this.ill.flag = false;
    this.illFlag = false;
  }

  enableSave() {
    this.isSave = true;
    this.buttonEnable = false;
  }

  save() {
    if (!this.isSave) {
      this.alertPopup("No changes has been done to save");
    } else {
      console.log(this.section.splTiming + " " + this.section.effIndate + " " + this.section.effOutdate);
      let inDate = null;
      let outDate = null;
      let count = 0;
      count = this.dateCheck(inDate, outDate, count);
      console.log(inDate + " " + outDate);
      if (!this.section.splTiming)
        if (this.section.effIndate == null || this.section.effIndate == "" || this.section.effIndate == undefined)
          this.alertPopup("Please enter a Section Effective In Date");
        else if (count > 0) {
          this.alertPopup("Effective Out Date must be greater Effective In Date");
        }
        else {
          this.save2();
        }
    }
  }

  dateCheck(inDate: any, outDate: any, count: any) {
    if (this.section.effIndate != null && this.section.effIndate != "" && this.section.effIndate != undefined)
      inDate = new Date(Number(this.section.effIndate.substring(0, 4)), Number(this.section.effIndate.substring(5, 7)) - 1, Number(this.section.effIndate.substring(8, 10)));
    if (this.section.effOutdate != null && this.section.effOutdate != "" && this.section.effOutdate != undefined)
      outDate = new Date(Number(this.section.effOutdate.substring(0, 4)), Number(this.section.effOutdate.substring(5, 7)) - 1, Number(this.section.effOutdate.substring(8, 10)));
    if (inDate != null && outDate != null)
      if (inDate > outDate)
        count++;

    return count;
  }

  save2() {
    if (this.section.newSection) {
      let input = { group: this.section.group, tempId: this.section.tempId, prefix: this.section.prefix, vehLine: this.section.vehLine, type: this.section.commodity }
      this.catalog.secDetails(input).subscribe((res: any) => {
        if (res != null) {
          this.setDate(res);
          if (this.section.group == "3")
            this.sectDetails.message = "These are existing sections that share the Template ID : " + this.section.tempId + " and Prefix : " + this.section.prefix;
          else
            this.sectDetails.message = "These are existing sections that share the Template ID : " + this.section.tempId + " and Vehicle Line : " + this.section.vehLine;
          this.sectDetails.details = res;
          this.sectDetails.flag = true;
          console.log(res);
        } else this.sectOk();
      });
    } else this.sectOk();
  }

  setDate(res: any): any {
    for (const element of res) {
      if (element.effIn != null)
        element.effIn = element.effIn.substr(0, 10);
      if (element.effOut != null)
        element.effOut = element.effOut.substr(0, 10);
    }
    return res;
  }

  saveSection() {
    this.section.tempAdded = this.tempConfirm;
    this.section.tempDeleted = this.tempDeleted;
    this.section.sectAdded = this.sect;
    this.section.sectDeleted = this.sectDeleted;
    this.section.prefixAdded = this.prefixAdded;
    this.section.prefixDeleted = this.prefixDeleted;
    this.section.temp = [];
    this.section.suffix = this.section.suffix==null?"":this.section.suffix.toUpperCase();
    console.log(this.section);
    this.catalog.saveSection(this.section).subscribe((res: any) => {
      console.log(res);
      this.section.newSection = false;
      this.sectionId = res.sectionId;
      console.log(this.sectionId);
      this.section.sectionId = res.sectionId;
      this.tempTable = [];
      this.s4pIn = { spCode: "", date: "" };
      this.s4pOut = { spCode: "", date: "" };
      if (this.section.effIncode != null && this.section.effIncode != "") this.s4pIn.spCode = this.section.effIncode;
      if (this.section.effOutcode != null && this.section.effOutcode != "") this.s4pOut.spCode = this.section.effOutcode;
      if (this.section.effIndate != null && this.section.effIndate.length > 0) this.effIndate = this.section.effIndate.substr(0, 10);
      if (this.section.effOutdate != null && this.section.effOutdate.length > 0) this.effOutdate = this.section.effOutdate.substr(0, 10);
      this.savePopup = false;
      this.illFlag = true;
      this.illId = res.illId;
      this.alertPopup("Saved Successfully");
    });
  }

  cancelSave() {
    this.savePopup = false;
  }

  changeE() {
    this.isSave = true;
    if ((<HTMLInputElement>document.getElementById("E")).checked)
      this.section.identity = this.section.identity.concat("E");
    else
      this.section.identity = this.section.identity.replace("E", "");
  }

  changeN() {
    this.isSave = true;
    if ((<HTMLInputElement>document.getElementById("N")).checked)
      this.section.identity = this.section.identity.concat("N");
    else
      this.section.identity = this.section.identity.replace("N", "");
  }

  changeS() {
    this.isSave = true;
    if ((<HTMLInputElement>document.getElementById("S")).checked)
      this.section.identity = this.section.identity.concat("S");
    else
      this.section.identity = this.section.identity.replace("S", "");
  }

  changeA() {
    this.isSave = true;
    if ((<HTMLInputElement>document.getElementById("A")).checked)
      this.section.identity = this.section.identity.concat("A");
    else
      this.section.identity = this.section.identity.replace("A", "");
  }

  changeTask1() {
    if ((<HTMLInputElement>document.getElementById("task1")).checked)
      this.section.sectFeat = 'Y';
    else
      this.section.sectFeat = 'N';
  }

  changeTask2() {
    if ((<HTMLInputElement>document.getElementById("task2")).checked)
      this.section.sectComm = 'Y';
    else
      this.section.sectComm = 'N';
  }

  sectOk() {
    this.sectDetails.flag = false;
    this.savePopup = true;
  }

  setStatus() {
    console.log(this.section.newSection);
    if (!this.section.newSection) {
      console.log(this.section.sectFeat + " " + this.section.sectComm)
      if (this.section.sectFeat == "Y") (<HTMLInputElement>document.getElementById("task1")).checked = true;
      else (<HTMLInputElement>document.getElementById("task1")).checked = false;
      if (this.section.sectComm == "Y") (<HTMLInputElement>document.getElementById("task2")).checked = true;
      else (<HTMLInputElement>document.getElementById("task2")).checked = false;
    } else {
      this.section.status = "I"
      console.log(this.tempConfirm.length);
      if (this.tempConfirm.length == 0) {
        (<HTMLInputElement>document.getElementById("task2")).disabled = true;
        (<HTMLInputElement>document.getElementById("complete")).disabled = true;
        (<HTMLInputElement>document.getElementById("incomplete")).checked = true;
      } else {
        (<HTMLInputElement>document.getElementById("task2")).disabled = false;
        (<HTMLInputElement>document.getElementById("complete")).disabled = false;
      }
    }
  }

  changeStatus(event: any) {
    console.log(event.target.value);
    if (event.target.value == "C") {
      (<HTMLInputElement>document.getElementById("task1")).checked = true;
      (<HTMLInputElement>document.getElementById("task2")).checked = true;

      this.section.status = "C";
      this.section.sectFeat = "Y";
      this.section.sectComm = "Y";

    }
    if (event.target.value == "I")
      this.section.status = "I";
  }

  changeTask() {
    if ((<HTMLInputElement>document.getElementById("task1")).checked
      && (<HTMLInputElement>document.getElementById("task2")).checked)
      this.section.status = "C";
    else
      this.section.status = "I";
  }

  getCatalogCommodity() {
    if (this.deleteSelected != -1) {
      this.router.navigate(['/devcommmodity']);
      localStorage.setItem('Screen', "Catalog Section");
      localStorage.setItem('commodity', this.tempConfirm[this.deleteSelected].commodity);
      localStorage.setItem('vehType', this.section.commodity);
    }
    else
      this.router.navigate(['/devcommmodity']);
  }

  lex() {
    this.router.navigate(['/lexi-manage']);
  }

  wq() {
    this.router.navigate(['/part-work']);
  }

  wbs() {
    this.router.navigateByUrl('/wbs');
  }

  close() {
    this.router.navigateByUrl('/');
  }

  showCenterPart() {
    console.log(this.counts);
    if (this.counts == 0) {
      this.display = "block"
      this.counts = 1;
      this.rotate = "rotate(45deg);"
      this.br1 = "5px 5px 0px 0px";
    } else {
      this.display = "none"
      this.counts = 0;
      this.rotate = "rotate(0deg);"
      this.br1 = "5px 5px 5px 5px";
    }
  }

  showCenterParts() {
    console.log(this.counts1);
    if (this.counts1 == 0) {
      this.display1 = "block"
      this.counts1 = 1;
      this.rotate1 = "rotate(45deg);"
      this.br2 = "5px 5px 0px 0px"
    } else {
      this.display1 = "none"
      this.counts1 = 0;
      this.rotate1 = "rotate(0deg);"
      this.br2 = "5px 5px 5px 5px"
    }
  }
}