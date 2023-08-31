import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkQueue } from '../interfaces/part-workqueue';
import { Job1TransCurDateInput, Job1TransDeleteInput, Job1TransNewDateInput, Job1TransVehicleLineInput } from '../models/job1.model';
import { Job1Service } from '../services/job1.service';
import { UtilitiesService } from '../shared/services/utilities.service';


@Component({
  selector: 'app-job-time-change',
  templateUrl: './job-time-change.component.html',
  styleUrls: ['./job-time-change.component.css']
})
export class JobTimeChangeComponent implements OnInit {
  job1TransVehicleLineInput: Job1TransVehicleLineInput = new Job1TransVehicleLineInput;
  job1TransCurDateInput: Job1TransCurDateInput = new Job1TransCurDateInput;
  job1TransNewDateInput: Job1TransNewDateInput = new Job1TransNewDateInput;
  job1TransDeleteInput: Job1TransDeleteInput = new Job1TransDeleteInput;
  region: any[] = [];
  productType: any[];
  origin: any;
  vehicleLine: any[] = [];
  s4pCode: any[] = [];
  regionDrop: any = {};
  productDrop: any = {};
  originDrop: any = {};
  vehicleLineDrop: any = {};
  S4pCodeDrop: any = {};
  currentDate: any;
  regionName!: string;
  newDate: any;
  i: any;
  vehdisabled: boolean = true;//vehicle
  butdisabled: boolean = true;//origin
  disableNewdate: boolean=true;//newdate
  applyChangebtn:boolean=true;//updatebtn
  ifdisabled: boolean = true;//s4p
  display: boolean = false;
  deleteEnable: boolean = true;//dont change
  disablecancel: boolean = true;//cancel
  constructor(private job1: Job1Service, private utilitiesService: UtilitiesService, private router: Router) {
    this.productType = [
      { name: 'C', value: 'Car' },
      { name: 'T', value: 'Truck' }
    ];
    // this.origin = [
    //   { name: 'WERS' },

    // ];
    this.originDrop = 'WERS';
  }
  ngOnInit(): void {
    this.utilitiesService.selectedWorkQueue.subscribe((wq: WorkQueue) => {
      console.log(wq);
      console.log(wq.regintC != undefined);
      if (wq.regintC != undefined) {
        console.log(wq);
        this.display = true;
        this.regionDrop.regionName = wq.regintC || "";
        this.productDrop.name = wq.vehtypeCode || "";
        this.originDrop = wq.pteioOriginC || "";
        this.vehicleLineDrop.evlVehicleLineC = wq.evlVehicleLineC || "";
        this.S4pCodeDrop = wq.effiopEffInC || "";
        // this.isdisabled=false;
        this.deleteEnable = false;  
        this.loadCurrDate();
      }
    });
    this.onLoadRegionDrop()
  }
  onLoadRegionDrop() {
    this.job1.fetchRegion().subscribe((res: any) => {
      for (this.i in res) {
        var obj = { "regionName": res[this.i] };
        this.region.push(obj);
      }
    })
  }
  clickVehicleline() {
    this.job1TransVehicleLineInput.region = this.regionDrop.regionName;
    this.job1TransVehicleLineInput.productType = this.productDrop.name;
    this.job1TransVehicleLineInput.origin = this.originDrop;
    this.job1.fetchVehicleLine(this.job1TransVehicleLineInput).subscribe((res: any) => {
      this.vehicleLine = res;
      console.log(this.vehicleLine);
    })
    if (this.vehicleLineDrop.evlVehicleLineC != null) {
      this.ifdisabled = false;
    }
  }
  clickS4pCode() {
    this.job1.fetchS4pCode(this.vehicleLineDrop.evlVehicleLineC).subscribe((res: any) => {
      this.s4pCode = res;
      console.log(this.s4pCode);
    })
    // if(this.regionDrop.regionName!=null&&this.productDrop.name!=null&&this.originDrop.name!=null&&
    //   this.vehicleLineDrop.evlVehicleLineC!=null&&this.S4pCodeDrop.s4pEffPntC!=null&&this.currentDate!=null){
    //     this.isdisabled=false;
    //   }
  }
  loadCurrDate() {
    this.job1TransCurDateInput.region = this.regionDrop.regionName;
    this.job1TransCurDateInput.vehicleType = this.productDrop.name;
    this.job1TransCurDateInput.origin = this.originDrop;
    this.job1TransCurDateInput.vehicleLine = this.vehicleLineDrop.evlVehicleLineC;
    this.job1TransCurDateInput.s4pCode = this.S4pCodeDrop;
    console.log(this.job1TransCurDateInput)
    this.job1.fetchCurrDate(this.job1TransCurDateInput).subscribe((res: any) => {
      
      // else if (res.currenDate.length =0){
      //   this.disableNewdate =true;
      //   this.noData("No Data Found");
      // }
      this.currentDate = res.currentDate;
      if (res.currentDate.length != 0) {
        this.disableNewdate = false;
      }
      else if (res.currenDate==null){
        this.disableNewdate =true;
        this.noData("No Data Found");
      }
      console.log("currentDate" + this.currentDate)

    })

  }
  nil: any = {
    flag: false,
    msg: "",
  }
  noData(data: string) {
    this.nil.flag = true;
    this.nil.msg = data;
  }
popupNil() {
    this.nil.flag = false;
  }
changeDate(){
  if(this.newDate !=null)
  this.applyChangebtn=false;
  console.log("checking")
}

  updateDate() {
    this.alertPopup("Are you Sure You Want Update Date?");
  }


  deleteDate() {
    this.job1TransDeleteInput.regintC = this.regionDrop.regionName;
    this.job1TransDeleteInput.vehtypeCode = this.productDrop.name;
    this.job1TransDeleteInput.pteioOriginC = this.originDrop.name;
    this.job1TransDeleteInput.evlVehicleLineC = this.vehicleLineDrop.evlVehicleLineC;
    this.job1TransDeleteInput.effiopEffInC = this.S4pCodeDrop;
    this.job1TransDeleteInput.reasonCode = "JTC";
    this.job1.deleteDate(this.job1TransDeleteInput).subscribe((res: any) => {
      console.log("Date" + res)
      this.alertDeletePopup("Are Sure You Want To Delete?");
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
  deleteAlert: any = {
    flag: false,
    msg: "",
  }
  alertDeletePopup(data: string) {
    this.deleteAlert.flag = true;
    this.deleteAlert.msg = data;
  }
  clickRegionDrop() {
    console.log(this.regionDrop)
  }
  clickProductDrop() {
    console.log(this.productDrop)
    if (this.regionDrop.regionName != null && this.productDrop.name != null) {
      this.butdisabled = false;
    }
  }
  clickOriginDrop() {
    console.log(this.originDrop)

  }
  reload() {
    window.location.reload();
  }
  popupYes() {
    this.job1TransNewDateInput.region = this.regionDrop.regionName;
    this.job1TransNewDateInput.vehicleType = this.productDrop.name;
    this.job1TransNewDateInput.origin = this.originDrop;
    this.job1TransNewDateInput.vehicleLine = this.vehicleLineDrop.evlVehicleLineC;
    this.job1TransNewDateInput.s4pCode = this.S4pCodeDrop;
    this.job1TransNewDateInput.newDate = this.newDate;
    this.job1.updateNewDate(this.job1TransNewDateInput).subscribe((res: any) => {
      console.log("newDate" + res)
      this.alert.flag = false;
      this.ConfUpPopup("Successfully Updated");
    })


  }
  popupNo() {
    this.alert.flag = false;
  }
  popupDelYes() {
    this.job1TransDeleteInput.regintC = this.regionDrop.regionName;
    this.job1TransDeleteInput.vehtypeCode = this.productDrop.name;
    this.job1TransDeleteInput.pteioOriginC = this.originDrop;
    this.job1TransDeleteInput.evlVehicleLineC = this.vehicleLineDrop.evlVehicleLineC;
    this.job1TransDeleteInput.effiopEffInC = this.S4pCodeDrop;
    this.job1TransDeleteInput.reasonCode = "JTC";
    this.job1.deleteDate(this.job1TransDeleteInput).subscribe((res: any) => {
      console.log("Date" + res)
      this.ConfDelPopup("Successfully Deleted");

      this.deleteAlert.flag = false;
    })
  }
  popupDelNo() {
    this.deleteAlert.flag = false;
  }
  confUpAlert: any = {
    flag: false,
    msg: '',
  }
  ConfUpPopup(data: string) {
    this.confUpAlert.flag = true;
    this.confUpAlert.msg = data;
  }
  confDelAlert: any = {
    flag: false,
    msg: '',
  }
  ConfDelPopup(data: string) {
    this.confDelAlert.flag = true;
    this.confDelAlert.msg = data;
  }
  popupOk() {
    this.confUpAlert.flag = false;
    window.location.reload();
  }
  popupDelOk() {
    this.confDelAlert.flag = false;
    this.router.navigate(['/part-work']);
  }
  cancel() {
    this.router.navigate(['']);
  }
  cancel2() {
    this.router.navigate(['/part-work']);
  }
  count:any=0;
  display1:string="block";
  br1:string="5px 5px 0px 0px"
  rotate:string="rotate(45deg)"

  showCenterPart(){
    if(this.count==0){
      this.display1="none"
      this.count=1;
      this.br1="5px "
      this.rotate="rotate(0deg)"
    }else{
      this.br1="5px 5px 0px 0px"
      this.display1="block"
      this.count=0;
      this.rotate="rotate(45deg)"
    }
  }
}