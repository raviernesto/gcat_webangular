import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LexiconService } from '../services/lexicon.service';
import { PrimeNGConfig, SelectItemGroup } from "primeng/api";
import {saveAs} from 'file-saver';
import { _MatOptionBase } from '@angular/material/core';
// import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
//  interface Search{
//    name:any,
//    value:any,
//    inactive:any
//  }
@Component({
  selector: 'app-lexicon-code',
  templateUrl: './lexicon-code.component.html',
  styleUrls: ['./lexicon-code.component.css']
})
export class LexiconCodeComponent implements OnInit {
  Search: any[] = [];
  // cmdty=["Commodity","Commodity Type","Vehicle Line","Section","Prefix"];
  dateTime: any;
  dataSource: any = null;
  selectedCity: any;
  selectedCountries: string = "";
  showTable: boolean = false;
  // dropdown:Search[];
  binding: any;
  type: string = "";
  desc: string = "";
  dropdownDefaultValue: number = 0;
  selectedValue: any="0";
  alert: any = {
    flag: false,
    msg: "",
  }
  startsWith="startsWith";
  // selectvaluesrc(a:any){
  //   this.dropdownDefaultValue=a;
  // }
  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }
  showReport() {
    //window.alert(this.selectedValue + " " + this.lexVal.lexcC)
    if (this.selectedValue == null || this.binding == null || this.selectedValue == '' || this.binding == '') {
      //  window.alert("Please Select Valid Lexicon Code")
      this.alertPopup("Please Select a Valid Lexicon Code");
      // Swal.fire("Please Select a Valid Lexicon Code");
    }
    else {
      this.toggleDisplayDivIf();
      this.cmmdty();
      this.fetch();
      this.getAll();
      this.getWork();
      this.calibration();
      this.getSpec();
      this.Gravs();
      this.pDescr();
      this.SiAvs()
    }
  }


  value0: boolean | undefined;
  value1: boolean | undefined;
  value2: boolean | undefined;
  value3: boolean | undefined;
  value4: boolean | undefined;
  value5: boolean | undefined;
  value6: boolean | undefined;
  value7: boolean | undefined;
  value8: boolean | undefined;
  value9: boolean | undefined;
  getApiValues: any = [];

test:any=[
  {name:"All",value:"0"},
  {name:"A1",value:"1"},
  {name:"A2",value:"2"},
  {name:"A3",value:"3"}
]

  lexVal: any = [];
  part = [
    { engPart: "1S5X8K012BB", svcPart: "FINIS-1316976", prodType: "C", prodTypeOrig: "WERS", vehicleLine: "BK", usage: 327923 },
    { engPart: "1S6R7223AD", svcPart: "1S6Z-7223-AA", prodType: "C", prodTypeOrig: "WERS", vehicleLine: "BT", usage: 1528838 },
    { engPart: "1S6R7223AD", svcPart: "FINIS-1339302", prodType: "C", prodTypeOrig: "WERS", vehicleLine: "BT", usage: 1528838 },
    { engPart: "1S6R7L302EA", svcPart: "1S6Z-7222-EA", prodType: "C", prodTypeOrig: "WERS", vehicleLine: "BK", usage: 252617 },
    { engPart: "1S6R7L302EA", svcPart: "FINIS-1339290", prodType: "C", prodTypeOrig: "WERS", vehicleLine: "BK", usage: 252617 },
    { engPart: "1S6R7L302EB", svcPart: "1S6Z-7222-A", prodType: "C", prodTypeOrig: "WERS", vehicleLine: "BK", usage: 337688 },
  ];
  langCode = "EN";
  calib: any = [];
  pDesc: any = [];
  spec: any = [];
  work: any = [];
  grp: any = [];
  si: any = [];
  commdty: any = [];
  selectedCountry: any = [];
  countries: any = [];
  lang: any = [];
  lexc: any = [];
  designationDropdown: any = [];
  baseUpdate1: any = [];

  selectedV(a: any) {
    console.log(a);
    console.log(this.selectedValue);
  }
  constructor(private lexicon: LexiconService, private primengConfig: PrimeNGConfig, private datepipe: DatePipe) {
    // this.Search= [
    //   { name: "ALL",value:"0",inactive:false},
    //   { name: "Sections" ,value:"1",inactive:true},
    //   { name: "Usage",value:"2",inactive:true },
    //   { name: "Spec Comment",value:"3",inactive:false },
    //   { name: "Group-Single AVS",value:"4",inactive:false },
    //   { name: "Single-Group AVS",value:"5",inactive:false },
    //   { name: "Calibration",value:"6",inactive:false },
    //   { name: "Work Queue" ,value:"7",inactive:false},
    //   { name: "Part Description",value:"8",inactive:false },
    //   { name: "Comodities",value:"9",inactive:false },

    // ];
  }

  ngOnInit(): void {
    // this.Search = [
    //   { name: "All", value: "0", inactive: false },
    //   { name: "Sections", value: "1", inactive: true },
    //   { name: "Usage", value: "2", inactive: true },
    //   { name: "Spec Comment", value: "3", inactive: false },
    //   { name: "Group-Single AVS", value: "4", inactive: false },
    //   { name: "Single-Group AVS", value: "5", inactive: false },
    //   { name: "Calibration", value: "6", inactive: false },
    //   { name: "Work Queue", value: "7", inactive: false },
    //   { name: "Part Description", value: "8", inactive: false },
    //   { name: "Comodities", value: "9", inactive: false },

    // ]
    this.Search = [
      { name: "All" },
      { name: "Sections"},
      { name: "Usage" },
      { name: "Spec Comment" },
      { name: "Group-Single AVS"},
      { name: "Single-Group AVS" },
      { name: "Calibration"},
      { name: "Work Queue" },
      { name: "Part Description" },
      { name: "Comodities" },

    ]
    
    console.log(this.Search);
    this.dateTime = new Date();
    this.primengConfig.ripple = true;

    this.getApiValues = this.lexicon.getLex().subscribe((res: any) => {
      //console.log("Check");
      //console.log(res);
      this.lexc = res;
    })
    // console.log(this.getApiValues);

  }
  isShowDivIf = true;
  toggleDisplayDivIf() {
    this.showTable = true;
  }
  changeLexc(a: any) {
    //console.log("Entered");

    // console.log(a);
    //console.log(this.binding.lexcC);
    this.lexVal = this.binding;
    // console.log("Close");
  }
  getAll() {
    if (this.selectedValue == "0") {
      this.value3 = true;
      this.value0 = true;
      this.value1 = true;
      this.value2 = true;
      this.value4 = true;
      this.value5 = true;
      this.value6 = true;
      this.value7 = true;
      this.value8 = true;
      this.value9 = true;
      this.lexicon.getCalib(this.binding.lexcC).subscribe((res: any) => {
        // console.log(res);
        this.calib = res;
      })
      this.lexicon.getpdesc(this.binding.lexcC).subscribe((res: any) => {
        //console.log(res);
        this.pDesc = res;
      })
      this.lexicon.getGroupAVS(this.binding.lexcC, this.langCode).subscribe((res: any) => {
        // console.log(res);
        this.grp = res;
      })
      this.lexicon.getWork(this.binding.lexcC).subscribe((res: any) => {
        // console.log(res);
        this.work = res;
      })
      this.lexicon.getSpec(this.binding.lexcC).subscribe((res: any) => {
        //console.log(res);
        this.spec = res;
      })
      this.lexicon.getSingleAVS(this.binding.lexcC, this.langCode).subscribe((res: any) => {
        //console.log(res);
        this.si = res;
      })
      this.lexicon.getCmmdty(this.binding.lexcC).subscribe((res: any) => {
        //console.log(res);
        this.commdty = res;
      })



    }
  }


  fetch() {

    //console.log("Fetch Ent");
    //console.log(this.binding.lexcC);

    this.lexicon.getData(this.binding.lexcC).subscribe((res: any) => {

      // console.log(res);
      this.type = res.lextypTypeC;
      this.desc = res.lexcDescLongX;

    })
    //console.log("Fetch Cls");
  }




  storingValue(a: any) {
    //console.log(a);
    //console.log("Name");
    //console.log(this.selectedValue);

  }



  getSpec() {
    //console.log(this.selectedValue);
    this.lexicon.getSpec(this.binding.lexcC).subscribe((res: any) => {
      // console.log(res);
      this.spec = res;
    })

    if (this.selectedValue == "3") {
      this.value3 = true;
      this.value0 = false;
      this.value1 = false;
      this.value2 = false;
      this.value4 = false;
      this.value5 = false;
      this.value6 = false;
      this.value7 = false;
      this.value8 = false;
      this.value9 = false;


    }

  }

  Gravs() {
    //console.log(this.selectedValue);
    if (this.selectedValue == "4") {
      this.value3 = false;
      this.value0 = true;
      this.value1 = false;
      this.value2 = false;
      this.value4 = true;
      this.value5 = false;
      this.value6 = false;
      this.value7 = false;
      this.value8 = false;
      this.value9 = false;
      this.lexicon.getGroupAVS(this.binding.lexcC, this.langCode).subscribe((res: any) => {
        //console.log(res);
        this.grp = res;
      })
    }
  }

  SiAvs() {
    //console.log(this.selectedValue);
    if (this.selectedValue == "5") {
      this.value3 = false;
      this.value0 = true;
      this.value1 = false;
      this.value2 = false;
      this.value4 = false;
      this.value5 = true;
      this.value6 = false;
      this.value7 = false;
      this.value8 = false;
      this.value9 = false;
      this.lexicon.getSingleAVS(this.binding.lexcC, this.langCode).subscribe((res: any) => {
        //console.log(res);
        this.si = res;
      })

    }
  }
  noRecord: any;

  downloadCommodityData() {
    // let currentTime=this.datepipe.transfrom
    this.dateTime = new Date();
    let currentTime = this.datepipe.transform(this.dateTime, '-yyyy-MM-dd-hh-mm-ss');
    this.lexicon.downloadCommodityData(this.binding.lexcC).subscribe(
      (resp: any) => {
        saveAs(resp, 'LexiconCommodity' + currentTime + '.xlsx')
        this.alertPopup("File Downloaded Successfully");
      }
    )
  }
  downloadPartDescData() {
    this.dateTime = new Date();
    let currentTime = this.datepipe.transform(this.dateTime, '-yyyy-MM-dd-hh-mm-ss');
    this.lexicon.downloadPartDescData(this.binding.lexcC).subscribe(
      (resp: any) => {
        saveAs(resp, 'LexiconPartDescription' + currentTime + '.xlsx')
       this.alertPopup("File Downloaded Successfully");
       // Swal.fire("File Downloaded Successfully")
      }
    )

  }
  downloadWorkQueueData() {
    this.dateTime = new Date();
    let currentTime = this.datepipe.transform(this.dateTime, '-yyyy-MM-dd-hh-mm-ss');
    this.lexicon.downloadWorkQueueData(this.binding.lexcC).subscribe(
      (resp: any) => {
        saveAs(resp, 'LexiconWorkQueue' + currentTime + '.xlsx')
        //window.alert("file downloaded successfully")
  this.alertPopup("File Downloaded Successfully");
       // Swal.fire("File Downloaded Successfully")
      }
    )
  }
  downloadSpecCommentData() {
    this.dateTime = new Date();
    let currentTime = this.datepipe.transform(this.dateTime, '-yyyy-MM-dd-hh-mm-ss');
    this.lexicon.downloadSpecCommentData(this.binding.lexcC).subscribe(
      (resp: any) => {
        saveAs(resp, 'LexiconSpecComment' + currentTime + '.xlsx')
        this.alertPopup("File Downloaded Successfully");
       // Swal.fire("File Downloaded Successfully")
      }
    )
  }
  downloadCalibrationData() {
    this.dateTime = new Date();
    let currentTime = this.datepipe.transform(this.dateTime, '-yyyy-MM-dd-hh-mm-ss');
    this.lexicon.downloadCalibrationData(this.binding.lexcC).subscribe(
      (resp: any) => {
        saveAs(resp, 'LexiconCalibration' + currentTime + '.xlsx')
  this.alertPopup("File Downloaded Successfully");
       // Swal.fire("File Downloaded Successfully")
      }
    )
  }
  downloadSingleAvsData() {
    this.dateTime = new Date();
    let currentTime = this.datepipe.transform(this.dateTime, '-yyyy-MM-dd-hh-mm-ss');
    this.lexicon.downloadSingleAvsData(this.binding.lexcC, this.langCode).subscribe(
      (resp: any) => {
        saveAs(resp, 'LexiconSingleAvsData' + currentTime + '.xlsx')
       // Swal.fire("File Downloaded Successfully")
      }
    )
  }
  downloadGroupAvsData() {
    this.dateTime = new Date();
    let currentTime = this.datepipe.transform(this.dateTime, '-yyyy-MM-dd-hh-mm-ss');
    this.lexicon.downloadGroupAvsData(this.binding.lexcC, this.langCode).subscribe(
      (resp: any) => {
        saveAs(resp, 'LexiconGroupAvsData' + currentTime + '.xlsx')
  this.alertPopup("File Downloaded Successfully");
        //Swal.fire("File Downloaded Successfully")
      }
    )

  }

  hide1: boolean = false;
  hide2: boolean = false;
  hide3: boolean = false;
  hide4: boolean = false;
  hide5: boolean = false;

  hide6: boolean = false;
  hide7: boolean = false;
  hide8: boolean = false;
  hide9: boolean = false;
  getWork() {
    //console.log(this.selectedValue);
    this.lexicon.getWork(this.binding.lexcC).subscribe((res: any) => {
      // console.log(res);
      this.work = res;
    })

    // if(this.work==null || this.work==''){
    //   this.hide7=true;
    //   this.value7=false;
    // }else{
    if (this.selectedValue == "7") {
      this.value3 = false;
      this.value0 = false;
      this.value1 = false;
      this.value2 = false;
      this.value4 = false;
      this.value5 = false;
      this.value6 = false;
      this.value7 = true;
      this.value8 = false;
      this.value9 = false;

      // }
    }
  }
  calibration() {
    //console.log(this.selectedValue);
    this.lexicon.getCalib(this.binding.lexcC).subscribe((res: any) => {
      //console.log(res);
      this.calib = res;

    })
    // if(this.calib==null || this.calib==''){
    //   this.hide6=true;
    //   this.value6=false;
    // }else{
    if (this.selectedValue == "6") {
      this.value3 = false;
      this.value0 = true;
      this.value1 = false;
      this.value2 = false;
      this.value4 = false;
      this.value5 = false;
      this.value6 = true;
      this.value7 = false;
      this.value8 = false;
      this.value9 = false;
      // }
    }
  }
  pDescr() {
    //console.log(this.selectedValue);
    this.lexicon.getpdesc(this.binding.lexcC).subscribe((res: any) => {
      // console.log(res);
      this.pDesc = res;
    })
    // if(this.pDesc==null || this.pDesc==''){
    //   this.hide8=true;
    //   this.value8=false;
    // }else{
    if (this.selectedValue == "8") {
      this.value3 = false;
      this.value0 = true;
      this.value1 = false;
      this.value2 = false;
      this.value4 = false;
      this.value5 = false;
      this.value6 = false;
      this.value7 = false;
      this.value8 = true;
      this.value9 = false;
      // }
    }
  }

  cmmdty() {

    //console.log(this.selectedValue);
    this.lexicon.getCmmdty(this.binding.lexcC).subscribe((res: any) => {
      // console.log(res);
      this.commdty = res;
      // window.alert(this.commdty)
    })
    // if(this.commdty==null || this.commdty==''){
    //   this.hide9=true;
    //   this.value9=false;
    // }else{
    //   this.hide9=false;
    //   this.value9=true;
    if (this.selectedValue == "9") {
      this.value3 = false;
      this.value0 = true;
      this.value1 = false;
      this.value2 = false;
      this.value4 = false;
      this.value5 = false;
      this.value6 = false;
      this.value7 = false;
      this.value8 = false;
      this.value9 = true;
      // }
    }
  }
  display:any="block"
  display1:any="none"
  count:any=0;
  counts:any=0
  rotate:string="rotate(45deg)";
  br:string="5px"
  showCenterPart(){
    if(this.count==0){
      this.display="none"
      this.count=1;
      this.br="5px 5px 0px 0px"
      this.rotate="rotate(0deg)"
    // 1100
    }else{
      this.display="block"
      this.count=0;
      this.br="5px";
      this.rotate="rotate(45deg)";
      // this.responsiveHeight="750px"
    }
  }
  popupOk(){
    this.alert.flag=false;
  }

}
// value7