import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnassignedCommoditiesService } from '../services/unassigned-commodities.service';


@Component({
  selector: 'app-unassigned-commodities',
  templateUrl: './unassigned-commodities.component.html',
  styleUrls: ['./unassigned-commodities.component.css']
})
export class UnassignedCommoditiesComponent implements OnInit {
  vehicleLine: any[] = [];
  vehicleDrop: any = [];
  data: any;
  prefix: any[] = [];
  prefixDrop: any = [];
  checkvl:boolean=false;
  checkpre:boolean=false;
  vehitypebtn: string = "";
  vehitemp: string = "";
  prefixtemp: string = "";
  showreportboth: any;
  showreportpre: any;
  showreportvl: any;
  countarray: any[] = [1, 2, 3, 4, 5, 6];
  showTablevl: boolean = false;
  showTablepre: boolean = false;
  showTableboth: boolean = false;
  butDisabledvl: boolean = true;
  butDisabledpre: boolean = true;
  prefixcount:any[] = [];
  sumcount:any[] = [];
  totalsum:any[] = [];
  display:string="block"
  display1:any="none"
  count:any=0;
  counts:any=0
  rotate:string="rotate(45deg)";
  br1:string="5px 5px 0px 0px"
  br2:string="5px"
  startsWith="startsWith";
  Table1:boolean=false;


  constructor(private unassignedcommodities: UnassignedCommoditiesService, private route: Router) {
  
  }
  alert:any={
    flag:false,
    msg:"",
  }

  alertPopup(data:string){
    this.alert.flag=true;
    this.alert.msg=data;
  }
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
  vehitype(vehibtn: string) {
    this.vehitypebtn = vehibtn;
    console.log(this.vehitypebtn)
  }
  vlcheck(event: any) {
    
    if (event.target.checked) {
      this.butDisabledvl = false;
      this.checkvl = true;
           console.log("checked"+this.checkvl)
    }
    else{
      this.checkvl=false;
      this.butDisabledvl = true;
      console.log("unchecked"+this.checkvl)
    }
  }
  precheck(event: any) {
    if (event.target.checked) {
      this.butDisabledpre = false;
      this.checkpre = true;
      console.log("checked"+this.checkpre)
    }else{
      this.butDisabledpre = true;
      this.checkpre = false;
    }
  }
  changeVehicleLine() {
    this.unassignedcommodities.fetchUnassignCmdtyVehicleLine().subscribe((res: any) => {
      this.data = res;
      this.vehicleLine = this.data;
      console.log(this.vehicleDrop);
    })
  }
  changePrefix() {
    this.unassignedcommodities.fetchUnassignCmdtyPrefix().subscribe((res: any) => {
      this.data = res;
      this.prefix = this.data;
      console.log(this.prefixDrop);
    })
  }
  submitreport() {
    console.log(this.checkvl)
    console.log(this.checkpre)
    if (this.checkvl == true && this.checkpre == true) {
      
      this.vehitypebtn = (this.vehitypebtn == "") ? "C" : this.vehitypebtn;
      this.vehitemp = (this.vehicleDrop.length == 0) ? "" : this.vehicleDrop.evlVehicleLineC
      this.prefixtemp = (this.prefixDrop.length == 0) ? "" : this.prefixDrop.famprfxPrefixC
      let Input = {
        "prodTypeC": this.vehitypebtn, "concSectionId": this.prefixtemp, "evlVehicleLineC": this.vehitemp,
      }
      console.log(Input)
      this.unassignedcommodities.fetchUnassignCmdtyShowReportBoth(Input).subscribe((res: any) => {
        this.data = res;
        this.showreportboth = this.data;
        if(res.length ==0){
          this.showTableboth = false;
          this.Table1 = true;
        }
        else{
          this.Table1 = false;
        this.showTablevl = false;
      this.showTablepre = false;
      this.showTableboth = true;
        }
      })
    }
    else if (this.checkvl == true && this.checkpre == false  || this.checkvl == false && this.checkpre == false) {
      
      this.vehitypebtn = (this.vehitypebtn == "") ? "C" : this.vehitypebtn;
      this.vehitemp = (this.vehicleDrop.length == 0) ? "" : this.vehicleDrop.evlVehicleLineC
      let Input = {
        "prodTypeC": this.vehitypebtn, "evlVehicleLineC": this.vehitemp
      }
      console.log(Input)
      this.unassignedcommodities.fetchUnassignCmdtyShowReportVehicleLine(Input).subscribe((res: any) => {
        this.data = res;
        this.showreportvl = this.data;
        if(res.length ==0){
          this.showTablevl = false;
          this.Table1 = true;
        }
        else{
          this.Table1 = false;
        this.showTablepre = false;
      this.showTableboth = false;
      this.showTablevl = true;
        }
      })

    }
    else if (this.checkvl == false && this.checkpre == true) {
      
      this.vehitypebtn = (this.vehitypebtn == "") ? "C" : this.vehitypebtn;
      this.prefixtemp = (this.prefixDrop.length == 0) ? "" : this.prefixDrop.famprfxPrefixC
      let Input = { "prodTypeC": this.vehitypebtn, "prefix": this.prefixtemp }
      this.unassignedcommodities.fetchUnassignCmdtyShowReportPrefix(Input).subscribe((res: any) => {
        this.data = res;
        this.showreportpre = this.data;
        if(res.length ==0){
          this.showTablepre = false;
          this.Table1 = true;
        }
        else{
          this.Table1 = false;
        this.showTablevl = false;
      this.showTableboth = false;
      this.showTablepre = true;
        }
        // this.showreportpre.forEach((item: any) => {
        //   this.prefixcount.push(item.prefix)
        //   this.sumcount.push(item.count)

        // });
        // console.log(this.prefixcount)

      })
    }
  }
  linktableVL(vehiline: any, setgroup: any) {
    this.vehitypebtn = (this.vehitypebtn == "") ? "C" : this.vehitypebtn;
    let tableInputVl = { "protype": this.vehitypebtn, "vehicleline": vehiline, "setgroupc": setgroup }
    console.log(tableInputVl)
    this.route.navigate(['/unassign-details'], {
      queryParams: {
        pt: tableInputVl.protype,
        vl: tableInputVl.vehicleline,
        sg: tableInputVl.setgroupc, type: "VL"
      }
    });
  }
  linktableBoth(vehiline: any, prefix: any) {
    this.vehitypebtn = (this.vehitypebtn == "") ? "C" : this.vehitypebtn;
    let tableInputBoth = { "protype": this.vehitypebtn, "vehicleline": vehiline, "prefixc": prefix }
    console.log(tableInputBoth)
    this.route.navigate(['/unassign-details'], {
      queryParams: {
        pt: tableInputBoth.protype,
        vl: tableInputBoth.vehicleline,
        pre: tableInputBoth.prefixc, type: "BOTH"
      }
    });
  }
  linktablePre(prefix: any) {
    this.vehitypebtn = (this.vehitypebtn == "") ? "C" : this.vehitypebtn;
    let tableInputPre = { "protype": this.vehitypebtn, "prefixc": prefix }
    console.log(tableInputPre)
    this.route.navigate(['/unassign-details'], {
      queryParams: {
        pt: tableInputPre.protype,
        pre: tableInputPre.prefixc, type: "PRE"
      }
    });
  }
  closeClick(){
    this.route.navigate(['']);
  }

}






