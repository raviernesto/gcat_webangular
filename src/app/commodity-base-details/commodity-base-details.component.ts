import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-commodity-base-details',
  templateUrl: './commodity-base-details.component.html',
  styleUrls: ['./commodity-base-details.component.css']
})
export class CommodityBaseDetailsComponent implements OnInit {
  display:boolean=true;
  vehicleName: any[];
  constructor() {
    this.vehicleName = [
      {name: '1-option'},
      {name: '2-option'},
      {name: '3-option'},
  ];
   }
  
  ngOnInit(): void {
  }

}
