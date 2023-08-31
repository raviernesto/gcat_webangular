import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Sectionprefixsave } from '../models/sectionprefixsave';
import { SectionprefixService } from '../services/sectionprefix.service';
// import { SectionprefixService } from '../sectionprefix.service';
// import { Sectionprefixsave } from '../sectionprefixsave';

@Component({
  selector: 'app-section-prefix-management',
  templateUrl: './section-prefix-management.component.html',
  styleUrls: ['./section-prefix-management.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SectionPrefixManagementComponent implements OnInit {

  enggBase: boolean = false;
  commodityprefix: any[] = [];
  commodity: any[] = [];
  data: any;
  prefixdrop: any;
  prefix = [];
  detail = [];
  prefixCode: any;
  dropdown: any;
  famprefxPrefixC: any;
  famprefxDescX: any;
  prefixDescription: any;
  selectedProduct3: any;
  selectedProduct4: any;
  i: number = 0;
  ri: number = 0;
  count: number = 0;
  savebtn: number = 0;
  radiobtn: number = 0;
  sectionprefixsave: Sectionprefixsave = new Sectionprefixsave;
  tempAdded = [];
  tempDelete = [];
  count1: number = 0;
  lexcC!:{};
  deletealert1:any={flag:false,msg:""};
  count2: any = 0;
  counts: any = 0
  rotate: string="rotate(45deg)";
  display: any = "block";
  display1:any="block"
  countrow:number=0;
  rotate1:string="rotate(45deg)"; 
  br1:string="5px 5px 0px 0px"
  br2:string="5px 5px 0px 0px"
  // responsiveHeight:String="750px"
  startsWith="startsWith";
  


  EnggBase() {
    this.enggBase = true;
  }

  constructor(private sectionprefixService: SectionprefixService,private router:Router) {

  }

  selectradio() {
    this.savebtn = 1;
  }
  radio() {
    this.radiobtn = 1;
  }

  showCenterPart(){
    if(this.count==0){
      this.display="none"
      this.count=1;
      this.br1="5px "
      this.rotate="rotate(0deg)"
    }else{
      this.br1="5px 5px 0px 0px"
      this.display="block"
      this.count=0;
      this.rotate="rotate(45deg)"
    }
  }
  showCenterPart2(){
    if(this.counts==0){
      this.display1="none"
      this.counts=1;
      this.br2="5px "
      this.rotate1="rotate(0deg)"
    }else{
      this.br2="5px 5px 0px 0px"
      this.rotate1="rotate(45deg)"
      this.counts=0;
      this.display1="block"
    }
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

  cancelpop(){
    this.alert.flag=false;
    this.deletealert1.flag=false;
  }

  changePrefix() {
    this.sectionprefixService.getCommoditySuffix().subscribe((res: any) => {
      this.data = res;
      this.commodityprefix = this.data;
      console.log(this.commodityprefix);


    })
  }
  table() {
    this.sectionprefixService.getAllfeaturesValue().subscribe((res: any) => {
      this.prefix = res;
      console.log(this.prefix);
    })
  }

  selectButton() {
    console.log(this.dropdown);
    console.log(this.famprefxPrefixC);
    console.log("selectbutton");
    this.prefixCode = this.dropdown.famprefxPrefixC;
    this.prefixDescription = this.dropdown.famprefxDescX;
    this.sectionprefixService.getSelectButton(this.dropdown.famprefxPrefixC).subscribe((res: any) => {
      this.detail = res;
      console.log(this.detail);
    })
  }

  clickedRow(){
  for(this.i=0;this.i<this.detail.length;this.i++){
    if(this.prefix[this.count]['lexcC']==this.detail[this.i]['lexcC'])
      this.countrow++;
  }
    if(this.countrow>0)
    {
     this.alertPopup("Already exist");
     this.countrow=0;
    }
    else{
      this.add();
    }
  }

  New() {
    this.dropdown = '';
    this.prefixCode = "";
    this.prefixDescription = "";
    this.detail = [];
  }
  savePrefixCode() {

    if(this.prefixCode==""){
      this.alertPopup("Please Enter a Prefix Code")
    }
    else{
    this.sectionprefixsave.famprefxPrefixC = this.prefixCode;
    this.sectionprefixsave.famprefxDescX = this.prefixDescription;
    this.sectionprefixsave.tempAdded = this.tempAdded;
    this.sectionprefixsave.tempDelete = this.tempDelete;
    this.sectionprefixService.savePrefixCode(this.sectionprefixsave,this.prefixCode).subscribe((res: any) => {
      console.log(res);
      this.alertPopup("Data Saved Successfully");

    });
    this.tempAdded = [];
    this.tempDelete = [];
  }
  }

  wbs(){
    this.router.navigateByUrl('/wbs');
  }

  radioclick(i: number) {
    this.count = i;
  }

  add() {
        this.detail.push(this.prefix[this.count]);
        this.tempAdded.push(this.prefix[this.count]['lexcC']);  
  }

  Remove() {

    this.tempDelete.push(this.detail[this.count]['lexcC']);
    this.detail.splice(this.count, 1);
    console.log(this.tempDelete);
  }

 

  ngOnInit(): void {
    this.table();
  }


}
