import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {NewUsageService} from '../services/newusage.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../shared/services/utilities.service';

@Component({
  selector: 'app-new-usage-existing-parts',
  templateUrl: './new-usage-existing-parts.component.html',
  styleUrls: ['./new-usage-existing-parts.component.css']
})
export class NewUsageExistingPartsComponent implements OnInit {

  result:any;
  orginalFeatures:any[]=[];
  updatedFeatures:any[]=[];
  gcatFeatures:any[]=[];
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
  wq:any={};

  newUsageForm=this.fb.group({
    engPart: [''],
    orgin: [''],
    productType: [''],
    vehiclLine: [''],
    commodityType: [''],
    commodity: [''],
    commodityDesc: [''],
    evaCatlgStsC:[''],
    rplPartR:[''],
  });

  constructor(private fb:FormBuilder,
    private service:NewUsageService ,
     private router: Router,
     private route: ActivatedRoute,
     private utilitiesService:UtilitiesService
     ) { }

  ngOnInit(): void {
    this.showCenterPart();
    
    let newUsagelink=JSON.parse(localStorage.getItem('newUsage')|| '{}');
    console.log(newUsagelink);
    this.engpEngnrgPartR=newUsagelink.engpEngnrgPartR;
    this.pteioOriginC=newUsagelink.pteioOriginC;
    this.vehtypeCode=newUsagelink.vehtypeCode;
    this.engpCommodityC=newUsagelink.engpCommodityC;
    this.engpSeqR=newUsagelink.engpSeqR;
    this.reasonCodeC=newUsagelink.reasonCodeC;
    this.nusageC=newUsagelink.nusageC;
    this.evlVehicleLineC=newUsagelink.evlVehicleLineC;
    this.cmdtyTypeC=newUsagelink.cmdtyTypeC;
    this.eioOriginC=newUsagelink.eioOriginC;
    this.evaCatlgStsC=newUsagelink.evaCatlgStsC;
    this.rplPartR =newUsagelink.rplPartR;

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
    "evaCatlgStsC":this.evaCatlgStsC,
    "rplPartR":this.rplPartR,
    }
    this.wq={
      engpEngnrgPartR:this.engpEngnrgPartR,
      cmdtyTypeC:this.cmdtyTypeC,
      commodityC:this.engpCommodityC,
      eioOriginC:this.eioOriginC,
      engpSeqR:this.engpSeqR,
      vehtypeCode:this.vehtypeCode,
      pteioOriginC:this.pteioOriginC,
      evlVehicleLineC:this.evlVehicleLineC,
      reasonCodeC:this.reasonCodeC,
      nusageC:this.nusageC
    }
    this.getMasterList(input);
    
  }

   
  getMasterList(input:any){
    this.service.getMasterList(input).subscribe((data: any) => {
      this.result=data;
      this.orginalFeatures=this.result.orginalFeatures;
      this.updatedFeatures=this.result.updatedFeatures;
      this.gcatFeatures=this.result.gcatFeatures;
    });
  }
  delete(input:any){
    console.log("Delete");
    console.log(this.wq);
    this.service.delete(this.wq).subscribe((data: any) => {
      console.log(data);
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

  usageClick(){
    
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
    if(this.orignal.length==0){
      for(const element of this.orginalFeatures) {
        this.orignal.push(element.lexcC)}
         
         for(const element of this.updatedFeatures) {
          this.orignal.push(element.lexcC)}
           
           for(const element of this.gcatFeatures) {
            this.orignal.push(element.lexcC)}
            
             }
             let array:any[]=this.orignal;
             this.utilitiesService.setLexCodes(array);
            this.utilitiesService.setNewUsg(true);
            this.router.navigate(['/usage']);
  }
  display:any="none"
  display1:any="none"
  count:any=0;
  counts:any=0
  rotate:any;
  br1:string="5px"

  orignal:any[]=[];
  updatess:any[]=[];
  gcatss:any[]=[];
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
  originals(orginal:any){
    
    if(!this.orignal.includes(orginal)){
       this.orignal.push(orginal);
       
       console.log(this.orignal);
     }
       }
       updates(update:any){
         if(!this.updatess.includes(update.lexcC)){
           this.updatess.push(update.lexcC);
           console.log(this.updatess);
         }
       }
       gcats(gcat:any){
         if(!this.gcatss.includes(gcat.lexcC)){
           this.gcatss.push(gcat.lexcC);
           console.log(this.gcatss);
         }
       }
       // colour:any="white";
       // count:any;
 //       orign(){
 // this.colour="blue";
 //       }
 // selectedProducts3:any;
 // coun: number = 0;
 // radioclick(i: number) {
 //   this.coun = i;
 // }
 // onRowSelect(event: any, template?: any) {
 //   // simply loggin the event, 
 //   // u can do something else with the data
 //   console.log('vtData : ', event);
 //   }
 //   onRowUnselect(event: any) {
 //   // simply logging the event
 //   console.log('row unselect : ', event);
 //   }
 select:any;
 select1:any;
 select2:any;
 closeClick(){
  this.router.navigate(['']);
}
}
