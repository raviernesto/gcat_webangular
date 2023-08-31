import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  MismatchService } from '../services/mismatch.service';

@Component({
  selector: 'app-mismatch-report-detail',
  templateUrl: './mismatch-report-detail.component.html',
  styleUrls: ['./mismatch-report-detail.component.scss']
})
export class MismatchReportDetailComponent implements OnInit {
irpnumber!:string;
vehline!:string;
irp!:string;
ill!:string;
sec!:string;

prefix!:string;
irp1!:string;
ill1!:string;
sec1!:string;

prefix1!:string;
irp2!:string;
ill2!:string;
sec2!:string;

  parts2=[];
  parts3=[];
  parts4=[];
  veh:boolean=false;
  grp:boolean=false;
  pre:boolean=false;
  constructor(private route:ActivatedRoute,private router:Router,private mismatch: MismatchService) { }

  ngOnInit(): void {
  //  this.link();
  // this.route.queryParams.subscribe((params: any) => {
  //   console.log(params) 
  //   this.vehline=params.vehline;
  //   this.irp=params.irp;
  //   this.ill=params.ill;
  //   this.sec=params.sec;
  // } );
  console.log("hello ="+localStorage.getItem('display'));
if(localStorage.getItem('display')=="one"){
  this.veh1();
} 
 if(localStorage.getItem('display')=="two"){
  this.grp1();
  
} 
 if(localStorage.getItem('display')=="three"){
  this.pre1();
}  

// link(){
//   this.testdata = localStorage.getItem('object');
//  this.irpnumber=this.testdata.irp;
//  console.log("testdata :"+this.testdata.irp);
//  console.log("ngmodel :"+this.irpnumber);
//   console.log(localStorage.getItem('object'));
// }
  }
  veh1(){
  this.vehline=localStorage.getItem('vehline')||"";
  this.irp= localStorage.getItem('irp')||"";
  this.ill=localStorage.getItem('ill')||"";
  this.sec=localStorage.getItem('sec')||"";
  
  this.mismatch.fetchtable(this.ill).subscribe((res: any) => {
    this.parts2 = res;
    console.log("vehicle"+this.parts2);
    this.veh=true;
  })
}
grp1(){
  this.prefix=localStorage.getItem('prefix')||"";
  this.irp1= localStorage.getItem('irp1')||"";
  this.ill1=localStorage.getItem('ill1')||"";
  this.sec1=localStorage.getItem('sec1')||"";

  this.mismatch.fetchtable(this.ill1).subscribe((res: any) => {
    this.parts3 = res;
    console.log("group"+this.parts3);
    this.grp=true;
  })
}
pre1(){
  this.prefix1=localStorage.getItem('prefix1')||"";
  this.irp2= localStorage.getItem('irp2')||"";
  this.ill2=localStorage.getItem('ill2')||"";
  this.sec2=localStorage.getItem('sec2')||"";

  this.mismatch.fetchtable(this.ill2).subscribe((res: any) => {
    this.parts4 = res;
    console.log("prefix"+this.parts4);
    this.pre=true;
  })
}


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
