import { Component, OnInit } from '@angular/core';
import { IllworkService } from '../services/illwork.service';

@Component({
  selector: 'app-illustrator-wq',
  templateUrl: './illustrator-wq.component.html',
  styleUrls: ['./illustrator-wq.component.scss']
})
export class IllustratorWqComponent implements OnInit {
  vehicleLine: any=[];
  part=[];
  constructor(private service:IllworkService) {
    this.vehicleLine=[
      { name: 'option1' },
      { name: 'option2' },
      { name: 'option3' },
    ];
   }

  ngOnInit(): void {
    this.rotate="rotate(45deg)"
    this.br1="5px 5px 0px 0px"
   
  }

  newReport(){
this.service.reportNew().subscribe((res:any)=>{
this.part =res;
console.log(this.part)
})
  }
  updateReport(){
    this.service.reportUpdate().subscribe((res:any)=>{
      this.part =res;
      console.log(this.part)
    })
  }
  allreport(){
    this.service.reportAll().subscribe((res:any)=>{
      this.part =res;
      console.log(this.part)
    })
  }
  display:string="block"
  display1:any="none"
  count:any=0;
  counts:any=0
  rotate:any;
  br1:string="5px"
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
  showData:boolean=false
  showReport(){
    this.showData=true
  }

  // part = [
  //   {  reports:"Null",values:"Null", numberOfSection:"Null",sectionWithCompletedIllustrations:"Null",rejectedIRPs:"Null",sectionWithOpenIRPs:"Null",illustrationWithTheCoordinator:"Null",illustrationWithTheArtHouses:"Null",illustrationWithTheAnalyst:"Null",sectionWithoutIllustrations:"Null"},
  //   {  reports:"Null",values:"Null", numberOfSection:"Null",sectionWithCompletedIllustrations:"Null",rejectedIRPs:"Null",sectionWithOpenIRPs:"Null",illustrationWithTheCoordinator:"Null",illustrationWithTheArtHouses:"Null",illustrationWithTheAnalyst:"Null",sectionWithoutIllustrations:"Null"},
  //   {  reports:"Null",values:"Null", numberOfSection:"Null",sectionWithCompletedIllustrations:"Null",rejectedIRPs:"Null",sectionWithOpenIRPs:"Null",illustrationWithTheCoordinator:"Null",illustrationWithTheArtHouses:"Null",illustrationWithTheAnalyst:"Null",sectionWithoutIllustrations:"Null"},
  //   {  reports:"Null",values:"Null", numberOfSection:"Null",sectionWithCompletedIllustrations:"Null",rejectedIRPs:"Null",sectionWithOpenIRPs:"Null",illustrationWithTheCoordinator:"Null",illustrationWithTheArtHouses:"Null",illustrationWithTheAnalyst:"Null",sectionWithoutIllustrations:"Null"},
  //   {  reports:"Null",values:"Null", numberOfSection:"Null",sectionWithCompletedIllustrations:"Null",rejectedIRPs:"Null",sectionWithOpenIRPs:"Null",illustrationWithTheCoordinator:"Null",illustrationWithTheArtHouses:"Null",illustrationWithTheAnalyst:"Null",sectionWithoutIllustrations:"Null"},
  //   {  reports:"Null",values:"Null", numberOfSection:"Null",sectionWithCompletedIllustrations:"Null",rejectedIRPs:"Null",sectionWithOpenIRPs:"Null",illustrationWithTheCoordinator:"Null",illustrationWithTheArtHouses:"Null",illustrationWithTheAnalyst:"Null",sectionWithoutIllustrations:"Null"},
    
  //    ];

}
