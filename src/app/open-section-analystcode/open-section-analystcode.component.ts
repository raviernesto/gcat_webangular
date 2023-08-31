import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Opensectionmodel } from '../models/opensectionmodel';
import { AnalystcodeserviceService } from '../services/analystcodeservice.service';


@Component({
  selector: 'app-open-section-analystcode',
  templateUrl: './open-section-analystcode.component.html',
  styleUrls: ['./open-section-analystcode.component.scss']
})
export class OpenSectionAnalystcodeComponent implements OnInit {


  user: String = "";
  cmdtype: String = "";
  sectgroup: String = "";
  prefixC: String = "";
  table: any[] = [];
  data: any;
  show: boolean = false;
  table1: any;
  table2: any;

  constructor(private analystcodeserviceService: AnalystcodeserviceService, private route: ActivatedRoute) {
    
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params)
      this.user = params.sectVehicleLineC;
      this.cmdtype = params.cmdtyTypeC;
      this.sectgroup = params.sectGroupC;
      this.prefixC = params.famprfxPrefixC;
    });
    let Input1 = {
      "sectVehicleLineC": this.user, "cmdtyTypeC": this.cmdtype,
      "sectGroupC": this.sectgroup, "famprfxPrefixC": this.prefixC
    }
    
    this.analystcodeserviceService.getShowReportTable(Input1).subscribe((res: any) => {
      console.log(res);
      this.data = res;
      this.table = this.data;
      this.table1 = this.table.length;
       console.log(this.table1);
    })

if(this.prefixC==""){
  this.show=true;
}
if(this.sectgroup==""){
  this.sectgroup="ALL";
}
if(this.cmdtype=="C"){
  this.cmdtype="CAR";
}
else{
  this.cmdtype="TRUCK";
}


  }



}
