import { Component, OnInit } from '@angular/core';
import { VehicleLineMaintenanceService } from '../services/vehicle-line-maintenance.service'
import { VehicleLineModel } from './vehicle-line-maintenance.model'
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vechile-line-maintenance',
  templateUrl: './vechile-line-maintenance.component.html',
  styleUrls: ['./vechile-line-maintenance.component.css']
})
export class VechileLineMaintenanceComponent implements OnInit {
  productType: any[];
  vehicleLine: any[] = [];
  origin: any = "WERS";
  region: any[];
  specialProcessingRule: any[];
  SelectedProductType: string = "";
  SelectedVehLine: any = {};
  SelectedRegion: string = "";
  vehName: string = "";
  leadRegion: string = '';
  splProcess: string = '';
  vehLineModel: VehicleLineModel = {};
  alert: any = { flag: false, msg: "" };
  confirm: any = { flag: false, msg: "" };
  // des:any[]=[];
  // count: number=0;
  // display: any="none";
  // rotate!: string;
  // display1:any="none"
  // counts:number=0;
  // br1:string="5px";
  // br2:string="5px";


  constructor(private primengConfig: PrimeNGConfig, private vechile: VehicleLineMaintenanceService, private router: Router) {

    this.origin = "WERS";

    this.productType = [

      { name: 'C', value: "C - CAR" },
      { name: 'T', value: "T - TRUCK" },
      { name: 'H', value: "H - HARDWARE" },
    ];
    //this.vehicleLine
    //   { name: 'option1' },
    //   { name: 'option2' },
    //   { name: 'option3' },
    // ];
    this.region = [
      { name: 'N' },
      { name: 'E' },
      { name: 'A' },
      { name: 'S' },
    ];
    this.specialProcessingRule = [
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
      { name: 'D' },
      { name: 'E' },
      { name: 'F' },
      { name: 'G' },
      { name: 'H' },
      { name: 'I' },
      { name: 'J' },
      { name: 'K' },
      { name: 'L' },
      { name: 'M' },
      { name: 'N' },
      { name: 'O' },
      { name: 'P' },
      { name: 'Q' },
      { name: 'R' },
      { name: 'S' },
      { name: 'T' },
      { name: 'U' },
      { name: 'V' },
      { name: 'W' },
      { name: 'X' },
      { name: 'Y' },
      { name: 'Z' },
    ];
  }

  result: any
  ngOnInit(): void {
    this.showCenterPart();

    this.vehicle();

  }
  vehicle() {
    this.vechile.fetchVehicleLineMaintenance().subscribe((res: any) => {
      this.result = res;
      this.vehicleLine = this.result;
      console.log(this.result);
    })
  }
  // veh(){
  //   console.log(this.SelectedVehLine);
  //   this.des=this.SelectedVehLine;
  //   console.log(this.des);
  // }
  type() {

    console.log(this.SelectedProductType)
    console.log(this.SelectedVehLine)
    console.log(this.SelectedRegion)
    this.vehLineModel.vehicelType = this.SelectedProductType
    this.vehLineModel.vehicleLine = this.SelectedVehLine.key
    this.vehLineModel.region = this.SelectedRegion
    // this.vehLineModel.prtpeioDescX = this.SelectedVehLine.value


    console.log(this.SelectedVehLine)
    if ((this.SelectedProductType) == "") {
      this.alertPopup("Please Enter Product Type")
    }
    else if ((this.SelectedVehLine) == null) {
      this.alertPopup("Please Enter Vechile Line")
    }
    else if ((this.SelectedRegion) == "") {
      this.alertPopup("Please Enter Region")
    }
    else {


      this.vechile.vehLineMai(this.SelectedRegion, this.SelectedVehLine.key, this.SelectedProductType).subscribe((res: any) => {
        this.result = res;
        if (this.result.length == 0) {
          this.alertPopup("No Record Found")
          this.vehName = "";
          this.leadRegion = "";
          this.splProcess = "";
          console.log(this.splProcess);
        }
        else {
          console.log(this.result);
          this.vehName = this.result[0].prtpeioDescX
          this.leadRegion = this.result[0].leadRegionC
          this.splProcess = this.result[0].specialProcessF
          console.log(this.splProcess)
          this.SelectedVehLine.key = this.result[0].vehicleLine
          console.log(this.SelectedVehLine);
          console.log(this.result);
          // this.counts=0;
          // this.showCenterPart2();
        }
      })
    }
  }
  test() {
    if (this.vehName.length > 0) {
      this.vehLineModel.vehicelType = this.SelectedProductType
      this.vehLineModel.vehicleLine = this.SelectedVehLine.key
      this.vehLineModel.region = this.SelectedRegion
      this.vehLineModel.leadRegionC = this.leadRegion
      this.vehLineModel.specialProcessF = this.splProcess
       this.vehLineModel.prtpeioDescX = this.vehName
      this.vehLineModel.origin = "WERS"
     
      console.log(this.vehLineModel)
      this.vechile.lineMain(this.vehLineModel).subscribe((res: any) => {
        this.result = res;
        this.alertPopup("Data Saved Successfully");
        this.vehicle();
        
      })
      console.log(this.vehName)
      console.log(this.leadRegion)
      console.log(this.splProcess)
      console.log(this.result);
    }
    else {
      this.alertPopup("Select a valid record to save");
    }
  }

  delete() {

    console.log(this.vehName);
    if (this.vehName.length > 0) {
      this.vehLineModel.vehicelType = this.SelectedProductType
      this.vehLineModel.vehicleLine = this.SelectedVehLine.key
      this.vehLineModel.region = this.SelectedRegion
       this.vehLineModel.leadRegionC = this.leadRegion
      this.vehLineModel.specialProcessF = this.splProcess
      this.vehLineModel.prtpeioDescX = this.vehName
      this.vehLineModel.origin = "WERS"
      this.confirm.flag = false;
      console.log(this.vehLineModel)
      this.vechile.delete(this.vehLineModel).subscribe((res: any) => {
        this.result = res;
        this.alertPopup("Delete Successfully");
        this.vehicle();
      })
    }
    else {
      this.alertPopup("Select a valid record to delete");
    }
  }

  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }

  popupOk() {
    this.alert.flag = false;
    this.confirm.flag = false;
  }

  lead(A: any) {
    if (A == "N") {
      this.leadRegion = "N"
    }
    else if (A == "E") {
      this.leadRegion = "E"
    }
    else if (A == "A") {
      this.leadRegion = "A"
    }
    else if (A == "S") {
      this.leadRegion = "S"
    }
  }
  display: any = "none"
  display1: any = "block"
  count: any = 0;
  counts: any = 0
  rotate: string = "rotate(0deg)";
  rotate1: string = "rotate(45deg)";
  br1: string = "5px"
  br2: string = "5px 5px 0px 0px"
  showCenterPart() {
    if (this.count == 0) {
      this.display = "block"
      this.count = 1;
      this.br1 = "5px 5px 0px 0px"
      this.rotate = "rotate(45deg)"
    } else {
      this.br1 = "5px 5px 0px 0px"
      this.display = "none"
      this.count = 0;
      this.rotate = "rotate(0deg)"
    }
  }
  showCenterPart2() {
    if (this.counts == 0) {
      this.display1 = "none"
      this.counts = 1;
      this.br2 = "5px "
      this.rotate1 = "rotate(0deg)"
    } else {
      this.br2 = "5px 5px 0px 0px"
      this.display1 = "block"
      this.counts = 0;
      this.rotate1 = "rotate(45deg)"
    }
  }
  // showCenterPart(){
  //   if(this.count==0){
  //     this.display="block"
  //     this.count=1;
  //     this.rotate="rotate(45deg)"
  //     this.br1="5px 5px 0px 0px"
  //   }else{
  //     this.display="none"
  //     this.count=0;
  //     this.rotate="rotate(0deg)"
  //     this.br1="5px"
  //   }
  // }  
  // rotate1:string="rotate(0deg)"
  // showCenterPart2(){
  //   if(this.counts==0){
  //     this.display1="block"
  //     this.counts=1;
  //     this.br2="5px 5px 0px 0px"
  //     this.rotate1="rotate(45deg)"
  //   }else{
  //     this.counts=0;
  //     this.display1="none"
  //     this.br2="5px"
  //     this.rotate1="rotate(0deg)"
  //   }
  // }

  confirmPopup() {
    this.confirm.flag = true;
    this.confirm.msg = "Are you sure to delete the record?";
  }

  confirmCancel() {
    this.confirm.flag = false;
  }

  close() {
    this.router.navigateByUrl('/');
  }

  reset()
  {
    window.location.reload();
  }

}