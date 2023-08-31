import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IllusDto } from '../models/illustration-search.class';
import { IllustrationSearchService } from '../services/illustration-search.service';
import { UtilitiesService } from '../shared/services/utilities.service';

@Component({
  selector: 'app-illus-search-result',
  templateUrl: './illus-search-result.component.html',
  styleUrls: ['./illus-search-result.component.scss']
})
export class IllusSearchResultComponent implements OnInit {

  illList: IllusDto[] = [];
  alert: any = { flag: false, msg: "" };
  show = false;
  irpView = false;
  pdf: any = "";
  spinner: boolean = false;
  buttonEnable: boolean = true;
  selectRow: IllusDto = { illusId: "", illusRev: 0 };
  selectedRow: IllusDto = { illusId: "", illusRev: 0 };
  irpList: any = [];
  irpSelected: any = {};
  clickedRow = -1;
  basePdf = "";

  constructor(private utilitiesService: UtilitiesService, private service: IllustrationSearchService, private dom: DomSanitizer, private router: Router) { }

  ngOnInit(): void {

    this.utilitiesService.illusId.subscribe((list: any) => {
      console.log(list);
      if (list) {
        this.illList = list;
        console.log(this.illList);
      }
    })

    // this.illList = ([{ illusId: "A0008353", illusRev: 1 },
    // { illusId: "F0263207", illusRev: 1 }
    //   , { illusId: "A0109388", illusRev: 1 }])
  }


  selected(row: IllusDto) {
    console.log(row);
    this.show = false;
    this.spinner = true;
    this.selectRow = row;
    console.log(this.selectRow);
    this.service.getPdf(row.illusId).subscribe((data: any) => {
      console.log(data);
      if (data.data != null) {
        this.pdf = this.dom.bypassSecurityTrustResourceUrl("data:application/pdf;base64," + data.data+"#toolbar=0");
        console.log(this.pdf);
        this.basePdf = data.data;
        this.show = true;
        this.spinner = false;
        this.buttonEnable = false;
      } else {
        this.show = false;
        this.spinner = false;
        this.alertPopup("No Image Found");
      }
    })
  }

  download() {
    console.log(this.selectRow);
    this.service.getImage(this.selectRow.illusId).subscribe((data: any) => {
      console.log(data);
      if (data.data != null) {
        const src = "data:image/tiff;base64," + data.data;
        const link = document.createElement("a")
        link.href = src;
        link.download = this.selectRow.illusId + ".tiff";
        link.click();
        link.remove();
        console.log(this.pdf);
      } else {
        this.alertPopup("No Image Found");
      }
    })

  }

  downloadPdf() {
    this.service.getPdf(this.selectRow.illusId).subscribe((data: any) => {
      console.log(data);
      const src = "data:application/pdf;base64," +data.data;
      const link = document.createElement("a")
      link.href = src;
      link.download = this.selectRow.illusId + ".pdf";
      link.click();
      link.remove();
    })
  }

  irp() {
    console.log(this.selectRow);
    this.service.getIrp(this.selectRow.illusId).subscribe((data: any) => {
      console.log(data);
      if (data[0].msg == "1")
        this.alertPopup("No IRP Exists for this Section. Choose Either Create New Illustration or Revise Existing Illustration from the Menu.");
      else if (data[0].msg == "2")
        this.alertPopup("No Open IRP Exists for this Requested Illustration. There may be Closed or Canceled IRPs in Which case you must use the IRP List Form to Specify which IRP you want to view.");
      else if (data.length == 1 && data[0].illstrIdR != null) {
        console.log("Redirect");
        this.utilitiesService.setIrp(data[0]);
        this.router.navigateByUrl('/irp-review');
      }
      else if (data.length > 1) {
        this.irpList = data;
        this.irpView = true;

      }
    })
  }

  clickedIrp(event: any) {
    console.log(event.data);
    this.clickedRow = event.index;
  }

  unSelectIrp() {
    this.clickedRow = -1;
    console.log(this.clickedRow);
  }

  selectIrp() {
    console.log(this.irpSelected);
    console.log(this.clickedRow);
    if (this.clickedRow)
      this.alertPopup("Please Select a Record to Proceed");
    else {
      this.utilitiesService.setIrp(this.irpList[0]);
      this.router.navigateByUrl('/irp-review');
    }
  }

  cancelIrp() {
    this.irpSelected = {};
    this.irpView = false;
  }

  wbs() {
    this.router.navigateByUrl('/wbs')
  }

  close() {
    this.router.navigateByUrl('/illsearch')
  }

  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }

  popupOk() {
    this.alert.flag = false;
  }


}
