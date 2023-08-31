import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
 import { TemplateServiceService } from '../services/template-service.service';

@Component({
  selector: 'app-template-setup',
  templateUrl: './template-setup.component.html',
  styleUrls: ['./template-setup.component.css']
})
export class TemplateSetupComponent implements OnInit {

  constructor( private primeng:PrimeNGConfig,private engineering : TemplateServiceService) { }

  ngOnInit(): void {
    this.templateId=localStorage.getItem('templateId');
    this.newTemplate=localStorage.getItem('newTemplate');
    console.log(this.templateId);
    this.getTemplate()
    
  }
  
 
  templateId:any;
  newTemplate:any;
  display:any="none"
  display1:any="none"
  count:any=0;
  counts:any=0;
  result:any;
  countss:any=0;
  hello !:string;
  munch!:any;
  rotate:any;
  display2:any="block"
  showCenterPart(){
    if(this.count==0){
      this.display="block"
      this.count=1;
      this.rotate="rotate(45deg);"
    }else{
      this.display="none"
      this.count=0;
      this.rotate="rotate(0deg);"
    }
  }
  showCenterPart2(){
    if(this.counts==0){
      this.display1="block"
      this.counts=1;
    }else{
      this.counts=0;
      this.display1="none"
    }
  }
  showCenterPart3(){
    if(this.countss==0){
      this.display2="block"
      this.countss=1;
    }else{
      this.countss=0;
      this.display2="none"
     
    }
  }
  getTemplate(){
 
    this.engineering.getTemplate(this.templateId).subscribe((res:any) => {this.result=res;
      this.munch=this.result.test1; 
      this.munch=this.result.test2;
      console.log(this.templateId)
      console.log(res)
      
      
     
  
    })
  
   }



}
