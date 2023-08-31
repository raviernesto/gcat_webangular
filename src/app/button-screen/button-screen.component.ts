import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-screen',
  templateUrl: './button-screen.component.html',
  styleUrls: ['./button-screen.component.css']
})
export class ButtonScreenComponent implements OnInit {
  commoditySetupReply: boolean = false;
  changePublicationDate: boolean = false;
  enggBase: boolean = false;
  avs: boolean = false;
  commodityStatus: boolean = false;
  CommoditySetupReply(){
    this.commoditySetupReply = true;
  }
  ChangePublicationDate(){
    this.changePublicationDate = true;
  }
  EnggBase(){
    this. enggBase= true;
  }
  Avs(){
    this.avs= true;
  }
  CommodityStatus(){
    this.commodityStatus = true;
  }
 Reason:any=[
    {code:"Reason code1"},
    {code:"Reason code2"},
    {code:"Reason code3"}
  ]
  Reasoncode:any=[
    {reasoncode:"Reason code1"},
    {reasoncode:"Reason code2"},
    {reasoncode:"Reason code3"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
