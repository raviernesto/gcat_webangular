import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Opensectionmodel } from '../models/opensectionmodel';
import { AnalystcodeserviceService } from '../services/analystcodeservice.service';

@Component({
  selector: 'app-sectionsreport',
  templateUrl: './sectionsreport.component.html',
  styleUrls: ['./sectionsreport.component.css']
})
export class SectionsreportComponent implements OnInit {
  table: boolean = false;
  vehicletype:any='C';
  vehicleType: any;
  prtpeioDescX: any;
  vehicleDrop: any;
  vehicleLine: any[]=[];
  prefix: any;
  famprfxPrefixC: any;
  prefixDropdown: any[]=[];
  groups: any;
  group:any = [
    { name: 'All', value: 'All' },
    { name: '1', value: '1: General Information' },
    { name: '2', value: '2: Chasis' },
    { name: '3', value: '3: Power Train' },
    { name: '4', value: '4: Electrical' },
    { name: '5', value: '5: Body and Paint' },
    { name: '6', value: '6: Routine Maintanence' },
  ];

  data: any;
  // show: boolean = false;
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = true;
  opensectionmodel: Opensectionmodel = new Opensectionmodel;
  part: any[] = [];
  irp: any[] = [];
  countarray: any[] = [];
  sectVehicle: string = ""
  type: string = ""
  group1: string = ""
  famprefx: string = ""
  grp!:string;
  group2!:string;
  prefix1!:string;
  vectype!:string;
  vecline!:string;

  startsWith = "startsWith";


  constructor(private analystcodeserviceService: AnalystcodeserviceService, private route: Router) {
   
  }

  ngOnInit(): void {
    this.changeVehicleType(this.vehicletype);
  }

  changeVehicleType(type: any) {
    this.vehicleType = type;
    console.log(this.vehicleType);
    this.analystcodeserviceService.getVehicleLine().subscribe((res: any) => {
      this.vehicleLine = res;
      console.log(this.vehicleLine);

    })
  }
  cancelpop() {
    this.alert.flag = false;
  }

  changeVehicleLine() {
    this.show1 = true;
    this.show2 = false;
    console.log(this.vehicleDrop);
    // this.changeVehicleType(this.vehicletype);
    // console.log(this.vehicleDrop);
    this.prefixDropdown = [];
  }

  alert: any = {
    flag: false,
    msg: "",
  }

  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }

  changePrefix() {
    this.show2 = true;
    this.show1 = false;
    this.show3= false;
    this.analystcodeserviceService.getPrefix().subscribe((res: any) => {
      this.data = res;
      this.prefixDropdown = this.data;
      console.log(this.prefix);

    })
    
    this.vehicleDrop=[];
    this.groups="";
  }

  changeGroup() {
    console.log(this.groups);
    this.prefixDropdown = [];
  }

  onRefresh() {
    window.location.reload();
  }
  showData: boolean = false
  showReport1() {
    this.showData = true;
    console.log("showreport");
    // this.vehicleDrop == null ? this.opensectionmodel.sectVehicleLineC = "" :
    if(this.vehicleDrop == null ){
      this.opensectionmodel.sectVehicleLineC = ""
    }else{
      this.opensectionmodel.sectVehicleLineC = this.vehicleDrop.evlVehicleLineC;
    }

    if(this.opensectionmodel.sectVehicleLineC==""){
    this.vecline="Vehicle Line >>"+this.opensectionmodel.sectVehicleLineC
    }else{
    this.vecline="Vehicle Line >>"+this.vehicleDrop.prtpeioDescX
    }
    console.log(this.vecline)

    this.opensectionmodel.cmdtyTypeC = this.vehicleType;
    this.vectype="Commodity Type >>"+this.vehicleType

    if( this.groups==null ||this.groups=="" ||this.groups.name=="All"){
      this.opensectionmodel.sectGroupC="";
      this.grp="All"
    }
    else{
      this.opensectionmodel.sectGroupC=this.groups.name;
      this.grp=this.groups.name;
    }
    this.group2="Group >>"+this.grp
    
      
    console.log(this.prefix);
    this.prefix == null ? this.opensectionmodel.famprfxPrefixC = "" :
    this.opensectionmodel.famprfxPrefixC = this.prefix.famprfxPrefixC;
    if( this.opensectionmodel.famprfxPrefixC=="")
    {
     this.prefix1="Prefix >>"+this.opensectionmodel.famprfxPrefixC 
    }else{
      this.prefix1="Prefix >>"+this.prefix.famprfxPrefixC
    }

    console.log(this.opensectionmodel);

    this.analystcodeserviceService.getShowReport(this.opensectionmodel).subscribe((res: any) => {
      this.part = res;
      console.log(this.part);
      // this.vehicleType=this.opensectionmodel.cmdtyTypeC;
      // if(this.vehicleType=="C"){
      //   this.vehicleType="Car"
      // }else{
      //   this.vehicleType="Truck"
      // }
      // if(this.group.number==""){
      //   this.group.number="ALL";
      // }
    });
  }

  Table() {
    console.log("Table");
    this.vehicleDrop == null ? this.opensectionmodel.sectVehicleLineC = "" :
      this.opensectionmodel.sectVehicleLineC = this.vehicleDrop.evlVehicleLineC;

    this.opensectionmodel.cmdtyTypeC = this.vehicleType;

    this.grp == 'All' ? this.opensectionmodel.sectGroupC = "" :
      this.opensectionmodel.sectGroupC = this.grp;

    this.prefix == null ? this.opensectionmodel.famprfxPrefixC = "" :
      this.opensectionmodel.famprfxPrefixC = this.prefix.famprfxPrefixC;

    console.log(this.opensectionmodel);

    this.sectVehicle = this.opensectionmodel.sectVehicleLineC;
    this.type = this.opensectionmodel.cmdtyTypeC;
    this.group1 = this.opensectionmodel.sectGroupC;
    this.famprefx = this.opensectionmodel.famprfxPrefixC;

    let tableInput = {
      "sectVehicleLineC": this.sectVehicle, "cmdtyTypeC": this.type,
      "sectGroupC": this.group1, "famprfxPrefixC": this.famprefx
    }
    console.log(tableInput);

    this.route.navigate(['/analystcode'], {
      queryParams: {
        sectVehicleLineC: tableInput.sectVehicleLineC, cmdtyTypeC: tableInput.cmdtyTypeC,
        sectGroupC: tableInput.sectGroupC, famprfxPrefixC: tableInput.famprfxPrefixC
      }
    });
  }

  // section(){
  //   window.open(environment.dev+'/analystcode');
  //   this.opensectionmodel.sectVehicleLineC = this.vehicleDrop.evlVehicleLineC;
  //   this.opensectionmodel.cmdtyTypeC = this.vehicleType;
  //   this.opensectionmodel.sectGroupC = this.groups.name;
  //   this.opensectionmodel.famprfxPrefixC = this.prefix.famprfxPrefixC;
    
  //   localStorage.setItem('sectVehicleLineC', this.opensectionmodel.sectVehicleLineC);
  //   localStorage.setItem('cmdtyTypeC', this.opensectionmodel.cmdtyTypeC);
  //   localStorage.setItem('sectGroupC', this.opensectionmodel.sectGroupC);
  //   localStorage.setItem('famprfxPrefixC', this.opensectionmodel.famprfxPrefixC);
  
  // }

  display: string = "block"
  display1: any = "none"
  count: any = 0;
  counts: any = 0
  rotate: string = "rotate(45deg)";
  br1: string = "5px 5px 0px 0px"

  showCenterPart() {
    if (this.count == 0) {
      this.display = "none"
      this.count = 1;
      this.br1 = "5px"
      
      this.rotate = "rotate(45deg);"
    } else {
      this.display = "block"
      this.count = 0;
      this.br1 = "5px 5px 0px 0px"
      this.rotate = "rotate(0deg);"
    }
  }



}
