import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloseDateInputDto, CloseDateS4pInputDto } from '../models/closedate.model';
import { ClosedateserviceService } from '../services/closedateservice.service';

@Component({
  selector: 'app-closepublicationdate-ravi',
  templateUrl: './closepublicationdate-ravi.component.html',
  styleUrls: ['./closepublicationdate-ravi.component.css']
})
export class ClosepublicationdateRaviComponent implements OnInit {
  closeDateS4pInputDto:CloseDateS4pInputDto = new CloseDateS4pInputDto;
  closeDateInputDto:CloseDateInputDto=new CloseDateInputDto;
  productType: any[]=[];
  vehicleLine: any[]=[];
  region: any[]=[];
  currentDate:any;
  S4pCodeDrop:any={};
  s4pCode: any[]=[];
  regionDrop: any={};
  productDrop: any={};
applyChangebtn:boolean=true;
  vehicleLineDrop: any={} ;
  msg!:string;
  minDate= new Date(1969,12,1);
  maxDate= new Date(2038,12,0);
  

  constructor(private closedate:ClosedateserviceService, private router: Router) {
    this.productType = [
      { name: 'C',value:'Car' },
      { name: 'T',value:'Truck' },
      
    ];
   
    this.region = [
      { name: 'N' },
      { name: 'E' },
      { name: 'A' },
      { name: 'S' },
    ];
    
  }

  ngOnInit(): void {
   
  }
 
  clickVehicleline(){
this.closedate.fetchVehDrop().subscribe((res: any) => {
  this.vehicleLine = res;
  console.log(this.vehicleLine);
  console.log(this.vehicleLineDrop)
})
  }
  clickProductDrop(){
console.log(this.productDrop)
  }
  clickS4pCode(){
    this.closeDateS4pInputDto.proType=this.productDrop.name;
   console.log(this.closeDateS4pInputDto.proType);
    this.closeDateS4pInputDto.region=this.regionDrop.name;
    console.log( this.closeDateS4pInputDto.region);
  this.closeDateS4pInputDto.vehLine=this.vehicleLineDrop.evlVehicleLineC;
  console.log(this.closeDateS4pInputDto.vehLine);
this.closedate.fetchS4pCodeDrop(this.closeDateS4pInputDto).subscribe((res: any) => {
  console.log(res.toString());
  this.s4pCode = res;
 
  console.log(this.s4pCode);
})
  }
  popupsOk() {
    this.confUpAlert.flag = false;
  }
  confUpsAlert: any = {
    flag: false,
    msg: '',
  }
  ConfUpsPopup(data: string) {
    this.confUpAlert.flag = true;
    this.confUpAlert.msg = data;
  }
  loadCurrDate(){
    this.closeDateS4pInputDto.effCode=this.S4pCodeDrop.s4pEffPntC
    console.log(this.closeDateS4pInputDto.effCode)
    this.closeDateS4pInputDto.region=this.regionDrop.name;
    console.log(this.closeDateS4pInputDto.region)
  this.closeDateS4pInputDto.vehLine=this.vehicleLineDrop.evlVehicleLineC;
  console.log(this.closeDateS4pInputDto.vehLine)
  this.closedate.fetchS4pDateDrop(this.closeDateS4pInputDto).subscribe((res: any) => {
    console.log(+res)
    this.currentDate = res[0].s4pEffPntY;
    console.log(this.currentDate.substring(7,11));
    if(Number(this.currentDate.substring(7,11))>2038 || Number(this.currentDate.substring(7,11))<1970){
      this.ConfUpsPopup("Please enter a valid date between 1970 and 2038");
    }
    if(this.currentDate !=null)
    this.applyChangebtn=false;
    console.log("checking")
    console.log(+this.currentDate);
  })
  }
  clickRegionDrop(){
console.log(this.regionDrop);
  }
  changeDate(){
   
  }
  apply(){
    this.alertPopup("Are you sure you want to save this date?");
  }
  refresh(){
    window.location.reload();
  }
  close(){
    this.router.navigate(['']);
  }
  alert: any = {
    flag: false,
    msg: "",
  }
 
  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }
 
  popupYes() {
this.closeDateInputDto.vehType = this.productDrop.name;
this.closeDateInputDto.vehLine = this.vehicleLineDrop.evlVehicleLineC;
this.closeDateInputDto.region = this.regionDrop.name;
this.closeDateInputDto.s4pcode = this.S4pCodeDrop.s4pEffPntC;
this.closeDateInputDto.s4pDate = this.currentDate;
 this.msg=this.closeDateInputDto.msg;
this.closedate.setDate(this.closeDateInputDto).subscribe((res: any) => {
  console.log("currentDate" + res)
console.log(res.msg);
  this.alert.flag = false;
  this.ConfUpPopup(res.msg);
})

  }
  popupNo(){
    this.alert.flag = false;
  }
  confUpAlert: any = {
    flag: false,
    msg: '',
  }
  ConfUpPopup(data: string) {
    this.confUpAlert.flag = true;
    this.confUpAlert.msg = data;
  }
  popupOk() {
    this.confUpAlert.flag = false;
    window.location.reload();
  }
  // changeDate(){
  //   if(this.currentDate !=null)
  //   this.applyChangebtn=false;
  //   console.log("checking")
  // }
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
