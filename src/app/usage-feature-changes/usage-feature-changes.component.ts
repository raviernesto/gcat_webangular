import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkQueue } from '../interfaces/part-workqueue';
import { UsageFeatureChangesService } from '../services/usage-feature-changes.service';
import { UsageService } from '../services/usage.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import { UsageFilter } from '../usage-info/Usage';

@Component({
  selector: 'app-usage-feature-changes',
  templateUrl: './usage-feature-changes.component.html',
  styleUrls: ['./usage-feature-changes.component.scss']
})
export class UsageFeatureChangesComponent implements OnInit {
  input:any;
  result:any;
  result1:any;
  orginalFeatures:any[]=[];
  updatedFeatures:any[]=[];
  xyz:any[]=[];
  engpEngnrgPartR:any;
  pteioOriginC:any;
  vehtypeCode:any;
  evlVehicleLineC:any;
  engpCommodityC:any;
  engpSeqR:any;
  reasonCodeC:any;
  nusageC:any;
  cmdtyTypeC:any;
  eioOriginC:any;
  evaCatlgStsC:any;
  rplPartR:any;
  selectedWQ: WorkQueue = {};

  usageFilter: UsageFilter = {
    engpEngnrgPartR: "",
    eioOriginC: "",
    engpSeqR: 0,
    vehtypeCode: "",
    pteioOriginC: "",
    evlVehicleLineC: "",
    // desc: "",
    // commodityDesc: "",
    // cmdtyRemarks: ""
    // engpCommodityC:"",
  };
  
  // newUsageForm=this.fb.group({
  //   engPart: [''],
  //   orgin: [''],
  //   productType: [''],
  //   vehiclLine: [''],
  //   commodityType: [''],
  //   commodity: [''],
  //   commodityDesc: [''],
  //   evaCatlgStsC:[''],
  //   rplPartR:[''],
  // });

  constructor(private fb:FormBuilder,
    private service:UsageFeatureChangesService ,
     private router: Router,
     private route: ActivatedRoute,
     private utilitiesService:UtilitiesService,
     public usageService: UsageService
    
     ) { }

  ngOnInit(): void {
    this.showCenterPart();
    this.utilitiesService.selectedWorkQueue.subscribe((wq: WorkQueue) => {
      if (!!wq) {
        this.engpEngnrgPartR = wq.engpEngnrgPartR,
        this.pteioOriginC= wq.pteioOriginC,
        this.vehtypeCode= wq.vehtypeCode,
        this.engpCommodityC= wq.engpCommodityC,
        this.engpSeqR = wq.engpSeqR,
        this.reasonCodeC=wq.reasonCodeC,
        this.nusageC=wq.nusageC,
        this.evlVehicleLineC= wq.evlVehicleLineC,
        this.cmdtyTypeC = wq.cmdtyTypeC,
        this.eioOriginC =wq.eioOriginC
              
        this.selectedWQ = wq;
        console.log(this.selectedWQ);
        console.log(wq);
        this.getMasterList();
      }
    }); 
    // this.engpEngnrgPartR="7R3363603B02BD";
    // this.pteioOriginC="WERS";
    // this.vehtypeCode="C";
    // this.engpCommodityC="";
    // this.engpSeqR="1";
    // this.reasonCodeC="";
    // this.nusageC="";
    // this.evlVehicleLineC="ZF";
    // this.cmdtyTypeC="";
    // this.eioOriginC="WERS";
    //  this.engpEngnrgPartR=newUsagelink.engpEngnrgPartR;
    // this.pteioOriginC=newUsagelink.pteioOriginC;
    // this.vehtypeCode= newUsagelink.vehtypeCode;
    // this.engpCommodityC= newUsagelink.engpCommodityC;
    // this.engpSeqR= newUsagelink.engpSeqR;
    // this.reasonCodeC= newUsagelink.reasonCodeC;
    // this.nusageC= newUsagelink.nusageC;
    // this.evlVehicleLineC= newUsagelink.evlVehicleLineC;
    // this.cmdtyTypeC= newUsagelink.cmdtyTypeC;
    // this.eioOriginC= newUsagelink.eioOriginC;

    
    this.getMasterList();
    this.getSingleValue();
    // console.log(this.result);

    // console.log("data");
    // this.service.getSingleValue(input).subscribe((res: any) => {
    //   this.result1=res[0];
    //   console.log(this.result1);
     
    // });
  }

  getSingleValue(){
    let input=
    {
    "engpEngnrgPartR":this.engpEngnrgPartR,
    "pteioOriginC":this.pteioOriginC,
    "vehtypeCode":this.vehtypeCode,
    "engpCommodityC":this.engpCommodityC,
    "engpSeqR":this.engpSeqR,
    "reasonCodeC":this.reasonCodeC,
    "nusageC":this.nusageC,
    "evlVehicleLineC":this.evlVehicleLineC,
    "cmdtyTypeC":this.cmdtyTypeC,
    "eioOriginC":this.eioOriginC,
    }
    console.log("data");
    this.service.getSingleValue(input).subscribe((res: any) => {
      this.result1=res;
      console.log(res);
     
    });
  }
  getMasterList(){
    let input=
    {
    "engpEngnrgPartR":this.engpEngnrgPartR,
    "pteioOriginC":this.pteioOriginC,
    "vehtypeCode":this.vehtypeCode,
    "engpCommodityC":this.engpCommodityC,
    "engpSeqR":this.engpSeqR,
    "reasonCodeC":this.reasonCodeC,
    "nusageC":this.nusageC,
    "evlVehicleLineC":this.evlVehicleLineC,
    "cmdtyTypeC":this.cmdtyTypeC,
    "eioOriginC":this.eioOriginC,
    }
    this.service.getMasterList(input).subscribe((data: any) => {
      this.result=data;
      console.log(this.result);
      this.orginalFeatures=this.result.orginalPart;
      this.updatedFeatures=this.result.updatedPart;
      this.xyz=this.result.gcatUsage;
      console.log("sample1"+this.result.gcatFeatures);
      console.log("sample2"+this.xyz);
    });
    // console.log(this.result.gcatFeatures);
  }
  update(){
    let input=
    {
    "engpEngnrgPartR":this.engpEngnrgPartR,
    "pteioOriginC":this.pteioOriginC,
    "vehtypeCode":this.vehtypeCode,
    "commodityC":this.engpCommodityC,
    "engpSeqR":this.engpSeqR,
    "reasonCodeC":this.reasonCodeC,
    "nusageC":this.nusageC,
    "evlVehicleLineC":this.evlVehicleLineC,
    "cmdtyTypeC":this.cmdtyTypeC,
    "eioOriginC":this.eioOriginC,
    }
    this.service.update(input).subscribe((data: any) => {
      
      this.router.navigate(['/part-work']);
    });
  }

  backClick() {
    this.router.navigate(['/part-work']);
    localStorage.removeItem("commodity");
    this.engpEngnrgPartR="";
    this.pteioOriginC="";
    this.vehtypeCode="";
    this.engpCommodityC="";
    this.engpSeqR="";
    this.reasonCodeC="";
    this.nusageC="";
    this.evlVehicleLineC="";
    this.cmdtyTypeC="";
    this.eioOriginC="";
  }

  // usageClick(){
  //   this.router.navigate(['/usage']);
  //   localStorage.removeItem("commodity");
  //   this.engpEngnrgPartR="";
  //   this.pteioOriginC="";
  //   this.vehtypeCode="";
  //   this.engpCommodityC="";
  //   this.engpSeqR="";
  //   this.reasonCodeC="";
  //   this.nusageC="";
  //   this.evlVehicleLineC="";
  //   this.cmdtyTypeC="";
  //   this.eioOriginC="";
  // }
select:any;
select1:any;
select2:any;
  display:any="none"
  display1:any="none"
  count:any=0;
  counts:any=0
  rotate:any;
  br1:string="5px"

  showCenterPart(){
    if(this.count==0){
      this.display="block"
      this.count=1;
      this.br1="5px 5px 0px 0px"
      this.rotate="rotate(45deg);"
    }else{
      this.br1="5px"
      this.display="none"
      this.count=0;
      this.rotate="rotate(0deg);"
    }
  }
  closeClick(){
    this.router.navigate(['']);
  }
}
