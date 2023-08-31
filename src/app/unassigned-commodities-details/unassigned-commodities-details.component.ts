import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnassignedCommoditiesDetailsService } from '../services/unassigned-commodities-details.service';

@Component({
  selector: 'app-unassigned-commodities-details',
  templateUrl: './unassigned-commodities-details.component.html',
  styleUrls: ['./unassigned-commodities-details.component.scss']
})
export class UnassignedCommoditiesDetailsComponent implements OnInit {
  vehicleLine: any[] = [];
  vehicleDrop: any = [];
  data: any;
  prefix: any[] = [];
  prefixDrop: any = [];
  groupType: any;
  groupDrop: any = [];
  vehitypebtn: String = "";
  protype: String = "";
  vehiline: String = "";
  setgrp: String = "";
  prefixc: String = "";
  type: String = "";
  showreportvl: any;
  showreportboth: any;
  showreportpre: any;
  showTablevl: boolean = false;
  showTablepre: boolean = false;
  showTableboth: boolean = false;
  table1: boolean = false;
  checkvl: boolean = false;
  checkpre: boolean = false;
  vehitemp: String = "";
  prefixtemp: String = "";
  grouptemp: String = "";
  butDisabledvl: boolean = true;
  butDisabledpre: boolean = true;
  display: string = "block"
  display1: any = "none"
  count: any = 0;
  counts: any = 0
  rotate: string = "rotate(45deg)";
  br1: string = "5px 5px 0px 0px"
  br2: string = "5px"
  startsWith = "startsWith";
  constructor(private unassignedcommoditiesdetail: UnassignedCommoditiesDetailsService, private route: ActivatedRoute, private router: Router) {
    this.groupType = [
      { name: 'General Information', item: "1" },
      { name: 'Chassis	', item: "2" },
      { name: 'Powertrain', item: "3" },
      { name: 'Electrical', item: "4" },
      { name: 'Body and Paint', item: "5" },
      { name: 'Routine Maintenance', item: "6" },

    ];
  }
  alert: any = {
    flag: false,
    msg: "",
  }

  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params)
      this.protype = params.pt;
      this.vehiline = params.vl;
      this.setgrp = params.sg;
      this.prefixc = params.pre;
      this.type = params.type;
    })

    if (this.type == "VL") {
      this.showTablevl = true;
      let Inputvl = {
        "prodTypeC": this.protype, "evlVehicleLineC": this.vehiline,
        "sectGroupC": this.setgrp
      }
      console.log(Inputvl)
      this.unassignedcommoditiesdetail.fetchUnassignCmdtyDetailShowReportVehicleLine(Inputvl).subscribe((res: any) => {
        this.data = res;
        this.showreportvl = this.data;
        console.log(this.showreportvl[0])
      })
    }
    else if (this.type == "BOTH") {
      this.showTableboth = true;
      let Inputboth = {
        "prodTypeC": this.protype, "evlVehicleLineC": this.vehiline,
        "concSectionId": this.prefixc
      }
      this.unassignedcommoditiesdetail.fetchUnassignCmdtyDetailShowReportBoth(Inputboth).subscribe((res: any) => {
        this.data = res;
        this.showreportboth = this.data;
        console.log(this.showreportboth[0])
      })
    }
    else if (this.type == "PRE") {
      this.showTablepre = true;
      let Inputpre = { "prodTypeC": this.protype, "prefix": this.prefixc }
      this.unassignedcommoditiesdetail.fetchUnassignCmdtyDetailShowReportPrefix(Inputpre).subscribe((res: any) => {
        this.data = res;
        this.showreportpre = this.data;
      })
    }
  }
  onRefresh() {

    window.location.reload();

  }
  showCenterPart() {
    if (this.count == 0) {
      this.display = "none"
      this.count = 1;
      this.br1 = "5px"
      this.rotate = "rotate(0deg)"
    } else {
      this.display = "block"
      this.count = 0;
      this.br1 = "5px 5px 0px 0px"
      this.rotate = "rotate(45deg)"
    }
  }
  vehitype(vehibtn: string) {
    this.vehitypebtn = vehibtn;
    console.log(this.vehitypebtn)
  }
  vlcheck(event: any) {

    if (event.target.checked) {
      this.butDisabledvl = false;
      this.checkvl = true;
      console.log("checked" + this.checkvl)
    }
    else {
      this.checkvl = false;
      this.butDisabledvl = true;
      console.log("unchecked" + this.checkvl)
    }
  }
  precheck(event: any) {
    if (event.target.checked) {
      this.butDisabledpre = false;
      this.checkpre = true;
      console.log("checked" + this.checkpre)
    } else {
      this.butDisabledpre = true;
      this.checkpre = false;
    }
  }
  changeVehicleLine() {
    this.unassignedcommoditiesdetail.fetchUnassignCmdtyVehicleLine().subscribe((res: any) => {
      this.data = res;
      this.vehicleLine = this.data;
      console.log(this.vehicleDrop);
    })
  }
  changePrefix() {
    this.unassignedcommoditiesdetail.fetchUnassignCmdtyPrefix().subscribe((res: any) => {
      this.data = res;
      this.prefix = this.data;
      console.log(this.prefixDrop);
    })
  }
  submit() {
    if (this.checkvl == true && this.checkpre == true || this.checkvl == false && this.checkpre == false) {

      this.vehitypebtn = (this.vehitypebtn == "") ? "C" : this.vehitypebtn;
      this.vehitemp = (this.vehicleDrop.length == 0) ? "" : this.vehicleDrop.evlVehicleLineC
      this.prefixtemp = (this.prefixDrop.length == 0) ? "" : this.prefixDrop.famprfxPrefixC
      let Inputboth = {
        "prodTypeC": this.vehitypebtn, "evlVehicleLineC": this.vehitemp,
        "concSectionId": this.prefixtemp
      }
      this.unassignedcommoditiesdetail.fetchUnassignCmdtyDetailShowReportBoth(Inputboth).subscribe((res: any) => {
        this.data = res;
        this.showreportboth = this.data;
        if (res.length == 0) {
          this.table1 = true;
          this.showTableboth = false;
        }
        else {
          this.table1 = false;
          this.showTablevl = false;
          this.showTablepre = false;
          this.showTableboth = true;
        }
      })
    }
    else if (this.checkvl == true && this.checkpre == false) {

      this.vehitypebtn = (this.vehitypebtn == "") ? "C" : this.vehitypebtn;
      this.grouptemp = (this.groupDrop.length == 0) ? " " : this.groupDrop.item;
      this.vehitemp = (this.vehicleDrop.length == 0) ? "" : this.vehicleDrop.evlVehicleLineC
      let Input = {
        "prodTypeC": this.vehitypebtn, "evlVehicleLineC": this.vehitemp, "sectGroupC": this.grouptemp
      }
      console.log(Input)
      this.unassignedcommoditiesdetail.fetchUnassignCmdtyDetailShowReportVehicleLine(Input).subscribe((res: any) => {
        this.data = res;
        this.showreportvl = this.data;
        if (res.length == 0) {
          this.table1 = true;
          this.showTablevl = false;
        
        }
        else {
          this.table1 = false;
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
      console.log(Input);
      this.unassignedcommoditiesdetail.fetchUnassignCmdtyDetailShowReportPrefix(Input).subscribe((res: any) => {
        this.data = res;
        this.showreportpre = this.data;
        if (res.length == 0) {
          this.table1 = true;
          this.showTablepre = false;
        
        }
        else {
          this.table1 = false;
          this.showTablevl = false;
          this.showTableboth = false;
          this.showTablepre = true;
        }
      })
    }
  }
  closeClick() {
    this.router.navigate(['']);
  }
}





