import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../shared/services/utilities.service';
import {MenuItem} from 'primeng/api'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-sampleapp',
  templateUrl: './sampleapp.component.html',
  styleUrls: ['./sampleapp.component.scss']
})
export class SampleappComponent implements OnInit {
  items: MenuItem[]=[];
  title = 'GCAT';
  isLoading:boolean=false;
  showcolor: any;
  showicon:any;
  changeWidth: any;
  changeWidth1: any;
  changeMargin:any
  count:number=0;
  opac: any
  icon1:any="none";
  icon2:any
  icon3:any
  timestamp: any;
  currentTime:any
  constructor(public utilitiesService:UtilitiesService,private date:DatePipe) { }

  ngOnInit(): void {
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
  
}
