import { Component, OnInit } from '@angular/core';
import { EngvbService } from '../services/engvb.service';
import { NewBaseDetails,VendorpartDetails,VendorParts} from './engineering-base-to-vendor-part';
import { Router } from '@angular/router';



@Component({
  selector: 'app-engineering-base-to-vendor-part',
  templateUrl: './engineering-base-to-vendor-part.component.html',
  styleUrls: ['./engineering-base-to-vendor-part.component.css']
})
export class EngineeringBaseToVendorPartComponent implements OnInit {
  VendorParts:VendorParts[]=[];
selectvalue:any[]=[];
  dropdownvalue:any=[];
  // vendorparts:any=[];
  baseViewValue:any=[];
  newBaseDetails:NewBaseDetails[]=[];
  baseSelectedDetails: any = [];
  baseSelectedDetails1:any=[];
  SelectedParts:string="";
  vendorPartDetails:VendorpartDetails={
    engpengnrgpartr:"", eiooriginc:"",engpseqr:undefined,  engpbaser:"", engbaseeioorigc:""
  }
  br1:string="5px 5px 0px 0px"
  radioValues:string="";
  baseView:string="";
  disable:boolean=true;
  btndisable:boolean=true;
  baseCriteria:string="";
  alert: any = {
    flag: false,
    msg: "",
  }
  base:any={
    flag:false,
    msg:"",
  }
  save:any={
    flag:false,
    msg:""
  }
  navwrk:any={
    flag:false,
    msg:""
  }
  navcmdty:any={
    flag:false,
    msg:""
  }
  navclose:any={
    flag:false,
    msg:""
  }
  closepop:any={
    flag:false,
    msg:""
  }
  saveCheck:boolean=true;
  decisionCheck:boolean=false;
   temp:any;
   navCheck:boolean=false;
   navCheckcmdty:boolean=false;
   navCheckclose:boolean=false;

  arr:number[]=[];
    rotate:string="rotate(45deg)";
    rotate1:string="rotate(45deg)";
  display:any="block"
  count:any=0;
  display1:any="block"
  counts:any=0;
  checks:boolean=true;
 
  br2:string="5px 5px 0px 0px"
  
  constructor(private engvb:EngvbService,private router: Router) { }

  ngOnInit() {
    this.saveCheck=true;
    
    
  }
  result:any;
  
  showCenterPart(){
    if(this.count==0){
      this.display="none"
      this.count=1;
      this.br1="5px "
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
      this.br2="5px"
      this.rotate1="rotate(0deg)"
    }else{
      this.br2="5px 5px 0px 0px"
      this.counts=0;
      this.display1="block"
      this.rotate1="rotate(45deg)"
    }
  }
 
   
  Vendordropdown() {
    this.checks=true;
    this.saveCheck=true;
    console.log(this.temp+"tempout");
   
    this.engvb.fetchVendordropdown().subscribe((res:any)=>{this.result=res;
      
    this.VendorParts=this.result;
    this.VendorParts.forEach(t => {
       this.temp=t.engpengnrgpartr+" "+t.eiooriginc+" "+t.engpseqr;
     this.arr.push(this.temp);
      console.log(this.temp+"temp");
      
    });
    this.dropdownvalue=this.arr;
    this.btndisable=false;
      console.log(this.result);})
  }
  VendordropdownWq(){
   
    this.btndisable=true;
    this.alertPopup("There are no vendor parts in the workqueue");
    if(this.dropdownvalue!=''){
    
    this.dropdownvalue='';
  }
  }

  type(){
      console.log(this.SelectedParts);
      this.selectvalue=this.SelectedParts.split(" ");
      this.vendorPartDetails.engpengnrgpartr=this.selectvalue[0];
      this.vendorPartDetails.eiooriginc=this.selectvalue[1];
      this.vendorPartDetails.engpseqr=Number(this.selectvalue[2]);
      this.checks=false;
      this.saveCheck=true;
      this.engvb.fetchVendorpartsdata(this.vendorPartDetails.engpengnrgpartr,this.vendorPartDetails.eiooriginc,this.vendorPartDetails.engpseqr).subscribe((res:any)=>{this.result=res;
        this.vendorPartDetails.engpbaser=this.result.engpbaser;
        console.log(this.result)
        console.log(this.vendorPartDetails+" vendor");})
        this.baseView="All"
        this.engvb.getAllBaseCritDetails("A00").subscribe((data: any) => {
          
          if(data.length ==0)
          this.baseAlert("No records found for Base Selection Criteria");
        else if (data.length ==1000)
          this.baseAlert("The system was not able to complete the search due to a large volume of matching Engg.Bases. You may want to use search criteria with additional information");
          this.newBaseDetails = data;
         })
       }

      changeBaseNew() {
        this.checks=true;
        this.saveCheck=true
        this.baseCriteria = (<HTMLInputElement>document.getElementById("baseCriteria")).value;
        if (this.baseCriteria == '') {
          console.log("Base criteria is not given");
          this.baseAlert("Enter Base Selection Criteria");
        } else {
          console.log("Base criteria is " + this.baseCriteria);
          this.engvb.getNewBaseCritDetails(this.baseCriteria).subscribe((data: any) => {
            if(data.length ==0)
            this.baseAlert("No records found for Base Selection Criteria");
          else if (data.length ==1000)
            this.baseAlert("The system was not able to complete the search due to a large volume of matching Engg.Bases. You may want to use search criteria with additional information");
          this.newBaseDetails=data;
          console.log(data);
          })
        }
    }
    baseCritClick() {
      (<HTMLInputElement>document.getElementById("newBase")).checked = false;
      (<HTMLInputElement>document.getElementById("allBase")).checked = false;
    }
  
    changeBaseAll(){
      this.checks=true;
      this.saveCheck=true;
      this.baseCriteria = (<HTMLInputElement>document.getElementById("baseCriteria")).value;
      if (this.baseCriteria== '') {
        this.baseAlert("Enter Base Selection Criteria");
      } else {
        
        this.engvb.getAllBaseCritDetails(this.baseCriteria).subscribe((data: any) => {
          
          if(data.length ==0)
          this.baseAlert("No records found for Base Selection Criteria");
        else if (data.length ==1000)
          this.baseAlert("The system was not able to complete the search due to a large volume of matching Engg.Bases. You may want to use search criteria with additional information");
          this.newBaseDetails = data;
         })
      }
    }

    i: number = 0;
    clickedRow(selectedRow: number) {
      console.log(this.newBaseDetails[selectedRow]);
    
      if(this.baseSelectedDetails.includes(this.newBaseDetails[selectedRow])){
        console.log("pop");
        this.baseSelectedDetails.pop(this.newBaseDetails[selectedRow]);
        this.baseSelectedDetails1.pop(this.newBaseDetails[selectedRow]);
      }else{
        if(this.baseSelectedDetails1.includes(this.newBaseDetails[selectedRow]) )
        {
          console.log("includes");
          this.alertPopup(this.newBaseDetails[selectedRow].base + " is already added to the bases");
        }else{
          console.log("push");
          this.baseSelectedDetails.push(this.newBaseDetails[selectedRow]);
         this.baseSelectedDetails1.push(this.newBaseDetails[selectedRow]);
         this.baseSelectedDetails.pop(this.newBaseDetails[selectedRow]);
        this.baseSelectedDetails1.pop(this.newBaseDetails[selectedRow]);
      console.log(this.baseSelectedDetails);
         
        }
      }
      
    }
    transferSelectedBase(){
      this.saveCheck=false;
      if(this.baseSelectedDetails!=""){
      this.disable=false;
      this.decisionCheck=true;
     console.log(this.baseSelectedDetails[0].base);
     console.log(this.baseSelectedDetails[0].engbaseeioorigc);
    
     

     this.vendorPartDetails.engpbaser=this.baseSelectedDetails[0].base;
     this.vendorPartDetails.engbaseeioorigc=this.baseSelectedDetails[0].engbaseeioorigc;
     console.log(this.vendorPartDetails.engbaseeioorigc);
    }
    else{
      this.alertPopup("Engbase is not selected to update");

    }
      
    }

    saveVendorPartDetails(){
      if(this.decisionCheck){
     console.log(this.vendorPartDetails);
  
      this.navcmdty.flag=false;
      this.navwrk.flag=false;
      this.closepop.flag=false;
      if(this.vendorPartDetails.engpbaser!="" && this.vendorPartDetails.eiooriginc!=""&& this.vendorPartDetails.engpengnrgpartr!=""&&this.vendorPartDetails.engpseqr!=0){
      this.engvb.saveVendorPartsDetails(this.vendorPartDetails).subscribe();
      this.saveCheck=true;
      this.saveAlert("Saved Successfully");
    
      }
      else{
        this.alertPopup("No Fields Entered");
      }
    }
    else if(!this.decisionCheck){
      this.navcmdty.flag=false;
      this.navwrk.flag=false;
      this.alertPopup("No Fields Entered");

    }
   
    }

    savePopcmdty(){
      if(this.decisionCheck){
        console.log(this.vendorPartDetails);
         this.navcmdty.flag=false;
         this.navwrk.flag=false;
         this.closepop.flag=false;
         if(this.vendorPartDetails.engpbaser!="" && this.vendorPartDetails.eiooriginc!=""&& this.vendorPartDetails.engpengnrgpartr!=""&&this.vendorPartDetails.engpseqr!=0){
         this.engvb.saveVendorPartsDetails(this.vendorPartDetails).subscribe();
         this.saveCheck=true;
         
         this.saveAlert("Saved Successfully");
        this.navCheckcmdty=true;
       
         }
         else{
           this.alertPopup("No Fields Entered");
         }
       }
       else if(!this.decisionCheck){
         this.navcmdty.flag=false;
         this.navwrk.flag=false;
         this.alertPopup("No Fields Entered");
   
       }
     
  
    }

    savePopwrk(){
     
      if(this.decisionCheck){
        console.log(this.vendorPartDetails);
         this.navcmdty.flag=false;
         this.navwrk.flag=false;
         this.closepop.flag=false;
         if(this.vendorPartDetails.engpbaser!="" && this.vendorPartDetails.eiooriginc!=""&& this.vendorPartDetails.engpengnrgpartr!=""&&this.vendorPartDetails.engpseqr!=0){
         this.engvb.saveVendorPartsDetails(this.vendorPartDetails).subscribe();
         this.saveCheck=true;
         
         this.saveAlert("Saved Successfully");
        this.navCheck=true;
       
         }
         else{
           this.alertPopup("No Fields Entered");
         }
       }
       else if(!this.decisionCheck){
         this.navcmdty.flag=false;
         this.navwrk.flag=false;
         this.alertPopup("No Fields Entered");
   
       }
     
    }
  
    gotocommodity(){
      
      this.router.navigateByUrl('/devcommmodity');
      
    }
    gocmdty(){
      if(this.checks){
        this.router.navigateByUrl('/devcommmodity');
       
      }else{
      if(this.saveCheck){
        this.navcmdty.flag=false;
        this.router.navigateByUrl('/devcommmodity');
 
      }
      else if(!this.saveCheck){
      this.cmdtyAlert("Do you want to save changes before leaving the screen?");
    }
  }
    }
    goclose(){
      if(this.checks){
        this.router.navigateByUrl('/');
     
      }else{
      if(this.saveCheck){
        this.navclose.flag=false;
        this.router.navigateByUrl('/');
     
      }
      else if(!this.saveCheck){
      this.closeAlert("Do you want to save changes before leaving the screen?");
    }
  }

   

    }
    gotoclose(){
      this.router.navigateByUrl('');
     
    }
    
    gotowrkque(){
      
        this.router.navigateByUrl('/part-work');
       
    }
    gowrk(){
      if(this.checks){
        this.router.navigateByUrl('/part-work');
      
      }else{
      if(this.saveCheck){
        this.navwrk.flag=false;
        this.router.navigateByUrl('/part-work');
        
      }
      else if(!this.saveCheck){
      this.wrkAlert("Do you want to save changes before leaving the screen?");
    }
  }
    }

    close(){
      if(this.decisionCheck){
        console.log(this.vendorPartDetails);
         
         this.navclose.flag=false;
         this.closepop.flag=false;
         if(this.vendorPartDetails.engpbaser!="" && this.vendorPartDetails.eiooriginc!=""&& this.vendorPartDetails.engpengnrgpartr!=""&&this.vendorPartDetails.engpseqr!=0){
         this.engvb.saveVendorPartsDetails(this.vendorPartDetails).subscribe();
         this.saveCheck=true;
         this.saveAlert("Saved Successfully");
         this.navCheckclose=true;
       
         }
         else{
           this.alertPopup("No Fields Entered");
         }
       }
       else if(!this.decisionCheck){
         this.navclose.flag=false;
         this.alertPopup("No Fields Entered");
   
       }
     
    }

    onReset(){

      window.location.reload();
       
        }

    popupOk(){
      this.save.flag=false;
      if(this.navCheck){
        this.router.navigateByUrl('/part-work');
      
        }
      if(this.navCheckcmdty){
        this.router.navigateByUrl('/devcommmodity');
        
        }
      if(this.navCheckclose){
        this.router.navigateByUrl('');
       

      }
    }

    alertPopup(data: string) {
      this.alert.flag = true;
      this.alert.msg = data;
    }
    baseAlert(data: string) {
      this.base.flag = true;
      this.base.msg = data;
    }
    saveAlert(data: string) {
      this.save.flag = true;
      this.save.msg = data;
    }

    cmdtyAlert(data:string){
      this.navcmdty.flag=true;
      this.navcmdty.msg=data;
    }
    wrkAlert(data:string){
      this.navwrk.flag=true;
      this.navwrk.msg=data;
    }

    closeAlert(data:string){
      this.navclose.flag=true;
      this.navclose.msg=data;
    }
   
  }
  
  



