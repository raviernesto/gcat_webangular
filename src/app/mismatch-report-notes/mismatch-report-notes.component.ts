import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mismatch } from '../services/mismatch.service';

@Component({
  selector: 'app-mismatch-report-notes',
  templateUrl: './mismatch-report-notes.component.html',
  styleUrls: ['./mismatch-report-notes.component.scss']
})
export class MismatchReportNotesComponent implements OnInit {
veh:boolean=false;
grp:boolean=false;
pre:boolean=false;
irp!:string;
irp1!:string;
irp2!:string;
  constructor(private route:ActivatedRoute,private router:Router,private mismatch: Mismatch) { }

  ngOnInit(): void {
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
  }
  veh1(){
    this.irp= localStorage.getItem('irp')||"";
    this.veh=true;
  }
grp1(){
  this.irp1= localStorage.getItem('irp1')||"";
  this.grp=true;
}
pre1(){
  this.irp2= localStorage.getItem('irp2')||"";
  this.pre=true;
}

}
