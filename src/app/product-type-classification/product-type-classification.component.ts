import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProducttypeclassService } from '../services/producttypeclass.service';
// import { ProducttypeclassService } from '../service/producttypeclass.service';

@Component({
  selector: 'app-product-type-classification',
  templateUrl: './product-type-classification.component.html',
  styleUrls: ['./product-type-classification.component.css']
})
export class ProductTypeClassificationComponent implements OnInit {
  producttype: any;
  producttypeCar: any;
  producttypeTruck: any;
  selectedProduct:any;
  i:any;
  alert:any={flag:false,msg:""};
  // product: any;
  cars:any[]=[
    {c:"1 PAPD"},
    {c:"4 PAPD"},
    {c:"9 PAPD"},
    {c:"A WERS"},
    {c:"C PAPD"},
    {c:"C WERS"},
    {c:"J PAPD"},
    {c:"M WERS"},
    {c:"Q PAPD"},
    {c:"T PAPD"},
    {c:"V WERS"},
    {c:"X PAPD"},
    {c:"M WERS"},
    {c:"Q PAPD"},
    {c:"T PAPD"},
    {c:"V WERS"},
    {c:"X PAPD"},
    {c:"X WERS"}
  ]
  truck:any[]=[
    {t:"2 PAPD"},
    {t:"5 PAPD"},
    {t:"6 PAPD"},
    {t:"7 PAPD"},
    {t:"8 PAPD"},
    {t:"B WERS"},
    {t:"D WERS"},
    {t:"H WERS"},
    {t:"N WERS"},
    {t:"T WERS"},
    {t:"W WERS"},
    {t:"Y WERS"},
    {t:"Z WERS"}
  ]
  // lstSelVo:any=[
  //   {value:"1 PAPD"},
  //   {value:"1 PAPD"},
  //   {value:"1 PAPD"}
  // ]
  // result4:any=[
  //   {model:"1 PAPD"},
  //   {model:"1 PAPD"},
  //   {model:"1 PAPD"}
  // ]

  constructor(private prodtype:ProducttypeclassService,private route:Router) { }

  ngOnInit(): void { 
  
    this.prodtype.getProductTypeClass().subscribe((res: any)=>{
      this.producttype=res;
      console.log(this.producttype)
    })
  

    this.prodtype.getProductTypeClassCar().subscribe((res: any)=>{
      this.producttypeCar=res;
      console.log(this.producttypeCar)
    })
  

    this.prodtype.getProductTypeClassTruck().subscribe((res: any)=>{
    this.producttypeTruck=res;
    console.log(this.producttypeTruck)

  })
  
  

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
      this.display1="block"
      this.counts=1;
      this.br2="5px 5px 0px 0px"
    }else{
      this.br2="5px"
      this.counts=0;
      this.display1="none"
    }
  }
  closeClick(){
    this.route.navigate(['']);
  }
  select(){
    for(this.i in this.cars){
      if(this.cars[this.i].c==this.selectedProduct.pteioOrignC){
        this.alertPopup(this.selectedProduct.pteioOrignC +" already exists in cars");
        this.i++;
      }
    }
    for(this.i in this.truck){
      if(this.truck[this.i].t==this.selectedProduct.pteioOrignC){
        this.alertPopup(this.selectedProduct.pteioOrignC +" already exists in truck");
        this.i++;
      }
    }
}
alertPopup(data:string){
  this.alert.flag=true;
  this.alert.msg=data;
}
cancelpop(){
  this.alert.flag=false;
}
}
