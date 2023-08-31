import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IllustrationstatusService } from '../services/illustrationstatus.service';

@Component({
  selector: 'app-illustration-status-witoutable',
  templateUrl: './illustration-status-witoutable.component.html',
  styleUrls: ['./illustration-status-witoutable.component.scss']
})
export class IllustrationStatusWitoutableComponent implements OnInit {
  table1:any;
  user: string = "";
  cmdtype: string = "";
  sectgroup:string="";
  prefixC: string = "";
  table:any[]=[];
  data:any;
  show: boolean = false;
  constructor(private service: IllustrationstatusService, private route: ActivatedRoute) { }

  ngOnInit(): void {

   

    this.route.queryParams.subscribe((params: any) => {
      console.log(params)
      this.user=params.sectVehicleLineC;
      this.cmdtype=params.cmdtyTypeC;
      this.sectgroup=params.sectGroupC;
      this.prefixC=params.famprfxPrefixC;
    });
      let Input1 = {
        "sectVehicleLineC":this.user,"cmdtyTypeC":this.cmdtype,
        "sectGroupC":this.sectgroup,"famprfxPrefixC":this.prefixC
      }
     
    this.service.fetchSecWitOutIlluTable(Input1).subscribe((res: any) => {
      
      console.log(res);
      this.data = res;
      this.table=this.data;
      this.table1= this.table.length;
      //  console.log(this.table);
    } )
    this.show=true;
    
    if(this.sectgroup==""){
      this.sectgroup="ALL";
    }

    if(this.prefixC==""){
      this.show=true;
    }
    if(this.cmdtype=="C"){
      this.cmdtype="CAR";
    }
    else{
      this.cmdtype="TRUCK";
    }
  }
  
}
