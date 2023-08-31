import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { UtilitiesService } from './shared/services/utilities.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: MenuItem[]=[];
  title = 'GCAT';
  isLoading:boolean=false;

  size:any;

  QAccess(){
    // window.alert("works hari")
    this.size="19%"
  }

  constructor(public utilitiesService:UtilitiesService,private date:DatePipe) { }
  ngOnInit() {
    this.timestamp= new Date();
    this.currentTime=this.date.transform(this.timestamp,'yyyy-MM-dd-hh-mm-ss');
    this.isLoading=this.utilitiesService.loading$.value;
    this.items = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
        {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
        {label: 'Documentation', icon: 'pi pi-fw pi-file'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];
}

showcolor: any;
showicon:any;
changeWidth: any;
changeWidth1: any;
changeMargin:any
count:number=0;
opac: any
icon1:any="none";

timestamp: any;
currentTime:any
showspan(){
  this.showcolor="white"
  this.showicon="visible"
}
hidespan(){
  this.showcolor="transparent"
}
transformation(){
  if(this.count==0){
    this.changeWidth="18%"
    this.changeWidth1="82%"
    this.changeMargin="14%"
    this.count=1;
    this.opac="1";
    this.icon1="inline-block"
  }
  else{
    console.log("hariharan");
    this.changeWidth="4%"
    this.changeWidth1="96%"
    this.count=0;
    this.changeMargin="0%"
    this.opac="1"
    this.icon1="none"
    this.changeMargin="0"

  }
 
  }

}
