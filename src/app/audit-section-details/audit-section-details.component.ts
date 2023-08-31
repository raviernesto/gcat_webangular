import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuditreportService } from '../services/auditreport.service';
import { UtilitiesService } from '../shared/services/utilities.service';

@Component({
  selector: 'app-audit-section-details',
  templateUrl: './audit-section-details.component.html',
  styleUrls: ['./audit-section-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuditSectionDetailsComponent implements OnInit {
  sectionid:any;
 lang:any;
 vLine:string='';
 auditdetails:any;
 switchview:number=0;
 arrow:string="<< ";
 sectionproperties:any[]=[];
 i:any;
 arr:any[]=[];
 dist:number=0;
 property:any;
  constructor(private api:AuditreportService,public utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.auditDetails();
    
  }
  auditDetails(){
    this.sectionid=localStorage.getItem('sectionid')==null ?" ":localStorage.getItem('sectionid');
    this.lang=localStorage.getItem('lang')?localStorage.getItem('lang'):'';
    this.property=localStorage.getItem('property')?localStorage.getItem('property'):'';
    this.api.getSection(this.lang,this.sectionid).subscribe((res:any)=>{
      console.log(res);
      this.auditdetails=res;
    })
    this.utilitiesService.setLoading(true);
    this.api.getSectionProp(this.sectionid,this.lang).subscribe((res:any)=>{
      this.utilitiesService.setLoading(false);
      console.log(res);
      this.sectionproperties=res;
      for(this.i in this.sectionproperties){
        var sectionpropertiesObj={"sectionproperties":this.sectionproperties[this.i].cmdtSufx};
        this.arr.push(sectionpropertiesObj);
      }
    })
  }
  switchView(){
    this.switchview=1;
  }

  display:any="block"
  display1:any="block"
  count:any=0;
  counts:any=0
  rotate:string="rotate(45deg)";
  rotate1:string="rotate(45deg)"; 
  br1:string="5px 5px 0px 0px"
  br2:string="5px 5px 0px 0px"
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
  showCenterPart2(){
    if(this.counts==0){
      this.display1="none"
      this.counts=1;
      this.br2="5px "
      this.rotate1="rotate(0deg)"
    }else{
      this.br2="5px 5px 0px 0px"
      this.rotate1="rotate(45deg)"
      this.counts=0;
      this.display1="block"
    }
  }

}
