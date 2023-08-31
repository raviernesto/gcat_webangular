import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commoditysuffixmodel } from '../models/commoditysuffixmodel';
import { CommoditysuffixService } from '../services/commoditysuffix.service';
// import { CommoditysuffixService } from '../commoditysuffix.service';
// import { Commoditysuffixmodel } from '../commoditysuffixmodel';

@Component({
  selector: 'app-commodity-suffix',
  templateUrl: './commodity-suffix.component.html',
  styleUrls: ['./commodity-suffix.component.css']
})
export class CommoditySuffixComponent implements OnInit {
  //display: boolean = true;
  product!: [];
  item = [];
  cmdtsufSuffixC: any;
  data: any;
  savebtn: number = 0;
  suff1: number = 0;
  nextsuffix: any;
  temp: any;
  value: any;
  index: any;
  commoditysuffix: Commoditysuffixmodel = new Commoditysuffixmodel;
  deletealert1: any = { flag: false, msg: "" };
  empty: any;
  display: any = "none"
  display1: any = "none"
  count: any = 0;
  counts: any = 0
  rotate: any;
  br1: string = "5px"
  br2: string = "5px"
  sectionIdr: string[] = [];
  char!: string;
  sect!: string;
  validator: string = 'alphanum';
  sectionId!: string;
  nextS: any;
  number: number = 1;
  constructor(private commoditysuffixservice: CommoditysuffixService, private router: Router) {

    // this.commoditysuffix.sectSectionIdR ="190561 -  A";
    // this.commoditysuffix.engpCommodityC = "HT";
    // this.commoditysuffix.cmdtyTypeC = "C";
    // this.commoditysuffix.engpEngnrgPartP = "W706569S403";
    // this.commoditysuffix.eioOriginC = "WERS";
    // this.commoditysuffix.engpSeqR = 1;
    // this.commoditysuffix.cmdtsufSuffixC = "";

    // this.commoditysuffix.sectSectionIdR = localStorage.getItem('sectId')||"";
    // this.commoditysuffix.engpCommodityC = localStorage.getItem('commodity')||"";
    // this.commoditysuffix.cmdtyTypeC = localStorage.getItem('type')||"";
    // this.commoditysuffix.engpEngnrgPartP = localStorage.getItem('engPart')||"";
    // this.commoditysuffix.eioOriginC = localStorage.getItem('origin')||"";
    // let engPart=localStorage.getItem('seq')||"1";
    // this.commoditysuffix.engpSeqR = Number(engPart);
    // this.commoditysuffix.cmdtsufSuffixC = "";

    // for(this.a :this.sectionIdr)
  }

  getSuffixC() {
    let commoditysuffix1 = this.commoditysuffix;
    if (commoditysuffix1.sectSectionIdR.includes("-")) {
      this.sectionIdr = commoditysuffix1.sectSectionIdR.split("-");
      commoditysuffix1.sectSectionIdR = this.sectionIdr[0].trim();
    }
    this.commoditysuffixservice.getSuffixC(this.commoditysuffix).subscribe((data: any) => {
      console.log(data);
      let i;
      if (data.commmodity != null) {
        this.nextsuffix = data.commmodity.trim();
        console.log(this.nextsuffix);
        this.nextsuffix = String.fromCharCode(this.nextsuffix.charCodeAt() + 1)
        console.log(String.fromCharCode(84));
        console.log(this.nextsuffix.charCodeAt());
        if (this.nextsuffix == "I") {
          this.nextsuffix = "J"
        }
        if (this.nextsuffix == "O") {
          this.nextsuffix = "P"
        }
      } else {
        // .trim()
        if (this.commoditysuffix.engpCommodityC.substring(0, 1) == "H") {
          this.nextsuffix = "1";
        }
        else {
          this.nextsuffix = "A";
          console.log(this.nextsuffix);
        }
      }
      this.nextsuffix = " " + this.nextsuffix;
    });
  }

  // savefunction(){
  //  this. char='-';
  // if(this.commoditysuffix.sectSectionIdR.includes(this.char)){
  // this.sectionIdr=this.commoditysuffix.sectSectionIdR.split("-");
  // this.commoditysuffix.sectSectionIdR=this.sectionIdr[0].trim();
  //   this.save();
  //   this.table();
  //   this.getSuffixC();
  //   this.commoditysuffix.sectSectionIdR;
  // }else{
  //   this.save();
  //   this.table();
  //   this.getSuffixC();
  // }
  // }

  suf: any = false;

  suffixfunction(a: any) {
    console.log(a);
    // console.log(this.mal);
    if (a == 'I' || a == 'O' || a == 'i' || a == 'o') {
      this.suf = true;
      console.log("true");
    } else {
      this.suf = false;
      console.log("false");
    }


  }
  sufnumber: any = false;
  suffixNumber() {
    if (this.commoditysuffix.engpCommodityC.substring(0, 1) == "H") {
      this.validator = 'num';
    }
    else {
      this.validator = 'alpha';
    }
  }


  wbs() {
    this.router.navigateByUrl('/wbs');
  }

  partInContex() {
    this.router.navigateByUrl('/context');
  }

  closeClick(){
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

  cancelpop() {
    this.alert.flag = false;
    this.deletealert1.flag = false;
  }

  cancelpop1() {
    this.suf = false;
    this.commoditysuffix.cmdtsufSuffixC="";
  }
  //  sufnumber:any=false;
  // cancelpop2() {
  //   this.sufnumber = false;
  // }
  // sufnumber1: any = false;
  // cancelpop3() {
  //   this.sufnumber1 = false;
  // }


  selectradiobtn() {
    this.savebtn = 1;
  }

  confirmdelete1() {
    let data = "";
    data = "Are you sure want to delete ";
    this.deletealert1.flag = true;
    this.deletealert1.msg = data;
  }

  save() {

    // var comdty = this.commoditysuffix.cmdtsufSuffixC;
    this.nextS = this.commoditysuffix.cmdtsufSuffixC;
    let nextSuffix1 = this.nextS.charCodeAt();
    console.log(this.nextS.charCodeAt());
    console.log(nextSuffix1)

    let nextsuf = this.nextsuffix.trim();
    nextsuf = nextsuf.charCodeAt();
    console.log(this.nextsuffix);
    console.log(this.nextsuffix.charCodeAt());
    if (nextSuffix1 > nextsuf) {
      if (this.commoditysuffix.engpCommodityC.substring(0, 1) == "H") {
        this.alertPopup("Please Enter a Suffix in between 1 and" + this.nextsuffix);
      } else {
        this.alertPopup("Please Enter a Suffix in between A and" + this.nextsuffix);
      }
    }
    else {
      let commoditysuffix1 = this.commoditysuffix;
      if (commoditysuffix1.sectSectionIdR.includes("-")) {
        this.sectionIdr = commoditysuffix1.sectSectionIdR.split("-");
        commoditysuffix1.sectSectionIdR = this.sectionIdr[0].trim();
      }
      console.log("save");
      console.log(commoditysuffix1);
      this.commoditysuffixservice.SuffixSave(commoditysuffix1).subscribe((data: any) => {
        console.log(data);
        this.alertPopup("Data Saved Successfully");
        this.table();
        this.getSuffixC();

      });
    }
  }

  table() {
    let commoditysuffix1 = this.commoditysuffix;
    if (commoditysuffix1.sectSectionIdR.includes("-")) {
      this.sectionIdr = commoditysuffix1.sectSectionIdR.split("-");
      commoditysuffix1.sectSectionIdR = this.sectionIdr[0].trim();
    }
    console.log("table");
    console.log(commoditysuffix1);
    console.log(this.commoditysuffix);
    this.commoditysuffixservice.getSuffixTable(commoditysuffix1).subscribe((res: any) => {
      this.product = res;
      console.log(res);
    });
  }
  selectedProduct3: any;
  delete() {

    console.log(this.selectedProduct3.engpEngnrgPartP);
    this.commoditysuffix.engpEngnrgPartP = this.selectedProduct3.engpEngnrgPartP;
    this.commoditysuffix.eioOriginC = this.selectedProduct3.eioOriginC;
    this.commoditysuffix.engpSeqR = this.selectedProduct3.engpSeqR;
    this.commoditysuffix.cmdtsufSuffixC = this.selectedProduct3.cmdtsufSuffixC;
    this.commoditysuffixservice.deleteCommoditySuffix(this.commoditysuffix).subscribe((res: any) => {
      console.log(res);
      this.cancelpop();
      this.alertPopup("Deleted Successfully");
      this.table();
      this.getSuffixC();

      this.commoditysuffix.engpEngnrgPartP = '';
      this.commoditysuffix.eioOriginC = '';
      this.empty = null;
      this.commoditysuffix.engpSeqR = this.empty;
      this.commoditysuffix.cmdtsufSuffixC="";

    });

  }

  showCenterPart() {
    if (this.count == 0) {
      this.display = "block"
      this.count = 1;
      this.br1 = "5px 5px 0px 0px"
      this.rotate = "rotate(45deg);"
    } else {
      this.br1 = "5px"
      this.display = "none"
      this.count = 0;
      this.rotate = "rotate(0deg);"
    }
  }



  ngOnInit(): void {

    // this.commoditysuffix.sectSectionIdR ="190561 -  A";
    // this.commoditysuffix.engpCommodityC = "HT";
    // this.commoditysuffix.cmdtyTypeC = "C";
    // this.commoditysuffix.engpEngnrgPartP = "W706569S403";
    // this.commoditysuffix.eioOriginC = "WERS";
    // this.commoditysuffix.engpSeqR = 1;
    // this.commoditysuffix.cmdtsufSuffixC = "";

    this.commoditysuffix.sectSectionIdR = localStorage.getItem('sectId') || "";
    this.sectionId = this.commoditysuffix.sectSectionIdR;
    this.commoditysuffix.engpCommodityC = localStorage.getItem('commodity') || "";
    this.commoditysuffix.cmdtyTypeC = localStorage.getItem('type') || "";
    this.commoditysuffix.engpEngnrgPartP = localStorage.getItem('engPart') || "";
    this.commoditysuffix.eioOriginC = localStorage.getItem('origin') || "";
    let engPart = localStorage.getItem('seq') || "1";
    this.commoditysuffix.engpSeqR = Number(engPart);
    this.commoditysuffix.cmdtsufSuffixC = "";
    console.log(this.commoditysuffix);
    if (this.commoditysuffix.engpCommodityC.substring(0, 1) == 'H') {
      this.number = 2;
    }
    this.getSuffixC();
    this.table();
    this.suffixNumber();


  }




}


