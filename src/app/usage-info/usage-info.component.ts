import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { WorkQueue } from '../interfaces/part-workqueue';
import { UsageService } from '../services/usage.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import { AddGcatPreTriggerReqDto, addGCATUsageFeatureDto, AppUsageReqDto, CmdtyPropsGCATReqDto, CmdtyPropsGCATResDto, DelGCATUsageDto, DelGCATUsageFeatureReqDto, EngpServicepartDto, EngVlAppDto, GCATLexDescRes, GcatUsageResponseDto, LexiconByLexcResDto, MinorForPCIIDto, NewUsage, NewUsageforNUSReqDto, NewUsageTimingDto, PCIINewStatusReqDto, PCIITimingResponseDto, PCIITimingResponseDto1, PrimaryForPCIIDto, S4pDateReqDto, SetUsageStatusDto, UsageFilter, UsageRequestDto, UsageResponseDto, VehicleLineDto } from './Usage';

@Component({
  selector: 'app-usage-info',
  templateUrl: './usage-info.component.html',
  styleUrls: ['./usage-info.component.css'],
  providers: [ConfirmationService]
})

@Injectable({
  providedIn: 'root',
  useValue:1
})
export class UsageInfoComponent implements OnInit {
  selectedserv: string = "";
  sprfxprtPrefixR: string = "";
  sbaseprtNbr: string = "";
  sufxprtSuffixNbr: string = "";
  data: any[] = [];
  bError: boolean = false;
  catalogTiming: PCIITimingResponseDto1[] = []
  selectedCatalogTiming: PCIITimingResponseDto1 = {};
  bSPCII: boolean = false;
  bAPCII: boolean = false;
  bNPCII: boolean = false;
  bEPCII: boolean = false;
  vehicleLineList: VehicleLineDto[] = [];
  selectedVl: VehicleLineDto[] = [];
  usageResponseList: UsageResponseDto[] = [];
  selectedPC: UsageResponseDto[] = [];
  selectedPcIICount=0;
  summarizeDis: boolean = true;
  selectedGcat: GcatUsageResponseDto = {};
  isUsgeInfoVis:boolean=false;
  btnSupressText: string = 'Suppress';
  isDeSummDis: boolean = true;
  isSupDis: boolean = true;
  isActDis: boolean = true;
  isDesumm: boolean = false;
  isInActDis: boolean = true;
  isUsgDis: boolean = true;
  inCtxtDis: boolean = true;
  btnInUTCDis: boolean = true;
  createGcatDis: boolean = true;
  addUsgDis: boolean = true;
  removeUsgBtnVis: boolean = true;
  rmvUsgDis: boolean = true;
  bWrokWithGcat: boolean = false;
  loginUserId = 'PKAMATC2';
  userlangcode: string = 'EN';
  engBase: string = "";
  engVlAppDto: EngVlAppDto = {}
  bQtyChange: boolean = false;
  bPropertyChange: boolean = false;
  totalRecordsProp: number = 0;
  gcatUsageResponseList: GcatUsageResponseDto[] = [];
  onFirstWCheck: boolean = true;
  selectedTab = '0';
  saveChecking: string = '';
  propCh: boolean = false;
  timingCh: boolean = false;
  qtyCh: boolean = false;
  PreviousTab: string = "";
  lastSelectedItem: string = "";
  propertiesList: CmdtyPropsGCATResDto[] = [];
  propertiesListDup: CmdtyPropsGCATResDto[] = [];
  newUsgPropList: LexiconByLexcResDto[] = [];
  showUsgHeader: string = "";
  disShowUsg: boolean = false;
  showUsagePc: UsageResponseDto = {};
  isWbsDis: boolean = false;
  isPicDis: boolean = false;
  isDeleteWqDis: boolean = true;
  showUsagePcGcat: GcatUsageResponseDto = {};
  selectedProperty: CmdtyPropsGCATResDto = {};
  usageFilter: UsageFilter = {
    engpEngnrgPartR: "",
    eioOriginC: "",
    engpSeqR: 0,
    vehtypeCode: "",
    pteioOriginC: "",
    evlVehicleLineC: "",
    desc: "",
    commodityDesc: "",
    cmdtyRemarks: ""
  };
  sButtonPressed: string = "";
  totalRecordsPc: number = 0;
  totalRecordsGcat: number = 0;
  engpServicepartList: EngpServicepartDto[] = [];
  gcatUsageNo: number = 0;
  selectedWQ: WorkQueue = {};
  usageRequestDto: UsageRequestDto = {};
  lexiPopup: number = 0;
  timingList: PCIITimingResponseDto[] = [];
  sFlagUTC: boolean = false;
  sFlagSFX: boolean = false;
  sFlagUFC: boolean = false;
  sFlagNUS: boolean = false;
  checkPartnerFlag: boolean = false;
  checkSpecialTimingFlag: boolean = false;
  isUsageSelectionVis: boolean = false;
  isVehChecked: boolean = false;
  isregionEChecked: boolean = true;
  isregionNChecked: boolean = true;
  isregionAChecked: boolean = true;
  isregionSChecked: boolean = true;
  iscStatusDChecked: boolean = true;
  iscStatusIChecked: boolean = true;
  iscStatusSChecked: boolean = true;
  iscStatusWChecked: boolean = true;
  iscStatusHChecked: boolean = true;
  iscStatusPChecked: boolean = true;
  iscStatusXChecked: boolean = true;
  createUsgClick: boolean = false;
  isValidCreate: boolean = true;
  cmdCreateGCATUSGVis: boolean = true;
  cmdDeleteWQMsgVis: boolean = true;
  CmdNoTimeChangeVis: boolean = false;
  isProTabVis: boolean = true;
  isInfoTabVis: boolean = true;
  isPicVis: boolean = true;
  isWbsVis: boolean = true;
  summarizeBtnVis: boolean = true;
  deSummarizeBtnVis: boolean = true;
  addUsgBtnVis: boolean = true;
  activBtnVis: boolean = true;
  inActiveBtnVis: boolean = true;
  supBtnVis: boolean = true;
  btnInUTCVis: boolean = false;
  alert: any = {
    flag: false,
    msg: "",
  }
  alertInfo: any = {
    flag: false,
    msg: "",
  }
  alertProperties: any = {
    flag: false,
    msg: "",
  }
  alertDesumm: any = {
    flag: false,
    msg: "",
  }
  property: string = "";
  lexcList: string[] = [];
  constructor(
    public utilitiesService: UtilitiesService,
    public usageService: UsageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.showCenterPartPartInfo();
    console.log("debug");
    this.utilitiesService.selectedWorkQueue.subscribe((wq: WorkQueue) => {
      if (!!wq) {
        this.usageFilter = {
          engpEngnrgPartR: wq.engpEngnrgPartR,
          eioOriginC: wq.eioOriginC,
          engpSeqR: wq.engpSeqR,
          vehtypeCode: this.utilitiesService.isActivateInactive.value ? "" : wq.vehtypeCode,
          pteioOriginC: wq.pteioOriginC,
          evlVehicleLineC: this.utilitiesService.isActivateInactive.value ? "" : wq.evlVehicleLineC,
          desc: "",
          commodityDesc: "",
          cmdtyRemarks: "",
        }
        this.selectedWQ = wq;
      }
    });
    if (this.selectedWQ.reasonCodeC!="UTC"&&!this.utilitiesService.fromNewUsg.value) {
      this.showCenterPartUsgList();
    }

    this.utilitiesService.lexCCodes.subscribe((lexc: Array<string>) => {
      if (!!lexc[0]) {
        this.lexcList = lexc;
      }
    });
    this.initCatlogTiming();
    this.frmUsageInfoLoad();

  }
  usageTimingChg() {
    this.selectedWQ.reasonCodeC = "UTC";
    this.frmUsageInfoLoad();
    this.display('0');
  }
  initCatlogTiming() {
    this.catalogTiming = [
      {
        region: 'Europe', regintC: 'E', effiopEffInC: '', epntsrEffInY: undefined,
        efiosrcSourcInC: '', epntsrEffOutY: undefined, effiopEffOutC: '', efiosrcSouroutC: '', reasonCodeC: ''
      },
      {
        region: 'N.America', regintC: 'N', effiopEffInC: '', epntsrEffInY: undefined,
        efiosrcSourcInC: '', epntsrEffOutY: undefined, effiopEffOutC: '', efiosrcSouroutC: '', reasonCodeC: ''
      },
      {
        region: 'S.America', regintC: 'S', effiopEffInC: '', epntsrEffInY: undefined,
        efiosrcSourcInC: '', epntsrEffOutY: undefined, effiopEffOutC: '', efiosrcSouroutC: '', reasonCodeC: ''
      },
      {
        region: 'A.Pacific', regintC: 'A', effiopEffInC: '', epntsrEffInY: undefined,
        efiosrcSourcInC: '', epntsrEffOutY: undefined, effiopEffOutC: '', efiosrcSouroutC: '', reasonCodeC: ''
      },
    ]
  }
  onNgModelPropertyChange() {

    if (this.property.length == 6) {
      if (this.property.substr(5, 1) == "0" || this.property.substr(4, 2) == "0P") {
        this.usageService.getLexCount(this.usageFilter.vehtypeCode, this.selectedGcat.evlVehiclLineC)
          .subscribe((data: any) => {
            if (data) {
              this.usageService.isD31Exist("EN", this.property)
                .subscribe((res1: any) => {
                  if (res1) {
                    this.usageService.isL31Exist(this.usageFilter.vehtypeCode, this.selectedGcat.evlVehiclLineC, this.property)
                      .subscribe((res2: any) => {
                        if (res2) {
                          this.usageService.isL31Valid(this.usageFilter.vehtypeCode, this.selectedGcat.evlVehiclLineC, this.property)
                            .subscribe((res3: any) => {
                              if (res3) {
                                this.addLexcValue();

                              } else {
                                this.alertPopupInfo("Invalid Lexicon");
                              }
                            })

                        } else {
                          this.alertPopupInfo("Invalid Lexicon");
                        }
                      })
                  } else {
                    this.alertPopupInfo("Invalid Lexicon");
                  }
                })
            }
          })

      } else if (this.property.substr(5, 1) == "9") {
        this.alertPopupInfo("Lexicon Code can not have source code of 9");
      } else {
        this.addLexcValue();
      }
    } else {
      this.alertPopupInfo("Please enter a valid value");
    }


  }
 
  // deleteValue() {
  //   if (this.selectedProperty.qualifier == "s") {
  //     this.confirmationService.confirm({
  //       message: 'Are you sure you want to delete this property?(Deleting SPEC property will remove it from this engineering part and its cataloged usages.)?',
  //       header: 'Confirmation',
  //       icon: 'pi pi-exclamation-triangle',
  //       accept: () => {

  //         this.deleteValueOk();
  //       },
  //       reject: (_type: any) => {
  //       }
  //     });
  //   } else {
  //     this.confirmationService.confirm({
  //       message: 'Are you sure you want to delete this property?',
  //       header: 'Confirmation',
  //       icon: 'pi pi-exclamation-triangle',
  //       accept: () => {
  //         this.deleteValueOk();
  //       },
  //       reject: (_type: any) => {
  //       }
  //     });
  //   }

  // }
  addLexcValue() {
    this.usageService.getGCATLexDesc(this.property, "EN")
      .subscribe((data: any) => {
        if (data.lextypTypeC) {
          let res: GCATLexDescRes = {};
          res = data;
          let dto: CmdtyPropsGCATResDto = {
            qualifier: "",
            cmdtpropReqdF: "",
            propCodeC: res.propCodeC,
            propCodeValueC: res.propCodeValueC,
            lexcDescLongX: res.lexcDescLongX,
            lexcC: res.lexcC,
            approvedFlag: res.approvedFlag,
            propDescX: res.propDescX,
            lextypTypeC: res.lextypTypeC
          }
          this.propertiesList.push(dto); this.bPropertyChange = true;
          let gcatUsgFtrDto: addGCATUsageFeatureDto = {};
          gcatUsgFtrDto.nusageC = this.selectedGcat.nusageC;
          gcatUsgFtrDto.lexcC = dto.lexcC;
          gcatUsgFtrDto.lextypTypeC = dto.lextypTypeC;
          gcatUsgFtrDto.lexcCBefore = "";
          gcatUsgFtrDto.cmdtyTypeC = this.selectedGcat.cmdtyTypeC;
          gcatUsgFtrDto.engpCommodityC = this.selectedGcat.engpCommodityC;
          gcatUsgFtrDto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
          gcatUsgFtrDto.engpSeqR = this.usageFilter.engpSeqR;
          gcatUsgFtrDto.eioOriginC = this.usageFilter.eioOriginC;
          gcatUsgFtrDto.approvedFlag = dto.approvedFlag;
          this.addGcatUsgFtr(gcatUsgFtrDto);
        } else {
          this.alertPopupInfo("Invalid Lexicon Code")
        }
      })
  }
  onNgModelVLChange(e: any) {
    if (e) {
      this.isUsageSelectionVis = true;
    } else {
      this.isUsageSelectionVis = false;
    }
  }
  qtyChange(e: any) {
    if (e) {
      this.bQtyChange = true;
    } else {
      this.bQtyChange = false;
    }
  }
  display(tab: string) {
    if (tab == '0') {
      this.selectedTab = tab;
      this.showCenterPartUsgList();
    } else {
      if (!this.sFlagUTC) {
        if (this.selectedGcat.evaCatlgStsC || this.sButtonPressed == "CreateGCATUSG" || this.sButtonPressed == "Summarize") {
          this.selectedTab = tab;
          if (this.selectedTab == '2') {
            this.showCenterPart();
            if (!this.sFlagNUS && !this.utilitiesService.fromNewUsg.value) {
              this.putDataGCAT(this.selectedTab);
            }
          } else if(this.selectedTab == '3') {
            this.showCenterTiming();
            this.putDataGCAT(this.selectedTab);
          }
          if(this.selectedTab=='1'){
            this.isUsgeInfoVis=true;
          }

        } else {
          this.alertPopupInfo("Select one usage to show");
        }
      } else {
        this.selectedTab = tab;
        this.CmdNoTimeChangeVis = true;
        this.isPicVis = false;
        this.isWbsVis = false;
        this.showCenterTiming();
      }

    }
  }
  putDataGCAT(currentTab: any) {
    this.selectedTab = currentTab;
    if (currentTab == '2') {
      this.propertiesList = [];
      this.getCmdtyProps("Y", "N", "A", "S", "P", "M");
    }
    if (currentTab == '3') {
      this.getPCIITimingForGCAT();
      for (const item of this.catalogTiming) {
        if (item.regintC == 'A') {
          item.effiopEffInC = this.selectedGcat.effiopEffInCA;
          item.epntsrEffInY = this.selectedGcat.epntsrEffInYA;
          item.efiosrcSourcInC = this.selectedGcat.efiosrcSourcInCA;
          item.effiopEffOutC = this.selectedGcat.efiopEffOutCA;
          item.epntsrEffOutY = this.selectedGcat.epntsrEffOutYA;

        }
        if (item.regintC == 'N') {
          item.effiopEffInC = this.selectedGcat.effiopEffInCN;
          item.epntsrEffInY = this.selectedGcat.epntsrEffInYN;
          item.efiosrcSourcInC = this.selectedGcat.efiosrcSourcInCN;
          item.effiopEffOutC = this.selectedGcat.efiopEffOutCN;
          item.epntsrEffOutY = this.selectedGcat.epntsrEffOutYN;

        }
        if (item.regintC == 'E') {
          item.effiopEffInC = this.selectedGcat.effiopEffInCE;
          item.epntsrEffInY = this.selectedGcat.epntsrEffInYE;
          item.efiosrcSourcInC = this.selectedGcat.efiosrcSourcInCE;
          item.effiopEffOutC = this.selectedGcat.efiopEffOutCE;
          item.epntsrEffOutY = this.selectedGcat.epntsrEffOutYE;

        }
        if (item.regintC == 'S') {
          item.effiopEffInC = this.selectedGcat.effiopEffInCS;
          item.epntsrEffInY = this.selectedGcat.epntsrEffInYS;
          item.efiosrcSourcInC = this.selectedGcat.efiosrcSourcInCS;
          item.effiopEffOutC = this.selectedGcat.efiopEffOutCS;
          item.epntsrEffOutY = this.selectedGcat.epntsrEffOutYS;

        }
      }

    }
  }
  getCmdtyProps(MP: string, RP: string, AC: string, SC: string, PC: string, MMP: string) {
    this.propertiesList = [];
    if (AC == "A") {
      this.getCmdtyPropsGcatSql(AC, "1", "");
    }
    if (SC == "S") {
      this.getCmdtyPropsGcatSql(SC, "1", "");
    }
    if (PC == "P") {
      this.getCmdtyPropsGcatSql(PC, "1", "");
    }
    if (MMP == "M") {
      this.getCmdtyPropsGcatSql(MMP, "1", "");
    }
  }
  displayProperties() {
    this.propertiesListDup = [];
    this.display('2');
  }
  getCmdtyPropsGcatSql(FeatProp: string, sFlag: string, sFullLine: string) {
    let dto: CmdtyPropsGCATReqDto = {
      engpCommodityC: this.selectedGcat.engpCommodityC,
      cmdtyTypeC: this.selectedGcat.cmdtyTypeC,
      langGtiC: "EN",
      featProp: FeatProp,
      engpEngnrgPartR: this.usageFilter.engpEngnrgPartR,
      engpSeqR: this.usageFilter.engpSeqR,
      eioOriginC: this.usageFilter.eioOriginC,
      nusageC: this.selectedGcat.nusageC
    }
    this.usageService.getCmdtyPropsGCAT(dto)
      .subscribe((data: any) => {
        if (data) {
          this.propertiesList.push(...data);
          this.totalRecordsProp = this.propertiesList.length;
          if (!this.bPropertyChange) {
            this.propertiesListDup.push(...data);
          }

        }
      })
  }
  frmUsageInfoLoad() {
    this.loadUsageInfoSub();
    this.getCommodityDescRemark();
  }
  onRowEditInit(timing: any) {
    console.log(timing);
  }
  onRowEditSave(timing: any) {
    console.log(timing);
  }

  loadUsageInfoSub() {
    this.sFlagUTC = this.selectedWQ.reasonCodeC == "UTC" ? true : false;
    this.sFlagSFX = this.selectedWQ.reasonCodeC == "SFX" ? true : false;
    this.sFlagUFC = this.selectedWQ.reasonCodeC == "UFC" ? true : false;
    this.sFlagNUS = this.selectedWQ.reasonCodeC == "NUS" ? true : false;
    if (this.sFlagUTC) {
      this.CmdNoTimeChangeVis = true;
      this.isPicVis = false;
      this.isWbsVis = false;
    }
    this.screenChangingForUTC();
    this.setSpecialProcessFlags();
    this.getVehLineSelection();
    this.getEngBase();
    if (!this.utilitiesService.isActivateInactive.value) {
      this.startUsageList(this.usageFilter.evlVehicleLineC, this.usageFilter.vehtypeCode);
    }
  }
  screenChangingForUTC() {
    let bVisible = true;
    if (!this.sFlagUTC) {
      this.iscStatusIChecked = true;
      this.iscStatusDChecked = true;
      this.iscStatusWChecked = true;
      this.btnInUTCDis = true;
      this.isProTabVis = true;
      this.isInfoTabVis = true;
    } else {
      this.iscStatusIChecked = false;
      this.iscStatusDChecked = false;
      this.iscStatusWChecked = false;
      this.cmdCreateGCATUSGVis = false;
      this.cmdDeleteWQMsgVis = false;
      this.CmdNoTimeChangeVis = true;
      this.isWbsVis = false;
      bVisible = false;
      this.isProTabVis = false;
      this.isInfoTabVis = false;

    }
    this.summarizeBtnVis = bVisible;
    this.deSummarizeBtnVis = bVisible;
    this.addUsgBtnVis = bVisible;
    this.removeUsgBtnVis = bVisible;
    this.activBtnVis = bVisible;
    this.inActiveBtnVis = bVisible;
    this.supBtnVis = bVisible;
    this.btnInUTCVis = bVisible;
  }
  noTimeChangeClick() {
    this.setTimingChangeFlag(() => {
    });
  }
  setSpecialProcessFlags() {
    this.usageService.getSpecialProcessFlags(this.selectedWQ.evlVehicleLineC)
      .subscribe((data: any) => {
        this.checkPartnerFlag = data;
        this.checkSpecialTimingFlag = data;
      })

  }

  getVehLineSelection() {
    this.usageService.getVehicleLine(this.selectedWQ.engpEngnrgPartR)
      .subscribe((data: any) => {
        this.vehicleLineList = data;
        if (this.utilitiesService.isActivateInactive.value) {
          this.vehicleLineList.forEach(obj => {
            this.startUsageList(obj.evlVehicleLineC, obj.vehtypeCode);
          });
        }

      })
  }
  getEngBase() {
    this.usageService.getEngBase(this.selectedWQ.engpEngnrgPartR, this.selectedWQ.eioOriginC, this.selectedWQ.engpSeqR)
      .subscribe((data: any) => {
        this.engBase = data.engBase;
      })
    this.getEngpSvPart();
    if (this.checkPartnerFlag) {
      this.getEngpPartnerPart();
    }
  }

  getEngpSvPart() {
    this.usageService.getEngpSvPart(this.selectedWQ.engpEngnrgPartR, this.selectedWQ.eioOriginC, this.selectedWQ.engpSeqR, this.userlangcode)
      .subscribe((data: any) => {
        this.engpServicepartList = data;
        if (data.length > 0) {
          this.usageFilter.desc = data[0].lexcDescLongX;
          this.selectedserv = data[0].sprfxprtPrefixR + " " + data[0].sbaseprtNbr + " " + data[0].sufxprtSuffixNbr;
          this.sprfxprtPrefixR = data[0].sprfxprtPrefixR;
          this.sbaseprtNbr = data[0].sbaseprtNbr;
          this.sufxprtSuffixNbr = data[0].sufxprtSuffixNbr;
        }

      })
  }
  getEngpPartnerPart() {

  }
  startUsageList(vehilceLine: any, vehtypeCode: any) {
    this.rmvUsgDis = true;
    this.bWrokWithGcat = false;
    this.bPropertyChange = false;
    this.bQtyChange = false;
    this.bWrokWithGcat = false;
    this.usageResponseList=[];
    this.gcatUsageResponseList=[];
    this.selectedPC=[];
    this.selectedGcat={};
    if (!this.sFlagUTC) {
      this.getUsageListPCII(vehilceLine, vehtypeCode);
    } else {
      this.getUsageListGCAT(vehilceLine, vehtypeCode);
    }
  }
  getUsageListPCII(vehilceLine: any, vehtypeCode: any) {
    this.utilitiesService.setLoading(true);
    const flag = this.sFlagUTC ? 'Y' : 'N';
    let region = "";
    if (this.isregionAChecked) region += "A";
    if (this.isregionEChecked) region += "E";
    if (this.isregionNChecked) region += "N";
    if (this.isregionSChecked) region += "S";
    let cStatus = "";
    if (this.iscStatusDChecked) cStatus += "D";
    if (this.iscStatusIChecked) cStatus += "I";
    if (this.iscStatusSChecked) cStatus += "S";
    if (this.iscStatusWChecked) cStatus += "W";

    this.usageRequestDto = {
      engpEngnrgPartR: this.selectedWQ.engpEngnrgPartR,
      eioOriginC: this.selectedWQ.eioOriginC,
      engpSeqR: this.selectedWQ.engpSeqR,
      vehtypeCode: vehtypeCode,
      pteioOriginC: this.selectedWQ.pteioOriginC,
      evlVehicleLineC: vehilceLine,
      statusString: cStatus,
      flagUtc: flag,
      nusageC: this.selectedWQ.nusageC,
      region: region,
      vehicleLines: [],
    }
    this.usageService.getUsageListPCII(this.usageRequestDto)
      .subscribe((data: any) => {
        if (data) {
          console.log(data);
          if (this.isVehChecked || this.utilitiesService.isActivateInactive.value) {
            this.usageResponseList.push(...data);
            let index = 0;
            for (const obj of this.usageResponseList) {
              obj.id = index++;
            }

          } else {
            this.usageResponseList = data;
          }
          this.totalRecordsPc = this.usageResponseList.length;
          if (!this.sFlagUTC) {
            this.getUsageListGCAT(vehilceLine, vehtypeCode);
          } else {
            this.utilitiesService.setLoading(false);
          }
        }else{
          this.usageResponseList=[];
        }
      })
  }
  getUsageListGCAT(vehilceLine: any, vehtypeCode: any) {
    this.utilitiesService.setLoading(true);
    const flag = this.sFlagUTC ? 'Y' : 'N';
    let cStatus = "W";
    if (this.iscStatusHChecked) cStatus += "H";
    if (this.iscStatusPChecked) cStatus += "P";
    if (this.iscStatusXChecked) cStatus += "X";

    this.usageRequestDto = {
      engpEngnrgPartR: this.selectedWQ.engpEngnrgPartR,
      eioOriginC: this.selectedWQ.eioOriginC,
      engpSeqR: this.selectedWQ.engpSeqR,
      vehtypeCode: vehtypeCode,
      pteioOriginC: this.selectedWQ.pteioOriginC,
      evlVehicleLineC: vehilceLine,
      statusString: cStatus,
      flagUtc: flag,
      nusageC: this.selectedWQ.nusageC,
      vehicleLines: [],
    }
    this.usageService.getUsageListGCAT(this.usageRequestDto)
      .subscribe((data: any) => {
        if (data) {
          console.log(data);
          if (this.isVehChecked ||this.utilitiesService.isActivateInactive.value) {
            this.gcatUsageResponseList.push(...data);
          } else {
            this.gcatUsageResponseList = data;
          }
          this.totalRecordsGcat = this.gcatUsageResponseList.length;
          if(this.sButtonPressed == "CreateGCATUSG" || this.sButtonPressed == "Summarize" ){
            const selected = this.gcatUsageResponseList.filter(val => val.nusageC == this.gcatUsageNo);
            this.selectedGcat=selected.length>0?selected[0]:{};

          }
          if (this.gcatUsageResponseList.length > 0 && this.sFlagUTC && this.sButtonPressed != "CreateGCATUSG" && this.sButtonPressed != "Summarize" && this.onFirstWCheck) {
            this.getUsageListPCII(vehilceLine, vehtypeCode);
          }
          if (this.sFlagUTC||(this.sFlagNUS && this.utilitiesService.fromNewUsg.value)||this.utilitiesService.gFlagFromPicToUsage.value) {
            if (this.gcatUsageResponseList.length > 0) {
              this.selectedGcat = this.gcatUsageResponseList[0];
              this.onRowSelectGcat();
              this.setCatalogTiming();
              
            } else {
              this.selectedGcat = data;
            }
            this.propertiesList = [];
            if(this.sFlagUTC){
              this.display('3')
            }
           
          }
          if (this.gcatUsageResponseList.length > 0) {
            if (!this.utilitiesService.fromNewUsg.value) {
              this.getCmdtyProps("Y", "N", "A", "S", "P", "M");
            } else {
              this.setCmdtyPropForNewUsg();
            }
          }
          this.getPCIITimingForGCAT();
          if (this.sButtonPressed == "CreateGCATUSG" || this.sButtonPressed == "Summarize" || (this.sFlagNUS && this.utilitiesService.fromNewUsg.value)||this.utilitiesService.gFlagFromPicToUsage.value) {
            this.display('2');
          }
        }else{
          this.gcatUsageResponseList =[];
        }
        this.utilitiesService.setLoading(false);
      })
  }
  setCatalogTiming(){
    for (const item of this.catalogTiming) {
      if (item.regintC == 'A') {
        item.effiopEffInC = this.selectedGcat.effiopEffInCA;
        item.epntsrEffInY = this.selectedGcat.epntsrEffInYA;
        item.efiosrcSourcInC = this.selectedGcat.efiosrcSourcInCA;
        item.effiopEffOutC = this.selectedGcat.efiopEffOutCA;
        item.epntsrEffOutY = this.selectedGcat.epntsrEffOutYA;

      }
      if (item.regintC == 'N') {
        item.effiopEffInC = this.selectedGcat.effiopEffInCN;
        item.epntsrEffInY = this.selectedGcat.epntsrEffInYN;
        item.efiosrcSourcInC = this.selectedGcat.efiosrcSourcInCN;
        item.effiopEffOutC = this.selectedGcat.efiopEffOutCN;
        item.epntsrEffOutY = this.selectedGcat.epntsrEffOutYN;

      }
      if (item.regintC == 'E') {
        item.effiopEffInC = this.selectedGcat.effiopEffInCE;
        item.epntsrEffInY = this.selectedGcat.epntsrEffInYE;
        item.efiosrcSourcInC = this.selectedGcat.efiosrcSourcInCE;
        item.effiopEffOutC = this.selectedGcat.efiopEffOutCE;
        item.epntsrEffOutY = this.selectedGcat.epntsrEffOutYE;

      }
      if (item.regintC == 'S') {
        item.effiopEffInC = this.selectedGcat.effiopEffInCS;
        item.epntsrEffInY = this.selectedGcat.epntsrEffInYS;
        item.efiosrcSourcInC = this.selectedGcat.efiosrcSourcInCS;
        item.effiopEffOutC = this.selectedGcat.efiopEffOutCS;
        item.epntsrEffOutY = this.selectedGcat.epntsrEffOutYS;

      }
    }
  }
  setCmdtyPropForNewUsg() {
    for (const item of this.lexcList) {
      this.usageService.getLexiconByLexCode(item)
        .subscribe((data: any) => {
          if (data) {
            this.newUsgPropList.push(...data);
            for (const lex of data) {
              let qual = lex.lextypTypeC == 'APPL' ? 'A' : lex.lextypTypeC == 'SPEC' ? 'S' : lex.lextypTypeC == 'PFC' ? 'P' : lex.lextypTypeC == 'MFC' ? 'M' : '';
              let dto: CmdtyPropsGCATResDto = {
                qualifier: qual,
                cmdtpropReqdF: '',
                propCodeC: lex.propCodeC,
                propCodeValueC: lex.propCodeValueC,
                lexcDescLongX: lex.lexcDescLongX,
                lexcC: lex.lexcC,
                approvedFlag: lex.approvedFlag,
                propDescX: lex.propDescX,
                lextypTypeC: lex.lextypTypeC
              }
              this.propertiesList.push(dto);
              let gcatUsgFtrDto: addGCATUsageFeatureDto = {};
              gcatUsgFtrDto.nusageC = this.selectedGcat.nusageC;
              gcatUsgFtrDto.lexcC = dto.lexcC;
              gcatUsgFtrDto.lextypTypeC = dto.lextypTypeC;
              gcatUsgFtrDto.lexcCBefore = "";
              gcatUsgFtrDto.cmdtyTypeC = this.selectedGcat.cmdtyTypeC;
              gcatUsgFtrDto.engpCommodityC = this.selectedGcat.engpCommodityC;
              gcatUsgFtrDto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
              gcatUsgFtrDto.engpSeqR = this.usageFilter.engpSeqR;
              gcatUsgFtrDto.eioOriginC = this.usageFilter.eioOriginC;
              gcatUsgFtrDto.approvedFlag = dto.approvedFlag;
              this.addGcatUsgFtr(gcatUsgFtrDto);
            }
          }
        })
    }
  }

  getCommodityDescRemark() {
    this.usageService.getCommodityDescRemark(this.selectedWQ.cmdtyTypeC, this.selectedWQ.engpCommodityC, this.userlangcode)
      .subscribe((data: any) => {
        if (data) {
          console.log(data);
          this.usageFilter.commodityDesc = data.lexcDescLong;
          this.usageFilter.cmdtyRemarks = data.cmdtyRemarks ? data.cmdtyRemarks : "";
        }
      })
  }
  showUsageSelection() {
    this.isUsageSelectionVis = true;
  }

  usageSelectionClick() {
    if (this.selectedVl.length > 1) {
      this.usageFilter.evlVehicleLineC = "";
      this.usageFilter.vehtypeCode = "";
    } else {
      this.usageFilter.evlVehicleLineC = this.selectedVl[0]?.evlVehicleLineC;
      this.usageFilter.vehtypeCode = this.selectedVl[0]?.vehtypeCode;
    }
    this.usageResponseList = [];
    this.gcatUsageResponseList = [];
    this.selectedVl.forEach(obj => {
      this.startUsageList(obj.evlVehicleLineC, this.selectedVl[0]?.vehtypeCode);
      this.isUsageSelectionVis = false;
    });
  }
  cancelClick() {
    this.isVehChecked = false;
    this.isUsageSelectionVis = false;
  }
  createGcatUsgClick() {
    this.createUsgClick = true;
    this.sButtonPressed = "CreateGCATUSG";
    this.timingList = [];
    this.initCatlogTiming();
    if (this.sFlagUTC) {
      this.setTimingChangeFlag(() => {
        this.getMultiUserForPCII();
      });
    } else {
      this.getMultiUserForPCII();
    }
    if (this.sFlagNUS && this.isWbsDis && this.isPicDis) {
      this.isWbsDis = false;
      this.isPicDis = false;
    }
  }

  setTimingChangeFlag(callBackFunction: { (): void; (): void; }) {
    this.usageService.setTimingChangeFlag(this.loginUserId, this.selectedGcat.nusageC)
      .subscribe((data: any) => {
        if (data) {
          this.isValidCreate = true;
          callBackFunction();
        } else {
          this.isValidCreate = false;
        }
      })
  }
  onRightClick(usage_pc: any, list: any) {
    console.log(usage_pc);
    if (list == 'pc') {
      this.showUsagePc = usage_pc;
      this.showUsgHeader = "PCII Usage";
    } else {
      this.showUsgHeader = "GCAT Usage";
      this.showUsagePcGcat = usage_pc;
    }

    this.disShowUsg = true;
  }
  onRowSelectGcat() {
    this.utilitiesService.setGcatUsg(this.selectedGcat);
    if (this.selectedGcat.evaCatlgStsC != "X") {
      this.isDeSummDis = false;
    } else {
      this.isDeSummDis = true;
    }
    if (this.selectedGcat.evaCatlgStsC == 'X' || this.selectedGcat.evaCatlgStsC == 'P') {
      this.isSupDis = false;
      if (this.selectedGcat.evaCatlgStsC == 'P') {
        this.btnSupressText = 'Suppress';
      } else {
        this.btnSupressText = 'UnSuppress';
      }
    } else {
      this.isSupDis = true;
      this.btnSupressText = 'Suppress';
    }
    if(this.selectedGcat.evaCatlgStsC=='W'){
      this.inCtxtDis=true;
    }else{
      this.inCtxtDis=false;
    }
  }
  onRowUnselect(event: any) {
    if (this.selectedPC.length > 1) {
      this.createGcatDis = true;

    } else {
      this.createGcatDis = false;
    }
    for (const item of this.selectedPC) {
      if (item.evaCatlgStsC == 'D' || item.evaCatlgStsC == 'I') {
        this.isActDis = false;
        this.isInActDis = true;
        this.summarizeDis = true;
      }
    }
    if (!this.summarizeDis) {
      if (this.selectedPC.length > 1) {
        this.summarizeDis = false;
      } else {
        this.summarizeDis = true;
      }
    }
  }
  loadSummarizeList(data: UsageResponseDto) {
    this.utilitiesService.setLoading(true);
    this.usageRequestDto = {
      engpEngnrgPartR: this.selectedWQ.engpEngnrgPartR,
      eioOriginC: this.selectedWQ.eioOriginC,
      engpSeqR: this.selectedWQ.engpSeqR,
      vehtypeCode: this.usageFilter.vehtypeCode,
      cmdtyTypeC: data.cmdtyTypeC,
      pteioOriginC: this.selectedWQ.pteioOriginC,
      evlVehicleLineC: data.evlVehicleLineC,
      engpCommodityC: data.engpCommodityC,
      region: data.regintC,
      statusString: "",
      flagUtc: "",
      nusageC: 0,
      vehicleLines: [],
    }
    this.usageService.getPCIISummarize(this.usageRequestDto)
      .subscribe((data: any) => {
        if (data) {
          this.usageResponseList = data;
          let index = 0;
            for (const obj of this.usageResponseList) {
              obj.id = index++;
            }
          this.selectedPC=[];
        }
      })
    this.getUsageListGCAT(data.evlVehicleLineC, this.usageFilter.vehtypeCode);

  }
  onRowSelect(event: any) {
    this.usageFilter.vehtypeCode = event.data.cmdtyTypeC ? event.data.cmdtyTypeC : "";
    if (event.data.evaCatlgStsC == 'S'&& event.data.usageSummarizationInd == 'S') {
      this.selectedPC=[];
      this.selectedPC.push(event.data);
    }
    if (event.data.evaCatlgStsC == "W" && this.onFirstWCheck) {
      this.onFirstWCheck = false;
      this.usageFilter.evlVehicleLineC=event.data.evlVehicleLineC;
      this.loadSummarizeList(event.data);
    }
    if ((event.data.evaCatlgStsC == 'D' && event.data.usageSummarizationInd == 'O') || (event.data.evaCatlgStsC == 'D' && event.data.usageSummarizationInd == 'S') ||
      (event.data.evaCatlgStsC == 'D' && event.data.usageSummarizationInd == 'M')) {
      this.alertPopupInfo("Usage is Dead and Summarized. If you wish to activate it, remove Effective Out Date in PCII.");
      this.selectedPC.splice(this.selectedPC.length - 1, 1);
      return;
    }
    if (event.data.evaCatlgStsC == 'N') {
      this.alertPopupInfo("Usage is at 'N' status; cannot be worked.");
      this.selectedPC.splice(this.selectedPC.length - 1, 1);
      return;
    }
    if (event.data.evaCatlgStsC == 'D') {
      this.isActDis = false;
    }
    if (!event.data.engpCommodityC) {
      if (event.data.evaCatlgStsC != 'D') {
        this.alertPopupInfo("No commodity assigned to this usage. Please work EMC workqueue message.");
        this.selectedPC.splice(this.selectedPC.length - 1, 1);
        return;
      }
    }

    if (this.selectedPC.length > 0) {
      for (const item of this.selectedPC) {
        if (item.evaCatlgStsC == 'D' || item.evaCatlgStsC == 'I') {
          this.isActDis = false;
          this.isInActDis = true;
          this.summarizeDis = true;
        }
      }
      if (this.bWrokWithGcat) {
        if(this.selectedGcat.evaCatlgStsC=="X"){
          this.rmvUsgDis = true;
          this.addUsgDis = true;
        }else{
          if (event.data.evaCatlgStsC == "S") {
            this.rmvUsgDis = false;
            this.addUsgDis = true;
          } else {
            this.rmvUsgDis = true;
            this.addUsgDis = false;
          }
        }
        
      }
      if (event.data.evaCatlgStsC == "S") {
        if (event.data.usageSummarizationInd !== "S") {
          if (this.selectedPC.length > 1) {
            this.summarizeDis = false;
            this.createGcatDis = true;
          } else {
            this.summarizeDis = true;
            this.createGcatDis = false;
          }
        } else {
          this.summarizeDis = true;
          this.createGcatDis = true;
        }
      } else {
        if (this.selectedPC.length <= 0 && event.data.evaCatlgStsC == 'D' || event.data.evaCatlgStsC == 'I') {
          this.summarizeDis = true;
        } else {
          this.summarizeDis = false;
        }
        if (event.data.evaCatlgStsC == 'D' || event.data.evaCatlgStsC == 'I') {
          this.createGcatDis = true;
          this.summarizeDis = true;
        } else {
          if (this.selectedPC.length > 1) {
            this.createGcatDis = true;
            this.summarizeDis = false;
          } else {
            this.createGcatDis = false;
            this.summarizeDis = true;
          }
        }
      }
    }

  }
  getMultiUserForPCII() {
    this.utilitiesService.setLoading(true);
    this.engVlAppDto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
    this.engVlAppDto.pteioOriginC = this.usageFilter.pteioOriginC;
    this.engVlAppDto.engpSeqR = this.usageFilter.engpSeqR;
    this.engVlAppDto.funcKey = this.selectedPC[0].funcKey;
    this.engVlAppDto.vehtypeCode = this.usageFilter.vehtypeCode;
    this.engVlAppDto.evlVehicleLineC = this.selectedPC[0].evlVehicleLineC;
    this.engVlAppDto.regintC = this.selectedPC[0].regintC;
    this.engVlAppDto.evaPerUsageQ = this.selectedPC[0].evaPerUsageQ;
    this.engVlAppDto.effiopEffInC = this.selectedPC[0].effiopEffInC;
    this.engVlAppDto.origVehtypeC = this.selectedPC[0].origVehtypeC;
    this.usageService.getMultiUserForPCII(this.engVlAppDto)
      .subscribe((data: any) => {
        if (data.length <= 0) {
          this.createNewUsgSumm(() => {
            this.utilitiesService.setLoading(false);
          });
         
        } else {
          
          this.alertInfo(data[0].nusageC + " " + data[0].evaCatlgUseridC + " " + data[0].pcLastupY)
        }
      })
  }

  alertPopupInfo(data: string) {
    this.alertInfo.flag = true;
    this.alertInfo.msg = data;
  }
  alertPopupProperties(data: string) {
    this.alertProperties.flag = true;
    this.alertProperties.msg = data;
  }
  alertPopupDesumm(data: string) {

    this.alertDesumm.flag = true;
    this.alertDesumm.msg = data;
  }
  createNewUsgSumm(callBackFunction: { (): void; (): void; }) {
    this.propertiesList=[];
    this.timingList=[];
    //this.catalogTiming=[];
    this.utilitiesService.setLoading(true);
    let newUsage: NewUsage = {};
    newUsage.funcKey = "0000000000000";
    newUsage.evaPerUsageQ = this.selectedPC[0].evaPerUsageQ + "";
    newUsage.engpCommodityC = this.selectedPC[0].engpCommodityC;
    newUsage.evlVehiclLineC = this.selectedPC[0].evlVehicleLineC;
    newUsage.cmdtyTypeC = this.selectedPC[0].cmdtyTypeC;
    newUsage.vehtypeCode = this.usageFilter.vehtypeCode;
    newUsage.pteioOriginC = this.usageFilter.pteioOriginC;
    newUsage.unitmsrCode = this.selectedPC[0].unitmsrCode;
    newUsage.pcLastupIdC = this.loginUserId;
    newUsage.evaCatlgUseridC = this.loginUserId;
    newUsage.createByIdC = this.loginUserId

    this.usageService.addNewUsageP60(newUsage)
      .subscribe((data: any) => {
        if (data != null && data != "") {
          let appUsg: AppUsageReqDto = {};
          const usgNo = parseInt(data);
          this.gcatUsageNo = usgNo;
          let index=0;
          for (const each of this.selectedPC) {
           
            appUsg.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
            appUsg.eioOriginC = this.usageFilter.eioOriginC;
            appUsg.engpSeqR = this.usageFilter.engpSeqR;
            appUsg.funcKey = each.funcKey;
            appUsg.vehtypeCode = this.usageFilter.vehtypeCode;
            appUsg.pteioOriginC = this.usageFilter.pteioOriginC;
            appUsg.evlVehicleLineC = each.evlVehicleLineC;
            appUsg.pftrcCombinatnC = each.pftrcCombinatnC;
            appUsg.mftrcCombinatinC = each.mftrcCombinatinC;
            appUsg.regintC = each.regintC;
            appUsg.evaPerUsageQ = each.evaPerUsageQ;
            appUsg.effiopEffInC = each.effiopEffInC;
            appUsg.origVehtypeC = each.origVehtypeC;
            appUsg.nusageC = usgNo;
            appUsg.engpCommodityC=each.engpCommodityC;
            appUsg.cmdtyTypeC=each.cmdtyTypeC;
            appUsg.userIdC=this.loginUserId;
            this.usageService.summarize(appUsg)
              .subscribe((_data1: any) => {
                index++;
                if(index==this.selectedPC.length){
                  callBackFunction();
                  this.summarizeInserGcatTiming(usgNo);
                }
              })
          }
        }
      })
  }
  createNewUsage() {
    this.utilitiesService.setLoading(true);
    let newUsage: NewUsage = {};
    newUsage.funcKey = "0000000000000";
    newUsage.evaPerUsageQ = this.selectedPC[0].evaPerUsageQ + "";
    newUsage.engpCommodityC = this.selectedPC[0].engpCommodityC;
    newUsage.evlVehiclLineC = this.selectedPC[0].evlVehicleLineC;
    newUsage.cmdtyTypeC = this.selectedPC[0].cmdtyTypeC;
    newUsage.vehtypeCode = this.usageFilter.vehtypeCode;
    newUsage.pteioOriginC = this.usageFilter.pteioOriginC;
    newUsage.unitmsrCode = this.selectedPC[0].unitmsrCode;
    newUsage.pcLastupIdC = this.loginUserId;
    newUsage.evaCatlgUseridC = this.loginUserId;
    newUsage.createByIdC = this.loginUserId

    this.usageService.addNewUsageP60(newUsage)
      .subscribe((data: any) => {
        if (data != null && data != "") {
          let appUsg: AppUsageReqDto = {};
          const usgNo = parseInt(data);
          this.gcatUsageNo = usgNo;
          for (const each of this.selectedPC) {
            appUsg.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
            appUsg.eioOriginC = this.usageFilter.eioOriginC;
            appUsg.engpSeqR = this.usageFilter.engpSeqR;
            appUsg.funcKey = each.funcKey;
            appUsg.vehtypeCode = this.usageFilter.vehtypeCode;
            appUsg.pteioOriginC = this.usageFilter.pteioOriginC;
            appUsg.evlVehicleLineC = each.evlVehicleLineC;
            appUsg.pftrcCombinatnC = each.pftrcCombinatnC;
            appUsg.mftrcCombinatinC = each.mftrcCombinatinC;
            appUsg.regintC = each.regintC;
            appUsg.evaPerUsageQ = each.evaPerUsageQ;
            appUsg.effiopEffInC = each.effiopEffInC;
            appUsg.origVehtypeC = each.origVehtypeC;
            appUsg.nusageC = usgNo;
            this.usageService.addNewUsageP63(appUsg)
              .subscribe((data1: any) => {
                if (data1 != null && data1 != "") {
                  if (each.pftrcCombinatnC != 0) {
                    let primaryForPCIIDto: PrimaryForPCIIDto[] = [];
                    this.usageService.getPrimaryForPCII(each.pftrcCombinatnC, "EN")
                      .subscribe((data2: any) => {
                        primaryForPCIIDto = data2;
                        if (primaryForPCIIDto.length > 0) {
                          primaryForPCIIDto.forEach(obj => {
                            let gcatUsgFtrDto: addGCATUsageFeatureDto = {};
                            gcatUsgFtrDto.nusageC = usgNo;
                            gcatUsgFtrDto.lexcC = obj.lexcC;
                            gcatUsgFtrDto.lextypTypeC = "PFC";
                            gcatUsgFtrDto.lexcCBefore = "";
                            gcatUsgFtrDto.cmdtyTypeC = each.cmdtyTypeC;
                            gcatUsgFtrDto.engpCommodityC = each.engpCommodityC;
                            gcatUsgFtrDto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
                            gcatUsgFtrDto.engpSeqR = this.usageFilter.engpSeqR;
                            gcatUsgFtrDto.eioOriginC = this.usageFilter.eioOriginC;
                            gcatUsgFtrDto.approvedFlag = obj.approvedFlag;
                            this.usageService.addGCATUsageFeature(gcatUsgFtrDto)
                              .subscribe((_data3: any) => {
                              })
                          });
                        }
                      })
                  }
                  if (each.mftrcCombinatinC != 0) {
                    let minorForPCIIDto: MinorForPCIIDto[] = [];
                    this.usageService.getMinorForPCII(each.mftrcCombinatinC, "EN")
                      .subscribe((data4: any) => {
                        minorForPCIIDto = data4;
                        if (minorForPCIIDto.length > 0) {
                          minorForPCIIDto.forEach(obj => {
                            let gcatUsgFtrDto: addGCATUsageFeatureDto = {};
                            gcatUsgFtrDto.nusageC = usgNo;
                            gcatUsgFtrDto.lexcC = obj.lexcC;
                            gcatUsgFtrDto.lextypTypeC = "MFC";
                            gcatUsgFtrDto.lexcCBefore = "";
                            gcatUsgFtrDto.cmdtyTypeC = each.cmdtyTypeC;
                            gcatUsgFtrDto.engpCommodityC = each.engpCommodityC;
                            gcatUsgFtrDto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
                            gcatUsgFtrDto.engpSeqR = this.usageFilter.engpSeqR;
                            gcatUsgFtrDto.eioOriginC = this.usageFilter.eioOriginC;
                            this.usageService.addGCATUsageFeature(gcatUsgFtrDto)
                              .subscribe((_data5: any) => {
                              })
                          });
                        }
                      })
                  }

                }
              })
          }
          this.summarizeInserGcatTiming(usgNo);
         
        }
      })

  }
  summarizeInserGcatTiming(usgNo:number){
    if (!this.checkSpecialTimingFlag) {
      for (const each of this.selectedPC) {
        let dto: NewUsageTimingDto = {};
        dto.regionCodeC = each.regintC;
        dto.nusageC = usgNo;
        dto.effiopEffInC = each.effiopEffInC;
        dto.epntsrEffInY = each.epntsrEffInY + '';
        dto.efiosrcSourcInC = each.efiosrcSourcInC;
        dto.effiopEffOutC = each.effiopEffOutC;
        dto.epntsrEffOutY = each.epntsrEffOutY;
        dto.efiosrcSourcoutC = each.efiosrcSouroutC;
        dto.userId = this.loginUserId;
        this.InsertGCATTiming(dto);
      }

    }
  }
  InsertGCATTiming(dto: NewUsageTimingDto) {
    this.usageService.addNewUsageTiming(dto)
      .subscribe((_data: any) => {
        this.bPropertyChange = false;
        this.selectedPcIICount++;
        if(this.selectedPcIICount==this.selectedPC.length){
          this.getUsageListGCAT(this.usageFilter.evlVehicleLineC, this.usageFilter.vehtypeCode);
          this.selectedPcIICount=0;
        }
        if (this.sButtonPressed != "CreateGCATUSG" && this.sButtonPressed != "Summarize") {
          this.router.navigate(['/part-work']);
        }
      })

  }
  gcatCheckBoxChange(){
    this.gcatUsageResponseList =[];
    if(!this.utilitiesService.isActivateInactive.value){
      if(!this.isVehChecked){
        this.getUsageListGCAT(this.usageFilter.evlVehicleLineC,this.usageFilter.vehtypeCode);
      }else{
        this.selectedVl.forEach(obj => {
          this.getUsageListGCAT(obj.evlVehicleLineC, this.selectedVl[0]?.vehtypeCode);
        });
      }
    }else{
      this.vehicleLineList.forEach(obj => {
        this.getUsageListPCII(obj.evlVehicleLineC, obj.vehtypeCode);
      });
    }
   
  }
  pcIICheckBoxChange(){
    this.usageResponseList=[];
    this.gcatUsageResponseList =[];
    if(!this.utilitiesService.isActivateInactive.value){
      if(!this.isVehChecked){
        this.getUsageListPCII(this.usageFilter.evlVehicleLineC,this.usageFilter.vehtypeCode)
      }else{
        this.selectedVl.forEach(obj => {
          this.getUsageListPCII(obj.evlVehicleLineC, this.selectedVl[0]?.vehtypeCode);
        });
      }
    }else{
      this.vehicleLineList.forEach(obj => {
            this.getUsageListPCII(obj.evlVehicleLineC, obj.vehtypeCode);
          });
    }
    
  }

  summarizeClick() {
    this.sButtonPressed = "Summarize";
    this.getMultiUserForPCII();
    if (this.sFlagNUS && this.isWbsDis && this.isPicDis) {
      this.isWbsDis = false;
      this.isPicDis = false;
    }
  }
  deSummarizeClick() {
    this.confirmationService.confirm({
      message: 'Desummarizing this usage will remove THIS PART from ALL sections.Do you want to continue?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deSummarizeOk();
      },
      reject: (_type: any) => {
      }
    });
  }
  deSummarizeOk() {
    this.isDesumm = true;
    this.usageService.checkCalibrationExistForUsage(this.selectedGcat.nusageC)
      .subscribe((data: any) => {
        let checkCalibrationExistForUsage = true;
        if (data.length <= 0) {
         this.deSummarize();

        }else{
          this.alertPopupInfo("Calibration Exists");
        }
      })

  }
  deSummarize(){
    let count=0;
    let countP=0;
    for (const each of this.usageResponseList) {
      if (each.evaCatlgStsC == "S" || each.evaCatlgStsC == "D") {
        count++;
      }
    }
    for (const each of this.usageResponseList) {
      if (each.evaCatlgStsC == "S" || each.evaCatlgStsC == "D") {
        let pCIINewStatusReqDto: PCIINewStatusReqDto = {};
        pCIINewStatusReqDto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
        pCIINewStatusReqDto.eioOriginC = this.usageFilter.eioOriginC;
        pCIINewStatusReqDto.engpSeqR = this.usageFilter.engpSeqR;
        pCIINewStatusReqDto.funcKey = each.funcKey;
        pCIINewStatusReqDto.vehtypeCode = each.origVehtypeC;
        pCIINewStatusReqDto.pteioOriginC = this.usageFilter.pteioOriginC;
        pCIINewStatusReqDto.evlVehicleLineC = each.evlVehicleLineC;
        pCIINewStatusReqDto.pftrcCombinatnC = each.pftrcCombinatnC;
        pCIINewStatusReqDto.mftrcCombinatinC = each.mftrcCombinatinC;
        pCIINewStatusReqDto.regintC = each.regintC;
        pCIINewStatusReqDto.evaPerUsageQ = each.evaPerUsageQ;
        pCIINewStatusReqDto.effiopEffInC = each.effiopEffInC;
        pCIINewStatusReqDto.origVehtypeC = each.origVehtypeC;
        pCIINewStatusReqDto.actionDtY = each.actionDtY;
        pCIINewStatusReqDto.actionByIdC = each.actionByIdC;
        pCIINewStatusReqDto.deleteOneToMany = each.evaCatlgStsC;
        pCIINewStatusReqDto.reasonCodeC = "URW";
        pCIINewStatusReqDto.usageSummarizationInd = "";
        pCIINewStatusReqDto.evaCatlgStsC = "W";
        pCIINewStatusReqDto.flagUtc=this.sFlagUTC ? "Y" : "N";
        this.usageService.desummarize(pCIINewStatusReqDto)
      .subscribe((data: any) => {
        countP++;
        if(count==countP){
          this.desumm();
        }
        this.isActDis = true;
      })
      
      }
    }
   
  }
  SetPCIINewStatus(newStatus: any, newSummInd: any, newReasonCode: any, each: any, deleteOneToMany: any) {
    let pCIINewStatusReqDto: PCIINewStatusReqDto = {};
    pCIINewStatusReqDto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
    pCIINewStatusReqDto.eioOriginC = this.usageFilter.eioOriginC;
    pCIINewStatusReqDto.engpSeqR = this.usageFilter.engpSeqR;
    pCIINewStatusReqDto.funcKey = each.funcKey;
    pCIINewStatusReqDto.vehtypeCode = each.origVehtypeC;
    pCIINewStatusReqDto.pteioOriginC = this.usageFilter.pteioOriginC;
    pCIINewStatusReqDto.evlVehicleLineC = each.evlVehicleLineC;
    pCIINewStatusReqDto.pftrcCombinatnC = each.pftrcCombinatnC;
    pCIINewStatusReqDto.mftrcCombinatinC = each.mftrcCombinatinC;
    pCIINewStatusReqDto.regintC = each.regintC;
    pCIINewStatusReqDto.evaPerUsageQ = each.evaPerUsageQ;
    pCIINewStatusReqDto.effiopEffInC = each.effiopEffInC;
    pCIINewStatusReqDto.origVehtypeC = each.origVehtypeC;
    pCIINewStatusReqDto.actionDtY = each.actionDtY;
    pCIINewStatusReqDto.actionByIdC = each.actionByIdC;
    pCIINewStatusReqDto.deleteOneToMany = deleteOneToMany;
    pCIINewStatusReqDto.reasonCodeC = newReasonCode;
    pCIINewStatusReqDto.usageSummarizationInd = newSummInd;
    pCIINewStatusReqDto.evaCatlgStsC = newStatus;
    pCIINewStatusReqDto.flagUtc=this.sFlagUTC ? "Y" : "N";
    this.usageService.getPCIINewStatus(pCIINewStatusReqDto)
      .subscribe((data: any) => {
        if (!this.isDesumm) {
          this.sendWQMessageURW(each);
        } else {
          // if (data.deleteOneToMany == 'Y' && each.evaCatlgStsC == "S") {
          //   this.sendWQMessageURW(each);
          // }
        }
        this.isActDis = true;
      })
  }

  sendWQMessageURW(each: any) {
    let dto: UsageRequestDto = {
      engpEngnrgPartR: this.usageFilter.engpEngnrgPartR,
      eioOriginC: this.usageFilter.eioOriginC,
      engpSeqR: this.usageFilter.engpSeqR,
      vehtypeCode: this.usageFilter.vehtypeCode,
      pteioOriginC: this.usageFilter.pteioOriginC,
      evlVehicleLineC: each.evlVehicleLineC,
      statusString: "",
      flagUtc: this.sFlagUTC ? "Y" : "N",
      nusageC: this.selectedWQ.nusageC,
      region: each.regintC,
      vehicleLines: [],
    }
    this.usageService.addMessageURW(dto)
      .subscribe((_data: any) => {

      })

  }
  desumm() {
    this.GetSectionIDForUsage();
    let dto: DelGCATUsageDto = {};
    dto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR
    dto.nusageC = this.selectedWQ.nusageC;
    dto.eioOriginC = this.usageFilter.eioOriginC;
    dto.engpSeqR = this.usageFilter.engpSeqR;
    dto.engpCommodityC = this.selectedGcat.engpCommodityC;
    dto.cmdtyTypeC = this.selectedGcat.cmdtyTypeC;
    dto.evlVehicleLineC = this.usageFilter.evlVehicleLineC;
    dto.vehtypeCode = this.usageFilter.vehtypeCode;
    dto.pteioOriginC = this.usageFilter.pteioOriginC;
    dto.evaCatlgStsC = "W";
    dto.userId = this.loginUserId;
    dto.nusageC=this.selectedGcat.nusageC;
    this.deleteUsg(dto);
   
    
  }
  deleteUsg(dto: DelGCATUsageDto) {
    this.usageService.delGCATUsage(dto)
      .subscribe((data: any) => {
        if (data) {
         if(this.isDesumm){
          this.startUsageList(this.usageFilter.evlVehicleLineC, this.selectedGcat.vehtypeCode);
         }
        }
      })
  }
  GetSectionIDForUsage() {
    this.usageService.addGCATSectionTrigger("USAGINFO", "N", this.loginUserId, this.selectedGcat.nusageC)
      .subscribe((data: any) => {

      })
  }
  deleteUsage(dto: DelGCATUsageFeatureReqDto) {
    this.usageService.delGCATUsageFeature(dto)
      .subscribe((data: any) => {
      })
  }

  addUsg() {
    for (const item of this.selectedPC) {
      let appUsg: AppUsageReqDto = {};
      appUsg.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
      appUsg.eioOriginC = this.usageFilter.eioOriginC;
      appUsg.engpSeqR = this.usageFilter.engpSeqR;
      appUsg.funcKey = item.funcKey;
      appUsg.vehtypeCode = this.usageFilter.vehtypeCode;
      appUsg.pteioOriginC = this.usageFilter.pteioOriginC;
      appUsg.evlVehicleLineC = item.evlVehicleLineC;
      appUsg.pftrcCombinatnC = item.pftrcCombinatnC;
      appUsg.mftrcCombinatinC = item.mftrcCombinatinC;
      appUsg.regintC = item.regintC;
      appUsg.evaPerUsageQ = item.evaPerUsageQ;
      appUsg.effiopEffInC = item.effiopEffInC;
      appUsg.origVehtypeC = item.origVehtypeC;
      appUsg.nusageC = this.selectedGcat.nusageC;
      this.usageService.addNewUsageP63(appUsg)
        .subscribe((data1: any) => {
          if (data1 != null && data1 != "") {

            this.usageService.setPCIIStatus(this.selectedGcat.nusageC, "S", "S", this.loginUserId)
              .subscribe((data2: any) => {
                if (data2) {
                  this.deleteWQMessage();
                }
              })
          }
        })
    }


    if (this.sFlagNUS && this.isWbsDis && this.isPicDis) {
      this.isWbsDis = false;
      this.isPicDis = false;
    }
  }

  getLexDesc() {
    this.lexiPopup++;
    console.log(this.lexiPopup);
    localStorage.setItem('Screen', "Usage");
  }
  getLexcClose() {
    this.lexiPopup = 0;
  }
  getLexDetails(selectedLexc: any) {
    let isValid = true;
    console.log("Lexc");
    this.lexiPopup = 0;
    let lexSearchQual = selectedLexc.type?.substring(0, 1);
    let qual22 = this.selectedProperty.qualifier?.substring(0, 1);
    let prop22 = this.selectedProperty.propCodeC;
    let desc22 = this.selectedProperty.lexcDescLongX;
    if ((selectedLexc.type == 'APPL' || selectedLexc.type == 'SPEC' || selectedLexc.type == 'PFC' || selectedLexc.type == 'MFC') && !qual22 && !prop22 && !desc22) {
      for (const item of this.propertiesList) {
        if (item.lexcDescLongX == selectedLexc.proDiscription) {
          if (!this.sFlagUTC && !this.sFlagNUS) {
            this.alertPopupInfo("New property value already exists.");
            isValid = false;
          }
        }
      }
    }
    // if (lexSearchQual != qual22 && qual22) {
    //   this.alertPopupInfo("This property value belongs to a different qualifier.");
    //   isValid = false;
    // } else if (selectedLexc.proCode != prop22 && prop22) {
    //   this.alertPopupInfo("This property value belongs to a different property code.");
    //   isValid = false;
    // }
    if (isValid) {
      let gcatUsgFtrDto: addGCATUsageFeatureDto = {};
      gcatUsgFtrDto.nusageC = this.selectedGcat.nusageC;
      gcatUsgFtrDto.lexcC = selectedLexc.lexiCode;
      gcatUsgFtrDto.lextypTypeC = selectedLexc.type;
      gcatUsgFtrDto.lexcCBefore = this.selectedProperty.lexcC ? this.selectedProperty.lexcC : "";
      gcatUsgFtrDto.cmdtyTypeC = this.selectedGcat.cmdtyTypeC;
      gcatUsgFtrDto.engpCommodityC = this.selectedGcat.engpCommodityC;
      gcatUsgFtrDto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
      gcatUsgFtrDto.engpSeqR = this.usageFilter.engpSeqR;
      gcatUsgFtrDto.eioOriginC = this.usageFilter.eioOriginC;
      gcatUsgFtrDto.approvedFlag = selectedLexc.flag;
      this.addGcatUsgFtr(gcatUsgFtrDto);
    }
  }
  deleteWQMessage() {
    this.usageRequestDto = {
      engpEngnrgPartR: this.selectedWQ.engpEngnrgPartR,
      eioOriginC: this.selectedWQ.eioOriginC,
      engpSeqR: this.selectedWQ.engpSeqR,
      vehtypeCode: this.selectedWQ.vehtypeCode,
      pteioOriginC: this.selectedWQ.pteioOriginC,
      evlVehicleLineC: this.selectedWQ.evlVehicleLineC,
      statusString: "",
      flagUtc: "",
      nusageC: this.selectedWQ.nusageC,
      region: "",
      vehicleLines: [],
    }
    this.usageService.delWQForUsage(this.usageRequestDto)
      .subscribe((data2: any) => {
        if (data2) {
          //this.startUsageList(this.selectedWQ.evlVehicleLineC, this.selectedWQ.vehtypeCode);
          this.getUsageListPCII(this.selectedWQ.evlVehicleLineC, this.selectedWQ.vehtypeCode);
        }
      })
  }

  removeAddedUsage() {
    //this.delUsageFromP63();
  }
  delUsageFromP63(item: UsageResponseDto) {
    let pCIINewStatusReqDto: PCIINewStatusReqDto = {};
    pCIINewStatusReqDto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
    pCIINewStatusReqDto.eioOriginC = this.usageFilter.eioOriginC;
    pCIINewStatusReqDto.engpSeqR = this.usageFilter.engpSeqR;
    pCIINewStatusReqDto.funcKey = item.funcKey;
    pCIINewStatusReqDto.vehtypeCode = this.usageFilter.vehtypeCode;
    pCIINewStatusReqDto.pteioOriginC = this.usageFilter.pteioOriginC;
    pCIINewStatusReqDto.evlVehicleLineC = item.evlVehicleLineC;
    pCIINewStatusReqDto.pftrcCombinatnC = item.pftrcCombinatnC;
    pCIINewStatusReqDto.mftrcCombinatinC = item.mftrcCombinatinC;
    pCIINewStatusReqDto.regintC = item.regintC;
    pCIINewStatusReqDto.evaPerUsageQ = item.evaPerUsageQ;
    pCIINewStatusReqDto.effiopEffInC = item.effiopEffInC;
    pCIINewStatusReqDto.origVehtypeC = item.origVehtypeC;
    pCIINewStatusReqDto.nusageC = this.selectedWQ.nusageC;
    this.usageService.delUsageFromP63(pCIINewStatusReqDto)
      .subscribe();
  }
  removeUsg() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Remove this Usage(s)?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isDeSummDis = false;
        this.removeUsgOk();
      },
      reject: (type: any) => {
      }
    });
    this.rmvUsgDis = true;
  }
  suppress() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to supress this Usage?.',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.btnSupressText == 'Suppress') {
          this.setUsageStatus("X")
          this.selectedGcat.evaCatlgStsC = 'X';

          this.btnSupressText = "UnSuppress";
        } else {
          this.unSupress();
        }
        this.bWrokWithGcat = true;
      },
      reject: (type: any) => {
      }
    });
  }
  unSupress() {
    this.usageRequestDto = {
      engpEngnrgPartR: this.selectedWQ.engpEngnrgPartR,
      eioOriginC: this.selectedWQ.eioOriginC,
      engpSeqR: this.selectedWQ.engpSeqR,
      vehtypeCode: this.selectedWQ.vehtypeCode,
      pteioOriginC: this.selectedWQ.pteioOriginC,
      evlVehicleLineC: this.selectedWQ.evlVehicleLineC,
      statusString: "",
      flagUtc: this.sFlagUTC ? "Y" : "N",
      nusageC: this.selectedGcat.nusageC,
      region: "",
      vehicleLines: [],
    }
    this.usageService.setUsageStatusUnSupress(this.usageRequestDto)
      .subscribe((data: any) => {
        this.btnSupressText = "Suppress";
        this.selectedGcat.evaCatlgStsC = 'P';
        this.getUsageListGCAT(this.usageFilter.evlVehicleLineC, this.usageFilter.vehtypeCode);
      })
  }
  removeUsgOk() {

    for (const item of this.selectedPC) {
      let pCIINewStatusReqDto: PCIINewStatusReqDto = {};
      pCIINewStatusReqDto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
      pCIINewStatusReqDto.eioOriginC = this.usageFilter.eioOriginC;
      pCIINewStatusReqDto.engpSeqR = this.usageFilter.engpSeqR;
      pCIINewStatusReqDto.funcKey = item.funcKey;
      pCIINewStatusReqDto.vehtypeCode = this.usageFilter.vehtypeCode;
      pCIINewStatusReqDto.pteioOriginC = this.usageFilter.pteioOriginC;
      pCIINewStatusReqDto.evlVehicleLineC = item.evlVehicleLineC;
      pCIINewStatusReqDto.pftrcCombinatnC = item.pftrcCombinatnC;
      pCIINewStatusReqDto.mftrcCombinatinC = item.mftrcCombinatinC;
      pCIINewStatusReqDto.regintC = item.regintC;
      pCIINewStatusReqDto.evaPerUsageQ = item.evaPerUsageQ;
      pCIINewStatusReqDto.effiopEffInC = item.effiopEffInC;
      pCIINewStatusReqDto.origVehtypeC = item.origVehtypeC;
      pCIINewStatusReqDto.nusageC = this.selectedGcat.nusageC;
      this.usageService.delUsageFromP63(pCIINewStatusReqDto)
        .subscribe((data2: any) => {
          if (data2.count == 1) {
            this.SetPCIINewStatus("W", "", "URW", item, item.evaCatlgStsC);
            let dto1: DelGCATUsageDto = {};
            dto1.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR
            dto1.nusageC = this.selectedGcat.nusageC;
            dto1.eioOriginC = this.usageFilter.eioOriginC;
            dto1.engpSeqR = this.usageFilter.engpSeqR;
            dto1.engpCommodityC = item.engpCommodityC;
            dto1.cmdtyTypeC = item.cmdtyTypeC;
            dto1.evlVehicleLineC = item.evlVehicleLineC;
            dto1.vehtypeCode = this.usageFilter.vehtypeCode;
            dto1.pteioOriginC = this.usageFilter.pteioOriginC;
            dto1.evaCatlgStsC = "W";
            dto1.userId = this.loginUserId;
            this.usageService.delGCATUsage(dto1)
            .subscribe((data: any) => {
              if (data) {
                this.alertPopupInfo("GCAT Usage Removed");
                this.startUsageList(this.usageFilter.evlVehicleLineC, this.usageFilter.vehtypeCode)
              }
            })
            
           
          } else {
            this.SetPCIINewStatus("W", "", "0", item, item.evaCatlgStsC);
          }
        })


      
    }
  }
  activateClick() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Activate this Usage(s)?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.activateClickOk();
      },
      reject: (type: any) => {
      }
    });
  }
  activateClickOk() {
    for (const item of this.selectedPC) {
      if (item.evaCatlgStsC == 'I') {
        this.SetPCIINewStatus("W", "", "URW", item, "");
        item.reasonCodeC = "URW";
        item.evaCatlgStsC = "W";
        // this.sendWQMessageURW(item);
      }
      if (item.evaCatlgStsC == 'D') {
        this.checkDeadUsages(item);
        item.evaCatlgStsC = "N";
      }
    }
  }
  checkDeadUsages(item: UsageResponseDto) {

    let pCIINewStatusReqDto: PCIINewStatusReqDto = {};
    pCIINewStatusReqDto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
    pCIINewStatusReqDto.eioOriginC = this.usageFilter.eioOriginC;
    pCIINewStatusReqDto.engpSeqR = this.usageFilter.engpSeqR;
    pCIINewStatusReqDto.funcKey = item.funcKey;
    pCIINewStatusReqDto.vehtypeCode = this.usageFilter.vehtypeCode;
    pCIINewStatusReqDto.pteioOriginC = this.usageFilter.pteioOriginC;
    pCIINewStatusReqDto.evlVehicleLineC = item.evlVehicleLineC;
    this.usageService.getCountEngVlApp(pCIINewStatusReqDto)
      .subscribe((data2: any) => {
        if (data2 > 0) {
          this.getReasonCode(item);
        } else {
          this.updateD22DeadUsages("NSR", item);
        }
      })
  }

  getReasonCode(item: UsageResponseDto) {
    let pCIINewStatusReqDto: PCIINewStatusReqDto = {};
    pCIINewStatusReqDto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
    pCIINewStatusReqDto.eioOriginC = this.usageFilter.eioOriginC;
    pCIINewStatusReqDto.engpSeqR = this.usageFilter.engpSeqR;
    pCIINewStatusReqDto.funcKey = item.funcKey;
    pCIINewStatusReqDto.vehtypeCode = this.usageFilter.vehtypeCode;
    pCIINewStatusReqDto.pteioOriginC = this.usageFilter.pteioOriginC;
    pCIINewStatusReqDto.evlVehicleLineC = item.evlVehicleLineC;
    pCIINewStatusReqDto.reasonCodeC = item.reasonCodeC;
    this.usageService.getReasonCode(pCIINewStatusReqDto)
      .subscribe((data2: any) => {
        if(data2){
          this.updateD22DeadUsages(item.reasonCodeC, item);
        }else{
          this.updateD22DeadUsages("NUS", item);
        }
      })


  }
  updateD22DeadUsages(reasonCode: any, item: UsageResponseDto) {

    let pCIINewStatusReqDto: PCIINewStatusReqDto = {};
    pCIINewStatusReqDto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
    pCIINewStatusReqDto.eioOriginC = this.usageFilter.eioOriginC;
    pCIINewStatusReqDto.engpSeqR = this.usageFilter.engpSeqR;
    pCIINewStatusReqDto.funcKey = item.funcKey;
    pCIINewStatusReqDto.vehtypeCode = this.usageFilter.vehtypeCode;
    pCIINewStatusReqDto.pteioOriginC = this.usageFilter.pteioOriginC;
    pCIINewStatusReqDto.evlVehicleLineC = item.evlVehicleLineC;
    pCIINewStatusReqDto.reasonCodeC = reasonCode;
    this.usageService.updateD22DeadUsages(pCIINewStatusReqDto)
      .subscribe((data: any) => {
        if (data) {
          this.deleteWQMessage();
        }
      })
  }
  inactivateClick() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Inactivate this Usage(s)?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.inactivateClickOk();
      },
      reject: (_type: any) => {
      }
    });
  }

  inactivateClickOk() {
    for (const item of this.selectedPC) {
      this.SetPCIINewStatus("I", "", "", item, "");
      this.delUsageFromP63(item);
      let dto: DelGCATUsageDto = {};
      dto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR
      dto.nusageC = this.selectedWQ.nusageC;
      dto.eioOriginC = this.usageFilter.eioOriginC;
      dto.engpSeqR = this.usageFilter.engpSeqR;
      dto.engpCommodityC = item.engpCommodityC;
      dto.cmdtyTypeC = item.cmdtyTypeC;
      dto.evlVehicleLineC = item.evlVehicleLineC;
      dto.vehtypeCode = this.usageFilter.vehtypeCode;
      dto.pteioOriginC = this.usageFilter.pteioOriginC;
      dto.evaCatlgStsC = "I";
      dto.userId = this.loginUserId;
      this.deleteUsg(dto);
    }
    this.deleteWQMessage();
    this.startUsageList(this.selectedWQ.evlVehicleLineC, this.usageFilter.vehtypeCode)

  }
  cancelMainClick() {
    this.saveChecking = "";
    this.saveCheck();
    this.router.navigate(['/part-work']);
  }
  deletWqMsg() {
    this.usageRequestDto = {
      engpEngnrgPartR: this.selectedWQ.engpEngnrgPartR,
      eioOriginC: this.selectedWQ.eioOriginC,
      engpSeqR: this.selectedWQ.engpSeqR,
      vehtypeCode: this.selectedWQ.vehtypeCode,
      pteioOriginC: this.selectedWQ.pteioOriginC,
      evlVehicleLineC: this.selectedWQ.evlVehicleLineC,
      statusString: "",
      flagUtc: "",
      nusageC: this.selectedWQ.nusageC,
      region: "",
      vehicleLines: [],
    }
    this.usageService.delWQForDeadUsage(this.usageRequestDto)
      .subscribe((data2: any) => {
        if (data2) {
          this.alertPopupInfo("deleted successfully");
        } else {
          this.alertPopupInfo("You can not delete this record");
        }
      })
  }
  getCmdtyPropsGCAT() {


  }

  saveTimingClick() {
this.confirmationService.confirm({
          message: 'Are you sure you want to save',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            let isValid = true;

    if (this.sButtonPressed == "AddUsageTiming" && !this.sFlagUTC) {

    }
    if (!this.selectedGcat.evaPerUsageQ || this.selectedGcat.evaPerUsageQ == "") {
      this.alertPopupInfo("Enter Qty Per Usage");
      this.display("2");
      isValid = false;
    } else
      if (this.selectedGcat.evaPerUsageQ == "0") {
        this.alertPopupInfo("Enter Qty Per Usage value greater than zero");
        this.display("2");
        isValid = false;
      } else if (!this.checkPartnerFlag) {
        if (isNaN(Number(this.selectedGcat.evaPerUsageQ))) {
          if (this.selectedGcat.evaPerUsageQ != "X") {
            this.alertPopupInfo("Quantity Not Numeric and Not X.");
            this.display("2");
            isValid = false;
          }

        }
      }


    if (isValid) {
      let bE = false;
      let bN = false;
      let bA = false;
      let bS = false;
      for (const item of this.catalogTiming) {
        if (!this.bError) {
          this.checkingTiming(item);
          if (!item.effiopEffInC && !item.epntsrEffInY && !item.efiosrcSourcInC && !item.effiopEffOutC &&
            !item.efiosrcSouroutC && !item.epntsrEffOutY) {
            if (item.regintC == 'E') {
              bE = false;
            }
            if (item.regintC == 'N') {
              bN = false;
            }
            if (item.regintC == 'A') {
              bA = false;
            }
            if (item.regintC == 'S') {
              bS = false;
            }
          } else if (!this.bError) {
            if (item.regintC == 'E') {
              bE = true;
            }
            if (item.regintC == 'N') {
              bN = true;
            }
            if (item.regintC == 'A') {
              bA = true;
            }
            if (item.regintC == 'S') {
              bS = true;
            }
          }
        }
      }
      if (!this.bError) {
        if ((!bE || !bN) && (this.bEPCII && this.bNPCII)) {
          this.alertPopupInfo("Both European and N.American Timings should exist");
          isValid = false;
        } else if (bE && !this.bEPCII) {
          this.alertPopupInfo("European Timing should not exist");
          isValid = false;
        } else if (this.bEPCII && !bE) {
          this.alertPopupInfo("European Timing should exist");
          isValid = false;
        } else if (!this.bNPCII && bN) {
          this.alertPopupInfo("N.American Timing should not exist");
          isValid = false;
        } else if (this.bNPCII && !bN) {
          this.alertPopupInfo("N.American Timing should exist");
          isValid = false;
        } else if (!this.bSPCII && bS) {
          this.alertPopupInfo("S.American Timing should not exist");
          isValid = false;
        } else if (this.bSPCII && !bS) {
          this.alertPopupInfo("S.American Timing should exist");
          isValid = false;
        } else if (!this.bAPCII && bA) {
          this.alertPopupInfo("A.Pacific Timing should not exist");
          isValid = false;
        } else if (this.bAPCII && !bA) {
          this.alertPopupInfo("A.Pacific Timing should exist");
          isValid = false;
        }
      }
    }


    if (isValid && !this.bError) {
      for (const timing of this.catalogTiming) {
        let dto: NewUsageTimingDto = {};
        dto.regionCodeC = timing.regintC;
        dto.nusageC = this.selectedGcat.nusageC;
        dto.effiopEffInC = timing.effiopEffInC;
        dto.epntsrEffInY = timing.epntsrEffInY + '';
        dto.efiosrcSourcInC = timing.efiosrcSourcInC;
        dto.effiopEffOutC = timing.effiopEffOutC;
        dto.epntsrEffOutY = timing.epntsrEffOutY + '';
        dto.efiosrcSourcoutC = timing.efiosrcSouroutC;
        dto.userId = this.loginUserId;
        if (timing.epntsrEffInY && timing.epntsrEffOutY) {
          this.InsertGCATTiming(dto);
        }
        // delGCATTiming
      }

      if (!this.sFlagUTC && (this.sButtonPressed == "CreateGCATUSG" || this.sButtonPressed == "Summarize")) {
        if (this.sFlagNUS) {
          this.sFlagNUS = false;
        }
        this.selectedGcat.nusageC = this.gcatUsageNo;
        this.setUsageStatus("H");
        this.setPCIIStatus(this.sButtonPressed);
      }

      if (this.sFlagUTC) {
        this.setTimingChangeFlag(() => {

        });
      } else {
        this.deleteWQMessage();
      }
      if (!(!this.sFlagUTC && (this.sButtonPressed == "CreateGCATUSG" || this.sButtonPressed == "Summarize"))) {
        this.usageService.setUsageUpdateID(this.gcatUsageNo, this.loginUserId)
          .subscribe((data2: any) => {
          })
      }
      if (this.bQtyChange) {
        this.usageService.setQtyPerUsage(this.selectedGcat.nusageC, this.loginUserId, this.selectedGcat.evaPerUsageQ)
          .subscribe((data2: any) => {
          })
      }
      this.bPropertyChange = false;
      this.sButtonPressed = "Save";
      if (isValid && !this.bError && this.sFlagNUS) {
        this.addNewUsgNus();
        this.delNusWqMessage();
        this.utilitiesService.fromNewUsg.next(false);
      }
    }
    this.bWrokWithGcat = false;
         
          },
          reject: (_type: any) => {
            
          }
        });

    
  }
  addNewUsgNus() {
    let dto: NewUsageforNUSReqDto = {
      engpEngnrgPartR: this.usageFilter.engpEngnrgPartR,
      eioOriginC: this.usageFilter.eioOriginC,
      engpSeqR: this.usageFilter.engpSeqR,
      vehtypeCode: this.usageFilter.vehtypeCode,
      pteioOriginC: this.usageFilter.pteioOriginC,
      evlVehicleLineC: this.usageFilter.evlVehicleLineC,
      evaCtlg: "S",
      usageSummarizationInd: "S",
      nusageC: this.selectedWQ.nusageC,
      userId: this.loginUserId
    }
    this.usageService.addNewUsageforNUS(dto)
      .subscribe((data3: any) => {
      })
  }
  delNusWqMessage() {
    this.usageRequestDto = {
      engpEngnrgPartR: this.usageFilter.engpEngnrgPartR,
      eioOriginC: this.usageFilter.eioOriginC,
      engpSeqR: this.usageFilter.engpSeqR,
      vehtypeCode: this.usageFilter.vehtypeCode,
      pteioOriginC: this.usageFilter.pteioOriginC,
      evlVehicleLineC: this.usageFilter.evlVehicleLineC,
      statusString: "",
      flagUtc: "",
      nusageC: this.selectedWQ.nusageC,
      region: "",
      vehicleLines: [],
    }
    this.usageService.deleteNusWq(this.usageRequestDto)
      .subscribe();
  }
  addGcatUsgFtr(dto: addGCATUsageFeatureDto) {
    // alert("entered")
    // console.log(dto)

    this.usageService.addGCATUsageFeature(dto)
      .subscribe((_data3: any) => {
        this.bPropertyChange = true;
        if (!this.sFlagNUS && !this.utilitiesService.fromNewUsg.value) {
          this.getCmdtyProps("Y", "N", "A", "S", "P", "M");
        }

      })
    // alert("entered")

  }
  setUsageStatus(status: string) {
    let dto: SetUsageStatusDto = {
      engpEngnrgPartR: this.usageFilter.engpEngnrgPartR,
      eioOriginC: this.usageFilter.eioOriginC,
      engpSeqR: this.usageFilter.engpSeqR,
      vehtypeCode: this.selectedGcat.vehtypeCode,
      pteioOriginC: this.selectedGcat.vehtypeCode,
      evlVehicleLineC: this.selectedGcat.evlVehiclLineC,
      engpDelimitedR: this.usageFilter.engpEngnrgPartR,
      engpBaseR: this.engBase,
      sbaseprtNbr: this.sbaseprtNbr,
      sprfxprtPrefixR: this.sprfxprtPrefixR,
      sufxprtSuffixNbr: this.sufxprtSuffixNbr,
      engpCommodityC: this.selectedGcat.engpCommodityC,
      cmdtyTypeC: this.selectedGcat.cmdtyTypeC,
      evaCatlgStsC: status,
      createByIdC: this.loginUserId,
      nusageC: this.selectedGcat.nusageC
    }
    this.usageService.setUsageStatus(dto)
      .subscribe((data3: any) => {

      })
  }
  setPCIIStatus(sButtonPressed: any) {
    let SumIndex = "";
    if (sButtonPressed == "CreateGCATUSG") {
      if (this.selectedPC[0].evaCatlgStsC == "S") {
        SumIndex = "M";
      } else {
        SumIndex = "O";
      }
    } else if (sButtonPressed == "Summarize") {
      SumIndex = "S";
    } else if (sButtonPressed == "Special1") {
      SumIndex = "O";
    } else if (sButtonPressed == "Special2") {
      SumIndex = "M";
    }
    this.usageService.setPCIIStatus(this.selectedGcat.nusageC, "S", SumIndex, this.loginUserId)
      .subscribe((data2: any) => {
        if (data2) {
        }
      })
  }
  getPCIITimingForGCAT() {
    this.utilitiesService.setLoading(true);
    this.timingList = [];
    let utcFlg = this.sFlagUTC ? "Y" : "N";
    this.selectedGcat.nusageC = this.selectedGcat.nusageC ? this.selectedGcat.nusageC : this.gcatUsageNo;
    this.usageService.getPCIITimingForGCAT(this.selectedGcat.nusageC, utcFlg)
      .subscribe((data2: any) => {
        this.timingList = data2;
        for (const item of this.timingList) {
          if (item.regintC == 'E') {
            this.bEPCII = true;
          }
          if (item.regintC == 'N') {
            this.bNPCII = true;
          }
          if (item.regintC == 'A') {
            this.bAPCII = true;
          }
          if (item.regintC == 'S') {
            this.bSPCII = true;
          }
          this.utilitiesService.setLoading(false);
        }
      })
  }
  effiopEffOutCChange(timing: PCIITimingResponseDto1, ri: any) {
    let isValid = true;
    this.bError = false;
    if (!this.checkSpecialTimingFlag) {
      if (timing.effiopEffInC && timing.effiopEffInC?.length > 8) {
        isValid = false;
        this.alertPopupInfo("Length can not be more than 8 characters.");

      }
    } else {
      if (timing.effiopEffInC && timing.effiopEffInC?.length > 16) {
        isValid = false;
        this.alertPopupInfo("Length can not be more than 16 characters.");
      }
    }
    if (isValid) {
      this.getS4pDt(timing, ri, "effOutC");
    }
  }
  effiopEffInChange(timing: PCIITimingResponseDto1, ri: any) {
    let isValid = true;
    this.bError = false;
    if (!this.checkSpecialTimingFlag) {
      if (timing.effiopEffInC && timing.effiopEffInC?.length > 8) {
        isValid = false;
        this.alertPopupInfo("Length can not be more than 8 characters.");

      }
    } else {
      if (timing.effiopEffInC && timing.effiopEffInC?.length > 16) {
        isValid = false;
        this.alertPopupInfo("Length can not be more than 16 characters.");
      }
    }
    if (isValid) {
      this.getS4pDt(timing, ri, "effInC");

    }
  }
  getS4pDt(timing: PCIITimingResponseDto1, ri: any, code: string) {
    let dto: S4pDateReqDto = {
      effPtC: timing.effiopEffInC,
      vehCode: this.selectedGcat.vehtypeCode,
      pteioOrig: this.selectedGcat.pteioOriginC,
      vl: this.selectedGcat.evlVehiclLineC,
      regint: timing.regintC,
      engPart: this.usageFilter.engpEngnrgPartR,
      effInC: timing.effiopEffInC,
    }
    if (code == "effInC") {
      dto.effPtC = timing.effiopEffInC;
    } else if (code == "effOutC") {
      dto.effPtC = timing.effiopEffOutC;
    }
    this.usageService.getS4pDt(dto)
      .subscribe((data2: any) => {
        if (data2.length > 0) {
          if (code == "effInC") {
            this.catalogTiming[ri].epntsrEffInY = data2[0];
            this.catalogTiming[ri].efiosrcSourcInC = "0";
          } else if (code == "effOutC") {
            this.catalogTiming[ri].epntsrEffOutY = data2[0];
            this.catalogTiming[ri].efiosrcSouroutC = "0";
          }

        } else {
          if (code == "effInC") {
            this.catalogTiming[ri].epntsrEffInY = undefined;
          } else if (code == "effOutC") {
            this.catalogTiming[ri].epntsrEffOutY = undefined;
          }
          this.alertPopupInfo("Invalid S4P Code.");
        }
      })
  }
  epntsrEffInYChange(ri: any) {
    this.bError = false;
    this.catalogTiming[ri].efiosrcSourcInC = "G";
    this.catalogTiming[ri].effiopEffInC = "";
  }
  epntsrEffOutYChange(ri: any) {
    this.bError = false;
    this.catalogTiming[ri].efiosrcSouroutC = "G";
    this.catalogTiming[ri].effiopEffOutC = "";
  }

  checkingTiming(timing: PCIITimingResponseDto1) {
    let sErrMessage = "";
    this.bError = false;
    if (timing.regintC == "E") {
      sErrMessage = "Europe ";
    } else if (timing.regintC == "N") {
      sErrMessage = "N.American ";
    } else if (timing.regintC == "A") {
      sErrMessage = "A.Pacific ";
    } else {
      sErrMessage = "S.American ";
    }
    if (!timing.effiopEffInC && !timing.epntsrEffInY && !timing.efiosrcSourcInC && !timing.effiopEffOutC &&
      !timing.efiosrcSouroutC && !timing.epntsrEffOutY) {
      this.bError = false;
    } else if (!this.checkSpecialTimingFlag) {
      if (!timing.epntsrEffInY || timing.epntsrEffInY == null) {
        sErrMessage += " Enter In Date";
        this.bError = true;
      } else if (timing.epntsrEffInY && timing.epntsrEffOutY && Date.parse(timing.epntsrEffInY + '') == Date.parse(timing.epntsrEffOutY + '')) {
        if (timing.effiopEffInC != "" && timing.effiopEffInC == timing.effiopEffOutC && timing.effiopEffInC?.substring(0, 1) != "X" &&
          timing.effiopEffInC?.substring(0, 1) != "D") {
          sErrMessage += "In timing = Out timing";
          this.bError = true;
        }
      }
      if ((!timing.effiopEffInC) && !this.bError) {
        if (timing.epntsrEffInY && timing.epntsrEffOutY && Date.parse(timing.epntsrEffInY + '') == Date.parse(timing.epntsrEffOutY + '')) {
          sErrMessage += "In Point is Empty and In Date=Out Date";
          this.bError = true;
        }
      }
      if ((!timing.effiopEffOutC) && !this.bError) {
        if (timing.epntsrEffInY && timing.epntsrEffOutY && Date.parse(timing.epntsrEffInY + '') == Date.parse(timing.epntsrEffOutY + '')) {
          sErrMessage += "Out Point is Empty and In Date=Out Date";
          this.bError = true;
        }
      }
      if (timing.effiopEffOutC && !this.bError) {
        if (!timing.epntsrEffOutY) {
          sErrMessage += "Enter Out Date or Remove Out Point;"
          this.bError = true;
        }
      }
      if (timing.epntsrEffInY && timing.epntsrEffOutY && Date.parse(timing.epntsrEffInY + '') > Date.parse(timing.epntsrEffOutY + '') && !this.bError) {
        sErrMessage += "In Date > Out Date;";
        this.bError = true;
      }
    } else {
      if (timing.effiopEffOutC == "" && timing.effiopEffInC == "") {
        sErrMessage += "Enter In Code;";
      }
    }
    if (this.bError) {
      this.alertPopupInfo(sErrMessage);
    }
  }

  saveCheck() {
    if (this.sButtonPressed == 'AddUsageTiming' && !this.sFlagUTC) {

      if (this.selectedTab != '3') {
        this.saveChecking = "Done";

      }
    } else
      if ((this.sButtonPressed == 'CreateGCATUSG' || this.sButtonPressed == 'Summarize') && !this.sFlagUTC) {
        this.confirmationService.confirm({
          message: 'If you wish to save GCAT Usage, press YES and press SAVE on Timing tab.',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.selectedTab = '3';
            this.saveChecking = 'continue';
          },
          reject: (_type: any) => {
            this.saveChecking = "Done";
            let dto: DelGCATUsageDto = {};
            dto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR
            dto.nusageC = this.gcatUsageNo;
            dto.eioOriginC = this.usageFilter.eioOriginC;
            dto.engpSeqR = this.usageFilter.engpSeqR;
            dto.engpCommodityC = this.selectedPC[0].engpCommodityC;
            dto.cmdtyTypeC = this.selectedPC[0].cmdtyTypeC;
            dto.evlVehicleLineC = this.selectedPC[0].evlVehicleLineC;
            dto.vehtypeCode = this.usageFilter.vehtypeCode;
            dto.pteioOriginC = this.usageFilter.pteioOriginC;
            dto.evaCatlgStsC = "";
            dto.userId = this.loginUserId;
            this.deleteUsg(dto);
            this.startUsageList(this.usageFilter.evlVehicleLineC, this.usageFilter.vehtypeCode);
            this.router.navigate(['/part-work']);
          }
        });
      } else if (this.timingCh || this.bQtyChange || this.bPropertyChange) {
        this.confirmationService.confirm({
          message: 'If you wish to save changes to GCAT Usage, press YES and press SAVE on Timing tab.',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            if (this.selectedTab !== '3') {
              this.selectedTab = '3';
              this.display('3');
            }
          },
          reject: (_type: any) => {
            if (this.bPropertyChange) {
              this.restoreProperties();
              this.bPropertyChange = false;
              this.utilitiesService.fromNewUsg.next(false);
            }
            this.router.navigate(['/part-work']);
          }
        });
      } else {
        this.router.navigate(['/part-work']);
      }
  }
  restoreProperties() {
    let dto1: DelGCATUsageFeatureReqDto = {};
    dto1.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR
    dto1.lexcC = "";
    dto1.lextypTypeC = "ALL";
    dto1.nusageC = this.selectedGcat.nusageC;
    dto1.eioOriginC = this.usageFilter.eioOriginC;
    dto1.engpSeqR = this.usageFilter.engpSeqR;
    dto1.engpCommodityC = this.selectedGcat.engpCommodityC;
    dto1.cmdtyTypeC = this.selectedGcat.cmdtyTypeC;
    this.usageService.delGCATUsageFeature(dto1)
      .subscribe((_data: any) => {
        console.log(this.propertiesListDup)
        for (const item of this.propertiesListDup) {
          let gcatUsgFtrDto: addGCATUsageFeatureDto = {};
          gcatUsgFtrDto.nusageC = this.selectedGcat.nusageC;
          gcatUsgFtrDto.lexcC = item.lexcC;
          gcatUsgFtrDto.lextypTypeC = item.lextypTypeC;
          gcatUsgFtrDto.lexcCBefore = "";
          gcatUsgFtrDto.cmdtyTypeC = this.selectedGcat.cmdtyTypeC;
          gcatUsgFtrDto.engpCommodityC = this.selectedGcat.engpCommodityC;
          gcatUsgFtrDto.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR;
          gcatUsgFtrDto.engpSeqR = this.usageFilter.engpSeqR;
          gcatUsgFtrDto.eioOriginC = this.usageFilter.eioOriginC;
          gcatUsgFtrDto.approvedFlag = item.approvedFlag;
          this.usageService.addGCATUsageFeature(gcatUsgFtrDto)
            .subscribe((_data3: any) => {
              this.bPropertyChange = false;
            })
        }
      })
  }
  br: string = "5px";
  br1: string = "5px";
  br2: string = "5px";
  br3: string = "5px";
  countAcc: any = 0;
  displayAcc: any = "none";
  rotate: any;
  showCenterPart() {
    if (this.countAcc == 0) {
      this.displayAcc = "block"
      this.countAcc = 1;
      this.rotate = "rotate(45deg);"
    } else {
      this.displayAcc = "none"
      this.countAcc = 0;
      this.rotate = "rotate(0deg);"
    }
  }
  displayPartInfo: any = "none";
  rotatePartInfo: any;
  countPartInfo = 0;
  showCenterPartPartInfo() {
    if (this.countPartInfo == 0) {
      this.br="5px 5px 0px 0px"
      this.displayPartInfo = "block"
      this.countPartInfo = 1;
      this.rotatePartInfo = "rotate(45deg);"
    } else {
      this.br="5px"
      this.displayPartInfo = "none"
      this.countPartInfo = 0;
      this.rotatePartInfo = "rotate(0deg);"
    }
  }
  displayAccUsgList: any = "none";
  rotateUsgList: any;
  count = 0;
  showCenterPartUsgList() {
    if (this.count == 0) {
      this.br1="5px 5px 0px 0px"
      this.displayAccUsgList = "block"
      this.count = 1;
      this.rotateUsgList = "rotate(45deg);"
    } else {
      this.br1="5px"
      this.displayAccUsgList = "none"
      this.count = 0;
      this.rotateUsgList = "rotate(0deg);"
    }
  }
  displayAccTiming: any = "none";
  rotateTiming: any;
  countTiming = 0;
  showCenterTiming() {
    if (this.countTiming == 0) {
      this.displayAccTiming = "block"
      this.countTiming = 1;
      this.rotateTiming = "rotate(45deg);"
    } else {
      this.displayAccTiming = "none"
      this.countTiming = 0;
      this.rotateTiming = "rotate(0deg);"
    }
  }
  wbsClick(){
    this.router.navigate(['/wbs']);
  }
  picClick(){
    localStorage.setItem('Screen','Usage');
    this.router.navigate(['/context']);
  }
  usageClick(){
    
  }
  inContextClick(){
    localStorage.setItem('Screen','Usage');
    this.router.navigate(['/context']);
  }
  usageInfoClick(){
    this.display('1');
    
  }
  closeClick(){
    this.router.navigate(['']);
  }

  // <th scope="col">Qualifier</th>
  // <th scope="col">Property</th>
  // <th scope="col">Property Description</th>
  // <th scope="col">Status</th>
  // <th scope="col">Value</th>
  // <th scope="col">Approved</th>
  // <th scope="col">Catalog Description</th>

  onPropRowClick(usage:CmdtyPropsGCATResDto){
    this.selectedProperty=usage;
  }
 deleteArray: any[] = [];
 pushBoolean:boolean=false;
 
selectedValuesForDelete(a:any){
  
  if(this.deleteArray.length == 0){
    // alert("started" + this.deleteArray.length)
    for (let i = 0; i < 1; i++) {
      this.deleteArray.push(a);
    }

   
  }else{
    // alert("started " + this.deleteArray.length)
    for(let j=0;j<this.deleteArray.length;j++){
      if(this.deleteArray[j].lexcC == a.lexcC && this.deleteArray[j].propDescX ==a.propDescX && 
        this.deleteArray[j].cmdtpropReqdF == a.cmdtpropReqdF && this.deleteArray[j].propCodeC == a.propCodeC &&
        this.deleteArray[j].approvedFlag == a.approvedFlag && this.deleteArray[j].qualifier == a.qualifier &&
        this.deleteArray[j].lexcDescLongX == a.lexcDescLongX && this.deleteArray[j].lextypTypeC == a.lextypTypeC && 
        this.deleteArray[j].propCodeValueC == a.propCodeValueC){
        this.deleteArray.splice(j,1);
        this.pushBoolean=false 
      }else{
        this.pushBoolean=true
      }
    }
    if(this.pushBoolean){
      for (let i = 0; i < 1; i++) {
        this.deleteArray.push(a);
      }
    }
    
  }

  console.log(this.deleteArray)

  // alert("ended")
}
specBoolean:boolean=false

deleteFunctionProperties(){
  if(this.deleteArray.length==0){
    alert("please select")
  }else{
    if(this.deleteArray.length==1){
      // alert("one value")
      if (this.deleteArray[0].qualifier == "S") {
        this.confirmationService.confirm({
          message: 'Are you sure you want to delete this property?(Deleting SPEC property will remove it from this engineering part and its cataloged usages.)?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
    
            this.deleteValueOk();
          },
          reject: (_type: any) => {
          }
        });
      } else {
        this.confirmationService.confirm({
          message: 'Are you sure you want to delete this property?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.deleteValueOk();
          },
          reject: (_type: any) => {
          }
        });
      }
    }else{
      for(let i=0;i<this.deleteArray.length;i++){
        
        if(this.deleteArray[i].qualifier == "S"){
          this.specBoolean=true;
          break;
        }else{
          this.specBoolean=false
        }
      }
      // alert("more than one value")
      if (this.specBoolean) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this property?(Deleting SPEC property will remove it from this engineering part and its cataloged usages.)?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
  
          for(let i=0;i<this.deleteArray.length;i++){
           
            this.deletePropValues(this.deleteArray[i]);
          }
        },
        reject: (_type: any) => {
        }
      });
    }else{
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this property?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          for(let i=0;i<this.deleteArray.length;i++){
            
            this.deletePropValues(this.deleteArray[i]);
          }
        },
        reject: (_type: any) => {
        }
      });

    }
      
     
    }
  }

}
deletePropValues(a:CmdtyPropsGCATResDto){
//   console.log("dletevalu entered")
//  console.log(a);
//   console.log("dletevalu ended")

  let dto1: DelGCATUsageFeatureReqDto = {};
  dto1.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR
  dto1.nusageC = this.selectedGcat.nusageC;
  dto1.eioOriginC = this.usageFilter.eioOriginC;
  dto1.engpSeqR = this.usageFilter.engpSeqR;
  dto1.engpCommodityC = this.selectedGcat.engpCommodityC;
  dto1.cmdtyTypeC = this.selectedGcat.cmdtyTypeC;

  dto1.lexcC = a.lexcC;
  dto1.lextypTypeC = a.lextypTypeC;
  this.deleteUsage(dto1);
  let dto: AddGcatPreTriggerReqDto = {};
  if (a.lextypTypeC == "SPEC") {
    dto = {
      engpEngnrgPartR: this.usageFilter.engpEngnrgPartR,
      eioOriginC: this.usageFilter.eioOriginC,
      engpSeqR: this.usageFilter.engpSeqR,
      nusageC: this.selectedWQ.nusageC,
      vbForm: "USAGINFO",
      prefix: "",
      sectSectionId: "",
      userId: this.loginUserId
    }

  } else {
    dto = {
      engpEngnrgPartR: "",
      eioOriginC: "",
      engpSeqR: 0,
      nusageC: 0,
      vbForm: "USAGINFO",
      prefix: "",
      sectSectionId: "",
      userId: this.loginUserId
    }
  }

  this.usageService.addGcatPreTrigger(dto)
    .subscribe((data: any) => {
      if (data) {
        this.propertiesList = this.propertiesList.filter(val => val.lexcC !== a.lexcC);
        this.selectedProperty = {};
        this.bPropertyChange = true;
        this.deleteArray=[];
      }
    })
  this.bPropertyChange = true;


  

}
deleteValueOk() {
    
  let dto1: DelGCATUsageFeatureReqDto = {};
  dto1.engpEngnrgPartR = this.usageFilter.engpEngnrgPartR
  dto1.nusageC = this.selectedGcat.nusageC;
  dto1.eioOriginC = this.usageFilter.eioOriginC;
  dto1.engpSeqR = this.usageFilter.engpSeqR;
  dto1.engpCommodityC = this.selectedGcat.engpCommodityC;
  dto1.cmdtyTypeC = this.selectedGcat.cmdtyTypeC;
  dto1.lexcC = this.selectedProperty.lexcC;
  dto1.lextypTypeC = this.selectedProperty.lextypTypeC;
  this.deleteUsage(dto1);
  let dto: AddGcatPreTriggerReqDto = {};
  if (this.selectedProperty.lextypTypeC == "SPEC") {
    dto = {
      engpEngnrgPartR: this.usageFilter.engpEngnrgPartR,
      eioOriginC: this.usageFilter.eioOriginC,
      engpSeqR: this.usageFilter.engpSeqR,
      nusageC: this.selectedWQ.nusageC,
      vbForm: "USAGINFO",
      prefix: "",
      sectSectionId: "",
      userId: this.loginUserId
    }

  } else {
    dto = {
      engpEngnrgPartR: "",
      eioOriginC: "",
      engpSeqR: 0,
      nusageC: 0,
      vbForm: "USAGINFO",
      prefix: "",
      sectSectionId: "",
      userId: this.loginUserId
    }
  }

  this.usageService.addGcatPreTrigger(dto)
    .subscribe((data: any) => {
      if (data) {
        this.propertiesList = this.propertiesList.filter(val => val.lexcC !== this.selectedProperty.lexcC);
        this.selectedProperty = {};
        this.bPropertyChange = true;
      }
    })
  this.bPropertyChange = true;
}

 


}


