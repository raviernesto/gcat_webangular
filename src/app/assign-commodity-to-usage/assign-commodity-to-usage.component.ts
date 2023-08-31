import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkQueue } from '../interfaces/part-workqueue';
import { SaveCommodityModel } from '../models/savecommodity.model';
import { AssigncommtousageapiService } from '../services/assigncommtousageapiservice.service';
import { UtilitiesService } from '../shared/services/utilities.service';

@Component({
  selector: 'app-assign-commodity-to-usage',
  templateUrl: './assign-commodity-to-usage.component.html',
  styleUrls: ['./assign-commodity-to-usage.component.css']
})
export class AssignCommodityToUsageComponent implements OnInit {
  engpart:string='';
  desc:string='';
  origin:string='';
  function:string='';
  producttype:string='';
  ptorigin:string='';
  vehicleLine:string='';
  commtype:string='';
  engpSeqR:number=0;
  pftrCombC:number=0;
  mftrCombC:number=0;
  regintC:string='';
  effiopEffInC:string='';
  evaUsgQ:number=0;
  evaCatlgStsC:string='';
  commtypeCode:string='';
  product!:[];
  selectedProduct3:any;
  alert:any={flag:false,msg:""};
  savebtn:number=0;
  countradio:number=0;
  baser:string='';
  saveCommModel:SaveCommodityModel=new SaveCommodityModel();
  static OPEN_CLASS: string = 'active';
  
  constructor(private route:Router,private api:AssigncommtousageapiService,public utilitiesService:UtilitiesService,private router:Router) { }

  ngOnInit(): void {
    this.utilitiesService.selectedWorkQueue.subscribe((wq: WorkQueue) => {
      if (!!wq) {
        this.engpart=wq.engpEngnrgPartR?wq.engpEngnrgPartR:'';
        this.origin=wq.eioOriginC?wq.eioOriginC:'';
        this.function=wq.funcKey?wq.funcKey:'';
        this.producttype=wq.vehtypeCode?wq.vehtypeCode:'';//vehtypecode
        this.ptorigin=wq.pteioOriginC?wq.pteioOriginC:'';
        this.vehicleLine=wq.evlVehicleLineC?wq.evlVehicleLineC:'';
        this.engpSeqR=wq.engpSeqR?wq.engpSeqR:0;
        this.pftrCombC=wq.pftrcCombinatnC?wq.pftrcCombinatnC:0;
        this.mftrCombC=wq.mftrcCombinatinC?wq.mftrcCombinatinC:0;
        this.regintC=wq.regintC?wq.regintC:'';
        this.effiopEffInC=wq.effiopEffInC?wq.effiopEffInC:'';
        this.evaUsgQ=wq.evaPerUsageQ?wq.evaPerUsageQ:0;
         console.log(this.effiopEffInC);
         console.log(this.pftrCombC);
         console.log(this.mftrCombC);
         console.log(this.regintC);
         console.log(this.evaUsgQ);
      }
    });
    this.onload();
    
  }
  // part = [
  //   {Commodity:"6731",Designation:"",Description:"Filter Assy - Oils"},
  //   {Commodity:"6A832",Designation:"",Description:"Cover"},
  //   {Commodity:"",Designation:"",Description:""},
  //   {Commodity:"",Designation:"",Description:""},
  //   {Commodity:"",Designation:"",Description:""},
  //   {Commodity:"",Designation:"",Description:""},
  // ];
  // txtEngPart.Text = EngPartR
  //       txtOrigin.Text = EIOOriginC
  //       txtFunction.Text = FuncKey
  //       txtProdType.Text = VehTypeCode
  //       txtPTOrigin.Text = PteioOriginCode
  //       txtVehLine.Text = EvlVehLineCode
  //       txtEngpSeqR.Text = EngpSeqR
  //       txtPFTRCCombC.Text = PftrcCombCode
  //       txtMFTRCCombC.Text = MftrcCombCode
  //       txtRegintC.Text = RegintCode
  //       txtEffiopEffInC.Text = EffiopEffInCode
  //       txtEvaUsgQ.Text = EvaUsageQ
  
  onload(){
    this.countradio=0;
    this.evaCatlgStsC="W";
    this.api.getDescription(this.engpart,this.origin,this.engpSeqR).subscribe((res:any)=>{
      console.log(res);
      this.desc=res.wersname;
    
    this.api.getCommType(this.producttype,this.ptorigin).subscribe((res:any)=>{
      console.log(res);
      this.commtypeCode=res.usageCommtype;
      if(this.commtypeCode=='C')
        this.commtype="CAR";
      else
        this.commtype="TRUCK";
    
    this.api.getUsageCommodity(this.engpart,this.origin,this.engpSeqR).subscribe((res:any)=>{
      console.log(res);
      this.baser=res.baseR;
    
      this.api.getCommGrid(this.baser,this.origin,this.commtypeCode).subscribe((data:any)=>{
        console.log(data);
        this.product=data;
     
    })})})})
  }
  onSave(){
    if(this.countradio>0){
      this.alertPopup("Commodity already Selected");
    }
    else{
      this.saveCommModel.engpEngnrgPartR=this.engpart;
    this.saveCommModel.eioOriginC=this.origin;
    this.saveCommModel.engpSeqR=this.engpSeqR;
    this.saveCommModel.pteioOriginC=this.ptorigin;
    this.saveCommModel.funcKey=this.function;
    this.saveCommModel.vehtypeCode=this.producttype;
    this.saveCommModel.evlVehicleLineC=this.vehicleLine;
    this.saveCommModel.pftrcCombinatnC=this.pftrCombC;
    this.saveCommModel.mftrcCombinatnC=this.mftrCombC;
    this.saveCommModel.regintC=this.regintC;
    this.saveCommModel.evaPerUsageQ=this.evaUsgQ;
    this.saveCommModel.effiopEffInC=this.effiopEffInC;
    this.saveCommModel.evaCatlgStsC=this.evaCatlgStsC;
    this.saveCommModel.cmdtyTypeC=this.commtypeCode;
    this.saveCommModel.engpCommodityC=this.selectedProduct3.engpCommodityC;
    this.api.onSaveCommodity(this.saveCommModel).subscribe((res:any)=>{
      this.countradio++;
      console.log(res);
      this.alertPopup("Saved Successfully");
    })
    }
    
  }
  tocommodity(){
    this.router.navigateByUrl('/devcommmodity');
  }
  alertPopup(data:string){
    this.alert.flag=true;
    this.alert.msg=data;
  }
  cancelpop(){
    this.alert.flag=false;
  }
  closeClick(){
    this.route.navigate(['']);
  }
  selectradiobtn(){
    this.savebtn=1;
    if(this.countradio>0){
      this.alertPopup("Commodity already Selected");
    }
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
      this.rotate="rotate(45deg);"
    }else{
      this.br1="5px 5px 0px 0px"
      this.display="block"
      this.count=0;
      this.rotate="rotate(0deg);"
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
