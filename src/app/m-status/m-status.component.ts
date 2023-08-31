import { Component, OnInit } from '@angular/core';
import { MstatusService } from '../services/mstatus.service';

@Component({
  selector: 'app-m-status',
  templateUrl: './m-status.component.html',
  styleUrls: ['./m-status.component.css']
})
export class MStatusComponent implements OnInit {
  showTable: boolean = false;
  vehicleLine: any[] = [];
  group: any[] = [];
  result: any[] = [];
  vehicleType: any = "B";
  region:any="N";
  vehicledrop: any;
  groupdrop: any;
  title = 'angular-app';
  fileName = 'ExcelSheet.xlsx';
  veh:any;
  reg:any;
  vehicleDrop:any;
  groupDrop:any;
  leadRegion:string='';
  vehline:boolean=false;
  vehType!:string;
  REG!:string;
  vehLine!:string;
  GRP!:string;

  // butdisabled: boolean =true;
  part = []
  constructor(private mstatus: MstatusService) {
    this.group = [
      { number:"", dummy:'All', value: 'All'},
      { number: '1', dummy:'1',value: 'General Information' },
      { number: '2',dummy:'2', value: 'Chasis' },
      { number: '3',dummy:'3', value: 'Power Train' },
      { number: '4',dummy:'4', value: 'Electrical' },
      { number: '5',dummy:'5', value: 'Body and Paint' },
      { number: '6',dummy:'6', value: 'Routine Maintanence' },

    ];
  }

  ngOnInit(): void {
    this.changeVehicleLine(this.vehicleType);
    // this.changeRegion(this.region);
  }
  submit() {
    this.veh= this.vehicleType;
    this.vehType="Commodity Type >>> "+this.vehicleType ;
    this.reg= this.region;
    this.REG="Region >> "+this.region;
     this.vehicleDrop= (this.vehicledrop==null)?"":this.vehicledrop.evlVehicleLineC;
this.vehLine="Vehicle Line >>> "+this.vehicledrop.prtpeioDescX;
      this.groupDrop= (this.groupdrop==null)?"":this.groupdrop.number;
      this.GRP="Group >>> "+this.groupdrop.dummy;
    this.showTable = true;
    this.mstatus.showtable(this.veh,this.reg,this.vehicleDrop,this.groupDrop).subscribe((res: any) => {
      this.part = res;

      console.log(this.part);
    })
    console.log(this.vehicleType);
    console.log(this.region);
    console.log(this.vehicledrop);
    console.log(this.groupdrop);
  
  }
  changeVehicleLine(temp: any) {

    this.vehicleType = temp;
    this.mstatus.fetchmstatus(this.vehicleType).subscribe((res: any) => {
      this.vehicleLine = res;
      const data3={
        prtpeioDescX:' ',
        evlVehicleLineC:''
      }
      this.vehline=true;
      this.vehicleLine.unshift(data3)
      console.log(temp);
    })
  }
  changeGroupDrop() {
    console.log(this.groupdrop);
  }
  changeVehicleDrop() {
    console.log(this.vehicledrop);
  }
  // changeRegion(temp: any) {
  //   this.changeRegion = temp;
  //   console.log(temp);
  // }
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