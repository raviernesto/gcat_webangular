import { formatCurrency } from '@angular/common';
import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkqueuereportService } from '../services/workqueuereport.service';
import { WorkqueueComponent } from '../workqueue/workqueue.component';


@Component({
  selector: 'app-workqueuetable',
  templateUrl: './workqueuetable.component.html',
  styleUrls: ['./workqueuetable.component.css']
})
export class WorkqueuetableComponent implements OnInit {

  
  //  @Input() Input: any = [];
  // // @Input() Input: WorkqueueComponent ;
  details = [];
  d=[];
  showTable: boolean = false;
  user: String = "";
  cmdtype: String = "";
  vehicle: String = "";
  typesdrop:String = "";
  reasoncode: String = "";
  table: any;
  data: any;
  tableDrop: any = [];
 

  constructor( private workqueue: WorkqueuereportService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
     this.route.queryParams.subscribe((params: any) => {
       console.log(params)
      //  console.log(params.cmdtytype)
      this.user=params.userid;
      this.cmdtype=params.cmdtytype;
      this.vehicle=params.vehiline;
      this.typesdrop=params.types;
      this.reasoncode=params.rscode;

      } );
      let Input1 = {
        "userIdC": this.user, "vehtypeCode": this.cmdtype, "evlVehicleLineC": this.vehicle,
        "typeDrop": this.typesdrop, "reasonCodeC": this.reasoncode
      }
      this.table=[];
      this.workqueue.fetchWorkQueueLinkTable(Input1).subscribe((res: any) => {
      this.data = res;
      this.table = this.data;
      console.log(this.table.engpEngnrgPartR);
          })
    }
    closeClick(){
      this.router.navigate(['']);
    }
    backClick(){
      this.router.navigate(['/Workqueue-report']);
    } 
}
