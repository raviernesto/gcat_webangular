import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Illustrationstatus } from '../models/illustrationstatus';
import { IllustrationstatusService } from '../services/illustrationstatus.service';

@Component({
  selector: 'app-illustrationstatus',
  templateUrl: './illustrationstatus.component.html',
  styleUrls: ['./illustrationstatus.component.css']
})
export class IllustrationstatusComponent implements OnInit {
  sectVehicle: string = "";
  type: string = "";
  group1: string = "";
  famprefx: string = "";
  table: boolean = false;

  vehicleType: any;
  prtpeioDescX: any;
  vehicleDrop: any ;
  vehicleLine: any[] = [];
  prefix: any;
  famprfxPrefixC: any;
  prefixDropdown: any[] = [];
  groups: any;

  data: any;
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = true;
  vehicletype:any='C';
  illuStatusmodel: Illustrationstatus = new Illustrationstatus;
  // sectIrplist: any;
  startsWith = "startsWith";
  percent = [];
  percentage=[];
  part = [];
  parts = [];
  grp!:string;
  group:any = [
    { name: 'All', value: 'All' },
    { name: '1', value: '1: General Information' },
    { name: '2', value: '2: Chasis' },
    { name: '3', value: '3: Power Train' },
    { name: '4', value: '4: Electrical' },
    { name: '5', value: '5: Body and Paint' },
    { name: '6', value: '6: Routine Maintanence' },
  ];
  group2!:string;
  prefix1!:string;
  vehtype1!:string;
  vehLine1!:string;


  // part = [
  //   { numberOfSection: 0, sectionWithCompletedIllustrations: 0, rejectedIRPs: 0, sectionWithOpenIRPs: 0, illustrationWithTheCoordinator: 0, illustrationWithTheArtHouses: 0, illustrationWithTheAnalyst: 0, sectionWithoutIllustrations: 0 },

  // ];

  constructor(private service: IllustrationstatusService, private route: ActivatedRoute, private router: Router) {
   
  }

  ngOnInit(): void {
    this.changeVehicleType(this.vehicletype);
  }


  // showData:boolean=false
  // showReport(){
  //   this.showData=true
  // }

  changeVehicleType(type: any) {

    this.vehicleType = type;
    console.log(this.vehicleType);
    this.service.fetchIllustrationStatus().subscribe((res: any) => {
      this.vehicleLine = res;
      console.log(this.vehicleLine);

    })
    
  }
  changeVehicleLine() {
    this.show1 = true;
    this.show2 = false;
    console.log(this.vehicleDrop);
    this.changeVehicleType(this.vehicletype);
    this.prefixDropdown = [];
  }

  changePrefix() {
    this.show2 = true;
    this.show1 = false;
    this.show3= false;
    this.service.fetchIllustrationPrefix().subscribe((res: any) => {
      this.data = res;
      this.prefixDropdown = this.data;
      console.log(this.prefix);

    })
    this.vehicleLine = [];

    console.log(this.prefixDropdown);
  }

  changeGroup() {
    console.log(this.groups);
    this.prefixDropdown = [];
  }
  showData: boolean = false

  showReport() {
    this.showData = true
    console.log("showreport");
   
    if(this.vehicleDrop == null ){
      this.illuStatusmodel.sectVehicleLineC = ""
    }else{
      this.illuStatusmodel.sectVehicleLineC = this.vehicleDrop.evlVehicleLineC;
    }
    if(this.illuStatusmodel.sectVehicleLineC==""){
      this.vehLine1="Vehicle Line >>"+this.illuStatusmodel.sectVehicleLineC
      }else{
      this.vehLine1="Vehicle Line >>"+this.vehicleDrop.prtpeioDescX
      }
      console.log(this.vehLine1)
    this.illuStatusmodel.cmdtyTypeC = this.vehicleType;
    this.vehtype1="Commodity Type >>"+this.vehicleType
   
    if( this.groups==null ||this.groups=="" ||this.groups.name=="All" || this.groups.name==undefined){
      this.illuStatusmodel.sectGroupC="";
      this.grp="All"
    }
    else{
      this.illuStatusmodel.sectGroupC=this.groups.name;
      this.grp=this.groups.value ;
    }
    this.group2="Groups >>"+this.grp

    console.log(this.prefix);
    this.prefix == null ? this.illuStatusmodel.famprfxPrefixC = "" :
      this.illuStatusmodel.famprfxPrefixC = this.prefix.famprfxPrefixC;
    console.log(this.illuStatusmodel);
    if( this.illuStatusmodel.famprfxPrefixC=="")
    {
     this.prefix1="Prefix >>"+this.illuStatusmodel.famprfxPrefixC 
    }else{
      this.prefix1="Prefix >>"+this.prefix.famprfxPrefixC
    }

    this.service.fetchNoOfSec(this.illuStatusmodel).subscribe((res: any) => {
      console.log(res);
      this.part = res;
      console.log(this.part);
    });
    this.service.fetchPercentage(this.illuStatusmodel).subscribe((res: any) => {
      console.log(res);
      this.percent = res;
      console.log(this.percent);
    });
    this.percentages();
  }
  percentages(){
    this.showData = true
    console.log("Percentage");
    this.vehicleDrop == null ? this.illuStatusmodel.sectVehicleLineC = "" :
      this.illuStatusmodel.sectVehicleLineC = this.vehicleDrop.evlVehicleLineC;

    this.illuStatusmodel.cmdtyTypeC = this.vehicleType;
    if( this.groups==null ||this.groups=="" ||this.groups.name=="All"){
      this.illuStatusmodel.sectGroupC="";
      this.grp="All"
    }
    else{
      this.illuStatusmodel.sectGroupC=this.groups.name;
      this.grp=this.groups.name;
    }
    console.log(this.prefix);
    this.prefix == null ? this.illuStatusmodel.famprfxPrefixC = "" :
      this.illuStatusmodel.famprfxPrefixC = this.prefix.famprfxPrefixC;
    console.log(this.illuStatusmodel);

    
    this.service.fetchPercentage(this.illuStatusmodel).subscribe((res: any) => {
      console.log(res);
      this.percent = res;
      console.log(this.percent);
    });

  }

  display: any = "block"
  // display1: any = "none"
  count: any = 1;
  // counts: any = 0
  rotate: any;
  br1: string = "5px 5px 0px 0px"
  // br2: string = "5px"
  showCenterPart() {
    if (this.count == 1) {
      this.display = "none"
      this.count = 0;
      this.br1 = "5px"
      this.rotate = "rotate(0deg);"
    } else {
      this.br1 = "5px 5px 0px 0px"
      this.display = "block"
      this.count = 1;
      this.rotate = "rotate(45deg);"
    }
  }
  onRefresh() {

    window.location.reload();

  }
  complTable() {
    console.log("Table");
    this.vehicleDrop == null ? this.illuStatusmodel.sectVehicleLineC = "" :
      this.illuStatusmodel.sectVehicleLineC = this.vehicleDrop.evlVehicleLineC;

    this.illuStatusmodel.cmdtyTypeC = this.vehicleType;

    this.grp == 'All' ? this.illuStatusmodel.sectGroupC = "" :
      this.illuStatusmodel.sectGroupC = this.grp;

    this.prefix == null ? this.illuStatusmodel.famprfxPrefixC = "" :
      this.illuStatusmodel.famprfxPrefixC = this.prefix.famprfxPrefixC;

    console.log(this.illuStatusmodel);

    this.sectVehicle = this.illuStatusmodel.sectVehicleLineC;
    this.type = this.illuStatusmodel.cmdtyTypeC;
    this.group1 = this.illuStatusmodel.sectGroupC;
    this.famprefx = this.illuStatusmodel.famprfxPrefixC;

    let tableInput = {
      "sectVehicleLineC": this.sectVehicle, "cmdtyTypeC": this.type,
      "sectGroupC": this.group1, "famprfxPrefixC": this.famprefx
    }
    console.log(tableInput);

    this.router.navigate(['/illutable'], {
      queryParams: {
        sectVehicleLineC: tableInput.sectVehicleLineC, cmdtyTypeC: tableInput.cmdtyTypeC,
        sectGroupC: tableInput.sectGroupC, famprfxPrefixC: tableInput.famprfxPrefixC
      }
    });
  }
  rejTable() {
    console.log("Table");
    this.vehicleDrop == null ? this.illuStatusmodel.sectVehicleLineC = "" :
      this.illuStatusmodel.sectVehicleLineC = this.vehicleDrop.evlVehicleLineC;

    this.illuStatusmodel.cmdtyTypeC = this.vehicleType;

    this.grp== 'All' ? this.illuStatusmodel.sectGroupC = "" :
      this.illuStatusmodel.sectGroupC = this.grp;

    this.prefix == null ? this.illuStatusmodel.famprfxPrefixC = "" :
      this.illuStatusmodel.famprfxPrefixC = this.prefix.famprfxPrefixC;

    console.log(this.illuStatusmodel);

    this.sectVehicle = this.illuStatusmodel.sectVehicleLineC;
    this.type = this.illuStatusmodel.cmdtyTypeC;
    this.group1 = this.illuStatusmodel.sectGroupC;
    this.famprefx = this.illuStatusmodel.famprfxPrefixC;

    let tableInput = {
      "sectVehicleLineC": this.sectVehicle, "cmdtyTypeC": this.type,
      "sectGroupC": this.group1, "famprfxPrefixC": this.famprefx
    }
    console.log(tableInput);

    this.router.navigate(['/illurejtable'], {
      queryParams: {
        sectVehicleLineC: tableInput.sectVehicleLineC, cmdtyTypeC: tableInput.cmdtyTypeC,
        sectGroupC: tableInput.sectGroupC, famprfxPrefixC: tableInput.famprfxPrefixC
      }
    });

  }
  coorTable() {
    console.log("Table");
    this.vehicleDrop == null ? this.illuStatusmodel.sectVehicleLineC = "" :
      this.illuStatusmodel.sectVehicleLineC = this.vehicleDrop.evlVehicleLineC;

    this.illuStatusmodel.cmdtyTypeC = this.vehicleType;

    this.grp == 'All' ? this.illuStatusmodel.sectGroupC = "" :
      this.illuStatusmodel.sectGroupC = this.grp;

    this.prefix == null ? this.illuStatusmodel.famprfxPrefixC = "" :
      this.illuStatusmodel.famprfxPrefixC = this.prefix.famprfxPrefixC;

    console.log(this.illuStatusmodel);

    this.sectVehicle = this.illuStatusmodel.sectVehicleLineC;
    this.type = this.illuStatusmodel.cmdtyTypeC;
    this.group1 = this.illuStatusmodel.sectGroupC;
    this.famprefx = this.illuStatusmodel.famprfxPrefixC;

    let tableInput = {
      "sectVehicleLineC": this.sectVehicle, "cmdtyTypeC": this.type,
      "sectGroupC": this.group1, "famprfxPrefixC": this.famprefx
    }
    console.log(tableInput);

    this.router.navigate(['/illucoortable'], {
      queryParams: {
        sectVehicleLineC: tableInput.sectVehicleLineC, cmdtyTypeC: tableInput.cmdtyTypeC,
        sectGroupC: tableInput.sectGroupC, famprfxPrefixC: tableInput.famprfxPrefixC
      }
    });
  }
  artHouseTable(){
    console.log("Table");
    this.vehicleDrop == null ? this.illuStatusmodel.sectVehicleLineC = "" :
      this.illuStatusmodel.sectVehicleLineC = this.vehicleDrop.evlVehicleLineC;

    this.illuStatusmodel.cmdtyTypeC = this.vehicleType;

    this.grp == 'All' ? this.illuStatusmodel.sectGroupC = "" :
      this.illuStatusmodel.sectGroupC = this.grp;

    this.prefix == null ? this.illuStatusmodel.famprfxPrefixC = "" :
      this.illuStatusmodel.famprfxPrefixC = this.prefix.famprfxPrefixC;

    console.log(this.illuStatusmodel);

    this.sectVehicle = this.illuStatusmodel.sectVehicleLineC;
    this.type = this.illuStatusmodel.cmdtyTypeC;
    this.group1 = this.illuStatusmodel.sectGroupC;
    this.famprefx = this.illuStatusmodel.famprfxPrefixC;

    let tableInput = {
      "sectVehicleLineC": this.sectVehicle, "cmdtyTypeC": this.type,
      "sectGroupC": this.group1, "famprfxPrefixC": this.famprefx
    }
    console.log(tableInput);

    this.router.navigate(['/illuartable'], {
      queryParams: {
        sectVehicleLineC: tableInput.sectVehicleLineC, cmdtyTypeC: tableInput.cmdtyTypeC,
        sectGroupC: tableInput.sectGroupC, famprfxPrefixC: tableInput.famprfxPrefixC
      }
    });
  }
  analystTable(){
    console.log("Table");
    this.vehicleDrop == null ? this.illuStatusmodel.sectVehicleLineC = "" :
      this.illuStatusmodel.sectVehicleLineC = this.vehicleDrop.evlVehicleLineC;

    this.illuStatusmodel.cmdtyTypeC = this.vehicleType;

    this.grp== 'All' ? this.illuStatusmodel.sectGroupC = "" :
      this.illuStatusmodel.sectGroupC = this.grp;

    this.prefix == null ? this.illuStatusmodel.famprfxPrefixC = "" :
      this.illuStatusmodel.famprfxPrefixC = this.prefix.famprfxPrefixC;

    console.log(this.illuStatusmodel);

    this.sectVehicle = this.illuStatusmodel.sectVehicleLineC;
    this.type = this.illuStatusmodel.cmdtyTypeC;
    this.group1 = this.illuStatusmodel.sectGroupC;
    this.famprefx = this.illuStatusmodel.famprfxPrefixC;

    let tableInput = {
      "sectVehicleLineC": this.sectVehicle, "cmdtyTypeC": this.type,
      "sectGroupC": this.group1, "famprfxPrefixC": this.famprefx
    }
    console.log(tableInput);

    this.router.navigate(['/illuanlystable'], {
      queryParams: {
        sectVehicleLineC: tableInput.sectVehicleLineC, cmdtyTypeC: tableInput.cmdtyTypeC,
        sectGroupC: tableInput.sectGroupC, famprfxPrefixC: tableInput.famprfxPrefixC
      }
    });
  }
  witOutTable(){
    console.log("Table");
    this.vehicleDrop == null ? this.illuStatusmodel.sectVehicleLineC = "" :
      this.illuStatusmodel.sectVehicleLineC = this.vehicleDrop.evlVehicleLineC;

    this.illuStatusmodel.cmdtyTypeC = this.vehicleType;

    this.grp == 'All' ? this.illuStatusmodel.sectGroupC = "" :
      this.illuStatusmodel.sectGroupC = this.grp;

    this.prefix == null ? this.illuStatusmodel.famprfxPrefixC = "" :
      this.illuStatusmodel.famprfxPrefixC = this.prefix.famprfxPrefixC;

    console.log(this.illuStatusmodel);

    this.sectVehicle = this.illuStatusmodel.sectVehicleLineC;
    this.type = this.illuStatusmodel.cmdtyTypeC;
    this.group1 = this.illuStatusmodel.sectGroupC;
    this.famprefx = this.illuStatusmodel.famprfxPrefixC;

    let tableInput = {
      "sectVehicleLineC": this.sectVehicle, "cmdtyTypeC": this.type,
      "sectGroupC": this.group1, "famprfxPrefixC": this.famprefx
    }
    console.log(tableInput);

    this.router.navigate(['/illuwitoutable'], {
      queryParams: {
        sectVehicleLineC: tableInput.sectVehicleLineC, cmdtyTypeC: tableInput.cmdtyTypeC,
        sectGroupC: tableInput.sectGroupC, famprfxPrefixC: tableInput.famprfxPrefixC
      }
    });
  }
  openTable(){
    console.log("Table");
    this.vehicleDrop == null ? this.illuStatusmodel.sectVehicleLineC = "" :
      this.illuStatusmodel.sectVehicleLineC = this.vehicleDrop.evlVehicleLineC;

    this.illuStatusmodel.cmdtyTypeC = this.vehicleType;

    this.grp == 'All' ? this.illuStatusmodel.sectGroupC = "" :
      this.illuStatusmodel.sectGroupC = this.grp;

    this.prefix == null ? this.illuStatusmodel.famprfxPrefixC = "" :
      this.illuStatusmodel.famprfxPrefixC = this.prefix.famprfxPrefixC;

    console.log(this.illuStatusmodel);

    this.sectVehicle = this.illuStatusmodel.sectVehicleLineC;
    this.type = this.illuStatusmodel.cmdtyTypeC;
    this.group1 = this.illuStatusmodel.sectGroupC;
    this.famprefx = this.illuStatusmodel.famprfxPrefixC;

    let tableInput = {
      "sectVehicleLineC": this.sectVehicle, "cmdtyTypeC": this.type,
      "sectGroupC": this.group1, "famprfxPrefixC": this.famprefx
    }
    console.log(tableInput);

    this.router.navigate(['/illuopenirptable'], {
      queryParams: {
        sectVehicleLineC: tableInput.sectVehicleLineC, cmdtyTypeC: tableInput.cmdtyTypeC,
        sectGroupC: tableInput.sectGroupC, famprfxPrefixC: tableInput.famprfxPrefixC
      }
    });
  }
}

