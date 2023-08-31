import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AuditConsoModel } from '../models/auditconso.model';
import { AuditreportService } from '../services/auditreport.service';
import { UtilitiesService } from '../shared/services/utilities.service';

@Component({
  selector: 'app-audit-consolidate-report',
  templateUrl: './audit-consolidate-report.component.html',
  styleUrls: ['./audit-consolidate-report.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuditConsolidateReportComponent implements OnInit {

  constructor(private api:AuditreportService,public utilitiesService: UtilitiesService) { }
  data: any[]=[];
  testdata:any;
  vehType:string='';
  vtype:string='';
  vline:string='';
  vehicleType:any
  group:any;
  marketcode:any;
  marketc:string='';
  vehicleline:any;
  leadregion:any;
  leadrgn:string='';
  showData:boolean=false
  showReportData:any[]=[];
  startsWith="startsWith";
  auditConsoModel:AuditConsoModel=new AuditConsoModel();
  i:any;
  VehicleTypes:any=[
    {id:"C",type:"Car"},
    {id:"T",type:"Truck"}
  ]
  LeadRegionList: any = [
    { id: "N", leadRegions: "N - North America" },
    { id: "E", leadRegions: "E - Europe" },
    { id: "S", leadRegions: "S - South America" },
    { id: "A", leadRegions: "A - Asia Pacific" }
  ]

  MarketCodeList: any = [
    { id: "N", marketCodes: "N - North America" },
    { id: "E", marketCodes: "E - Europe" },
    { id: "S", marketCodes: "S - South America" },
    { id: "A", marketCodes: "A - Asia Pacific" }
  ]

  ModelList: any = []=[];

  GroupList: any = [
    { id: "All", groups: "ALL" },
    { id: "1", groups: "1: Information and Customization" },
    { id: "2", groups: "2: Chassis" },
    { id: "3", groups: "3: Powertrain" },
    { id: "4", groups: "4: Electrical" },
    { id: "5", groups: "5: Body and paint" },
    { id: "6", groups: "6: Routine Maintenance" }
  ]
  showReportStatus: boolean =false;
  alert:any={flag:false,msg:""};


  ngOnInit(): void {
  }
  

  display:any="block"
  count:any=0;
  rotate:string="rotate(45deg)";
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
  
  getModel(){
    this.ModelList=[];
    this.vehType=this.vehicleType.id;
    this.leadrgn=this.leadregion.id;
    this.marketc=this.marketcode.id;
    this.api.getModel(this.vehType,this.leadrgn,this.marketc).subscribe((res:any)=>{
      console.log(res);
      let arr={"evlVehicleLineC": "All",
      "prtpeioDescX": "ALL"};
      this.ModelList.push(arr);
      for(this.i in res){
        this.ModelList.push(res[this.i]);
      }
    })
  }
   alertPopup(data:string){
    this.alert.flag=true;
    this.alert.msg=data;
   }
  onRefresh(){

    window.location.reload();
     
      }
  showReportdata(){
    if(this.vehicleType==null||this.vehicleType==''||this.leadregion==null||this.leadregion==''||
    this.marketcode==null||this.marketcode==''){
      this.alertPopup("Please select mandatory fields");
    }
    else{
      if(this.group==null||this.group==""){
        this.auditConsoModel.group="All";
      }
      else{
        this.auditConsoModel.group=this.group.id;
      }
      if(this.vehicleline==null||this.vehicleline==""){
        this.auditConsoModel.model="All";
        this.vline="ALL"
      }
      else{
        this.auditConsoModel.model=this.vehicleline.evlVehicleLineC;
        this.vline=this.vehicleline.prtpeioDescX;
      }
      this.vtype=this.vehicleType.type;
      this.auditConsoModel.vhType=this.vehicleType.id;
      
      this.utilitiesService.setLoading(true);
      this.api.getConsoShowReport(this.auditConsoModel).subscribe((res:any)=>{
        
        console.log(res);
        this.showReportData=res;
        this.showData=true;
        this.utilitiesService.setLoading(false);
        if(this.showReportData.length==0){
          this.showData=false;
          this.alertPopup("No error records found");
          
        }
      })
    }
  }
  cancelpop(){
    this.alert.flag=false;
  }
  getSection(ri:number){
    console.log(this.showReportData[ri].section)
    this.api.getSectIdByTempId("EN",this.showReportData[ri].section,this.showReportData[ri].vhLine).subscribe((res:any)=>{
      console.log(res);
      localStorage.setItem('sectionid',res.sectionId);
    localStorage.setItem('lang', "EN");
    localStorage.setItem('property',"");
    if(res.sectionId==' '){
      this.alertPopup("No data found for this Section")
    }
    else{
      window.open('/auditdetails','_blank');
    }
    
    })
  }

}
