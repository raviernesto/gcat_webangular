import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode, MenuItem } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

import { ContextMenu } from 'primeng/contextmenu';
import { Router } from '@angular/router';
import { UtilitiesService } from '../shared/services/utilities.service';
import { WorkQueue } from '../interfaces/part-workqueue';

import { WorkBreakdownStructureService } from '../services/work-breakdown-structure.service';
import { WbsCopy, Node } from '../models/wbs.class';
import { environment } from 'src/environments/environment';
import { CatalogService } from '../services/catalog-section.service';
import { IllustrationSearchService } from '../services/illustration-search.service';


@Component({
  selector: 'app-work-breakdown-structure',
  templateUrl: './work-breakdown-structure.component.html',
  styleUrls: ['./work-breakdown-structure.component.scss']
})
export class WorkBreakdownStructureComponent implements OnInit {

  constructor(private service: WorkBreakdownStructureService, private router: Router, private utilitiesService: UtilitiesService, private illService: CatalogService, private illsService: IllustrationSearchService) { }

  files1: TreeNode[] = [];
  files2: TreeNode[] = [];
  files3: TreeNode[] = [];
  files4: TreeNode[] = [];
  nodes: Node = { label: "", type: "", tempId: "", sectId: "", group: "", commodity: "", prefix: "", vehLine: "", desc: "", illId: "" };
  nodeSelected: any;

  radioOption: string = "1";
  alert: any = { flag: false, msg: "" };
  confirm: any = { flag: false, msg: "" };
  ill: any = { flag: false, msg: "" };
  region = "N";
  loading = false;
  copy = 0;
  wbsCopy = false;
  section: string = "";
  sectionNo = [
    { name: 1, value: 1 },
    { name: 2, value: 2 },
    { name: 3, value: 3 },
    { name: 4, value: 4 },
    { name: 5, value: 5 },
  ];

  commodityType: any;
  copyPart: number = 1;
  copyPart1: number = 0;
  copyPart2: number = 0;
  prefixList: any;
  selectedSectionNo: number = 0;
  selectedParts: any;
  selectedSection: any;
  copyWbs: WbsCopy = { sectId: "", cmdtyType: "", vehLine: "", vehDesc: "", prefix: "", prefDesc: "", isComm: "N", isPref: "N", msg: ""};
  isOkButton: boolean = true;
  clickEvent: any;
  wq: any = null;
  illId: any = "";
  illRev = "";
  illTable = [];
  isProp = false;
  sample: any;

  opt11: MenuItem[] = [];
  opt12: MenuItem[] = [];
  opt13: MenuItem[] = [];
  opt22: MenuItem[] = [];
  opt23: MenuItem[] = [];
  opt31: MenuItem[] = [];
  opt32: MenuItem[] = [];
  opt33: MenuItem[] = [];
  opt41: MenuItem[] = [];
  illEnable = true;

  option1: boolean = true;
  option2: boolean = false;
  option3: boolean = false;
  option4: boolean = false;
  spinner: boolean = false;

  comm: string = "";
  type: string = "";
  vehLine: string = "";
  engPart: string = "";
  servPart: string = "";
  origin: string = "";
  seq: string = "";

  @ViewChild("cm") cm!: ContextMenu;
  @ViewChild("opt011") opt011!: ContextMenu;
  @ViewChild("opt012") opt012!: ContextMenu;
  @ViewChild("opt013") opt013!: ContextMenu;
  @ViewChild("opt022") opt022!: ContextMenu;
  @ViewChild("opt023") opt023!: ContextMenu;
  @ViewChild("opt031") opt031!: ContextMenu;
  @ViewChild("opt032") opt032!: ContextMenu;
  @ViewChild("opt033") opt033!: ContextMenu;
  @ViewChild("opt041") opt041!: ContextMenu;

  ngOnInit(): void {
    this.showCenterPart();
    this.spinner = true;
    this.utilitiesService.selectedWorkQueue.subscribe((wq: WorkQueue) => {
      if (!!wq) {
        console.log(wq);
        this.wq = wq;
        if(this.wq.reasonCodeC.length>0){
          if(this.wq.reasonCodeC == "PRS")
            this.radioOption = "4";
          if (this.wq.reasonCodeC == "CRT" || this.wq.reasonCodeC == "TAS" || this.wq.reasonCodeC == "PRS" ||
            this.wq.reasonCodeC == "TAP" || this.wq.reasonCodeC == "CNA" || this.wq.reasonCodeC == "CNS" || this.wq.reasonCodeC == "CRS" ||
            this.wq.reasonCodeC == "SAC" || this.wq.reasonCodeC == "SAN" || this.wq.reasonCodeC == "SAP" || this.wq.reasonCodeC == "CNS" ||
            this.wq.reasonCodeC == "TAN") {
            this.sample = "Cmdty Type:" + this.wq.cmdtyTypeC + ", Cmdty:" + this.wq.engpCommodityC
            console.log("Sample "+this.sample)
          }
        }
      }
    });
    console.log(this.radioOption);
    if (this.radioOption != "4") {
      (<HTMLInputElement>document.getElementById("view4")).disabled = true;
      this.service.wbsGroup(this.radioOption).subscribe((data: any) => {
        this.loading = false;
        this.files1 = data;
        console.log(this.files1);
        this.spinner = false;
      })
    } else if(this.wq.reasonCodeC=="PRS"){
      this.comm = this.wq.engpCommodityC;
      this.type = this.wq.cmdtyTypeC;
      this.vehLine = this.wq.evlVehicleLineC;
      this.engPart = this.wq.engpEngnrgPartR;
      this.servPart = this.wq.sprfxprtPrefixR + this.wq.sbaseprtNbr + this.wq.sufxprtSuffixNbr;
      this.origin = this.wq.eioOriginC;
      this.seq = this.wq.engpSeqR;
      this.section = ": " + this.comm + ", Vehicle Line : " + this.vehLine + ", Eng Part : " + this.engPart + ", Service Part : " + this.servPart;
      this.option1 = false;
      this.option2 = false;
      this.option3 = false;
      this.option4 = true;
      this.spinner = true;
      (<HTMLInputElement>document.getElementById("view4")).disabled = false;
      this.service.optionLoad(this.type, this.comm, this.vehLine).subscribe((data: any) => {
        this.spinner = false;
        this.loading = false;
        this.files4 = data;
        console.log(this.files4);
        if (this.type == "C")
          this.expandAll(this.files4[0]);
        else
          this.expandAll(this.files4[1]);
      })
    }
    this.opt11 = [
      { label: 'Insert New', icon: 'pi pi-angle-double-right', command: (_event) => this.newTemplate(this.nodes) },
    ];

    this.opt12 = [
      { label: 'Show Long Desc', icon: 'pi pi-angle-double-right', command: (_event) => this.longdesc(this.nodes) },
      { label: 'Update Existing', icon: 'pi pi-angle-double-right', command: (_event) => this.existingTemplate(this.nodes) },
      { label: 'Insert New', icon: 'pi pi-angle-double-right', command: (_event) => this.newTemplate(this.nodes) },
      { label: 'Copy', icon: 'pi pi-angle-double-right', command: (_event) => this.yet(), styleClass: "menu" }
    ];

    this.opt13 = [
      { label: 'Show Long Desc', icon: 'pi pi-angle-double-right', command: (_event) => this.longdesc(this.nodes) },
      { label: 'Update Existing', icon: 'pi pi-angle-double-right', command: (_event) => this.commodity(this.nodes) },
    ];

    this.opt22 = [
      { label: 'Show Long Desc', icon: 'pi pi-angle-double-right', command: (_event) => this.longdesc(this.nodes) },
      { label: 'Update Existing', icon: 'pi pi-angle-double-right', command: (_event) => this.existingTemplate(this.nodes) },
      { label: 'Insert New', icon: 'pi pi-angle-double-right', command: (_event) => this.wbsCopyflag(_event) }
    ];

    this.opt23 = [
      { label: 'Show Long Desc', icon: 'pi pi-angle-double-right', command: (_event) => this.longdesc1(this.nodes) },
      { label: 'Show Properties', icon: 'pi pi-angle-double-right', command: (_event) => this.showProp() },
      { label: 'Update Existing', icon: 'pi pi-angle-double-right', command: (_event) => this.updateExisting(this.nodes) },
      { label: 'Insert New', icon: 'pi pi-angle-double-right', command: (_event) => this.insertNew(this.nodes) },
      { label: 'Show Catalogued Parts', icon: 'pi pi-angle-double-right', command: (_event) => this.audit() },
      { label: 'Section Copy', icon: 'pi pi-angle-double-right', command: (_event) => this.sectionCopy(this.nodes) },
      { label: 'Copy', icon: 'pi pi-angle-double-right', command: (_event) => this.wbsCopyflag(_event) },
      {
        label: 'Illustration', icon: 'pi pi-angle-double-right',
        items: [

          { label: 'Illustration Search Screen', icon: 'pi pi-angle-double-right', command: (_event) => this.illSearch() },
          { label: 'Detach Illustration', icon: 'pi pi-angle-double-right', command: (_event) => this.detach() },
          { label: 'Attach Illustration', icon: 'pi pi-angle-double-right', command: (_event) => this.yet(), disabled: true },
          { label: 'Create New Illustration', icon: 'pi pi-angle-double-right', command: (_event) => this.illcreate() },
          { label: 'Revise Existing Illustration', icon: 'pi pi-angle-double-right', command: (_event) => this.illexisting() },
          { label: 'Open IRP', icon: 'pi pi-angle-double-right', command: (_event) => this.openIrp(this.nodes.illId) },
        ]
      },
    ];


    this.opt32 = [
      { label: 'Copy', icon: 'pi pi-angle-double-right', command: (_event) => this.wbsCopyflag(_event) },
    ];

    this.opt33 = [
      { label: 'Show Long Desc', icon: 'pi pi-angle-double-right', command: (_event) => this.longdesc(this.nodes) },
      { label: 'Show Properties', icon: 'pi pi-angle-double-right', command: (_event) => this.showProp() },
      { label: 'Update Existing', icon: 'pi pi-angle-double-right', command: (_event) => this.updateExisting(this.nodes) },
      { label: 'Insert New', icon: 'pi pi-angle-double-right', command: (_event) => this.insertNew(this.nodes) },
      { label: 'Show Catalogued Parts', icon: 'pi pi-angle-double-right', command: (_event) => this.audit() },
      { label: 'Section Copy', icon: 'pi pi-angle-double-right', command: (_event) => this.sectionCopy(this.nodes) },
      { label: 'Copy', icon: 'pi pi-angle-double-right', command: (_event) => this.wbsCopyflag(_event) },
      {
        label: 'Illustration', icon: 'pi pi-angle-double-right',
        items: [

          { label: 'Illustration Search Screen', icon: 'pi pi-angle-double-right', command: (_event) => this.illSearch() },
          { label: 'Detach Illustration', icon: 'pi pi-angle-double-right', command: (_event) => this.detach() },
          { label: 'Attach Illustration', icon: 'pi pi-angle-double-right', command: (_event) => this.yet(), disabled: true },
          { label: 'Create New Illustration', icon: 'pi pi-angle-double-right', command: (_event) => this.illcreate() },
          { label: 'Revise Existing Illustration', icon: 'pi pi-angle-double-right', command: (_event) => this.illexisting() },
          { label: 'Open IRP', icon: 'pi pi-angle-double-right', command: (_event) => this.openIrp(this.nodes.illId) },
        ]
      },
    ];

    this.opt41 = [
      { label: 'Show Properties', icon: 'pi pi-angle-double-right', command: (_event) => this.showProp() },
      { label: 'Remove from Section', icon: 'pi pi-angle-double-right', command: (_event) => this.yet(), disabled: true  },
      { label: 'Commodity Suffix', icon: 'pi pi-angle-double-right', command: (_event) => this.commoditySuffix(this.nodes) },
      { label: 'Assign Section', icon: 'pi pi-angle-double-right', command: (_event) => this.assignSection() },
      { label: 'Show Catalogued Parts', icon: 'pi pi-angle-double-right', command: (_event) => this.audit() },
      {
        label: 'Illustration', icon: 'pi pi-angle-double-right',
        items: [

          { label: 'Illustration Search Screen', icon: 'pi pi-angle-double-right', command: (_event) => this.illSearch() },
          { label: 'Detach Illustration', icon: 'pi pi-angle-double-right', command: (_event) => this.detach() },
          { label: 'Attach Illustration', icon: 'pi pi-angle-double-right', command: (_event) => this.yet(), disabled: true },
          { label: 'Create New Illustration', icon: 'pi pi-angle-double-right', command: (_event) => this.illcreate() },
          { label: 'Revise Existing Illustration', icon: 'pi pi-angle-double-right', command: (_event) => this.illexisting() },
          { label: 'Open IRP', icon: 'pi pi-angle-double-right', command: (_event) => this.openIrp(this.nodes.illId) },
        ]
      },
    ];
  }
  nodeExpand(event: any) {

    console.log("Inside");
    console.log(event.node);
    this.nodes = { label: "", type: "", tempId: "", sectId: "", group: "", commodity: "", prefix: "", vehLine: "", desc: "", illId: "" };
    this.nodes.group = event.node.group;
    this.nodes.type = event.node.type;
    console.log(this.nodes);
    if (event.node.tempId != "" && event.node.sectId == "" && this.radioOption == "1") {
      this.nodes.tempId = event.node.tempId;
      console.log(this.nodes);
      this.service.nodeExpandComm(this.nodes).subscribe((data: any) => {
        this.setNode(event, data);
      });
    }
    else if (event.node.tempId != "" && event.node.sectId == "" && this.radioOption == "2") {
      this.nodes.tempId = event.node.tempId;
      console.log(this.nodes);
      this.service.nodeExpandTemp(this.nodes).subscribe((data: any) => {
        this.setNode(event, data);
      });
    } else if (event.node.type.length > 0 && event.node.group.length > 0 && (event.node.vehLine != "" || event.node.prefix != "") && this.radioOption == "3") {
      if (event.node.vehLine != "") {
        this.nodes.vehLine = event.node.vehLine;
        console.log(this.nodes);
        this.service.nodeExpandSect1(this.nodes).subscribe((data: any) => {
          this.setNode(event, data);
        });
      } else {
        this.nodes.prefix = event.node.prefix;
        console.log(this.nodes);
        this.service.nodeExpandSect2(this.nodes).subscribe((data: any) => {
          this.setNode(event, data)
        });
      }
    }
  }

  setNode(event: any, data: any) {
    console.log(data.children);
    event.node.children = data.children;
    if (data.children == []) this.alertPopup("No Records Found");
  }
  nodeSelect(event: any) {
    console.log("Node Select");
    console.log(event.node);
    this.nodeSelected = event.node;
    this.clickEvent = event;
    this.illEnable = event.node.label.startsWith("C");
  }

  load1() {
    this.option1 = true;
    this.option2 = false;
    this.option3 = false;
    this.option4 = false;
    console.log(this.radioOption);
    console.log(this.files1);
    if (this.files1.length == 0) {
      this.spinner = true;
      this.service.wbsGroup(this.radioOption).subscribe((data: any) => {
        console.log(this.files1);
        this.spinner = false;
        this.files1 = data;
      })
    }
  }

  load2() {
    this.option1 = false;
    this.option2 = true;
    this.option3 = false;
    this.option4 = false;
    console.log(this.radioOption);
    console.log(this.files2.length);
    if (this.files2.length == 0) {
      this.spinner = true;
      this.service.wbsGroup(this.radioOption).subscribe((data: any) => {
        this.spinner = false;
        this.files2 = data;
        console.log(this.files2);
      })
    }
  }

  load3() {
    this.option1 = false;
    this.option2 = false;
    this.option3 = true;
    this.option4 = false;
    console.log(this.radioOption);
    console.log(this.files3);
    if (this.files3.length == 0) {
      this.spinner = true;
      this.service.wbsGroup(this.radioOption).subscribe((data: any) => {
        this.spinner = false;
        this.files3 = data;
        console.log(this.files3);
      })
    }
  }

  load4() {
    this.option1 = false;
    this.option2 = false;
    this.option3 = false;
    this.option4 = true;
  }

  updateExisting(node1: Node) {
    console.log(node1);
    window.open(environment.dev + '/catalogsection');
    localStorage.setItem('sectionId', node1.sectId);
    localStorage.setItem('newSection', "false");
  }

  insertNew(node1: Node) {
    console.log(node1);
    window.open(environment.dev + '/catalogsection');
    localStorage.setItem('sectionId', node1.sectId);
    localStorage.setItem('newSection', "true");
  }

  sectionCopy(node1: Node) {
    console.log(node1);
    this.copy++;
    localStorage.setItem('sectionId', node1.sectId);
  }

  longdesc(node1: Node) {
    console.log(node1);
    if (node1.desc == "" || node1.desc == null)
      this.alertPopup("No description available");
    else
      this.alertPopup(node1.desc);
  }

  longdesc1(node1: any) {
    console.log(node1);
    if (node1.parent.desc == "" || node1.parent.desc == null)
      this.alertPopup("No description available");
    else
      this.alertPopup(node1.parent.desc);
  }

  nodeMenu1(event: any, node: any) {
    console.log(event);
    console.log(this.nodes);
    console.log(node);
    console.log(this.nodes.group);
    console.log(this.nodes.tempId);
    console.log(this.nodes.commodity);
    if ((this.nodes.group != "") && this.nodes.tempId == "") {
      this.opt011.show(event);
    } else if (this.nodes.group != "" && this.nodes.tempId != "" && this.nodes.commodity == "") {
      this.opt012.show(event);
    } else if (this.nodes.group != "" && this.nodes.tempId != "" && this.nodes.commodity != "") {
      this.opt013.show(event);
    }
  }

  nodeMenu2(event: any, node: any) {
    console.log(event);
    console.log(this.nodes);
    console.log(node);
    console.log(this.nodes.group);
    console.log(this.nodes.tempId);
    console.log(this.nodes.sectId);
    if (this.nodes.group != "" && this.nodes.tempId != "" && this.nodes.sectId == "") {
      this.opt022.show(event);
    } else if (this.nodes.group != "" && this.nodes.tempId != "" && this.nodes.sectId != "") {
      this.opt023.show(event);
    }
  }

  nodeMenu3(event: any, node: any) {
    console.log(event);
    console.log(this.nodes);
    console.log(node);
    console.log(this.nodes.group);
    console.log(this.nodes.tempId);
    console.log(this.nodes.sectId);
    if (this.nodes.group != "" && this.nodes.tempId != "" && this.nodes.sectId != "") {
      this.opt033.show(event);
    } else if (this.nodes.group != "" && (this.nodes.vehLine != "" || this.nodes.prefix != "")) {
      this.opt032.show(event);
    }
  }

  nodeMenu4(event: any, node: any) {
    console.log(node);
    this.opt041.show(event);
  }

  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }

  closeOk() {
    this.alert.flag = false;
  }

  commodity(node1: any) {
    console.log(node1);
    window.open(environment.dev + '/devcommmodity');
    localStorage.setItem('Screen', "Wbs");
    localStorage.setItem('commodity', node1.commodity);
    localStorage.setItem('vehType', node1.vehType);
  }

  existingTemplate(node1: any) {
    console.log(node1);
    window.open(environment.dev + '/temp-setup');
    localStorage.setItem('templateId', node1.tempId);
    localStorage.setItem('newTemplate', "false");
  }

  newTemplate(node1: any) {
    console.log(node1);
    window.open(environment.dev + '/temp-setup');
    localStorage.setItem('templateId', node1.tempId);
    localStorage.setItem('newTemplate', "true");
  }

  wbsCopyflag(event: any) {
    this.wbsCopy = true;
    this.clickEvent = event;
  }

  wbsCopyClose() {
    this.wbsCopy = false;
    this.selectedParts = "";
    this.selectedSection = "";
    this.selectedSectionNo = 0;
    this.copyWbs.isComm = "N";
    this.copyWbs.isPref = "N";
  }

  wbsCopyShow() {
    console.log(this.nodes);
    this.copyWbs.group = this.nodes.group;
    this.copyWbs.sectId = this.nodes.sectId;
    this.copyWbs.cmdtyType = this.nodes.type;
    if (this.nodes.group == "3") {
      this.copyPart = 2;
      this.service.fetchprefix().subscribe((data: any) => {
        this.prefixList = data;
        console.log(this.prefixList);
      });
    } else {
      this.copyPart = 1;
      this.service.fetchWbsdropdown().subscribe((data: any) => {
        this.commodityType = data;
        console.log(this.commodityType);
      });
    }
    if(this.nodes.sectId==""){
      this.copyPart1=3;
      this.copyPart2=3;
    }
    else{
      this.copyPart1=0;
      this.copyPart2=3;
    }
  }

  goToSect() {
    console.log(this.copyWbs.secCount);
    if (this.copyWbs.secCount == undefined) this.copyWbs.secCount = 1;
    if(this.radioOption=="2" && this.nodes.sectId==""){
       window.open(environment.dev + '/catalogsection');
        localStorage.setItem('sectionId', "0");
        localStorage.setItem('newSection', "true");
        localStorage.setItem('vehLine', this.copyWbs.vehLine);
        localStorage.setItem('vehDesc', this.copyWbs.vehDesc);
        localStorage.setItem('prefix', this.copyWbs.prefix);
        localStorage.setItem('preDesc', this.copyWbs.prefDesc);
        localStorage.setItem('tempId', this.nodes.tempId);
        localStorage.setItem('type', this.nodes.type);
    }else{
    this.service.saveCopy(this.copyWbs).subscribe((data: any) => {
      if (data.msg != null) {
        this.alertPopup("Copy successful in " + data.msg + " copies");
        this.wbsCopy = false;
        let nodeload: Node = { label: "", type: this.nodes.type, tempId: this.nodes.tempId, sectId: "", group: this.nodes.group, commodity: "", prefix: "", vehLine: "", desc: "", illId: "" };
        this.service.nodeExpandTemp(nodeload).subscribe((res: any) => {
          console.log(res.children);
          console.log(this.nodeSelected);
          this.nodeSelected.parent.children = res.children;
          this.selectedParts = "";
          this.selectedSection = "";
          this.selectedSectionNo = 0;
          this.copyWbs.isComm = "N";
          this.copyWbs.isPref = "N";
        });

      }
      else if (data.err != null)
        this.alertPopup("Copy unsuccessful");
      this.wbsCopy = false;
    });
  }
  }

  wbsdropdown() {
    console.log(this.selectedParts);
    this.copyWbs.vehLine = this.selectedParts.vehLine;
    this.copyWbs.vehDesc = this.selectedParts.prtDesc;
    if (this.selectedSectionNo > 0)
      this.isOkButton = false;
  }

  prefixdropdown() {
    console.log(this.selectedSection);
    this.copyWbs.prefix = this.selectedSection.famPrefix;
    this.copyWbs.prefDesc = this.selectedSection.famprxDesc;
    if (this.selectedSectionNo > 0)
      this.isOkButton = false;
  }

  sectionChange() {
    this.copyWbs.secCount = this.selectedSectionNo;
    if (this.copyWbs.group == "3" && this.copyWbs.prefix != "" ||
      this.copyWbs.group != "3" && this.copyWbs.vehLine != "")
      this.isOkButton = false;
  }

  showProp() {
    console.log(this.nodes);
    this.service.showProp(this.nodes.sectId).subscribe((data: any) => {
      console.log(data);
      if (data.length > 0) {
        this.illId = data[0].illId;
        this.illRev = data[0].illRev;
        this.illTable = data;
      }
      this.isProp = true;
    });
  }

  closeProp() {
    this.isProp = false;
    this.illTable = [];
    this.illId = "";
    this.illRev = "";
  }

  illcreate() {
    if (this.nodes.illId != "")
      this.alertPopup("Illustration no [ " + this.nodes.illId + " ] already exists for this section. " +
        "Please select the 'Open IRP' option to modify any IRP for it or select the " +
        "'Detach Illustration' option to disassociate the Illustration from this section.");
    else {
      this.ill.flag = true;
    }
  }

  illexisting() {
    console.log(this.nodes.illId);
    if(this.nodes.illId!=""){
      this.service.getreqIdR(this.nodes.illId).subscribe((data:any)=>{
        console.log(data);
        if(data.data>0){
          this.alertPopup("An open IRP exists for the selected Illustration Publication Date. "+
          "A new IRP cannot be created.  Choose Open IRP to access existing IRP.");
        }else{
          this.ill.flag = true;
        }
      });
    }else
      this.ill.flag = true;
  }

  illOk() {
    this.ill.flag = false;
    this.illService.createIll(this.nodes.sectId, this.region).subscribe((data1: any) => {
      if (data1.data != null) {
        this.illsService.getIrp(data1.data).subscribe((data: any) => {
          console.log(data);
          if (data.length == 1 && data[0].illstrIdR != null) {
            console.log("Redirect");
            this.utilitiesService.setIrp(data[0]);
            this.router.navigateByUrl('/irp-review');
            this.ill.flag = false;
          }
        })
      } else {
        this.alertPopup("Illustarion Creation was not Successful");
      }
    });
  }

  illSearch() {
    console.log(this.nodes);
    window.open(environment.dev + '/illsearch');
    localStorage.setItem("Option", this.radioOption);
    localStorage.setItem("vehType", this.nodes.type);
    localStorage.setItem("group", this.nodes.group);
    localStorage.setItem("prefix", this.nodes.prefix);
    localStorage.setItem("vehLine", this.nodes.vehLine);
  }

  assignSection() {
    let input = { nusageC: this.wq.nusageC, sectSectionIdR: this.nodes.sectId, cmdtyTypeC: this.wq.cmdtyTypeC, engpCommodityC: this.wq.engpCommodityC }
    this.service.assignSection(input).subscribe((data: any) => {
      console.log(data);
      this.alertPopup(data.data);
    });
  }

  openIrp(data1: any) {
    if (data1 == "") {
      this.alertPopup("No IRP Exists for this Section");
    } else {
      this.illsService.getIrp(data1).subscribe((data: any) => {
        console.log(data);
        if (data.length == 1 && data[0].illstrIdR != null) {
          console.log("Redirect");
          this.utilitiesService.setIrp(data[0]);
          this.router.navigateByUrl('/irp-review');
          this.ill.flag = false;
        }
      })
    }
  }
  detach() {
    this.service.detachIllCheck(this.nodes.sectId).subscribe((data: any) => {
      console.log(data);
      if (data.msg != null)
        this.alertPopup(data.msg);
      else if (data.msg3 != null)
        this.alertPopup(data.msg3);
      else if (data.msg2 != null) {
        this.confirm.flag = true;
        this.confirm.msg = data.msg2;
      }
    });
  }
  confirmOk() {
    this.confirm.flag = false;
    this.service.detachIll(this.nodes.sectId).subscribe((data: any) => {
      console.log(data);
      this.alertPopup("Illustration Detached Successfully")
      this.nodes.illId = "";
    });
  }
  confirmCancel() {
    this.confirm.flag = false;
  }

  audit() {
    localStorage.setItem('sectionid', this.nodes.sectId);
    localStorage.setItem('lang', "EN");
    localStorage.setItem('property', "");
    window.open(environment.dev + '/auditdetails');
  }

  yet() {
    this.alertPopup("Screen Development is in Progress");
  }

  copyClose() {
    this.copy = 0;
  }
  counting: number = 0;
  expandAll(files: TreeNode) {
    this.expandRecursive(files, true);
  }
  collapse(files: TreeNode) {
    this.expandRecursive(files, false);
  }

  collapseAll(files: TreeNode[]) {
    files.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
        console.log(node.children)
      });
    }
  }

  commoditySuffix(node1: Node) {
    window.open(environment.dev + '/commoditysuffix');
    localStorage.setItem('commodity', this.comm);
    localStorage.setItem('type', this.type);
    localStorage.setItem('sectId', node1.sectId + node1.suffix);
    localStorage.setItem('engPart', this.engPart);
    localStorage.setItem('origin', this.origin);
    localStorage.setItem('seq', this.seq);
  }
  display: any = "none"
  display1: any = "none"
  count: any = 0;
  counts: any = 0
  rotate: any;
  br: string = "5px 5px 5px 5px"
  showCenterPart() {
    if (this.count == 0) {
      this.display = "block"
      this.br = "5px 5px 0px 0px";
      this.count = 1;
      this.rotate = "rotate(45deg);"
    } else {
      this.display = "none"
      this.br = "5px 5px 5px 5px";
      this.count = 0;
      this.rotate = "rotate(0deg);"
    }
  }

  close() {
    this.router.navigateByUrl('/');
  }
}