
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
// import { ArtHouseModel } from 'src/Models/art-house.model';
// import { ArtHouseserviceService } from '../art-houseservice.service';


import { ViewEncapsulation } from '@angular/core';
// import { ExternalIllustratorModel } from 'src/Models/external.model';
import { ArtHouseserviceService } from '../services/art-houseservice.service';
import { ArtHouseModel } from '../models/art-house.model';
import { ExternalIllustratorModel } from '../models/external.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-art-house',
    templateUrl: './art-house.component.html',
    styleUrls: ['./art-house.component.css']
})
export class ArtHouseComponent implements OnInit {
    [x: string]: any;
    tab: string = "";
    externalillustrator: any;
    illustrator: any[] = [];
    arthouseName: any[] = [];
    arthousecode: any;
    arthouseCode: any;
    arthouseC: any;
    arthouseN: any;
    artName: any;
    isDisabled:boolean=true;
    isDisabled1:boolean=true;


    arthouse: any[] = [];



    flag: boolean = false;
    formValue !: FormGroup
    artHouseModel: ArtHouseModel = new ArtHouseModel
    // arthousecode: { name: void; }[];
    externalIllustratorModel: ExternalIllustratorModel = new ExternalIllustratorModel()
    userIdC: any;
    arthousC: any;
    deletealert1:any={flag:false,msg:""};
    deletealert2:any={flag:false,msg:""};
    code: any =false;
    
    





    constructor(private formbuilder: FormBuilder, private service:ArtHouseserviceService,private router: Router) {

        


    }
    display: any = "block"

    display1: any = "block"
    count: any = 0;
    counts: any = 0
    rotate: string="rotate(45deg)";
    rotate1: string="rotate(45deg)";
    br1:string="5px 5px 0px 0px"
    br2:string="5px 5px 0px 0px"
    showCenterPart(){
      if(this.count==0){
        this.display="none"
        this.count=1;
        this.br1="5px"
        this.rotate="rotate(0deg)"
      }else{
       
        this.display="block"
        this.count=0;
        this.br1="5px 5px 0px 0px"
       
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
  
  


    ngOnInit(): void {
        this.getillustrator()
        this.getArthouse()
        this.getArthouseCode()
        this.getArthouseUpdate()
        this.formValue = this.formbuilder.group({
            arthousecode: ['', Validators.required],
            arthousename: ['', Validators.required],
            userIdC: ['', Validators.required],

        })

    }
    tabValue(value: string) {
        this.tab = value;
        console.log(this.tab);
    }
    enable() {
        this.flag = true;


    }
    alert: any = {
        flag: false,
        msg: "",
    }
    alertPopup(data: string) {
        this.alert.flag = true;
        this.alert.msg = data;
    }
    save() {

        if (this.artHouseModel.arthouseC == "F" || this.artHouseModel.arthouseC == "X")
        alert
        (this.alertPopup("Please assign an arthouseCode other than F or X "));

        else   
        this.service.postarthouse(this.artHouseModel).subscribe((data: any) => {
            
            this.alertPopup(data.msg);
            this.getArthouseCode();
            this.getArthouse();
            
        });
        



    }
    saveillu() {
        this.externalIllustratorModel.userIdC = this.externalillustrator.userIdC;
        this.externalIllustratorModel.arthouseC = this.arthouseC.substring(0, 1);
        this.service.postillustrator(this.externalIllustratorModel).subscribe((data: any) => {
            this.alertPopup(data.msg);
        });
        console.log(this.externalIllustratorModel.arthouseC.substring(0, 1));
        console.log(this.externalIllustratorModel)

    }

    confirmdelete1(){
        
        // if(!this.arthouseName ||(this.arthouseName && !this.arthouseName.some((x: any)=> x.arthouseC == this.arthouseCode.arthouseC))){
            if(this.arthouseCode.arthouseC!=""){
               
            let data="";
            data="Are you sure want to delete "+this.arthouseCode.arthouseC + this.artHouseModel.arthouseN
            this.deletealert1.flag=true;
            this.deletealert1.msg=data;
        }
        else {
            this.alertPopup("Please enter values to delete");
        }
      }
    delete() {
            this.service.deletearthouseById(this.arthouseCode.arthouseC).subscribe((data1: any) => {
                this.deletealert1.flag=false
                console.log(data1);
                this.alertPopup(data1[0]);
                
                // this.cancelpop();
                this.getArthouseCode();
            }); 
           
    }
    confirmdelete2(){
        let data="";
        data="Are you sure want to delete "+this.externalillustrator.userIdC + this.externalIllustratorModel.arthouseC;
        this.deletealert2.flag=true;
        this.deletealert2.msg=data;
      }
    deletecode() {
        debugger
        this.deletealert2.flag= false;
        this.externalIllustratorModel.userIdC = this.externalillustrator.userIdC;
        this.externalIllustratorModel.arthouseC = this.arthouseC.substring(0, 1);
        this.service.deleteArtHouseCodeById(this.externalIllustratorModel.userIdC, this.externalIllustratorModel.arthouseC).subscribe((data: any) => {
           debugger
            this.alertPopup("Data Deleted Successfully");
            //this.cancelpop1();
            this.getArthouseCode();
        
        });
       
        
        
    }
    ref1: string = "none";
    ref2: string = "block";
    new() {


        this.artHouseModel.arthouseC = '';
        this.arthouseNamefield = false;
        this.arthouseCode = '';
        this.artHouseModel.arthouseN='';
        this.artName = '';
        
        this.ref1 = "block";
        this.ref2 = "none";
    }
    newex() {
        this.externalillustrator = [];
        
        this.arthouseC = [];
       
        this.display = "newex"

    }
    temizle() {
        this.artHouseModel.arthouseC = '';
        this.artName = '';
        this.artHouseModel.arthouseN = ''
        this.arthouseC = '';
        this.arthouseCode = '';
        this.display = "reset";
        this.ref1 = "none";
        this.ref2 = "block";
    }
    getillustrator() {
        this.service.getillustrator().subscribe((res: any) => {
            this.illustrator = res

            console.log(this.illustrator)
        })
    }
    getArthouse() {
        this.service.getArthouse().subscribe((res: any) => {
            this.arthouseName = res

            console.log(this.arthouse)
           
            

        })
       
       
       
       
        
    }

    getArthouseCode() {
        this.service.getArthouseCode().subscribe((res: any) => {
            this.arthouse = res;


            console.log(this.arthouseCode)
        })
    }
    getArthouseName(name: any) {
        this.service.getArthouseName(name.value.arthouseC).subscribe((res: any) => {
            this.artHouseModel = res[0]
            this.artName = this.artHouseModel.arthouseN
            console.log(this.artHouseModel.arthouseN)
            console.log(this.artName)
            console.log(res)


        })
        this.isDisabled=false;

    }
    arthouseNamefield: boolean = true;
    getArthouseUpdate() {
        this.artHouseModel.arthouseC = this.arthouseCode.arthouseC;
        this.artHouseModel.arthouseN = this.artHouseModel.arthouseN;
        this.service.getArthouseUpdate(this.artHouseModel.arthouseC, this.artHouseModel.arthouseN).subscribe((data: any) => {
            this.alertPopup("Data Updated Successfully");
            
        });


    }
    cancelpop(){
        this.alert.flag=false;
        this.deletealert1.flag=false;
      }
      cancelpop1(){
        this.alert.flag=false;
        this.deletealert2.flag=false;
        this.code=false;
      }
      startsWith="startsWith"; 
      codefunction(a:any){
        console.log(a);
        // console.log(this.mal);
        if(a=='F' || a=='X'||a=='f'||a=='x' )
        {
        this.code=true;
        console.log("true");
        }else{
        this.code=false;
        console.log("false");
        }
        
        
        }
        closeClick(){
            this.router.navigate(['']);
          }
}



