import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-work-queue',
  templateUrl: './illustrator-work.component.html',
  styleUrls: ['./illustrator-work.component.css']
})
export class IllustratorWorkComponent implements OnInit {

  showTable: boolean = false;

  regions: string[] = ["Asia", "North America", "South America","Australia"];
  groups: string[] = ["Group 1","Group 2","Group 3","Group 4"];

  parts = [
                  {irp: 628538,pt:"T",section:"10000220XA,Remote Starting kit",vehicleline:"C7",illustrationid:"X03467014",revsion:0,percentagecomplete:"100%",effindate:"01-APR-21"},
                  {irp: 628539,pt:"T",section:"10000220XG,AudioKit-Accessory",vehicleline:"C7",illustrationid:"X93154607 ",revsion:0,percentagecomplete:"77%",effindate:"01-APR-21"},
                  {irp: 628520,pt:"C",section:"10000220XR,Remote Starting kit",vehicleline:"C7",illustrationid:"X70913968 ",revsion:0,percentagecomplete:"37%",effindate:"01-APR-21"},
                  {irp: 628531,pt:"C",section:"10000220XI,Body Dress Up Kit-Rare",vehicleline:"C7",illustrationid:"X07924805 ",revsion:0,percentagecomplete:"98%",effindate:"01-APR-21"},
                  {irp: 628542,pt:"C",section:"10000220XD,AudioKit-Accessory",vehicleline:"C7",illustrationid:"X63196931 ",revsion:0,percentagecomplete:"35%",effindate:"01-APR-21"},
                  {irp: 628554,pt:"T",section:"10000220XA,Accessory Entertainment Systems",vehicleline:"C7",illustrationid:"X79985148",revsion:0,percentagecomplete:"23%",effindate:"01-APR-21"},
                  {irp: 628588,pt:"C",section:"10000220XA,Body Dress Up Kit-Front",vehicleline:"C7",illustrationid:"X39388583",revsion:0,percentagecomplete:"43%",effindate:"01-APR-21"},
                  {irp: 628521,pt:"C",section:"10000220XA,Body Dress Up Kit-Rare",vehicleline:"C7",illustrationid:"X53781436",revsion:0,percentagecomplete:"87%",effindate:"01-APR-21"},
                  {irp: 628508,pt:"T",section:"10000220XA,Body Dress Up Kit-Side",vehicleline:"C7",illustrationid:"X54251260",revsion:0,percentagecomplete:"95%",effindate:"01-APR-21"},
                  {irp: 628534,pt:"T",section:"10000220XA,Head Light",vehicleline:"C7",illustrationid:"X65044476",revsion:0,percentagecomplete:"73%",effindate:"01-APR-21"},

                  ];

  ngOnInit(): void {
  }

  submit() {
    this.showTable = true;
  }

}
