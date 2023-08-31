import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commodity-setup',
  templateUrl: './commodity-setup.component.html',
  styleUrls: ['./commodity-setup.component.css']
})
export class CommoditySetupComponent implements OnInit {
  display:boolean=true;
  vehicleName:any[];
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
