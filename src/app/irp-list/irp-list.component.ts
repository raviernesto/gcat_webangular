import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { GcatIrp2ResDto, IrpListReqDto, IrpListResDto, PrefixResDto, RequesterResDto, VehicleLineResDto } from '../models/irp';
import { IrpListService } from '../services/irp-list.service';
import { UtilitiesService } from '../shared/services/utilities.service';

@Component({
  selector: 'app-irp-list',
  templateUrl: './irp-list.component.html',
  styleUrls: ['./irp-list.component.css'],
  providers: [ConfirmationService],
})
export class IrpListComponent implements OnInit {
  userlogin: string = "PKAMATC2";
  requesterList: RequesterResDto[] = [];
  currentOwnerList: any[] = [];
  irpStatusList: any[] = [];
  vehList: VehicleLineResDto[] = [];
  prefixList: PrefixResDto[] = [];
  showTable: boolean = false;
  vehicleLine: any[] | undefined;
  templateIdList: any[] = [];
  irpList: IrpListResDto[] = [];
  userRegion: string = 'N';
  startsWith = "startsWith";
  clear1 = false;
  clear2 = false;
  clear3 = false;
  clear4 = false;
  clear5 = false;
  clear6 = false;
  validFields: any = {
    rqstrId: false,
    currentOwner: false,
    irpStatus: false,
    irpNo: false,
    vehLine: false,
    prefix: false,
    section: false,
    region: false,
  }
  gcatIrp2Res: GcatIrp2ResDto[] = [];
  alert: any = {
    flag: false,
    msg: "",
  }
  irpListForm = this.fb.group({
    rqstrId: [''],
    rqstrCheck: false,
    currentOwner: [''],
    currentOwnerCheck: false,
    irpStatus: [''],
    statusCheck: false,
    irpNo: [''],
    irpNoCheck: false,
    vehLineCheck: false,
    vehLine: [''],
    prefixCheck: false,
    prefix: [''],
    sectionCheck: false,
    section: [''],
    region: ['', Validators.required],


    aliases: this.fb.array([
      this.fb.control('')
    ])
  });
  constructor(private irpListService: IrpListService,
    private fb: FormBuilder,
    public utilitiesService: UtilitiesService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    console.log("debug")
    this.getRequesterId();
    this.getCurrentOwner();
    this.getIrpStatus();
    this.getVehicleLines();
    this.getPrefix();
    this.getTemplateId();
    // this.irpListForm.get('sectionCheck')?.valueChanges.subscribe((v: any) => {
    //   if (v) {
    //     this.getTemplateId();
    //   } else {
    //     this.prefixList = [];
    //   }
    // })
    this.irpListForm.get('vehLineCheck')?.valueChanges.subscribe((v: any) => {
      this.getTemplateId();
    })
    if (this.userRegion == 'N') {
      this.irpListForm.get('region')?.setValue('N');
    } else if (this.userRegion == 'E') {
      this.irpListForm.get('region')?.setValue('E');
    } else if (this.userRegion == 'A') {
      this.irpListForm.get('region')?.setValue('A');
    } else if (this.userRegion == 'S') {
      this.irpListForm.get('region')?.setValue('S');
    }


  }
  submit() {
    this.irpList = [];
    let isValid: boolean = this.validateForm();
    if (isValid) {
      if (this.irpListForm.get("rqstrCheck")?.value || this.irpListForm.get("currentOwnerCheck")?.value || this.irpListForm.get("statusCheck")?.value ||
        this.irpListForm.get("irpNoCheck")?.value || this.irpListForm.get("vehLineCheck")?.value || this.irpListForm.get("prefixCheck")?.value ||
        this.irpListForm.get("sectionCheck")?.value) {
        this.getIrpList();
      } else {
        this.alertPopup("Please select one more search criterias");
      }

    }

  }

  validateForm(): boolean {
    this.validFields = {
      rqstrId: false,
      currentOwner: false,
      irpStatus: false,
      irpNo: false,
      vehLine: false,
      prefix: false,
      section: false,
      region: false,
    }
    let isValid: boolean = true;
    if (this.irpListForm.get("rqstrCheck")?.value && (this.irpListForm.get("rqstrId")?.value == "" ||
      this.irpListForm.get("rqstrId")?.value == undefined || this.irpListForm.get("rqstrId")?.value == null)) {
      isValid = false;
      if (!isValid) {
        isValid = false;
        this.alertPopup("Please choose a Requester ID");
      }
      this.validFields.rqstrId = true;
    }
    if (this.irpListForm.get("currentOwnerCheck")?.value && (this.irpListForm.get("currentOwner")?.value == "" ||
      this.irpListForm.get("currentOwner")?.value == undefined || this.irpListForm.get("currentOwner")?.value == null)) {
      isValid = false;
      if (!isValid) {
        isValid = false;
        this.alertPopup("Please choose a Current Owner");
      }
      this.validFields.currentOwner = true;
    }
    if (this.irpListForm.get("statusCheck")?.value && (this.irpListForm.get("irpStatus")?.value == "" ||
      this.irpListForm.get("irpStatus")?.value == undefined || this.irpListForm.get("irpStatus")?.value == null)) {
      isValid = false;
      if (!isValid) {
        isValid = false;
        this.alertPopup("Please choose an IRP Status");
      }
      this.validFields.irpStatus = true;
    }
    if (this.irpListForm.get("irpNoCheck")?.value && (this.irpListForm.get("irpNo")?.value == "" ||
      this.irpListForm.get("irpNo")?.value == undefined || this.irpListForm.get("irpNo")?.value == null)) {
      isValid = false;
      if (!isValid) {
        isValid = false;
        this.alertPopup("Please enter an IRP No ");
      }
      this.validFields.irpNo = true;
    }
    if (this.irpListForm.get("vehLineCheck")?.value && (this.irpListForm.get("vehLine")?.value == "" ||
      this.irpListForm.get("vehLine")?.value == undefined || this.irpListForm.get("vehLine")?.value == null)) {
      isValid = false;
      if (!isValid) {
        isValid = false;
        this.alertPopup("Please select the Vehicle Line value from the dropdown list");
      }
      this.validFields.vehLine = true;
    }
    if (this.irpListForm.get("prefixCheck")?.value && (this.irpListForm.get("prefix")?.value == "" ||
      this.irpListForm.get("prefix")?.value == undefined || this.irpListForm.get("prefix")?.value == null)) {
      isValid = false;
      if (!isValid) {
        isValid = false;
        this.alertPopup("Please choose a Prefix ");
      }
      this.validFields.prefix = true;
    }
    if (this.irpListForm.get("sectionCheck")?.value && (this.irpListForm.get("section")?.value == "" ||
      this.irpListForm.get("section")?.value == undefined || this.irpListForm.get("section")?.value == null)) {
      isValid = false;
      if (!isValid) {
        isValid = false;
        this.alertPopup("Please select the Template/Section value from the dropdown list");
      }
      this.validFields.section = true;
    }
    // if (!isValid ){
    // isValid=false;
    // this.alertPopup("Please choose Required Fields");
    // } 
    return isValid;
  }
  getIrpList() {
    let dto: IrpListReqDto = {};
    dto.sectVehicleLineC = this.irpListForm.value.vehLineCheck ? this.irpListForm.value.vehLine.sectVehicleLineC : "";
    dto.templtIdR = this.irpListForm.value.sectionCheck ? this.irpListForm.value.section.templateId : "";
    dto.unitTypeC = "";
    dto.pageNumber = 0;
    dto.pageSize = 500;
    dto.reqCreateIdC = this.irpListForm.value.rqstrCheck ? this.irpListForm.value.rqstrId.userIdC : "";
    dto.statusCodeC = this.irpListForm.value.statusCheck ? this.irpListForm.value.irpStatus.irpStatus : "";
    dto.reqCurrOwnerC = this.irpListForm.value.currentOwnerCheck ? this.irpListForm.value.currentOwner.currentOwner : "";
    dto.reqIdR = this.irpListForm.value.irpNoCheck ? Number(this.irpListForm.value.irpNo) : 0;
    dto.famprfxPrefixC = this.irpListForm.value.prefixCheck ? this.irpListForm.value.prefix.famprfxPrefixC : "";
    dto.irpRegionC = this.irpListForm.value.region;
    if(this.irpListForm.value.region[0]=='')
      dto.irpRegionC ="N";
    console.log(dto);
    this.utilitiesService.setLoading(true);
    this.irpListService.getIrpList(dto)
      .subscribe((data: any) => {
        this.utilitiesService.setLoading(false);
        this.showTable = true;
        if (data.length > 0) {
          console.log(data);
          this.irpList = data;
        } else {
          this.irpList = [];
        }
        if (data.length == 0) {
          this.alertPopup("No record found for given selection criteria");
        }
      })

  }
  getRequesterId() {
    this.irpListService.getRequesterId()
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.requesterList = data;
        } else {
          this.requesterList = [];
        }
      })
  }
  popupOk() {
    this.alert.flag = false;
  }
  getCurrentOwner() {
    this.irpListService.getCurrentOwner("I", "")
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.currentOwnerList = data;
        } else {
          this.currentOwnerList = [];
        }
      })
  }
  getIrpStatus() {
    this.irpListService.getIrpStatus("I")
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.irpStatusList = data;
        } else {
          this.irpStatusList = [];
        }
      })
  }

  getVehicleLines() {
    this.irpListService.getVehicleLines()
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.vehList = data;
        } else {
          this.vehList = [];
        }
      })
  }
  getPrefix() {
    this.irpListService.getPrefix()
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.prefixList = data;
        } else {
          this.prefixList = [];
        }
      })
  }

  getTemplateId() {
    let isVehCheck = this.irpListForm.get("vehLineCheck")?.value;
    let vehType = "";
    if (isVehCheck) {
      vehType = this.irpListForm.get("vehLine")?.value ? this.irpListForm.get("vehLine")?.value.sectVehicleLineC : "";
    }

    this.irpListService.getTemplateId(vehType)
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.templateIdList = data;
        } else {
          this.templateIdList = [];
        }
      })
  }
  onRqstrIdChange(_event: any) {
    this.validFields.rqstrId = false;
    this.irpListForm.value.rqstrCheck = true;
    this.irpListForm.get('rqstrCheck')?.setValue(true);
    this.clear1 = true;
  }
  onTemplateChange(_$event: any) {
    this.validFields.section = false;
    this.irpListForm.value.sectionCheck = true;
    this.irpListForm.get('sectionCheck')?.setValue(true);
    this.clear4 = true;
  }
  onPrefixChange(_$event: any) {
    this.validFields.prefix = false;
    this.irpListForm.value.prefixCheck = true;
    this.irpListForm.get('prefixCheck')?.setValue(true);
    this.clear6 = true;
  }
  onVehLineChange(_$event: any) {
    this.validFields.vehLine = false;
    this.irpListForm.value.vehLineCheck = true;
    this.irpListForm.get('vehLineCheck')?.setValue(true);
    this.irpListForm.get('sectionCheck')?.setValue(false);
    this.templateIdList = [];
    this.getTemplateId();
    this.clear5 = true;
  }
  onIrpStatusChange(_$event: any) {
    this.validFields.irpStatus = false;
    this.irpListForm.value.statusCheck = true;
    this.irpListForm.get('statusCheck')?.setValue(true);
    this.clear3 = true;
  }
  onCurrentOwnerChange(_$event: any) {
    this.validFields.currentOwner = false;
    this.irpListForm.value.currentOwnerCheck = true;
    this.irpListForm.get('currentOwnerCheck')?.setValue(true);
    this.clear2 = true;
  }
  onBlurIrpNo() {
    this.validFields.irpNo = false;
    this.irpListForm.value.irpNoCheck = true;
    this.irpListForm.get('irpNoCheck')?.setValue(true);
  }
  onClose() {
    this.router.navigate(['']);
  }
  onReset() {
    this.showTable = false;
    this.irpList = [];
    this.clear1 = false;
    this.clear2 = false;
    this.clear3 = false;
    this.clear4 = false;
    this.clear5 = false;
    this.clear6 = false;
    this.irpListForm.patchValue({

      rqstrId: [''],
      rqstrCheck: false,
      currentOwner: [''],
      currentOwnerCheck: false,
      irpStatus: [''],
      statusCheck: false,
      irpNo: [''],
      irpNoCheck: false,
      vehLineCheck: false,
      vehLine: [''],
      prefixCheck: false,
      prefix: [''],
      sectionCheck: false,
      section: [''],
      region: ['', Validators.required],

      aliases: this.fb.array([
        this.fb.control('')
      ])
    });
    if (this.userRegion == 'N') {
      this.irpListForm.get('region')?.setValue('N');
    } else if (this.userRegion == 'E') {
      this.irpListForm.get('region')?.setValue('E');
    } else if (this.userRegion == 'A') {
      this.irpListForm.get('region')?.setValue('A');
    } else if (this.userRegion == 'S') {
      this.irpListForm.get('region')?.setValue('S');
    }
    this.validFields = {
      rqstrId: false,
      currentOwner: false,
      irpStatus: false,
      irpNo: false,
      vehLine: false,
      prefix: false,
      section: false,
      region: false,
    }
    this.userRegion = 'N';
    this.irpListForm.get('region')?.setValue('N');
  }
  ondoubleClik(irp: IrpListResDto) {
    this.utilitiesService.setGfromfrmIRPList(true);
    if (irp.reqIdR) {
      if (!irp.reqCurrOwnerC) {
        this.confirmationService.confirm({
          message: 'Do you want to be the owner of this IRP ?',
          header: 'IRP List',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.setIllusOwner(irp);
          },
          reject: (_type: any) => {
            this.getIrpResult(irp);
          }
        });
      } else {
        this.getIrpResult(irp);
      }
    }
  }
  setIllusOwner(irp: IrpListResDto) {
    this.irpListService.setIllusOwner(irp.reqIdR, this.userlogin)
      .subscribe((data: any) => {
        if (data) {
          irp.reqCurrOwnerC = data.reqCurrOwnerC ? data.reqCurrOwnerC : irp.reqCurrOwnerC;
          irp.ownerY = data.plastupY ? data.plastupY : irp.ownerY;

        }
        this.getIrpResult(irp);
      })

  }
  getIrpResult(irp: IrpListResDto) {

    this.irpListService.getGcatIrp2(irp.reqIdR, irp.illstrIdR)
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.gcatIrp2Res = data;
          this.utilitiesService.setIrp(this.gcatIrp2Res[0]);
          this.router.navigate(['/irp-review']);
        }

      })

  }
  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }

  display: any = "block"
  display1: any = "none"
  count: any = 0;
  counts: any = 0
  rotate: any;
  br: string = "5px 5px 0px 0px"
  br2: string = "5px"
  showCenterPart() {
    if (this.count == 0) {
      this.display = "none"
      this.count = 1;
      this.br = "5px"
      this.rotate = "rotate(45deg)"
    } else {
      this.br = "5px 5px 0px 0px"
      this.display = "block"
      this.count = 0;
      this.rotate = "rotate(0deg)"
    }
  }

}
