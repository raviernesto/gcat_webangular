import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuditreportService } from '../services/auditreport.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-audit-section-view',
  templateUrl: './audit-section-view.component.html',
  styleUrls: ['./audit-section-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuditSectionViewComponent implements OnInit {
  currentTime: any;
  today: number = Date.now();
  timeStamp: Date | undefined;
  visible:string="Show"
  iteration1: number =0;
  iteration2: number =0;
  imgShow:boolean=false
  auditButton:string="Off"
  z1:string="1";
  z2:string="0";
  startsWith="startsWith";
  productType:any;
  vehicleType:any;
  ModelList:any[]=[];
  SectionList:any[]=[];
  vehicleLine:any;
  vLine:string='';
  group:any;
  section:any;
  alert:any={flag:false,msg:""};
  showReportData: any[]=[];
  showReportStatus: boolean =false;
  
  constructor(public datepipe: DatePipe,private api:AuditreportService,public utilitiesService : UtilitiesService) { }
  GroupList: any = [
    { id: "1", groups: "1: Information and Customization" },
    { id: "2", groups: "2: Chassis" },
    { id: "3", groups: "3: Powertrain" },
    { id: "4", groups: "4: Electrical" },
    { id: "5", groups: "5: Body and paint" },
    { id: "6", groups: "6: Routine Maintenance" }
  ];
  VehicleTypes:any=[
    {id:"C",type:"Car"},
    {id:"T",type:"Truck"}
  ]
  
  
  ngOnInit(): void {
    console.log(this.today)
    this.timeStamp= new Date();
    this.currentTime= this.datepipe.transform(this.timeStamp, 'dd-MMM-yyyy-hh-mm-ss');
    console.log( this.currentTime)
  }
  getModel(){
    this.ModelList=[];
    console.log(this.vehicleType);
    this.api.getvLineAndDesc(this.vehicleType.id).subscribe((res:any)=>{
      console.log(res);
      this.ModelList=res;
    })
  }
  reset(){
    this.ModelList=[];
    this.SectionList=[];
    this.group='';
    this.group=null;
    this.vehicleType='';
    this.vehicleLine='';
    this.vehicleLine=null;
    this.section='';
    this.section=null;
    this.showReportStatus=false;
  }
  getSectionIdAndDesc(){
    this.SectionList=[];
    if(this.group.id!=''||this.vehicleLine.evlVehicleLineC!=''){
    this.utilitiesService.setLoading(true);
    if(this.group!=null){
      this.api.getSectionDescAndId(this.group.id,this.vehicleLine.evlVehicleLineC).subscribe((res:any)=>{
        console.log(res);
        this.SectionList=res;
        this.utilitiesService.setLoading(false);
        if(this.SectionList.length==0)
          this.alertPopup("Section for the selected criteria not available!");
      })
    }
  }
  }
  tempidanddesc:string='';
  showReport() {
   if(this.section==null||this.vehicleLine==null||this.group==null||this.vehicleType==null||
   this.section==''||this.vehicleLine==''||this.group==''||this.vehicleType==''){
    this.alertPopup("Please select mandatory fields");
   } 
   else{
    this.utilitiesService.setLoading(true);
    this.tempidanddesc=this.section.lexcDescLongX;
    this.api.getShowReportData(this.section.templtIdR,this.vehicleLine.evlVehicleLineC).subscribe((res:any)=>{
      
      this.showReportData=res;
      this.utilitiesService.setLoading(false);
      console.log(res);
      if(this.showReportData.length==0){
        this.showReportStatus=false;
        this.alertPopup("No records found");
      }
      else if(this.showReportData.length==1){
        this.showReportStatus=false;
        this.gotolink();
      }
      else{
        this.showReportStatus=true;
      }
    })
   }
}
    gotolink(){
      localStorage.setItem('sectionid',this.showReportData[0].sectSectionIdR);
      localStorage.setItem('lang', "EN");
      localStorage.setItem('property',this.showReportData[0].lexcC==null ?" ":this.showReportData[0].lexcC);
      window.open('/auditdetails','_blank');
    }
    alertPopup(data:string){
    this.alert.flag=true;
    this.alert.msg=data;
  }
  cancelpop(){
    this.alert.flag=false;
  }
    testdata:any;
  goToLink(ri:number){
    localStorage.setItem('sectionid',this.showReportData[ri].sectSectionIdR);
    localStorage.setItem('lang', "EN");
    localStorage.setItem('property',this.showReportData[ri].lexcC==null ?" ":this.showReportData[ri].lexcC);
    window.open('/auditdetails','_blank');
   
  }
  display:any="block"
  count:any=0;
  rotate:string="rotate(45deg)" 
  br1:string="5px 5px 0px 0px"
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
}
