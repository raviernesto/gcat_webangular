import { Component, OnInit } from '@angular/core';
import { WorkqueueAssignmentReportService } from '../services/workqueue-assignment-report.service';
import { WorkqueueAssignmentReport } from '../WorkqueueAssignmentReportComponent-ts/workqueue-assignment-report';


@Component({
  selector: 'app-workqueue-assignment-report',
  templateUrl: './workqueue-assignment-report.component.html',
  styleUrls: ['./workqueue-assignment-report.component.css']
})
export class WorkqueueAssignmentReportComponent implements OnInit {
  showTable: boolean = false;
  Table1:boolean = false;
  vehicleDrop: any;
  productDrop: any;
  reasonDrop: any;
  analystDrop: any;
  analyst: any[] = [];
  productType: any[] = [];
  vehicleLine: any[] = [];
  reasonCode: any[] = [];
  data: any;
  startsWith="startsWith";
  workqueueAssignmentReport:WorkqueueAssignmentReport={analyst:'',commodity:'',engBase:'',productType:'',vehicleLine:'',s4pCode:'',effInDate:'',reasonCode:'',presumedBook:''}  ;
 
  commodity:string="";
  engBase:string="";
  s4pCode:string="";
  effInDate:string="";
  presumedBook:string="";


  details = [];
  d=[];
  
  alert:any={
    flag:false,
    msg:"",
  }

  alertPopup(data:string){
    this.alert.flag=true;
    this.alert.msg=data;
  }

  constructor(private workqueueass: WorkqueueAssignmentReportService) {



  }
  ngOnInit(): void {
    this.workqueueass.fetchWorkqueueAssignmentReportAnalyst().subscribe((res: any) => {
      this.data = res;
      this.analyst = this.data;
    })
    this.workqueueass.fetchWorkqueueAssignmentReportVehicleLine().subscribe((res: any) => {
      this.data = res;
      this.vehicleLine = this.data;
      

    })
    this.workqueueass.fetchWorkqueueAssignmentReportProductType().subscribe((res: any) => {
      this.data = res;
      this.productType = this.data;
      
    })
    this.workqueueass.fetchWorkqueueAssignmentReportReasonCode().subscribe((res: any) => {
      this.data = res;
      this.reasonCode = this.data;
      
    })
  }
  changeVehicleLine() {
    
      this.workqueueAssignmentReport.vehicleLine=this.vehicleDrop.evlVehicleLineC;
      console.log(this.vehicleDrop);

  }
  changeproductType() {
    
      this.workqueueAssignmentReport.productType=this.productDrop.vehtypeCode;
      console.log(this.productDrop);
  
  }
  changeReasonCode() {
  
      this.workqueueAssignmentReport.reasonCode=this.reasonDrop.reasonCodeC;
      console.log(this.reasonDrop);
   
  }
  changeAnalyst() {
   
      this.workqueueAssignmentReport.analyst=this.analystDrop.userIdC;
      console.log(this.analystDrop);
    
  }
  changeShowReport() {
    
    console.log(this.workqueueAssignmentReport);
    this.showTable = true;
    this.workqueueAssignmentReport.commodity=this.commodity;
    this.workqueueAssignmentReport.engBase=this.engBase;
    this.workqueueAssignmentReport.s4pCode=this.s4pCode;
    this.workqueueAssignmentReport.effInDate=this.effInDate;
    this.workqueueAssignmentReport.presumedBook=this.presumedBook;

    if(this.workqueueAssignmentReport.analyst =="" && this.commodity=="" && this.engBase=="" && this.workqueueAssignmentReport.productType=="" && this.workqueueAssignmentReport.vehicleLine=="" &&
this.s4pCode=="" && this.effInDate=="" && this.workqueueAssignmentReport.reasonCode=="" && this.presumedBook==""){
  this.showTable = false;
 
  this.alertPopup("Please enter any of the search criteria");
}
    this.workqueueass.fetchWorkqueueAssignmentReportShowReport(this.workqueueAssignmentReport).subscribe((res:any)=>{
      
      this.details= res;
console.log(this.details);
if(res.length ==0){
  this.showTable = false;
  this.Table1 = true;
}
    })


  }
  onRefresh(){
//     this.showTable = false;
//     this.analystDrop="";
//     this.commodity="";
//     this.engBase=""; 
//     this.productDrop=""; 
//     this.vehicleDrop="";
// this.s4pCode="";
//  this.effInDate="";
//   this.reasonDrop="";
//    this.presumedBook="";
window.location.reload();
 
  }
  cancelpop(){
    this.alert.flag=false;
  }

  display:any="block"
  display1:any="none"
  count:any=0;
  counts:any=0
  rotate:string="rotate(45deg)";
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
  showCenterPart2(){
    if(this.counts==0){
      this.display1="block"
      this.counts=1;
      this.br2="5px 5px 0px 0px"
    }else{
      this.br2="5px"
      this.counts=0;
      this.display1="none"
    }
  }
  changeShowExcelReport() {
    
    this.workqueueass.fetchWorkqueueAssignmentReportShowReport(this.workqueueAssignmentReport).subscribe((res:any)=>{
      
      this.details= res;
console.log(this.details);
// if(res.length ==0){
//   this.showTable = false;
//   this.Table1 = true;
// }
    })
    }
  








}
