
import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-calibration-list-setup',
  templateUrl: './calibration-list-setup.component.html',
  styleUrls: ['./calibration-list-setup.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class CalibrationListSetupComponent implements OnInit {
  displayBasic: boolean= false;
  showContent:boolean= false;
  tab: string ="";

  CalListNumber:any=[
    {CalListNumber:""},
    {CalListNumber:"Option1"},
    {CalListNumber:"Option2"}
  ];
  CalibrationNumber:any=[
    {CalibrationNumber:""},
    {CalibrationNumber:"Option1"},
    {CalibrationNumber:"Option2"}
  ];
  CatchCode:any=[
    {CatchCode:""},
    {CatchCode:"Option1"},
    {CatchCode:"Option2"}
  ];
  constructor() { }
  showBasicDialog() {
    this.displayBasic = true;

}


  ngOnInit(): void {
    
  }
  tabValue(value:string){
    this.tab= value;
    console.log(this.tab);
  }

show(){
  this.showContent=true;
}
}
