import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

import { PartInfoService } from '../services/part-info.service';

@Component({
  selector: 'app-part-info',
  templateUrl: './part-info.component.html',
  styleUrls: ['./part-info.component.css']
})
export class PartInfoComponent implements OnInit {
  SelectedEngineeringPart: string = ""
  SelectedServicePart: string = ""
  SelectedPartnerPart: string = ""
  checked1: boolean = true;
  checked2: boolean = false;
  Origin: any
  Sequence: any
  epdtk: any
  result: any
  engrdes: any
  Rational: any
  deletepop: boolean = false;
  bluepart: any
  materialcontent: any
  kit: any
  desc: any
  regulatedpart: any
  lexi: any
  motorcraft: any
  partlocator: any
  nags: any
  selected: any
  char: string = "";
  serviceAll: any;
  partner:any;
  parts:any[]=[];
  service: any;
  checkser: boolean = false;
  checkfin: boolean = false;
  flag: number = 0;
  ref1: string = "none";
    ref2: string = "block";
    ref3: string = "none";
    ref4: string = "block";
    
  engineeringDrop: any = [

  ];



  alert: any = {
    flag: false,
    msg: "",
  }

  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }

  constructor(private primeng: PrimeNGConfig, private engineering: PartInfoService, private router: Router) { }

  ngOnInit(): void {
    // this.engineering.getEngineeringDropdown().subscribe((res:any)=>{
    //   this.engineeringDrop=res;

    // })
    this.showCenterPart();
    this.showCenterPart2();
    this.showCenterPart3();
  
//     


  }
  
  getEngineeringPart() {
    // if (this.selected == 'engineer') {
      this.ref1 = "none";
        this.ref2 = "block";
        this.ref3 = "none";
        this.ref4 = "block";
      console.log(this.SelectedEngineeringPart);
      const s = this.SelectedEngineeringPart;
      var str: any = [];
      str = s.replace("-", "").split(" ");

      var str1 = "";
      for (let i = 0; i < str.length; i++) {
        str1 = str1 + str[i];

      }
      console.log(str1 + " jj");
      this.SelectedEngineeringPart = str1;
      this.engineering.getEngineeringpPart(this.SelectedEngineeringPart).subscribe((res: any) => {


        //this.alertPopup("Please Select Analyst Id");
        //console.log(res);

        this.result = res;
        console.log(this.result.status);



        console.log(this.result);
        this.engrdes = this.result.engpWersPart;
        this.Origin = this.result.eioOrigin;
        this.Sequence = this.result.engpSeq;
        this.epdtk = this.result.EptdkReas;
        this.Rational = this.result.engpRatnlze;
        this.bluepart = this.result.engpBluprtPrtR;
        this.materialcontent = this.result.engpMatlCntnt;
        this.kit = this.result.engpKit;
        this.desc = this.result.lexcDescLongX;
        this.SelectedServicePart = this.result.spartPartNbr;
        this.SelectedPartnerPart = this.result.d20PartR;
        this.parts=[{d20PartR:this.result.d20PartR}];

        console.log("partnerpart"+this.parts);
        console.log(this.result.spartPartNbr);
        this.regulatedpart = this.result.engpRegulatedPart;
        if (this.result.engpIndusPrt == null) {
          this.nags = "No";
        } else {
          this.nags = this.result.engpIndusPrt;
        }
        // if(this.flag==2){
        //   console.log("A2");
        // this.getServicePartAll();
        // }
        this.getServicePartAll();
      }, (err: any) => this.alertPopup("Please Enter Valid Engineering Part Value"))



    // }
     
    // else if (this.selected == 'partner') {
    //   this.ref1 = "none";
    //     this.ref2 = "block";
    //   this.getPartnerPart();

    // }



  }
  engPart(){
    this.ref1 = "none";
        this.ref2 = "block";
        this.ref3 = "none";
        this.ref4 = "block";
  }
  partnerPart(){
    this.ref1 = "none";
        this.ref2 = "block";
        this.ref3 = "block";
        this.ref4 = "none";
  }
  part(){
    
      this.ref1 = "block";
        this.ref2 = "none";
        this.ref3 = "none";
        this.ref4 = "block";
      // this.getServicePart();


    
  }

  alertpop() {
    this.alert.flag = false;
  }

  getServicePart() {
    
    
      
    const s = this.SelectedServicePart;
    var str: any = [];
    str = s.replace(" ", "").split("-");

    var str1 = "";
    for (let i = 0; i < str.length; i++) {
      str1 = str1 + str[i];

    }
    console.log(str1 + " jj");
    this.SelectedServicePart = str1;

    this.engineering.getServicePart(this.SelectedServicePart).subscribe((res: any) => {
      this.result = res;
      this.SelectedEngineeringPart = this.result.engpEngnrgPart;
      this.Origin = this.result.eioOrigin;
      this.Sequence = this.result.engpSeq;
      this.engrdes = this.result.engpWersPart;
      this.bluepart = this.result.engpBluprtPrtR;

      this.nags = this.result.engpIndusPrt;
      this.lexi = this.result.lexcDescLongX;


    }, (err: any) => this.alertPopup("Please Enter Valid Service Part Value"))
  }
 
  getServicePartAll() {
    this.ref1 = "none";
        this.ref2 = "block";
    console.log(this.SelectedEngineeringPart);
    console.log(this.checked1);
    console.log(this.checked2);

    if (this.SelectedEngineeringPart != null && this.SelectedEngineeringPart != "") {
      this.serviceAll = [];
      this.engineering.getServicePartAll(this.SelectedEngineeringPart).subscribe((res: any) => {
        console.log(res);
        if (this.checked1 && this.checked2) {
          
          this.serviceAll = res;

        }
        else if (this.checked1) {
          for (const input of res) {
            console.log(input);
            console.log(input.spartPartNbr);
            console.log(input.spartPartNbr.startsWith("FINIS"));
            if (!input.spartPartNbr.startsWith("FINIS")) {
              this.serviceAll.push(input);
            }
          }
        } else if (this.checked2) {
          for (const input of res) {
            console.log(input);
            console.log(input.spartPartNbr);
            console.log(input.spartPartNbr.startsWith("FINIS"));
            if (input.spartPartNbr.startsWith("FINIS")) {
              this.serviceAll.push(input);
            }
          }
        }
      })
    }
  }

  context(){
    localStorage.setItem('Screen','PartInfo');
    this.router.navigate(['/context']);
  }

  getPartnerPart() {
    const s = this.SelectedPartnerPart;
    var str: any = [];
    str = s.replace(" ", "").split("-");

    var str1 = "";
    for (let i = 0; i < str.length; i++) {
      str1 = str1 + str[i];

    }
    console.log(str1 + " jj");
    this.SelectedPartnerPart = str1;

    this.engineering.getPartnerPart(this.SelectedPartnerPart).subscribe((res: any) => {
      this.parts = res;

      console.log("partner"+this.result);
      this.SelectedEngineeringPart = this.result.engpEngnrgPart;
      this.Origin = this.result.eioOrigin;
      this.Sequence = this.result.engpSeq;
      


    }, (err: any) => this.alertPopup("Please Enter Valid Partner Part Value"))

  }

  deletePart() {
    this.engineering.deletePart(this.SelectedEngineeringPart).subscribe((res: any) => {
      this.result = res;
      console.log(res)
      if (res == null) {
        this.alertPopup("Please Enter a Valid Number")
      } else
        this.alertPopup("Data Deleted Successfully")
    }, (err: any) => this.alertPopup("Cannot perform this action . Only one service part relation is existing "))
  }

  recoverInactivatedPart() {

  }

  partnerRadio(radio: any) {
    this.selected = radio;

  }

  display: any = "block"
  display1: any = "block"
  count: any = 0;
  counts: any = 0;
  countss: any = 0;
  rotate: string = "rotate(45deg)";
  rotate1: string = "rotate(45deg)";
  rotate2: string = "rotate(45deg)";
  display2: any = "block"
  br: string = "5px"
  br1: string = "5px"
  br2: string = "5px"
  showCenterPart() {
    if (this.count == 0) {
      this.display = "block"
      this.count = 1;
      this.br = "5px 5px 0px 0px"

      this.rotate = "rotate(45deg)";


    } else {
      this.display = "none"
      this.count = 0;
      this.br = "5px";
      this.rotate = "rotate(0deg)"



    }
  }
  showCenterPart2() {
    if (this.counts == 0) {
      this.display1 = "block"
      this.counts = 1;
      this.br1 = "5px 5px 0px 0px"
      this.rotate1 = "rotate(45deg)";
    } else {
      this.counts = 0;
      this.display1 = "none"
      this.br1 = "5px";

      this.rotate1 = "rotate(0deg)"
    }
  }
  showCenterPart3() {
    if (this.countss == 0) {
      this.display2 = "block"
      this.countss = 1;
      this.br2 = "5px 5px 0px 0px"

      this.rotate2 = "rotate(45deg)";
    } else {
      this.countss = 0;
      this.display2 = "none"
      this.br2 = "5px";
      this.rotate2 = "rotate(0deg)"

    }
  }
  closeClick() {
    this.router.navigate(['']);
  }
  deletePopuptrue() {
    this.deletepop = true;
  }


}


