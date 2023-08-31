import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wbs-management',
  templateUrl: './wbs-management.component.html',
  styleUrls: ['./wbs-management.component.css']
})
export class WbsManagementComponent implements OnInit {
commodityType:any[];
section :any[];
  constructor() {   this.commodityType = [
    { name: 'option1' },
    { name: 'option2' },
    { name: 'option3' },
  ];
  this.section = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
  ];
}

  ngOnInit(): void {
  }

}
