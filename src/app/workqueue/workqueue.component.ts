import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WorkqueuereportService } from 'src/app/services/workqueuereport.service';

@Component({
  selector: 'app-workqueue',
  templateUrl: './workqueue.component.html',
  styleUrls: ['./workqueue.component.css']
})
export class WorkqueueComponent implements OnInit {

  showTable: boolean = false;
  Table1:boolean=false;
  commodityType: any;
  vehicleLine: any[] = [];
  vehicleDrop: any = [];
  data: any;
  reasonCode: any[] = [];
  reasonCodeDrop: any = [];
  type: any[] = [];
  typeDrop: any = [];
  analystDrop: any = [];
  analyst: any[] = [];
  typeDropDown1: any = [];
  reasonMsgTypeC = null;
  vechicleLinereport: any[] = [];
  reasonCodereport: any[] = [];
  countvalue: any[] = [];
  description: any[] = [];
  showreport: any;
  reasonCodes: any;
  cmdtypeDrop: any = [];
  analysttemp: String = "";
  analysttemp1:String="";
  cmdttemp: String = "";
  vehitemp: String = "";
  typetemp: String = "";
  reasontemp: String = "";
  typeD:any;
  total = 0;
  display:string="block"
  display1:any="none"
  count:any=0;
  counts:any=0
  rotate:string="rotate(45deg)";
  br1:string="5px 5px 0px 0px"
  br2:string="5px"
  startsWith = "startsWith";



  constructor(private workqueue: WorkqueuereportService, private route: Router) {


    this.commodityType = [
      { name: 'Car', item: "C" },
      { name: 'Truck', item: "T" },

    ];
    this.typeD=[
      {name:'Illustration',reasonMsgTypeC:'I'},
      {name:'Lexicon Admin',reasonMsgTypeC:'L'},
      {name:'Setup',reasonMsgTypeC:'S'},
      {name:'Part Analyst',reasonMsgTypeC:'U'},
      
    ]
  }
  alert: any = {
    flag: false,
    msg: "",
  }
  cancelpop(){
    this.alert.flag=false;
  }

  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }
  report: any[] = [];
  ngOnInit(): void {
  }
  onRefresh(){

    window.location.reload();
     
      }
      showCenterPart(){
        if(this.count==0){
          this.display="none"
          this.count=1;
          this.br1="5px"
          this.rotate="rotate(0deg)"
        }else{
          this.display="block"
          this.count=0;
          this.br1="5px 5px 0px 0px"
          this.rotate="rotate(45deg)"
        }}
  
  closeClick(){
    this.route.navigate(['']);
  }
  changeVehicleLine() {
    this.workqueue.fetchWorkQueueVehicleLine().subscribe((res: any) => {
      this.data = res;
      this.vehicleLine = this.data;
      console.log(this.vehicleDrop);
    })
  }

  changeReasonCode() {
    console.log(this.typeDrop.reasonMsgTypeC);
    this.workqueue.fetchWorkQueueReasonCode(this.typeDrop.reasonMsgTypeC).subscribe((res: any) => {
      this.data = res;
      this.reasonCode = this.data;
      console.log(this.reasonCodeDrop);
    })
  }
    changeAnalyst() {
    this.workqueue.fetchWorkQueueAnalyst().subscribe((res: any) => {
      this.data = res;
      this.analyst = this.data;
      console.log(this.analystDrop);
    })
  }
  clickShowReport() {
    
    // console.log("hlo"+this.analystDrop)
    this.analysttemp = (this.analystDrop.length == 0) ? "" : this.analystDrop.userIdC
    this.cmdttemp = (this.cmdtypeDrop.length == 0) ? "" : this.cmdtypeDrop.item
    this.vehitemp = (this.vehicleDrop.length == 0) ? "" : this.vehicleDrop.evlVehicleLineC
    this.typetemp = (this.typeDrop.length == 0) ? "" : this.typeDrop.reasonMsgTypeC
    this.reasontemp = (this.reasonCodeDrop.length == 0) ? "" : this.reasonCodeDrop.reasonCodeC
    if(this.analysttemp!=""){this.analysttemp1=this.analysttemp}else{this.analysttemp1="All"}
    // if(this.vehitemp!=""&& this.cmdttemp==""){
    //   this.alertPopup("Please Enter any of the Search Criteria");
      
    // }
        let Input = {
      "userIdC": this.analysttemp, "cmdtyTypeC": this.cmdttemp, "evlVehicleLineC": this.vehitemp,
      "typeDrop": this.typetemp, "reasonCodeC": this.reasontemp
    }
    console.log(Input);
    this. vechicleLinereport=[];
    this.report=[];
    this.showreport=[];
    this.reasonCodereport=[];
    this.workqueue.fetchWorkQueueShowReportSgtip03(Input).subscribe((res: any) => {
      this.data = res;
      let array: any = [];
      this.showreport = this.data;
      console.log(this.showreport)
      if(res.length ==0){
        this.showTable = false;
        this.Table1 = true;
      }
      else{
        this.Table1 = false;
      this.showTable = true;
      }
      this.showreport.forEach((item: any) => {
        if (!this.reasonCodereport.includes(item.reasonCodeC)) {
          if (item.reasonCodeC != " ") {
            this.reasonCodereport.push(item.reasonCodeC);
            array.push(0);
          }
        }
      });

      console.log(this.reasonCodereport);
      let vehLine = this.showreport[0].evlVehicleLineC;
      array.push(0);

      this.showreport.forEach((item: any) => {
        if (vehLine == item.evlVehicleLineC) {
          for (let i = 0; i < this.reasonCodereport.length; i++) {
            if (item.reasonCodeC == this.reasonCodereport[i]) {
              
              array[0] = item.evlVehicleLineC + " - " + item.description;
              array[i + 1] = item.count;
            }
          }
        } else {
          this.report.push(array);
          array = [];
          this.reasonCodereport.forEach((len: any) =>
            array.push(0)
          );
          array.push(0);

          vehLine = item.evlVehicleLineC;
          for (let i = 0; i < this.reasonCodereport.length; i++) {
            if (item.reasonCodeC == this.reasonCodereport[i]) {
              array[0] = item.evlVehicleLineC + " - " + item.description;
              array[i + 1] = item.count;
            }
          }
        }
      }
      );
      this.report.push(array);
      console.log(this.report);
    })
  }
  linktable(rscode: string, vehicode: string) {

    this.analysttemp = (this.analystDrop.length == 0) ? "" : this.analystDrop.userIdC
    this.cmdttemp = (this.cmdtypeDrop.length == 0) ? "" : this.cmdtypeDrop.item
    this.vehitemp = vehicode.substr(0,2)
    this.typetemp = (this.typeDrop.length == 0) ? "" : this.typeDrop.reasonMsgTypeC
    this.reasontemp = rscode.substr(0,3)

    let tableInput = {
      "userIdC": this.analysttemp, "cmdtyTypeC": this.cmdttemp, "evlVehicleLineC": this.vehitemp,
      "typeDrop": this.typetemp, "reasonCodeC": this.reasontemp
    }
    console.log("helo")
    console.log(tableInput)
    this.route.navigate(['/linktable'], {
      queryParams: {
        userid: tableInput.userIdC, cmdtytype: tableInput.cmdtyTypeC,
        vehiline: tableInput.evlVehicleLineC, types: tableInput.typeDrop, rscode: tableInput.reasonCodeC
      }
    });
  }
}