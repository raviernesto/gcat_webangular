import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { CommodityDto, TemplateDto, VehicleDto } from '../models/illustration-search.class';
import { IllustrationSearchService } from '../services/illustration-search.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from '../shared/services/utilities.service';
import { IllusSearchResultComponent } from '../illus-search-result/illus-search-result.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-illustration-search',
  templateUrl: './illustration-search.component.html',
  styleUrls: ['./illustration-search.component.css']
})
export class IllustrationSearchComponent implements OnInit {

  vehicleList: any[] = [];
  vehLine: any = {};
  prefixList: any[] = [];
  prefix: any = {};
  groupList: any[] = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }];
  group: any = {};
  commodity: CommodityDto = { commodity: "", vehType: "" };
  commodityList: any[] = [];
  commoditys: any = {};
  template: TemplateDto = { template: "", vehType: "" };
  templateList: any[] = [];
  templates: any = {};
  illList: any[] = [];
  ills: any = {};
  illId: string = "";
  show: string = "1";
  vehicle: VehicleDto = { vehType: "C", vehPreCheck: "", vehLine: "", prefix: "", groupCheck: false, group: "" };
  startsWith = "startsWith";
  alert: any = { flag: false, msg: "" };
  vehSelect: boolean = true;
  commSelect: boolean = true;
  tempSelect: boolean = true;
  illSelect: boolean = true;
  spinner: boolean = false;
  commLoad: boolean = false;
  image1: any;
  wbsVehType="";
  wbsVehLine="";
  wbsGroup="";
  wbsPrefix="";
  wbsOption="";

  constructor(private service: IllustrationSearchService,private router:Router,private utilitiesService:UtilitiesService) {
  }

  ngOnInit(): void {
    this.showCenterPart();
    this.showCenterParts();
    this.wbsOption=localStorage.getItem("Option")||"";
    if(this.wbsOption!=""){
      this.getVehicle();
    }
    
    this.changeProductType();
    this.service.getPrefixDesc().subscribe((data: any) => {
      this.prefixList = data;
      console.log(this.prefixList);
    })
    this.commLoad=true;
    this.service.getCommList().subscribe((data: any) => {
      this.commodityList = data;
      console.log(this.commodityList);
      this.commLoad=false;
    })
  }
  
  getVehicle(){
    this.wbsVehType=localStorage.getItem("vehType")||"";
    this.wbsVehLine=localStorage.getItem("vehLine")||"";
    this.wbsGroup=localStorage.getItem("group")||"";
    this.wbsPrefix=localStorage.getItem("prefix")||"";
    localStorage.removeItem("Option");
    localStorage.removeItem("vehType");
    localStorage.removeItem("vehLine");
    localStorage.removeItem("group");
    localStorage.removeItem("prefix");
    console.log(this.wbsVehType+" "+this.wbsVehLine+" "+this.wbsGroup+" "+this.wbsPrefix);
    if(this.wbsVehType!=null){
      this.vehicle.vehType=this.wbsVehType;
    }
    if(this.wbsVehLine!=""){
      this.vehicle.vehLine =this.wbsVehLine;
       this.vehLine.vehLine=this.wbsVehLine;
      this.vehicle.vehPreCheck = "V";
    }
    if(this.wbsPrefix!=""){
      this.vehicle.prefix =this.wbsPrefix;
      this.prefix.prefix=this.wbsPrefix;
      this.vehicle.vehPreCheck = "P";
    }
    if(this.wbsGroup!=""){
      this.vehicle.group =this.wbsGroup
       this.group.id=this.wbsGroup;
    }
  }

  changeProductType() {
    this.service.getVehicleLine(this.vehicle.vehType).subscribe((data: any) => {
      this.vehicleList = data;
      console.log(this.vehicleList);
    })
  }

  clickVehicleLine() {
    this.vehicle.vehPreCheck = "V";
    this.vehicle.prefix = "";
    if (!(this.vehicle.vehType == "C" || this.vehicle.vehType == "T"))
      this.alertPopup("Please Select Either a Car or Truck");
  }

  changeVehicleLine() {
    if (this.vehLine == null)
      this.vehicle.vehLine = "";
    else {
      this.vehicle.vehLine = this.vehLine.vehLine;
      this.vehicle.vehPreCheck = "V";
      this.prefix = "";
      this.vehicle.prefix = "";
    }
    console.log(this.vehicle.vehLine);
  }

  clickPrefix() {
    this.vehicle.vehPreCheck = "P";
    this.vehicle.vehLine = "";
  }

  changePrefix() {
    if (this.prefix == null)
      this.vehicle.prefix = "";
    else {
      this.vehicle.prefix = this.prefix.prefix;
      this.vehicle.vehPreCheck = "P";
      this.vehLine = "";
      this.vehicle.vehLine = "";
    }
    console.log(this.vehicle.prefix);
  }

  changeGroup() {
    console.log(this.group.id);
    this.vehicle.group = this.group.id;
    console.log(this.vehicle.group);
  }

  enableVehSelect() {
    if (this.vehicle.prefix.length > 0)
      this.vehSelect = false;
    else if (this.vehicle.vehLine.length > 0)
      this.vehSelect = false;
    else if (this.vehicle.group.length > 0)
      this.vehSelect = false;
    else
      this.vehSelect = true;
  }

  clickVehSelect() {
    console.log(this.vehicle);
    if (this.vehicle.vehLine.length == 0 && this.vehicle.vehPreCheck == "V")
      this.alertPopup("Please Select a Vehicle Line");
    else if (this.vehicle.prefix.length == 0 && this.vehicle.vehPreCheck == "P")
      this.alertPopup("Please Select a Prefix");
    else if (this.vehicle.vehLine.length == 0 && this.vehicle.prefix.length == 0
      && this.vehicle.group.length > 0)
      this.alertPopup("Please Enter Atleast One Criteria");
    else {
      this.utilitiesService.setLoading(true);
      this.service.getIllusVeh(this.vehicle).subscribe((data: any) => {
        this.utilitiesService.setLoading(false);
        this.loadSelect(data);
      })
    }
  }

  commOption() {
    if (this.commodityList.length == 0 && !this.commLoad) {
      this.spinner = true;
      this.service.getCommList().subscribe((data: any) => {
        this.commodityList = data;
        this.spinner = false;
        console.log(this.commodityList);
      })
    }
  }

  changeCommodity() {
    console.log(this.commoditys.data);
    this.commodity.commodity = this.commoditys.data;
    console.log(this.commodity.commodity);
  }

  enableCommSelect() {
    if (this.commodity.commodity.length > 0)
      this.commSelect = false;
    else
      this.commSelect = true;
  }

  clickCommSelect() {
    this.utilitiesService.setLoading(true);
    this.service.getIllusComm(this.commodity).subscribe((data: any) => {
      this.utilitiesService.setLoading(false);
      this.loadSelect(data);
    })
  }

  loadSelect(data:any){
    console.log(data);
    if (data.length == 0)
      this.alertPopup("No Records Found");
    else {
      this.utilitiesService.setIllustrationId(data);
      this.router.navigateByUrl('/illsearchres');
    }
  }

  tempOption() {
    if (this.templateList.length == 0) {
      this.spinner = true;
      this.service.getTempList().subscribe((data: any) => {
        this.templateList = data;
        this.spinner = false;
        console.log(this.templateList);
      })
    }
  }

  changeTemplate() {
    console.log(this.templates.data);
    this.template.template = this.templates.data;
    console.log(this.template.template);
  }

  enableTempSelect() {
    if (this.template.template.length > 0 &&
      (this.template.vehType == "C" || this.template.vehType == "T"))
      this.tempSelect = false;
    else
      this.tempSelect = true;
  }

  clickTempSelect() {
    this.utilitiesService.setLoading(true);
    this.service.getIllusTemp(this.template).subscribe((data: any) => {
      this.utilitiesService.setLoading(false);
      this.loadSelect(data);
    })
  }

  clickNoSecSelect() {
    this.utilitiesService.setLoading(true);
    this.service.getIllusNoSec().subscribe((data: any) => {
      this.utilitiesService.setLoading(false);
      this.loadSelect(data);
    })
  }

  illOption() {
    if (this.illList.length == 0) {
      this.spinner = true;
      this.service.getIllusList().subscribe((data: any) => {
        this.illList = data;
        this.spinner = false;
        console.log(this.illList);
      })
    }
  }

  changeIll() {
    this.illId = this.ills.data;
    console.log(this.illId);
  }

  enableIllSelect() {
    if (this.illId.length > 0)
      this.illSelect = false;
    else
      this.illSelect = true;
  }

  clickIllSelect() {
    this.utilitiesService.setLoading(true);
    this.service.getIllusId(this.illId).subscribe((data: any) => {
      this.utilitiesService.setLoading(false);
      console.log(data);
    if (data.length == 0)
      this.alertPopup("No Illustrations Found");
    else {
      this.utilitiesService.setIllustrationId(data);
      this.router.navigateByUrl('/illsearchres');
    }
    })
  }

  clear() {
    if (this.show == "1") {
      this.vehicle = { vehType: "", vehPreCheck: "", vehLine: "", prefix: "", groupCheck: false, group: "" };
      this.vehLine = {};
      this.prefix = {};
      this.group = {};
      this.vehSelect = true;
    } else if (this.show == "2") {
      this.commodity = { commodity: "", vehType: "" };
      this.commoditys = {};
      this.commSelect = true;
    } else if (this.show == "3") {
      this.template = { template: "", vehType: "" };
      this.templates = {};
      this.tempSelect = true;
    } else if (this.show == "5") {
      this.illId = "";
      this.illSelect = true;
    }
  }

  wbs(){
    this.router.navigateByUrl('/wbs');
  }

  irp(){
    this.router.navigateByUrl('/irp');
  }

  close(){
    this.router.navigateByUrl('/');
  }

  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }

  popupOk() {
    this.alert.flag = false;
  }

  display: any = "none"
  display1: any = "none"
  count: any = 0;
  counts1: any = 0
  rotate: any;
  rotate1: any;
  br1: string = "5px"
  br2: string = "5px"

  showCenterPart() {
    if (this.count == 0) {
      this.display = "block"
      this.count = 1;
      this.br1 = "5px 5px 0px 0px"
      this.rotate = "rotate(45deg);"
    } else {
      this.br1 = "5px"
      this.display = "none"
      this.count = 0;
      this.rotate = "rotate(0deg);"
    }
  }
  showCenterParts() {
    if (this.counts1 == 0) {
      this.display1 = "block"
      this.counts1 = 1;
      this.rotate1 = "rotate(45deg)"
      this.br2 = "5px 5px 0px 0px"
    } else {
      this.display1 = "none"
      this.counts1 = 0;
      this.rotate1 = "rotate(0deg)"
      this.br2 = "5px 5px 5px 5px"
    }
  }
}
