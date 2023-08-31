import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IllustrationstatusService } from '../services/illustrationstatus.service';

@Component({
  selector: 'app-illustration-status-table',
  templateUrl: './illustration-status-table.component.html',
  styleUrls: ['./illustration-status-table.component.scss']
})
export class IllustrationStatusTableComponent implements OnInit {
  // table1: boolean = false;
  // table2: boolean = false;
  // table3: boolean = false
  // table4: boolean = false
  // table5: boolean = false
  // table6: boolean = false
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
      this.service.fetchComplTable(Input1).subscribe((res: any) => {
              console.log(res);
      this.data = res;
      this.table=this.data;
      this.table1= this.table.length;
     
      //  console.log(this.table);
      })
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

