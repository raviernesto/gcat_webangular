import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IllustrationstatusService } from '../services/illustrationstatus.service';

@Component({
  selector: 'app-illustration-status-analystable',
  templateUrl: './illustration-status-analystable.component.html',
  styleUrls: ['./illustration-status-analystable.component.scss']
})
export class IllustrationStatusAnalystableComponent implements OnInit {
  table1:any;
  user: String = "";
  cmdtype: String = "";
  sectgroup:String="";
  prefixC: String = "";
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
      
    this.service.fetchAnalystTable(Input1).subscribe((res: any) => {
     
      console.log(res);
      this.data = res;
      this.table=this.data;
      this.table1= this.table.length;
      
    } )
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
