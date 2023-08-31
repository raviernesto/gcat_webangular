import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AssignmentDetails, CommodityCheck, DeleteWqByReasonCode, PartWorkqueueMaster, WorkQueue, WorkQueueFilter } from '../interfaces/part-workqueue';
import { PartWorkqueueService } from '../services/part-workqueue.service';
import { LazyLoadEvent, PrimeNGConfig, Message, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserRole } from '../interfaces/user-roles';
import { UserService } from '../services/user.service';
import { Dropdown } from 'primeng/dropdown';
import { UtilitiesService } from '../shared/services/utilities.service';
import { GcatIrp2ResDto } from '../interfaces/irp';



@Component({
  selector: 'app-part-workqueue',
  templateUrl: './part-workqueue.component.html',
  styleUrls: ['./part-workqueue.component.css'],
  providers: [ConfirmationService],
  encapsulation: ViewEncapsulation.None,
})
export class PartWorkqueueComponent implements OnInit {
  isSearchDisabled: boolean = true;
  showTable: boolean = false;
  isUtcDis:boolean=true;
  gcatIrp2Res:GcatIrp2ResDto[]=[];
  work_queue: WorkQueue[];
  productTypeOrigin: any[] = [];
  totalRecords: number = 0;
  templateIdList: [] = [];
  isTemplate: boolean = false;
  selectedWQ: WorkQueue = {};
  displayKeyDataModal: boolean = false;
  displayReqIdModal: boolean = false;
  assignmentDetails: AssignmentDetails[] = [];
  CommodityCheck: CommodityCheck = {};
  deleteWqByReasonCode: DeleteWqByReasonCode = {};
  workQueueMaster: PartWorkqueueMaster = {
    reasonCodeList: [],
    s4pCodeList: [],
    sourceInList: [],
    userList: [],
    vehcleLineList: [],
    vehcleTypeCodeList: []
  };
  workQueueFilter: WorkQueueFilter = {};
  displayAssignmentModal: boolean = false;
  msgs: Message[] = [];
  validFields: any = {
    analyst: false,
    commodity: false,
    template: false,
    engBase: false,
    productType: false,
    productTypeOrgin: false,
    vehicleLine: false,
    SAPCode: false,
    sourceIn: false,
    effectiveInDate: false,
    reasonCode: false
  }
  isProdoriginDis:boolean=true;
  workQueueForm = this.fb.group({
    analystId: [''],
    analystCheck: false,
    templateCheck: false,
    template: [{ value: '', disabled: true }],
    commodityCheck: false,
    commodity: [''],
    engBase: [{ value: '', disabled: this.isTemplate }],
    engBaseCheck: false,
    productTypeCheck: false,
    productType: [{ value: '', disabled: this.isTemplate }],
    productTypeOrginCheck:  false,
    productTypeOrgin: [{ value: '', disabled: true }],
    vehicleLineCheck: false,
    vehicleLine: [''],
    SAPCodeCheck: false,
    SAPCode: [''],
    sourceIn: [''],
    sourceInCheck: false,
    effectiveInDateCheck: [{ value: false, disabled: false }],
    effectiveInDate: '',
    reasonCodeCheck: false,
    reasonCode: [''],
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });
  loginUserId = 'GVELAN'
  rolesUserHasArray: string[] = [];
  saveUtcConfirmVis:boolean=false;
  otherUserRoles: string[] = [];
  userRoles: UserRole[] = [];
  btnKeyDataDisabled: boolean = true;
  btnDeleteDisabled: boolean = true;
  btnAsgnmntDisabled: boolean = true;
  btnReplay: boolean = true;
  btnCmdtyCheck: boolean = true;
  btnCmdtyDisabled: boolean = false;
  @ViewChild('analystDd')
  dropdown!: Dropdown;
  alert: any = {
    flag: false,
    msg: "",
  }
  inactivePart: string = "";
  inactivePartVis: boolean = false;
  startsWith="startsWith";
  totalCount: any;
  constructor(private fb: FormBuilder,
    private partWorkqueueService: PartWorkqueueService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private userService: UserService,
    public utilitiesService: UtilitiesService,
    private confirmationService: ConfirmationService,) {
    this.work_queue = [];
  }

  ngOnInit(): void {
    this.utilitiesService.setLoading(true);
    this.utilitiesService.fromNewUsg.next(false);
    this.utilitiesService.setActivateInactive(false);
    this.primengConfig.ripple = true;
    this.showTable = false;
    this.getUserRoles(this.loginUserId);
    this.getReasonCodesList();
    this.workQueueForm.get('templateCheck')?.valueChanges.subscribe((v: any) => {
      if (v) {
        this.workQueueForm.get('template')?.enable();
        this.isTemplate = true;
        this.workQueueForm.patchValue({
          commodityCheck: false,
          commodity: '',
          engBase: '',
          engBaseCheck: false,
          productTypeCheck: false,
          productType: '',
          productTypeOrginCheck: false,
          productTypeOrgin: '',
          SAPCodeCheck: false,
          SAPCode: '',
          sourceIn: '',
          sourceInCheck: false,
          effectiveInDateCheck: false,
          effectiveInDate: '',
          reasonCodeCheck: false,
          reasonCode: '',
        });
      } else {
        this.workQueueForm.get('template')?.disable();
        this.isTemplate = false;
      }
    })
    this.workQueueForm.get('analystCheck')?.valueChanges.subscribe((v: any) => {
      if (!v) {
        this.workQueueForm.patchValue({
          analystId: '',
          template: '',
          templateCheck: false
        });
      }
    })
    this.workQueueForm.get('productTypeCheck')?.valueChanges.subscribe((v: any) => {
     
      if (v) {
        this.validFields.productTypeOrgin = true;
        this.workQueueForm.patchValue({
          productTypeOrginCheck: true
        });
        this.isProdoriginDis=false;
      } else {
        this.workQueueForm.patchValue({
          productTypeOrginCheck: false
        });
        this.validFields.productTypeOrgin = false;
        this.isProdoriginDis=true;
      }
    })
    this.workQueueForm.get('commodityCheck')?.valueChanges.subscribe((v: any) => {
      if (!v) {
        this.validFields.commodity = false;
        this.workQueueForm.get("commodity")?.setValue("");
      }
    })
    this.workQueueForm.get('engBaseCheck')?.valueChanges.subscribe((v: any) => {
      if (!v) {
        this.validFields.engBase = false;
        this.workQueueForm.get("engBase")?.setValue("");
      }
    })
  }

  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }
  getReasonCodesList() {
    this.partWorkqueueService.getReasonCodeList()
      .subscribe((data: any) => {
        this.workQueueMaster = data;
        if (this.loginUserId != "") {
          const filterdObj = this.workQueueMaster.userList.filter((obj) => {
            return obj.userIdC === this.loginUserId
          });
          if (filterdObj.length > 0) {
            this.dropdown.onChange.emit(filterdObj[0]);
            this.dropdown.value = filterdObj[0];
            this.workQueueForm.get("analystCheck")?.setValue(true);
            this.workQueueForm.get("analystId")?.setValue(filterdObj[0]);
            // this.search(0, 500);
          }

        }
        this.isSearchDisabled = false;
        this.utilitiesService.setLoading(false);
      })

  }
  reasonCodeClick(work_queue: any) {
    this.utilitiesService.setWorkQueue(work_queue);
    let isValid: boolean = true;
    this.selectedWQ=work_queue;
    this.partWorkqueueService.getReasonMessage(work_queue.reasonCodeC)
      .subscribe((data: any) => {
        if (data.reasonMsgTypeC == 'S') {
          if (!this.rolesUserHasArray.includes("SGTI_GSF")) {
            this.alertPopup("You are not authorized to work this message. You do not have the proper roles. Contact your Profile Administrator.");
            isValid = false;
          }
        }
        if (data.reasonMsgTypeC == 'U') {
          if (!(this.rolesUserHasArray.includes("SGTI_GPB") || this.rolesUserHasArray.includes("SGTI_GPE") ||
            this.rolesUserHasArray.includes("SGTI_GPD") || this.rolesUserHasArray.includes("SGTI_GPR") || this.rolesUserHasArray.includes("SGTI_GPA"))) {
            this.alertPopup("You are not authorized to work this message. You do not have the proper roles. Contact your Profile Administrator.");
            isValid = false;
          }
        }
        if (data.reasonMsgTypeC == 'L') {
          if (!(this.rolesUserHasArray.includes("SGTI_GSC"))) {
            this.alertPopup("You are not authorized to work this message. You do not have the proper roles. Contact your Profile Administrator.");
            isValid = false;
          }
        }
        if (data.reasonMsgTypeC == 'I') {
          if (!(this.rolesUserHasArray.includes("SGTI_GIB") || this.rolesUserHasArray.includes("SGTI_GIP") ||
            this.rolesUserHasArray.includes("SGTI_GIS") || this.rolesUserHasArray.includes("SGTI_GIF") ||
            this.rolesUserHasArray.includes("SGTI_GIE") || this.rolesUserHasArray.includes("SGTI_GPB") || this.rolesUserHasArray.includes("SGTI_GPE")
            || this.rolesUserHasArray.includes("SGTI_GPD") || this.rolesUserHasArray.includes("SGTI_GPR") ||
            this.rolesUserHasArray.includes("SGTI_GIL") || this.rolesUserHasArray.includes("SGTI_GPA"))) {
            this.alertPopup("You are not authorized to work this message. You do not have the proper roles. Contact your Profile Administrator.");
            isValid = false;
          }
        }
        if (isValid) {
          this.navigate(work_queue)
        }
      })

  }
  navigate(work_queue: WorkQueue) {
    // if (work_queue.reasonCodeC == 'CNS' || work_queue.reasonCodeC == 'CNA') {
    //   this.alertPopup("Screen development in progress");
    // }
    if (work_queue.reasonCodeC == 'GEN') {
      this.alertPopup("Part Usage cannot be worked as Setup action is required.");
    } else if (work_queue.reasonCodeC == 'EOD') {
      this.alertPopup("Effective out date preceeds effective in date. Rework Usage in Part Control.");
    } else {
      this.procToShowDefaultForm(work_queue);

    }
  }
  procToShowDefaultForm(work_queue: WorkQueue) {
    this.partWorkqueueService.getReasonDelftForm(work_queue.reasonCodeC, work_queue.unitReasonTypeC)
      .subscribe((data: any) => {
        if (data.frm) {
          switch (work_queue.reasonCodeC) {
            case "UTC":
              this.router.navigate(['/usage']);
              break;
            case "SFX":
              this.alertPopup("Screen development in progress");
              break;
            case "JTC":
              this.router.navigate(['/jobtime']);
              break;
            case "NSP":
            case "SUP":
            case "NSR":
            case "CNV":
            case "HWP":
            case "URW":
              this.router.navigate(['/usage']);
              break;
            case "LRA":
            case "NPD":
            case "NMF":
            case "NPF":
            case "NPR":
              this.router.navigate(['/lexi-manage']);
              break;
            case "RCC":
              this.router.navigate(['/part-info']);
              break;
            case "UFC":
              this.router.navigate(['/usageFeatureChanges']);
              break;
            case "CAB":
            case "CAG":
            case "CAQ":
            case "CAP":
            case "CAS":
            case "CPI":
            case "ENG":
            case "ERC":
              this.router.navigate(['/devcommmodity']);
              localStorage.setItem('commodity', JSON.stringify({ 'workQueueCommodity': work_queue.engpCommodityC + '/' + work_queue.reasonCodeC }));
              break;
            case "CPT":
              this.router.navigate(['/product']);
              break;
            case "END":
              this.router.navigate(['/eng']); 
              break;
            case "VLM":
              this.router.navigate(['/vehicle']); 
              break;
            case "NUS":
              if(!work_queue.nusageC){
                this.router.navigate(['/usage']);
              }else{
                this.router.navigate(['/new-usage']);
                localStorage.setItem('newUsage', JSON.stringify({"engpEngnrgPartR":work_queue.engpEngnrgPartR,
                "pteioOriginC":work_queue.pteioOriginC,"vehtypeCode":work_queue.vehtypeCode,"evlVehicleLineC":work_queue.evlVehicleLineC,
                "engpCommodityC":work_queue.engpCommodityC,"engpSeqR":work_queue.engpSeqR,"reasonCodeC":work_queue.reasonCodeC,
                "nusageC":work_queue.nusageC,"eioOriginC":work_queue.eioOriginC,"cmdtyTypeC":work_queue.cmdtyTypeC}));
              }
              break;
            case "TAS":
            case "PRS":
            case "TAP":
            case "CNA":
            case "CNS":
            case "CRT":
            case "CRS":
            case "SAC":
            case "SAN":
            case "SAP":
            case "TAN":
              this.router.navigate(['/wbs']); 
              break;
            case "IRC":
            case "ISP":
            case "IRJ":
            case "IRT":
              this.loadIrpReview();
              break;
            default:
              if (work_queue.reasonCodeC == 'EMC') {
                this.router.navigate(['/assigntousage']);
              }
              else {
                //this.alertPopup("Screen development in progress");
              }
              break;
          }
        } else {
          this.alertPopup("Reason code missing contact systems to correct.");
        }
      })
  }
  loadIrpReview(){
    
    this.partWorkqueueService.getGcatIrp2(this.selectedWQ.reqIdR,"")
   .subscribe((data: any) => {
     if (data.length>0) {
       this.gcatIrp2Res=data;
       this.utilitiesService.setIrp(this.gcatIrp2Res[0]);
       this.router.navigate(['/irp-review']);
     } 
     // if (data.length==0){
     //   this.alertPopup("No Record Found")
     // }
   })
  
 }
  onRowSelect() {
    if (this.selectedWQ.reasonCodeC) {
      let reasonCode = this.selectedWQ.reasonCodeC;
      this.partWorkqueueService.getReasonMessage(reasonCode)
        .subscribe((data: any) => {
          let isValid: boolean = true;
          if (data.reasonMsgTypeC == 'L') {
            if (!this.rolesUserHasArray.includes("SGTI_GSC")) {
              this.alertPopup("You are not authorized to work this message.You do not have the proper roles. Contact your Profile Administrator.");
              isValid = false;
            }
          }
          if (isValid) {
            this.disableBtns(reasonCode)
          }
        })
    } else {
      this.btnKeyDataDisabled = true;
      this.btnDeleteDisabled = true;
    }
  }
  disableBtns(reasonCode: string) {
    if (this.selectedWQ.engpCommodityC) {
      this.btnCmdtyDisabled = false;
    } else {
      let arr1 = ["ERC", "ENG"];
      if (!arr1.includes(reasonCode)) {
        this.btnCmdtyDisabled = true;
      } else {
        this.btnCmdtyDisabled = false;
      }
    }
    this.enableDelReplyBtn(reasonCode);
    this.btnKeyDataDisabled = false;
    this.btnAsgnmntDisabled = false;
  }
  enableDelReplyBtn(reasonCode: string) {
    let reasonArr1 = ["CPR", "CPC", "CPV"];
    let reasonArr2 = ["CNS", "CNA", "RCC", "IRC"];
    let reasonArr3 = ["NSR", "NSP", "HWP", "URW"]
    let isValid: boolean = true;
    this.btnDeleteDisabled = true;
    this.btnCmdtyCheck = true;
    for (const element of this.rolesUserHasArray) {
      if (element == "SGTI_GSF" && isValid) {
        if (reasonArr1.includes(reasonCode)) { this.btnReplay = false; isValid = false; }
        if (reasonArr2.includes(reasonCode)) { this.btnDeleteDisabled = false; isValid = false; }
        if ((reasonArr3.includes(reasonCode) || reasonArr2.includes(reasonCode))) { this.btnCmdtyCheck = false; isValid = false; }
      } else if ((element == "SGTI_GPB" || element == "SGTI_GPE" || element == "SGTI_GPD" || element == "SGTI_GSC" ||
        element == "SGTI_GPR" || element == "SGTI_GIE" ||
        element == "SGTI_GIB" || element == "SGTI_GIS" ||
        element == "SGTI_GIP" || element == "SGTI_GIF" ||
        element == "SGTI_GIL" || element == "SGTI_GPA") && isValid) {
        if ((reasonCode == "PRS" || reasonCode == "NPD" || reasonCode == "IRC"
          || reasonCode == "RCC")) { this.btnDeleteDisabled = false; isValid = false; }
        if (reasonCode == "RCC") { this.btnCmdtyCheck = false; isValid = false; }
      }
    }

  }

  onSubmit(pageNumber: number, pageSize: number) {
    this.work_queue = [];
    let isValid: boolean = this.validateForm();
    if (isValid) {
      if (this.workQueueForm.get("analystCheck")?.value || this.workQueueForm.get("vehicleLineCheck")?.value
        || this.workQueueForm.get("commodityCheck")?.value || this.workQueueForm.get("engBaseCheck")?.value
        || this.workQueueForm.get("productTypeCheck")?.value || this.workQueueForm.get("SAPCodeCheck")?.value
        || this.workQueueForm.get("sourceInCheck")?.value || this.workQueueForm.get("reasonCodeCheck")?.value ||
        this.workQueueForm.get("effectiveInDateCheck")?.value) {
        if (this.workQueueForm.value.productTypeCheck && !this.workQueueForm.value.productTypeOrginCheck) {
          this.validFields.productTypeOrgin = true;
          this.alertPopup("Please Select Product Type Origin");
        } else {
          this.search(pageNumber, pageSize);
        }
      } else {
        this.alertPopup("Please choose atleast one selection criteria");
      }
    }
  }
  validateForm() {
    this.validFields = {
      analyst: false,
      commodity: false,
      template: false,
      engBase: false,
      productType: false,
      productTypeOrgin: false,
      vehicleLine: false,
      SAPCode: false,
      sourceIn: false,
      effectiveInDate: false,
      reasonCode: false
    }
    let isValid: boolean = true;
    let isValid1: boolean = this.validateForm1();
    let isValid2: boolean = this.validateForm2();

    if (this.workQueueForm.get("sourceInCheck")?.value && (this.workQueueForm.get("sourceIn")?.value == "" || this.workQueueForm.get("sourceIn")?.value == undefined)) {
      isValid = false;
      this.validFields.sourceIn = true;
    }
    if (this.workQueueForm.get("effectiveInDateCheck")?.value && (this.workQueueForm.get("effectiveInDate")?.value == "" || this.workQueueForm.get("effectiveInDate")?.value == undefined)) {
      isValid = false;
      this.validFields.effectiveInDate = true;
    }
    if (this.workQueueForm.get("reasonCodeCheck")?.value && (this.workQueueForm.get("reasonCode")?.value == "" || this.workQueueForm.get("reasonCode")?.value == undefined)) {
      isValid = false;
      this.validFields.reasonCode = true;
    }

    if (!isValid || !isValid1 || !isValid2){
      isValid=false;
      this.alertPopup("Please choose Required Field");
    } 
    return isValid;
  }
  validateForm1() {
    let isValid: boolean = true;
    if (this.workQueueForm.get("analystCheck")?.value && (this.workQueueForm.get("analystId")?.value == "" || this.workQueueForm.get("analystId")?.value == undefined)) {
      isValid = false;
      this.validFields.analyst = true;
    }
    if (this.workQueueForm.get("templateCheck")?.value && (this.workQueueForm.get("template")?.value == "" || this.workQueueForm.get("template")?.value == undefined)) {
      isValid = false;
      this.validFields.template = true;
    }
    if (this.workQueueForm.get("commodityCheck")?.value && (this.workQueueForm.get("commodity")?.value == "" || this.workQueueForm.get("commodity")?.value == undefined)) {
      isValid = false;
      this.validFields.commodity = true;
    }
    if (this.workQueueForm.get("engBaseCheck")?.value && (this.workQueueForm.get("engBase")?.value == "" || this.workQueueForm.get("engBase")?.value == undefined)) {
      isValid = false;
      this.validFields.engBase = true;
    }
    if (this.workQueueForm.get("productTypeCheck")?.value && (this.workQueueForm.get("productType")?.value == "" || this.workQueueForm.get("productType")?.value == undefined)) {
      this.validFields.productType = true;
    }
    return isValid;
  }
  validateForm2() {
    let isValid: boolean = true;
    if (this.workQueueForm.get("productTypeOrginCheck")?.value && (this.workQueueForm.get("productTypeOrgin")?.value == "" || this.workQueueForm.get("productTypeOrgin")?.value == undefined)) {
      isValid = false;
      this.validFields.productTypeOrgin = true;
    }
    if (this.workQueueForm.get("vehicleLineCheck")?.value && (this.workQueueForm.get("vehicleLine")?.value == "" || this.workQueueForm.get("vehicleLine")?.value == undefined)) {
      isValid = false;
      this.validFields.vehicleLine = true;
    }
    if (this.workQueueForm.get("SAPCodeCheck")?.value && (this.workQueueForm.get("SAPCode")?.value == "" || this.workQueueForm.get("SAPCode")?.value == undefined)) {
      isValid = false;
      this.validFields.SAPCode = true;
    }
    return isValid;
  }
  search(pageNumber: number, pageSize: number) {
    this.utilitiesService.setLoading(true);
    this.showTable = true;
    this.workQueueFilter = {};
    this.work_queue = [];
    this.workQueueFilter.userIdC = this.workQueueForm.value.analystCheck ? this.workQueueForm.value.analystId.userIdC : "";
    this.workQueueFilter.engpCommodityC = this.workQueueForm.value.commodityCheck ? this.workQueueForm.value.commodity : "";
    this.workQueueFilter.evlVehicleLineC = this.workQueueForm.value.vehicleLineCheck ? this.workQueueForm.value.vehicleLine.evlVehicleLineC : null;
    this.workQueueFilter.reasonCode = this.workQueueForm.value.reasonCodeCheck ? this.workQueueForm.value.reasonCode.reasonCode : "";
    this.workQueueFilter.vehtypeCode = this.workQueueForm.value.productTypeCheck ? this.workQueueForm.value.productType.vehtypeCode : "";
    this.workQueueFilter.pteioOriginC = this.workQueueForm.value.productTypeOrginCheck ? this.workQueueForm.value.productTypeOrgin.pteioOriginC : "";
    this.workQueueFilter.statusCodeC = ""
    this.workQueueFilter.engpBaseR = this.workQueueForm.value.engBaseCheck ? this.workQueueForm.value.engBase : "";
    this.workQueueFilter.regintC = "";
    this.workQueueFilter.efiosrcSourceInC = this.workQueueForm.value.sourceInCheck ? this.workQueueForm.value.sourceIn.efiosrcSourceInC : "";
    this.workQueueFilter.effiopEffInC = this.workQueueForm.value.SAPCodeCheck ? this.workQueueForm.value.SAPCode.effiopEffInC : "";
    this.workQueueFilter.epntsrEffInY = this.workQueueForm.value.effectiveInDateCheck ? this.workQueueForm.value.effectiveInDate : null;
    this.workQueueFilter.templtIdR = this.workQueueForm.value.templateCheck ? this.workQueueForm.value.template.templtIdR : "";
    this.workQueueFilter.pageNumber = pageNumber;
    this.workQueueFilter.pageSize = pageSize;
    this.partWorkqueueService.getFilteredList(this.workQueueFilter)
      .subscribe((data: any) => {
        this.showTable = true;
        this.work_queue = data.content;
        this.totalRecords = data.totalElements;
        this.totalCount=this.work_queue.length; 
                if (this.work_queue.length <= 0) { 
          this.alertPopup("No Record Found");
          this.showRow="none";
          this.isUtcDis=true;
        }else{
          this.showRow="block";
          if(this.workQueueForm.value.analystCheck&&this.workQueueForm.value.reasonCodeCheck&&this.workQueueForm.value.vehicleLineCheck 
            &&this.workQueueForm.value.reasonCode.reasonCode =='UTC'){
              this.isUtcDis=false;
            }
        }
        this.utilitiesService.setLoading(false);
      })

  }
  onRefresh() {
    this.showTable = false;
    this.work_queue = [];
    this.isTemplate=false;
    this.isProdoriginDis=true;
    this.workQueueForm.patchValue({
      analystId: [''],
      analystCheck: false,
      templateCheck: false,
      template: [{ value: '', disabled: true }],
      commodityCheck: false,
      commodity: [''],
      engBase: [{ value: '', disabled: this.isTemplate }],
      engBaseCheck: false,
      productTypeCheck: false,
      productType: '',
      productTypeOrginCheck: false,
      productTypeOrgin: '',
      vehicleLineCheck: false,
      vehicleLine: [''],
      SAPCodeCheck: false,
      SAPCode: [''],
      sourceIn: [''],
      sourceInCheck: false,
      effectiveInDateCheck: [{ value: false, disabled: false }],
      effectiveInDate: '',
      reasonCodeCheck: false,
      reasonCode: [''],
      aliases: this.fb.array([
        this.fb.control('')
      ])
    });

    this.validFields = {
      analyst: false,
      commodity: false,
      template: false,
      engBase: false,
      productType: false,
      productTypeOrgin: false,
      vehicleLine: false,
      SAPCode: false,
      sourceIn: false,
      effectiveInDate: false,
      reasonCode: false
    }
  }
  onProductChange(event: any) {
    this.productTypeOrigin = [];
    this.validFields.productType = false;
    this.workQueueForm.get('productTypeOrginCheck')?.enable();
    this.workQueueForm.get('productTypeOrgin')?.enable();
    this.workQueueForm.get('productTypeOrgin')?.setValue("");
    this.workQueueForm.value.productTypeCheck=true;
    this.workQueueForm.get('productTypeCheck')?.setValue(true);
    this.partWorkqueueService.getProductTypeOriginList(event.value.vehtypeCode)
      .subscribe((data: any) => {
        this.productTypeOrigin = data;
      })

  }
  onVlChange() {
    this.validFields.vehicleLine = false;
    this.workQueueForm.value.vehicleLineCheck=true;
    this.workQueueForm.get('vehicleLineCheck')?.setValue(true);
  }

  onS4pCodeChange() {
    this.validFields.SAPCode = false;
    this.workQueueForm.value.SAPCodeCheck=true;
    this.workQueueForm.get('SAPCodeCheck')?.setValue(true);
  }
  onSourceInChange() {
    this.validFields.sourceIn = false;
    this.workQueueForm.value.sourceInCheck=true;
    this.workQueueForm.get('sourceInCheck')?.setValue(true);
  }
  onReasonCodeChange() {
    this.validFields.reasonCode = false;
    this.workQueueForm.value.reasonCodeCheck=true;
    this.workQueueForm.get('reasonCodeCheck')?.setValue(true);
  }
  onProductOriginChange(event: any) {
    console.log(event);
    this.validFields.productTypeOrgin = false;
  }
  effiveIntDtChange(event:any){
    if(event!=""){
      this.workQueueForm.value.effectiveInDateCheck=true;
      this.workQueueForm.get('effectiveInDateCheck')?.setValue(true);
    }else{
      this.workQueueForm.value.effectiveInDateCheck=false;
      this.workQueueForm.get('effectiveInDateCheck')?.setValue(false);
    }
  }
  onUserIdChange(event: any) {
    this.validFields.analyst = false;
    this.workQueueForm.value.analystCheck=true;
    this.workQueueForm.get('analystCheck')?.setValue(true);
    let userId = event.value ? event.value.userIdC : event.userIdC
    if (this.loginUserId != userId) {
      this.getOtherUserRoles(userId);
    }
    this.templateIdList = [];
    this.partWorkqueueService.getTemplateIdsByUserId(userId)
      .subscribe((data: any) => {
        this.templateIdList = data;
      })

  }
  //login user roles
  getUserRoles(userId: string) {
    this.userService.getUserRoles(userId)
      .subscribe((data: any) => {
        data.forEach((element: UserRole) => {
          let roleCode: string = element.roleCodeC !== undefined ? element.roleCodeC : '';
          this.rolesUserHasArray.push(roleCode)
        });

      })
  }
  getOtherUserRoles(userId: string) {
    this.userService.getUserRoles(userId)
      .subscribe((data: any) => {
        this.otherUserRoles = data;
      })
  }
  onTemplateIdClick() {
    let isAnalystId = this.workQueueForm.value.analystId == null ? false : true;
    let isAnalystIdExists = (!this.workQueueForm.value.analystCheck ? false : (isAnalystId))
    this.workQueueForm.value.templateCheck=true;
    this.workQueueForm.get('templateCheck')?.setValue(true);
    if (!isAnalystIdExists) {
      this.templateIdList = [];
      this.validFields.analyst = true;
      this.alertPopup("Please Select Analyst Id");
    }
  }
  loadCustomers(event: LazyLoadEvent) {
    if (event.first && event.rows) {
      const pageNo = event.first != 0 ? (event.first / event.rows) : 0;
      this.onSubmit(pageNo, 500);
    } else {
      this.onSubmit(0, 500);
    }
  }
  onBlurEngBase() {
    if (this.workQueueForm.value.engBase != "") {
      this.workQueueForm.value.engBaseCheck=true;
      this.workQueueForm.get('engBaseCheck')?.setValue(true);
      this.partWorkqueueService.validateEngpBase(this.workQueueForm.value.engBase)
        .subscribe((data: any) => {
          if (!data) {
            this.validFields.engBase = true;
            this.alertPopup("Invalid Value Eng Base " + this.workQueueForm.value.engBase);
            this.workQueueForm.get("engBase")?.setValue("");
          } else {
            this.validFields.engBase = false;
          }
        })

    }
  }
  onBlurCommodity() {
    if (this.workQueueForm.value.commodity != "") {
      this.workQueueForm.value.commodityCheck=true;
    this.workQueueForm.get('commodityCheck')?.setValue(true);
      this.partWorkqueueService.validateCommodity(this.workQueueForm.value.commodity)
        .subscribe((data: any) => {
          if (!data) {
            this.alertPopup("Invalid Commodity Code " + this.workQueueForm.value.commodity);
            this.workQueueForm.get("commodity")?.setValue("");
          } else {
            this.validFields.commodity = false;
            
          }
        })
    }
  }
  onAssignmentDetailsClick() {
    this.assignmentDetails = [];
    this.partWorkqueueService.getAssignmentDetails(this.selectedWQ.gtiwqCreateY, this.selectedWQ.userIdC)
      .subscribe((data: any) => {
        if (data) {
          this.assignmentDetails = [{
            gtiwqCreateY: this.selectedWQ.gtiwqCreateY,
            userIdC: this.selectedWQ.userIdC,
            vehtypeCode: this.selectedWQ.vehtypeCode,
            evlVehicleLineC: this.selectedWQ.evlVehicleLineC,
            reasonCodeC: this.selectedWQ.reasonCodeC,
            engpEngnrgPartR: this.selectedWQ.engpEngnrgPartR,
            sprfxprtPrefixR: this.selectedWQ.sprfxprtPrefixR,
            sbaseprtNbr: this.selectedWQ.sbaseprtNbr,
            sufxprtSuffixNbr: this.selectedWQ.sufxprtSuffixNbr,
            funcKey: this.selectedWQ.funcKey,
            d20PartR: this.selectedWQ.d20PartR,
            sprfxprtPrefix2X: this.selectedWQ.sprfxprtPrefix2X,
            sbaseprt2X: this.selectedWQ.sbaseprt2X,
            sufxprtSuffix2X: this.selectedWQ.sufxprtSuffix2X,
            userBookR: data[0].userBookR,
            userPciiBookR: data[0].userPciiBookR
          }];
          this.displayAssignmentModal = true;
        }

      })
  }
  onKeyDataClick() {
    this.displayKeyDataModal = true;
    this.selectedWQ.gtiwqKeyDataX = this.selectedWQ.gtiwqKeyDataX ? this.selectedWQ.gtiwqKeyDataX : "";
  }
  loadKeyData(work_queue: WorkQueue) {
    this.selectedWQ = work_queue;
    this.displayKeyDataModal = this.selectedWQ.gtiwqKeyDataX ? true : false;
  }
  onResetClick() {
    this.showTable = false;
    this.work_queue = [];
    this.totalRecords = 0;
    this.isTemplate = false;
    this.selectedWQ = {};
    this.displayKeyDataModal = false;
    this.assignmentDetails = [];
    this.isProdoriginDis=true;
    this.workQueueFilter = {};
    this.displayAssignmentModal = false;
    this.workQueueForm.patchValue({
      analystId: '',
      analystCheck: false,
      templateCheck: false,
      template: '',
      commodityCheck: false,
      commodity: '',
      engBase: '',
      engBaseCheck: false,
      productTypeCheck: false,
      productType: '',
      productTypeOrginCheck: false,
      productTypeOrgin: '',
      SAPCodeCheck: false,
      SAPCode: '',
      sourceIn: '',
      sourceInCheck: false,
      effectiveInDateCheck: false,
      effectiveInDate: '',
      reasonCodeCheck: false,
      reasonCode: '',
      vehicleLineCheck: false,
      vehicleLine: ''
    });
    
    this.validFields = {
      analyst: false,
      commodity: false,
      template: false,
      engBase: false,
      productType: false,
      productTypeOrgin: false,
      vehicleLine: false,
      SAPCode: false,
      sourceIn: false,
      effectiveInDate: false,
      reasonCode: false
    }
  }
  onCommodityCheckClick() {
    if (this.selectedWQ.engpEngnrgPartR || this.selectedWQ.eioOriginC ||
      this.selectedWQ.engpSeqR || this.selectedWQ.vehtypeCode || this.selectedWQ.pteioOriginC || this.selectedWQ.evlVehicleLineC) {
      if (this.selectedWQ.reasonCodeC != "") {
        if (this.selectedWQ.reasonCodeC == "NSR" || this.selectedWQ.reasonCodeC == "HWP" || this.selectedWQ.reasonCodeC == "URW" || this.selectedWQ.reasonCodeC == "RCC") {
          this.selectedWQ.reasonCodeC = "NSR";
        }
        this.CommodityCheck = {
          engpEngnrgPartR: this.selectedWQ.engpEngnrgPartR,
          eioOriginC: this.selectedWQ.eioOriginC,
          engpSeqR: this.selectedWQ.engpSeqR,
          vehtypeCode: this.selectedWQ.vehtypeCode,
          pteioOriginC: this.selectedWQ.pteioOriginC,
          evlVehicleLineC: this.selectedWQ.evlVehicleLineC,
          reasonCodeC: this.selectedWQ.reasonCodeC,
          plastIdC: "BACKTHRU"
        }
        this.partWorkqueueService.commodityCheck(this.CommodityCheck)
          .subscribe((data: any) => {
            if (data) {
              this.search(0, 500);
            }
          })
      }

    } else {
      this.alertPopup("Required parameter missing");
    }

  }
  loadNotes(work_queue: WorkQueue) {
    this.selectedWQ = work_queue;
    this.displayReqIdModal = this.selectedWQ.reqIdR ? true : false;
  }
  closeClick() {
    this.router.navigate(['']);
  }
  commodityClick() {
    if (this.rolesUserHasArray.includes("SGTI_GSF") || this.rolesUserHasArray.includes("SGTI_GGB")) {
      this.router.navigate(['/devcommmodity']);
      localStorage.setItem('commodity', JSON.stringify({ 'workQueueCommodity': this.selectedWQ.engpCommodityC + '/' + this.selectedWQ.reasonCodeC }));
    } else {
      this.alertPopup("You do not have the authority to go to the Commodity Setup Screen");

    }

  }
  deleteClick() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Inactivate this Usage(s)?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        switch (this.selectedWQ.reasonCodeC) {
          case "CNA":
          case "CNS":
            this.deleteWqBycreatey();
            this.UpdD22Inact();
            break;
          case "RCC":
          case "NPD":
            this.deleteWqBycreatey();
            break;
          case "PRS":
            this.validateUsageAndDelete();
            break;
          default:
            this.deleteWQRow();
            break;
        }
      },
      reject: (_type: any) => {
      }
    });
    
  }

  deleteWqBycreatey() {
    this.partWorkqueueService.deleteWqBycreatey(this.selectedWQ.gtiwqCreateY, this.selectedWQ.userIdC, this.selectedWQ.reasonCodeC)
      .subscribe((data: any) => {
        console.log(data);
        if (data) {
          this.search(0, 500);
        }
      })
  }
  UpdD22Inact() {
    if (this.selectedWQ.engpEngnrgPartR || this.selectedWQ.eioOriginC ||
      this.selectedWQ.engpSeqR || this.selectedWQ.vehtypeCode || this.selectedWQ.pteioOriginC || this.selectedWQ.evlVehicleLineC) {
      this.CommodityCheck = {
        engpEngnrgPartR: this.selectedWQ.engpEngnrgPartR,
        eioOriginC: this.selectedWQ.eioOriginC,
        engpSeqR: this.selectedWQ.engpSeqR,
        vehtypeCode: this.selectedWQ.vehtypeCode,
        pteioOriginC: this.selectedWQ.pteioOriginC,
        evlVehicleLineC: this.selectedWQ.evlVehicleLineC,
        reasonCodeC: "",
        plastIdC: 'WQDELETE'
      }
      this.partWorkqueueService.commodityCheck(this.CommodityCheck)
        .subscribe((data: any) => {
          if (data) {
            console.log("success");
            this.search(0, 500);
          }
        })
    } else {
      this.alertPopup("Required parameter missing");

    }
  }
  validateUsageAndDelete() {
    let usage = this.selectedWQ.nusageC ? this.selectedWQ.nusageC : 0;
    this.partWorkqueueService.validateUsage(usage)
      .subscribe((data: any) => {
        if (data) {
          this.deleteWqBycreatey();
        } else {
          this.alertPopup("Row cannot be deleted - the usage has not been assigned to a section.");

        }
      })
  }
  deleteWQRow() {
    if (this.selectedWQ.gtiwqCreateY && this.selectedWQ.userIdC && this.selectedWQ.plastupY) {
      if (this.selectedWQ.reasonCodeC == "IRC") {
        this.deleteWorkQueueIrc();
      } else {
        if (this.selectedWQ.engpEngnrgPartR && this.selectedWQ.eioOriginC &&
          this.selectedWQ.engpSeqR && this.selectedWQ.vehtypeCode && this.selectedWQ.pteioOriginC && this.selectedWQ.evlVehicleLineC &&
          this.selectedWQ.pftrcCombinatnC && this.selectedWQ.mftrcCombinatinC && this.selectedWQ.regintC && this.selectedWQ.evaPerUsageQ &&
          this.selectedWQ.effiopEffInC && this.selectedWQ.funcKey) {
          this.deleteWq();
        } else {
          this.alertPopup("Required parameter missing");

        }
      }

    } else {
      this.alertPopup("Required parameter missing");

    }
  }
  deleteWorkQueueIrc() {
    this.partWorkqueueService.deleteWorkQueueIrc(this.selectedWQ.gtiwqCreateY, this.selectedWQ.userIdC, this.selectedWQ.reasonCodeC, this.selectedWQ.plastupY)
      .subscribe((data: any) => {
        if (data) {
          this.search(0, 500);
          console.log("success");
        }
      })
  }
  deleteWq() {
    this.deleteWqByReasonCode = {
      engpEngnrgPartR: this.selectedWQ.engpEngnrgPartR,
      eioOriginC: this.selectedWQ.eioOriginC,
      engpSeqR: this.selectedWQ.engpSeqR,
      vehtypeCode: this.selectedWQ.vehtypeCode,
      pteioOriginC: this.selectedWQ.pteioOriginC,
      evlVehicleLineC: this.selectedWQ.evlVehicleLineC,
      reasonCodeC: this.selectedWQ.reasonCodeC,
      funcKey: this.selectedWQ.funcKey,
      pftrcCombinatnC: this.selectedWQ.pftrcCombinatnC,
      mftrcCombinatinC: this.selectedWQ.mftrcCombinatinC,
      regintC: this.selectedWQ.regintC,
      evaPerUsageQ: this.selectedWQ.evaPerUsageQ,
      effiopEffInC: this.selectedWQ.effiopEffInC,
      gtiwqCreateY: this.selectedWQ.gtiwqCreateY,
      userIdC: this.selectedWQ.userIdC,
      pLastupY: this.selectedWQ.plastupY
    }
    this.partWorkqueueService.deleteWqRow(this.deleteWqByReasonCode)
      .subscribe((data: any) => {
        if (data.msg == "success") {
          this.search(0, 500);
        } else {
          this.alertPopup(data);

        }
      })
  }
  recoverPart() {
    this.inactivePartVis = true;
  }
  saveUTC() {
    let reasonCode="UTC";
    this.partWorkqueueService.getReasonMessage(reasonCode)
        .subscribe((data: any) => {
          let isValid: boolean = true;
          if (data.reasonMsgTypeC == 'U') {
            if (this.rolesUserHasArray.includes("SGTI_GPB")||this.rolesUserHasArray.includes("SGTI_GPE")||this.rolesUserHasArray.includes("SGTI_GPD")
            ||this.rolesUserHasArray.includes("SGTI_GPR")||this.rolesUserHasArray.includes("SGTI_GPA")) {
              // isValid = true;
            }else{
              isValid = false;
              this.alertPopup("You are not authorized to work this message.You do not have the proper roles. Contact your Profile Administrator.");
            }
          }
          if (isValid) {
            this.saveUtcConfirmVis=true;
           
          }
        })
  }
  saveUtcYes(){
    this.saveUtcConfirmVis=false;
    this.confirmationService.confirm({
      message: "This action would effect all records being displayed.",
      header: 'Confirmation - SAVE WQ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.alertPopup("This process may take some time and the screen may appear to freeze. Please wait until you get back to the main work queue screen. Do not click any buttons or close the application while in process!!!")
        this.startSaveUTC();
      },
      reject: (_type: any) => {
      }
    });
  }
  startSaveUTC(){
     this.utilitiesService.setWorkQueue(this.work_queue[0]);
     this.router.navigate(['/usage']);
  }
  saveUtcNo(){
    this.utilitiesService.setWorkQueue(this.work_queue[0]);
     this.router.navigate(['/usage']);
  }
  inactivePartOk() {
    this.utilitiesService.setWorkQueue(this.selectedWQ);
    if (this.inactivePart == "") {
      this.alertPopup("Please enter a valid Engineering Part Number");
    } else {

      this.partWorkqueueService.validRecoverPart(this.inactivePart)
        .subscribe((data: any) => {
          if (data) {
            this.getRecoverInactivePart();
          } else {
            this.alertPopup("Invalid Engg. Part Number or No Inactive Usages exist.");

          }
        })
    }
  }

  count:any=0;
  display:any="block";
  rotate:string="rotate(45deg)";
  br:string="5px 5px 0px 0px"
  showRow:string="none"
  showCenterPart(){
    if(this.count==0){
      this.display="none"
      this.count=1;
      this.br="5px "
      this.rotate="rotate(0deg)";
    // 1100
    }else{
      this.display="block"
      this.count=0;
      this.br="5px 5px 0px 0px";
     
      this.rotate="rotate(45deg)";
      // this.responsiveHeight="750px"
    }
  }
  getRecoverInactivePart(){
    this.partWorkqueueService.getRecoverInactivePart(this.inactivePart)
    .subscribe((data: any) => {
      console.log(data);
      let selectedWQ: WorkQueue = {};
      selectedWQ.engpEngnrgPartR=data.engpEngnrgPartR;
      selectedWQ.eioOriginC=data.eioOriginC;
      selectedWQ.engpSeqR=data.engpSeqR;
      selectedWQ.vehtypeCode=data.vehtypeCode;
      selectedWQ.pteioOriginC=data.pteioOriginC;
      selectedWQ.evlVehicleLineC=data.evlVehicleLineC;
      selectedWQ.engpCommodityC=data.engpCommodityC;
      selectedWQ.cmdtyTypeC=data.cmdtyTypeC;
      this.utilitiesService.setWorkQueue(selectedWQ);
      this.utilitiesService.setActivateInactive(true);
      this.router.navigate(['/usage']);
    })
  }
}