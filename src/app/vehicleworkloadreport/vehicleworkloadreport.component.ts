import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehlineworkloadService } from '../services/vehlineworkload.service';

@Component({
  selector: 'app-vehicleworkloadreport',
  templateUrl: './vehicleworkloadreport.component.html',
  styleUrls: ['./vehicleworkloadreport.component.scss']
})
export class VehicleworkloadreportComponent implements OnInit {
  part:any;
  parts:any;
  total:any;
  cataloged:any;
  constructor(private vehlineservice:VehlineworkloadService,private router:Router) { 
    this.part=[
      {reports:"INFORMATION AND CUSTOMIZATION",items:"0"},
      {reports:"INFORMATION AND CUSTOMIZATION",items:"1"},
      {reports:"CHASSIS",items:"2"},
      {reports:"POWERTRAIN",items:"3"},
      {reports:"ELECTRICAL",items:"4"},
      {reports:"BODY AND PAINT",items:"5"},
      {reports:"ROUTINE MAINTENANCE",items:"6"},
      {reports:"N/A",items:"N"},
      {reports:"TOTAL",items:"7"}
  
    ];

    this.parts=[
    
      {reports:"INFORMATION AND CUSTOMIZATION",items:"1",num:"0",cat:"0"},
      {reports:"CHASSIS",items:"2",num:"0",cat:"0"},
      {reports:"POWERTRAIN",items:"3",num:"0",cat:"0"},
      {reports:"ELECTRICAL",items:"4",num:"0",cat:"0"},
      {reports:"BODY AND PAINT",items:"5",num:"0",cat:"0"},
      {reports:"ROUTINE MAINTENANCE",items:"6",num:"0",cat:"0"},
      {reports:"N/A",items:"N",num:"0",cat:"0"},
      {reports:"TOTAL",items:"7",num:"0",cat:"0"}
  
    ];

   
   
   
  }

  ngOnInit(): void {
    this.vehitype(this.vehicletype); 
    this.rotate="rotate(45deg)"

  }
  info:any[]=[];
  report:any[]=[];
  vehicleLine: any[] = [];
  vehicleDrop: any=[];
  selectValue: string="";
  tabledata:any;
  vehitypebtn: string = "";
  startsWith="startsWith";
  showreport: any[]=[];
  vehitemp: any;
  display:any="block"
  display1:any="none"
  showTablevl: boolean = false;
  showTablepre: boolean = false;
  count:any=0;
  counts:any=0
  rotate:any;
  reasonCodereport: any[] = [];
  vehicletype:any='1';

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
  showData:boolean=false
  showReport(){
    this.showData=true
  }

 


  changeVehicleLine(){
    this.vehlineservice.fetchdropdown().subscribe((data:any)=>{
         this.vehicleLine=data;
         const data3={
          prtpeioDescX:'All',
          evlVehicleLineC:''
        }
        this.vehicleLine.unshift(data3);
         console.log(this.vehicleLine);
    });

   

  }
  onRefresh(){

    window.location.reload();
     
      }

      vehitype(vehibtn: string) {
        this.vehitypebtn = vehibtn;
       
        console.log(this.vehitypebtn)
        console.log("type");
      }

      submitreport(){
        console.log(this.vehicleDrop);
        this.selectValue=this.vehicleDrop.prtpeioDescX;
        this.vehitypebtn = (this.vehitypebtn == "") ? "C" : this.vehitypebtn;
        this.vehitemp = (this.vehicleDrop.evlVehicleLineC==null) ? "":this.vehicleDrop.evlVehicleLineC;
        let Input = {
          "prodTypeC": this.vehitypebtn ,"evlVehicleLineC":this.vehitemp
        }
        console.log(this.selectValue+"value");
       let array:any=[];
       let array1:any=[];
        this.reasonCodereport=[];
        this.report=[];
        
        this.vehlineservice.fetchtabledata(Input).subscribe((data:any)=>{
         if(data.length==0){
           this.showTablevl=true;
           this.showTablepre=false;
         }
         else{
            this.showreport=data;
             //sorting showreport's sectGroupC
            this.showreport.sort((a,b)=>(a.sectGroupC-b.sectGroupC));
            this.showreport.sort((a,b)=>(a.sectGroupC>b.sectGroupC)?1:-1);
            console.log(this.showreport);
            console.log("showreport");
            this.showData=true 
            this.showTablevl=false;
            this.showTablepre=true;
           this.showreport.forEach((items: any) => {
           if (!this.reasonCodereport.includes(items.concSectionId)) {
              if (items.concSectionId != " ") {
                if(items.concSectionId =="CATALOGED"){
                 items.concSectionId="Memo Cataloged";
                this.reasonCodereport.push("Memo Cataloged");
                }
                else if(items.concSectionId!="CATALOGED"){
                  this.reasonCodereport.push(items.concSectionId);
                }
              }
              
             
            }
          });
// const index= this.reasonCodereport.indexOf("Memo Cataloged");
//           this.reasonCodereport.splice(index,1);

console.log(this.reasonCodereport);
          // this.reasonCodereport.splice(this.reasonCodereport.length-1,0,"Memo Cataloged");
          // eliminating duplicate MEMO CATALOGED
          let unique=[...new Set(this.reasonCodereport)];
          // unique.sort();
          this.reasonCodereport=unique;
          console.log(this.reasonCodereport);
          console.log("reasonCodereport");
          var i=0;
while( i<this.reasonCodereport.length){
  if(this.reasonCodereport[i]==="Memo Cataloged"){
    this.reasonCodereport.splice(i,1);
  }else{
    ++i;
  }
}

this.reasonCodereport.push("Memo Cataloged");

console.log(this.reasonCodereport);
        
          console.log(this.reasonCodereport.indexOf("Memo Cataloged"));
          
          let vehLine=this.showreport[0].sectGroupC;
          this.reasonCodereport.forEach((len:any)=>
          array.push(0)
          );
          array.push(0);
          this.showreport.forEach((items: any) => {
           
            // console.log(items.concSectionId);
      
          if(vehLine==items.sectGroupC  && items.sectGroupC!="N" ){
            
          for(let i=0;i<this.reasonCodereport.length;i++){
         
          if(items.concSectionId==this.reasonCodereport[i] ){
           
            console.log(items.sectGroupC);
       
          array[0]=this.part[Number(items.sectGroupC)].reports;
          
         
          array[i+1]=items.evlVehicleLineX;
          }
          }
          }else if(vehLine==items.sectGroupC  && items.sectGroupC=="N"){
            for(let i=0;i<this.reasonCodereport.length;i++){
         
              if(items.concSectionId==this.reasonCodereport[i] ){
               
                console.log(items.sectGroupC);
            
              // array[0]=this.part[Number(items.sectGroupC)].reports;
              
            
              array[i+1]=items.evlVehicleLineX;
              }
              }
          }else {
           
            let number=0;
            let catlog=this.reasonCodereport.indexOf("Memo Cataloged")+1;
            let values=-1;
            array.forEach((result:any) => {
            values++;
           if(Number(result) && values!=catlog){
            number=number+Number(result);
           }
          }); 
          array[this.reasonCodereport.length+1]=number;
          this.report.push(array);
          
          array=[];
          this.reasonCodereport.forEach((len:any)=>
          array.push(0)
          );
          array.push(0);
          vehLine=items.sectGroupC;
          for(let i=0;i<this.reasonCodereport.length;i++){
          if(items.concSectionId==this.reasonCodereport[i]){
          if(Number(items.sectGoupC)){
            
          array[0]=this.part[Number(items.sectGroupC)].reports;
          console.log(array[0]+"dz");
        }else{
          if(vehLine=="N"){
          array[0]="N/A";
          console.log("printing n/a");
          }
          else if(vehLine=="6"){
            array[0]="ROUTINE MAINTENANCE";
          } 
          }
          array[i+1]=items.evlVehicleLineX;
          }
          }
          }
        });
        let number=0;
        let catlog=this.reasonCodereport.indexOf("Memo Cataloged")+1;
        let values=-1;
        array.forEach((result:any) => {
        values++;
       if(Number(result) && values!=catlog){
        number=number+Number(result);
       }
      }); 
     
     array[this.reasonCodereport.length+1]=number;
        this.report.push(array);
        this.reasonCodereport.forEach((len:any)=>
        array1.push(0)
        );
        array1.push(0);
        array1.push(0);
        this.report.forEach((data:any)=>{
         for(let i=1;i<=this.reasonCodereport.length+1;i++){
          array1[i]=Number(array1[i])+Number(data[i])
        
         }
        })
        
        array1[0]="TOTAL";
        this.report.push(array1);
        
        console.log(this.report);
        console.log("report");
      }
      }); 
    }
  }
    

     

