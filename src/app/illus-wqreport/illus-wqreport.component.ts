import { Component, OnInit } from '@angular/core';
import { wqReportInput } from '../models/illusWQReportModel';
import { IllusWqReportService } from '../services/illus-wq-report.service';


@Component({
  selector: 'app-illus-wqreport',
  templateUrl: './illus-wqreport.component.html',
  styleUrls: ['./illus-wqreport.component.scss']
})
export class IllusWqreportComponent implements OnInit {

  group: any=[];
  region:any=[];
  name:any;
  // job1TransNewDateInput: Job1TransNewDateInput = new Job1TransNewDateInput;
  wqinput:wqReportInput =new wqReportInput

  constructor(private service:IllusWqReportService) {

    this.group=[
      { name: 'Group 1' },
      { name: 'Group 2' },
      { name: 'Group 3' },
      { name: 'Group 4' },
      { name: 'Group 5' },
      { name: 'Group 6' },
    ];
    this.region=[
      { name: 'North America' },
      { name: 'Europe' },
      { name: 'South America' },
      { name: 'Asia' },
     
    ];

  }
  
  ngOnInit(): void {
    
  }
  display:string="block"
  display1:any="none"
  count:any=0;
  counts:any=0
  rotate:any;
  br1:string="5px 5px 0px 0px"
  br2:string="5px"
  showCenterPart(){
    if(this.count==0){
      this.display="none"
      this.count=1;
      this.br1="5px"
      this.rotate="rotate(0deg)"
    }else{
      this.br1="5px 5px 0px 0px"
      this.display="block"
      this.count=0;
      this.rotate="rotate(45deg)"
     
    }
  }
show1table:boolean=false;
show2table:boolean=false;
  showTableBox(){
    if(this.wqinput.group=="3"){
      this.show1table=true
      this.show2table=false
    }else{
      this.show1table=false
      this.show2table=true
    }
  }



  showData:boolean=false
  apiValue:any;
  data:any
  showtable:boolean=false
  alert:any={flag:false,msg:""};
  showReport(){
    this.wqinput.region=this.value1;
    this.wqinput.group=this.value
    if(this.value1==""||this.value==""){
      this.alertPopup("Please select mandatory fields")
    }else{
      this.service.getCode(this.wqinput).subscribe((data:any)=>{

        this.data=data;
        if(data.length==0){
         
          this.alertPopup("No records found")
          this.showtable=false;
        }else{
        this.showtable=true;
      }


        // this.showtable=true;
        console.log(data);
      }
  
      )
    }
    // 
    

    this.showData=true
  }
  alertPopup(data:string){
    this.alert.flag=true;
    this.alert.msg=data;
   }
   cancelpop(){
    this.alert.flag=false;
  }

  part = [
    {  reports:"Null",values:"Null", numberOfSection:"Null",sectionWithCompletedIllustrations:"Null",rejectedIRPs:"Null",sectionWithOpenIRPs:"Null",illustrationWithTheCoordinator:"Null",illustrationWithTheArtHouses:"Null",illustrationWithTheAnalyst:"Null",sectionWithoutIllustrations:"Null"},
    {  reports:"Null",values:"Null", numberOfSection:"Null",sectionWithCompletedIllustrations:"Null",rejectedIRPs:"Null",sectionWithOpenIRPs:"Null",illustrationWithTheCoordinator:"Null",illustrationWithTheArtHouses:"Null",illustrationWithTheAnalyst:"Null",sectionWithoutIllustrations:"Null"},
    {  reports:"Null",values:"Null", numberOfSection:"Null",sectionWithCompletedIllustrations:"Null",rejectedIRPs:"Null",sectionWithOpenIRPs:"Null",illustrationWithTheCoordinator:"Null",illustrationWithTheArtHouses:"Null",illustrationWithTheAnalyst:"Null",sectionWithoutIllustrations:"Null"},
    {  reports:"Null",values:"Null", numberOfSection:"Null",sectionWithCompletedIllustrations:"Null",rejectedIRPs:"Null",sectionWithOpenIRPs:"Null",illustrationWithTheCoordinator:"Null",illustrationWithTheArtHouses:"Null",illustrationWithTheAnalyst:"Null",sectionWithoutIllustrations:"Null"},
    {  reports:"Null",values:"Null", numberOfSection:"Null",sectionWithCompletedIllustrations:"Null",rejectedIRPs:"Null",sectionWithOpenIRPs:"Null",illustrationWithTheCoordinator:"Null",illustrationWithTheArtHouses:"Null",illustrationWithTheAnalyst:"Null",sectionWithoutIllustrations:"Null"},
    {  reports:"Null",values:"Null", numberOfSection:"Null",sectionWithCompletedIllustrations:"Null",rejectedIRPs:"Null",sectionWithOpenIRPs:"Null",illustrationWithTheCoordinator:"Null",illustrationWithTheArtHouses:"Null",illustrationWithTheAnalyst:"Null",sectionWithoutIllustrations:"Null"},
    
     ];
     
  value:string=""
  value1:string=""
  reg:string=''
  grp:string=''
  mine(event:any){   
    if(event.value.name=="Group 1"){this.value="1";this.grp=event.value.name;}
    if(event.value.name=="Group 2"){this.value="2";this.grp=event.value.name;}
    if(event.value.name=="Group 3"){this.value="3";this.grp=event.value.name;}
    if(event.value.name=="Group 4"){this.value="4";this.grp=event.value.name;}
    if(event.value.name=="Group 5"){this.value="5";this.grp=event.value.name;}
    if(event.value.name=="Group 6"){this.value="6";this.grp=event.value.name;}
    if(event.value.name=="North America"){this.value1="N";this.reg=event.value.name;}
    if(event.value.name=="Europe"){this.value1="E";this.reg=event.value.name;}
    if(event.value.name=="South America"){this.value1="S";this.reg=event.value.name;}
    if(event.value.name=="Asia"){this.value1="A";this.reg=event.value.name;}  
}

}
