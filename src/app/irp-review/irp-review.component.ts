import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { AddGcatWQReqDto, ArtHouseResDto, BrowseReqFileDto, FilterIrp, GcatIllustratedResDto, GcatIrp2ResDto, GcatIrpDateResDto, GcatIrpFileResDto, GcatSectionResDto, GetGCATReqFileReqDto, IrpDateDto, ReqFileIo4Dto, SetGcatIllusFileReqDto, SetGcatWQReqDto, Tracking } from '../interfaces/irp';
import { UserRole } from '../interfaces/user-roles';
import { IrpReviewService } from '../services/irp-review.service';
import { UserService } from '../services/user.service';
import { UtilitiesService } from '../shared/services/utilities.service';

@Component({
  selector: 'app-irp-review',
  templateUrl: './irp-review.component.html',
  styleUrls: ['./irp-review.component.scss'],
  providers: [ConfirmationService],
  encapsulation: ViewEncapsulation.None
})
export class IrpReviewComponent implements OnInit {

  @ViewChild('#extIll')
  dropdown!: Dropdown;
  vehicleLine: any = [];
  isEditor: boolean = false;
  isnextass: boolean = false;
  text1: any;
  selectedIrp: GcatIrp2ResDto = {};
  gcatSectionRes: GcatSectionResDto[] = [];
  filterIrp: FilterIrp = {};
  userlangcode: string = "EN";
  userlogin: string = "PKAMATC2";
  gcatIllustratedList: GcatIllustratedResDto[] = [];
  gcatIrpFileList: GcatIrpFileResDto[] = [];
  selectedIrpFile: GcatIrpFileResDto = {};
  gcatIrpDateList: GcatIrpDateResDto[] = [];
  IntIllustratorList: any[] = [];
  extIllustratorList: any[] = [];
  tracking: Tracking = {};
  noteChange=false;
  // (<HTMLInputElement>document.getElementById("input"))
  tempGcatIllustratedList: GcatIllustratedResDto[] = [];
  array1:any[]=[{com:"",suf:"",part:"",func:"",blu:"",fina:[],lex:"",last:"",cmddone:"",avl:""}];


  requesterList: any[] = [];
  table: any;
  section: boolean = false;
  i:any;
  functy:any;
  @ViewChild('intIll')
  dropdown1!: Dropdown;
  @ViewChild('reqId')
  dropdown2!: Dropdown;

  roleUSerArray: any[] = [];

  artHouseList: ArtHouseResDto[] = [];
  irpRegion: string = '';
  alert: any = {
    flag: false,
    msg: "",
  }
  oldIllusid: string = "";
  paCancel: boolean = false;
  icRejectToPa: boolean = false;
  PAReject: boolean = false;
  pdf: any = "";
  paSendNewToIc: boolean = false;
  paSendIcUpdateToIc: boolean = false;
  icSendNewToInt: boolean = false;
  icSendNewToExt: boolean = false;
  icSendIntToExt: boolean = false;
  paSendIllusUpdateToIc: boolean = false;
  icSendUpdateToInt: boolean = false;
  icSendUpdateToExt: boolean = false;
  rolesUserHasArray: string[] = [];
  viewOnly: boolean = false;
  paApprove: boolean = false;
  paReject: boolean = false;
  icCancel: boolean = false;
  icAble: boolean = false;
  isEffDtDis: boolean = true;
  isRequester: boolean = true;
  isSendDis: boolean = true;
  isApproveDis: boolean = true;
  isRejectDis: boolean = true;
  isCancelDis: boolean = true;
  isIrpDis: boolean = true;
  isWbsDis: boolean = false;
  isIllSerDis: boolean = false;
  isTifDis: boolean = true;
  isCgmDis: boolean = true;
  isSecSetDis: boolean = false;
  isPrintDis: boolean = false;
  isBrowseDis: boolean = false;
  isPropDis: boolean = false;
  isDownDis: boolean = false;
  isDelDis: boolean = true;
  isNotesDis: boolean = true;
  gAbleToSetDoneFlag: boolean = false;
  isAttachDis: boolean = true;
  extIllDis: boolean = true;
  intIllDis: boolean = true;
  isReqRetDis: boolean = true;

  constructor(public utilitiesService: UtilitiesService,
    public irpReviewService: IrpReviewService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private dom: DomSanitizer) {
    this.vehicleLine = [
      { name: 'option1' },
      { name: 'option2' },
      { name: 'option3' },
    ];
  }

  ngOnInit(): void {
    this.utilitiesService.selectedIrp.subscribe((irp: GcatIrp2ResDto) => {
      if (!!irp) {
        this.selectedIrp = irp;
        let gIrpStatusDesc = "";
        let gUnitTypeDesc = "";
        switch (irp.statusCodeC) {
          case "M":
            gIrpStatusDesc = "Completed/Returned";
            break;
          case "N":
            gIrpStatusDesc = "New";
            break;
          case "R":
            gIrpStatusDesc = "Rejected/Need Rework";
            break;
          case "X":
            gIrpStatusDesc = "Canceled";
            break;
          case "C":
            gIrpStatusDesc = "Closed/Publishable";
            break;
          case "U":
            gIrpStatusDesc = "Updated";
            break;
          default:
            gIrpStatusDesc = "";
            break;
        }
        if (irp.unitTypeC == "I") {
          gUnitTypeDesc = "Initial IRP"
        } else if (irp.unitTypeC == "R") {
          gUnitTypeDesc = "Released IRP"
        }

        this.filterIrp = {
          irpNo: irp.reqIdR,
          illusId: irp.illstrIdR + " - " + irp.illstrRevIdR,
          oldillusid: "",
          myillstrid: "",
          status: irp.statusCodeC + " - " + gIrpStatusDesc,
          unitType: irp.unitTypeC + " - " + gUnitTypeDesc,
          requester: irp.reqCreateIdC,
          currentOwner: irp.reqCurrOwnerC,
          intIllustrator: irp.reqIntIllusIdC,
          extIllustrator: irp.reqExtIllusIdC,
          publicationDate: irp.filePublishY ? new Date(irp.filePublishY) : undefined,
        };
        this.tracking.intIllustrator = irp.reqIntIllusIdC;
        this.tracking.extIllustrator = irp.reqExtIllusIdC;
        this.oldIllusid = this.selectedIrp.illstrIdR ? this.selectedIrp.illstrIdR : "";
        this.tracking.requester = irp.reqCreateIdC;
        

      }
    });

    this.getUserRoles(this.userlogin);
    this.irpReviewLoad();
  }

  onRequester(_event: any) {
    this.isRequester=true;
    this.tracking.dropdownRequester=this.tracking.requester;
  }

  getUserRoles(userId: string) {
    this.irpReviewService.getUserRoles(userId)
      .subscribe((data: any) => {
        if(data.length>0){
          data.forEach((element: UserRole) => {
          let roleCode: string = element.roleCodeC !== undefined ? element.roleCodeC : '';
          this.rolesUserHasArray.push(roleCode)

        });
        // this.irpReviewLoad();
        this.setControls();
      }
      })
  }
  irpReviewLoad() {
    this.getEffectiveDate();
    this.getIllustrator("SGTI_GID");
    this.getIllustrator("SGTI_GIG");
    this.getExtIllustrator();
    this.getRequester();
    this.getSecResult();
    this.getCommResult();
    this.getGcatIrpFile();
    this.getGcatIrpDate();
   

  }
  getRequester() {
    this.irpReviewService.getRequester(this.userlangcode, 81)
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.requesterList = data;
          const selected = this.requesterList.filter(val => val.userIdc == this.selectedIrp.reqCreateIdC);
          this.tracking.dropdownRequester = selected.length > 0 ? selected[0] : {};
        }
      })
  }
  getEffectiveDate() {
    this.irpReviewService.getEffectiveDate(this.selectedIrp.reqIdR)
      .subscribe((data: any) => {
        if (data.effectDateY) {
          this.tracking.effectDt = data.effectDateY ? new Date(data.effectDateY) : undefined;
        }
        if (data.irpRegionC) {
          this.irpRegion = data.irpRegionC;
        }
        this.setControls();
      })
  }
  updateEffectiveDt() {
    this.irpReviewService.updateIrpEffectDate(this.selectedIrp.reqIdR, this.tracking.effectDt)
      .subscribe((data: any) => {
        if (data) {
          this.alertPopup("Update Successfully");
        }


      })

  }
  getIllustrator(roleCodeC: string) {
    this.irpReviewService.getGcatIllustrator(roleCodeC)
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.IntIllustratorList.push(...data);
          const selected = this.IntIllustratorList.filter(val => val.userIdC == this.selectedIrp.reqIntIllusIdC);
          this.tracking.intIllustrator = selected.length > 0 ? selected[0] : {};
          //this.dropdown1.onChange.emit(selected[0]);
        }

      })
  }
  getExtIllustrator() {
    this.irpReviewService.getExtIllustrator()
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.extIllustratorList = data;
          const selected = this.extIllustratorList.filter(val => val.userIdC == this.selectedIrp.reqExtIllusIdC);
          this.tracking.extIllustrator = selected.length > 0 ? selected[0] : {};
          // this.dropdown.onChange.emit(selected[0]);
          // this.dropdown.value = selected[0];
          if (this.tracking.extIllustrator?.userIdC != "") {
            this.getArtHouse(this.tracking.extIllustrator?.userIdC);
          } else if (this.tracking.intIllustrator) {
            this.tracking.artHouse = "Internal Art House"
          } else {
            this.tracking.artHouse = "";
          }

        } else {
          this.extIllustratorList = [];
        }

      })
  }
  getArtHouse(userIdC: any) {
    console.log(userIdC);
    this.irpReviewService.getArtHouse(userIdC)
      .subscribe((data: any) => {
      if(data.length > 0){
        if (data.length > 1) {
          this.artHouseList = data;
          this.tracking.artHouse = this.artHouseList[0].arthouseC + " - " + this.artHouseList[0]?.arthouseN
          console.log(this.tracking.artHouse);
          console.log(this.artHouseList[0]?.arthouseN);
          console.log(this.artHouseList[0].arthouseN);
        }else{
          this.tracking.artHouse="";
        }
}else{
  this.tracking.artHouse="";
}
      })
  }
  getCommResult() {
    if (!this.selectedIrp.sectSectionIdR) {
      this.irpReviewService.getIRPSection(this.selectedIrp.reqIdR)
        .subscribe((data: any) => {
          if (data.length > 0) {
            this.selectedIrp.sectSectionIdR = data.sectSectionIdR;
            this.getGcatIllustrated();
          }

        })
    } else {
      this.getGcatIllustrated();
    }

  }

  getSecResult() {
    this.irpReviewService.getGcatSection(this.selectedIrp.sectSectionIdR)
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.gcatSectionRes = data;
          if (this.gcatSectionRes[0].sectSuffixC) {
            this.filterIrp.section = this.gcatSectionRes[0].templtIdR + " - " + this.gcatSectionRes[0].sectSuffixC;
          } else {
            this.filterIrp.section = this.gcatSectionRes[0].templtIdR;
          }
          if (this.gcatSectionRes[0].sectVehicleLineC) {
            this.filterIrp.prefix = this.gcatSectionRes[0].sectVehicleLineC;
          } else {
            this.filterIrp.prefix = this.gcatSectionRes[0].famprfxPrefixC;;
          }
          this.filterIrp.effIn = this.gcatSectionRes[0].sectS4pEffInY ? new Date(this.gcatSectionRes[0].sectS4pEffInY) : undefined;
          this.filterIrp.effOut = this.gcatSectionRes[0].sectS4pEffOutY ? new Date(this.gcatSectionRes[0].sectS4pEffOutY) : undefined;
        }
      })
  }
  

  // getGcatIllustrated() {
  //   this.irpReviewService.getGcatIllustrated(this.selectedIrp.sectSectionIdR, this.selectedIrp.reqIdR,
  //     this.selectedIrp.illstrIdR, this.userlangcode)
  //     .subscribe((data: any) => {
  //       if (data.length > 0) {
  //         this.tempGcatIllustratedList = data;
  //         this.gcatIllustratedList
  //       } else {
  //         this.tempGcatIllustratedList = [];
  //       }

  //       for(this.i in this.gcatIllustratedList){
  //         this.functy =this.gcatIllustratedList[this.i].funcKey;
  //       let funtKey=this.functy.substring(3, 9);
  //       console.log(funtKey);
  //       this.gcatIllustratedList[this.i].funcKey=funtKey;
  //        }
  //     })
  // }
  
     
  getGcatIllustrated() {
    this.irpReviewService.getGcatIllustrated(this.selectedIrp.sectSectionIdR, this.selectedIrp.reqIdR,
      this.selectedIrp.illstrIdR, this.userlangcode)
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.tempGcatIllustratedList=data;
          data[0].funcKey=data[0].funcKey.substring(4, 10)
          this.gcatIllustratedList.push(data[0]);
          
        } else {
          this.tempGcatIllustratedList=[];
          this.gcatIllustratedList=[];
        }
        this.tempGcatIllustratedList.forEach((item,i)=> {
          if(i>0){
            let functy =item.funcKey?item.funcKey:"";
            let funtKey=functy.substring(4, 10);
            this.tempGcatIllustratedList[i].funcKey=funtKey;
          }
        });
     
        if(this.tempGcatIllustratedList.length>1){
          
          this.tempGcatIllustratedList.forEach((item,i)=> {
            console.log(item.engpCommodityC)
          if(i>0){
            if(this.gcatIllustratedList[this.gcatIllustratedList.length-1].engpCommodityC!=item.engpCommodityC ||
              this.gcatIllustratedList[this.gcatIllustratedList.length-1].cmdtsufSuffixC!=item.cmdtsufSuffixC||
              this.gcatIllustratedList[this.gcatIllustratedList.length-1].engpEngnrgPartR!=item.engpEngnrgPartR){
                this.gcatIllustratedList.push(item);
              }else{
                let nextAss=this.gcatIllustratedList[this.gcatIllustratedList.length-1].finascEngPartR;
                let cpsc=this.gcatIllustratedList[this.gcatIllustratedList.length-1].funcKey;
                let part=this.gcatIllustratedList[this.gcatIllustratedList.length-1].engpEngnrgPartR;
                if(item.finascEngPartR!=""){
                  if(item.finascEngPartR!=nextAss){
                    if(nextAss!=""){
                      this.gcatIllustratedList[this.gcatIllustratedList.length-1].finascEngPartR=this.gcatIllustratedList[this.gcatIllustratedList.length-1].finascEngPartR + " , " + item.finascEngPartR;
                    }else{
                      this.gcatIllustratedList[this.gcatIllustratedList.length-1].finascEngPartR=item.finascEngPartR;
                    }
                  }
                }
                 if(item.funcKey!=""){
                  if(item.funcKey!=cpsc){
                    if(cpsc!=""){
                      this.gcatIllustratedList[this.gcatIllustratedList.length-1].funcKey=this.gcatIllustratedList[this.gcatIllustratedList.length-1].funcKey + " , " + item.funcKey;
                    }else{
                      this.gcatIllustratedList[this.gcatIllustratedList.length-1].funcKey=item.funcKey;
                    }
                  }
                }
                if(item.engpEngnrgPartR!=""){
                  if(item.engpEngnrgPartR!=part){
                    if(part!=""){
                      this.gcatIllustratedList[this.gcatIllustratedList.length-1].engpEngnrgPartR=this.gcatIllustratedList[this.gcatIllustratedList.length-1].engpEngnrgPartR + " , " +item.engpEngnrgPartR;
                    }else{
                      this.gcatIllustratedList[this.gcatIllustratedList.length-1].engpEngnrgPartR=item.engpEngnrgPartR;
                    }
                  }
                }
              }
          }
          });
        }
      })
      
  }
  alert1: any = { flag: false, msg: "" };
  cancelpop1() {
    this.isnextass = false;
  }
  cancelpop() {
    this.alert1.flag = false;
    this.isEditor = false;
  }
  // confirmalert1() {
  //   let data = "";
  //   data = "Are you sure want to Save";
  //   this.alert1.flag = true;
  //   this.alert1.msg = data;
  // }

  notesChanges(){
    this.noteChange=true;
    }
    confirmalert1() {
    let data = "";
    this.isEditor=false;
    if(this.noteChange){
    this.noteChange=true;
    data = "Are you sure want to Save?";
    this.alert1.flag = true;
    this.alert1.msg = data;
    }
    }

  popupOk(){
    this.alert.flag=false;
  }
  isnextass1: any = { flag: false, msg: "" };
  nextassclick(ri:number){
    this.isnextass1.msg=this.gcatIllustratedList[ri].finascEngPartR;
    this.isnextass = true;
  }
  nextassclick1(ri:number){
    this.isnextass1.msg=this.gcatIllustratedList[ri].funcKey;
    this.isnextass = true;
  }
  nextassclick2(ri:number){
    this.isnextass1.msg=this.gcatIllustratedList[ri].engpEngnrgPartR;
    this.isnextass = true;
  }
  getGcatIrpFile() {
    this.irpReviewService.getGcatIrpFile(this.selectedIrp.reqIdR)
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.gcatIrpFileList = data;
        } else {
          this.gcatIrpFileList = [];
        }
        console.log( this.gcatIrpFileList );
        
      })
  }
  getGcatIrpDate() {
    this.irpReviewService.getGcatIrpDate(this.selectedIrp.reqIdR)
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.gcatIrpDateList = data;
          this.gcatIrpDateList.forEach(obj => {
            switch (obj.dttypeC) {
              case "TIC":
                this.tracking.retIllusCoordDate = obj.reqdateY ? new Date(obj.reqdateY) : undefined;
                break;
              case "RFI":
                this.tracking.actRetDate = obj.reqdateY ? new Date(obj.reqdateY) : undefined;
                break;
              case "RQC":
                this.tracking.reqRetDate = obj.reqdateY ? new Date(obj.reqdateY) : undefined;
                break;
              case "CMP":
                this.tracking.completeDate = obj.reqdateY ? new Date(obj.reqdateY) : undefined;
                break;
              case "TII":
                this.tracking.dateIntSent = obj.reqdateY ? new Date(obj.reqdateY) : undefined;
                break;
              case "TEI":
                this.tracking.dateExtSent = obj.reqdateY ? new Date(obj.reqdateY) : undefined;
                break;
              case "REQ":
                this.tracking.reqDate = obj.reqdateY ? new Date(obj.reqdateY) : undefined;
                break;
              case "CLS":
                this.tracking.closeDate = obj.reqdateY ? new Date(obj.reqdateY) : undefined;
                break;
              case "REJ":
                this.tracking.rejectDate = obj.reqdateY ? new Date(obj.reqdateY) : undefined;
                break;
              default:
                console.log("default");
                break;
            }
          });

        } else {
          this.gcatIrpDateList = [];
        }

      })
  }
  delGCATReqFile() {
    this.confirmationService.confirm({
      message: 'Do you want to Delete the file ?',
      header: 'IRP List',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.irpReviewService.delGCATReqFile(this.selectedIrp.reqIdR, this.selectedIrpFile.reqfileNameX, this.selectedIrpFile.reqfileTypeC)
          .subscribe((data: any) => {
            if (data > 0) {
              this.alertPopup("Deleted Successfully.");
              this.selectedIrpFile = {};
              this.getGcatIrpFile();
            }
          })
      },
      reject: (_type: any) => {

      }
    });

  }
  upload(event: any) {
    let input = event.target;
    if (input.files && input.files[0]) {
      let type = event.target.files[0].name.split('.')[1];
      let name = event.target.files[0].name.split('.')[0];
      this.addReqFile(type, event.target.files[0], name);

    }
  }
  addReqFile(type: any, irpFile: File, name: any) {
    let dto: ReqFileIo4Dto = {
      reqIdR: this.selectedIrp.reqIdR,
      reqfileMarkedF: "",
      reqfileTypeC: type,
      reqfileNameX: name,
      plastupY: "",
      plastIdC: this.userlogin
    }
    this.irpReviewService.addReqFile(dto)
      .subscribe((data: any) => {
        if (data) {
          this.irpReviewService.getUploadedFileValue(irpFile, this.selectedIrp.reqIdR, name, type)
            .subscribe((data2: any) => {
              if (data2) {
                // this.alertPopup("File Uploaded");
                this.getGcatIrpFile();
                this.irpReviewService.updateI02DownldStatus(this.selectedIrp.reqIdR, "N")
                  .subscribe((data1: any) => {
                    if (data1) {
                    }
                  })
              }
            })
        }
      })
  }


  download() {
    this.irpReviewService.getGCATReqFile(this.selectedIrp.reqIdR, this.selectedIrpFile.reqfileNameX, this.selectedIrpFile.reqfileTypeC)
      .subscribe((data: any) => {
        console.log(data);
        if (data.fileName) {
          this.alertPopup(data.fileName + " have been downloaded to " + data.directory);
        } else {
          this.alertPopup("File Not Found.");
        }
      })
  }
  openFile() {
    let dto: GetGCATReqFileReqDto = {};
    dto.reqIdR = this.selectedIrp.reqIdR;
    dto.reqfileNameX = this.selectedIrp.reqIdR + "";
    dto.reqfileTypeC = "txt";
    this.irpReviewService.openFile(dto)
      .subscribe((data: any) => {
        if (data) {
          const file = new Blob([data], { type: 'application/txt' });;
          let fileReader = new FileReader();
          fileReader.onload = (e) => {
            console.log(fileReader.result);
            this.text1 = fileReader.result;
            this.isEditor = true;
           
          }
          fileReader.readAsText(file);
          // fileReader.readAsBinaryString(file);
          // fileReader.readAsDataURL(file);
          //  const fileURL = URL.createObjectURL(file);
          //  let a = document.createElement("a");
          //  document.body.appendChild(a);
          //  a.href = fileURL;
          //  a.download = this.selectedIrpFile.reqfileNameX+".txt";
          //  a.click();
          //  window.URL.revokeObjectURL(fileURL);
          //this.alertPopup(data.fileName+" have been downloaded to "+data.directory);
        } else {
          this.alertPopup("File Not Found.");
        }
      })
  }
  expFile() {
    this.noteChange=false;
    this.isEditor = false;
    const bFile = new Blob([this.text1], { type: 'text/plain' });
    const file = new File([bFile], this.selectedIrp.reqIdR + '.txt');
    this.addReqFile("txt", file, this.selectedIrp.reqIdR + "");
  }
  approve() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Approve this IRP ?',
      header: 'IRP Review',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if(this.paApprove){
          let reqId = this.selectedIrp.reqIdR ? this.selectedIrp.reqIdR : 0;
          let extIll = this.filterIrp.extIllustrator ? this.filterIrp.extIllustrator : "";
          let intIll = this.filterIrp.intIllustrator ? this.filterIrp.intIllustrator : "";
          let currentOwner = this.filterIrp.currentOwner ? this.filterIrp.currentOwner : "";
          this.updateIllustration("R", "C",
            this.selectedIrp.illstrIdR);
            this.filterIrp.status = "C - Closed/Publishable";
            this.selectedIrp.statusCodeC = "C";
           this.filterIrp.unitType = "R - Released IRP"
            this.selectedIrp.unitTypeC = "R";
  
          this.updateIRP("C", reqId, this.userlogin, extIll, intIll, "R");
          let holdowner=this.selectedIrp.reqCurrOwnerC;
          this.selectedIrp.reqCurrOwnerC=this.userlogin;
          this.filterIrp.currentOwner=this.userlogin;

          this.deleteIllusFile("C", this.selectedIrp.filePublishY);
          this.updateIllusFile("P", "C", this.selectedIrp.filePublishY);
          this.insertIrpDateType("CLS");
          this.deleteIllusWQ(intIll);
          this.deleteIllusWQ(extIll);
          this.deleteIllusWQ(holdowner);
          this.setGcatIllsRevisionNo();
          this.delGcatUnavailIllCmdty();
          this.setSectionillDate();
        }
       
      },
      reject: (_type: any) => {
        this.alertPopup("IRP has not been Approved.");
      }
    });

  }
  updateIllustration(illusId: any, unitType: any, statusCode: any) {
    this.irpReviewService.setGcatIllstr(unitType, statusCode, illusId, this.userlogin)
      .subscribe((data: any) => {
        if (data) {
          // this.filterIrp.status = "C - Closed/Publishable"
          // this.selectedIrp.statusCodeC = "C"
          // this.filterIrp.unitType = "R - Released IRP"
          // this.selectedIrp.unitTypeC = "R"
        }
      })
  }
  updateIRP(statusCodeC: string, reqIdR: number, reqCurrOwnerC: string, reqExtIllusIdC: string, reqIntIllusIdC: string, unitTypeC: string) {

    this.irpReviewService.setGcatIRP(statusCodeC, reqIdR, reqCurrOwnerC, reqExtIllusIdC,
      reqIntIllusIdC, unitTypeC)
      .subscribe((data: any) => {
        if (data) {
          this.filterIrp.currentOwner = this.userlogin;
          this.selectedIrp.reqCurrOwnerC = this.userlogin;
        }
      })
  }
  deleteIllusFile(fileStatus: any, pubDate: any) {
    this.irpReviewService.delGcatIllusFile(fileStatus, this.selectedIrp.illstrIdR, pubDate)
      .subscribe((data: any) => {
        if (data) {
          this.filterIrp.currentOwner = this.userlogin;
          this.selectedIrp.reqCurrOwnerC = this.userlogin;
        }
      })
  }
  updateIllusFile(oldstatus: any, newStatus: any, pubDate: any) {
    let dto: SetGcatIllusFileReqDto = {
      fileStatusCdCOld: oldstatus,
      fileStatusCdCNew: newStatus,
      illstrIdR: this.selectedIrp.illstrIdR,
      filePublishY: pubDate,
      plastIdC: this.userlogin
    }
    this.irpReviewService.setGcatIllusFile(dto)
      .subscribe((data: any) => {
        if (data) {

        }
      })

  }
  insertIrpDateType(dateType: any) {
    let dto: IrpDateDto = {
      reqIdR: this.selectedIrp.reqIdR,
      dttypeC: dateType,
      reqdateY: "",
      plastIdC: this.userlogin
    }
    this.irpReviewService.addGcatIrPDate(dto)
      .subscribe((data: any) => {
        if (data) {
          this.tracking.closeDate = new Date();
        }
      })

  }
  deleteIllusWQ(userId: any) {
    this.irpReviewService.delGcatWq(this.selectedIrp.illstrIdR, this.selectedIrp.reqIdR, userId)
      .subscribe((data: any) => {
        if (data) {

        }
      })
  }
  setGcatIllsRevisionNo() {
    this.irpReviewService.setGcatIllsRevisionNo(this.selectedIrp.illstrIdR)
      .subscribe((data: any) => {
        if (data) {

        }
      })
  }
  delGcatUnavailIllCmdty() {
    this.irpReviewService.delGcatUnavailIllCmdty(this.selectedIrp.illstrIdR, this.selectedIrp.filePublishY)
      .subscribe((data: any) => {
        if (data) {

        }
      })
  }
  setSectionillDate() {
    this.irpReviewService.setSectionillDate(this.selectedIrp.sectSectionIdR)
      .subscribe((data: any) => {
        if (data) {

        }
      })
  }
  bownloadGrphics(statusCodeC: any, contentType: any) {
    let dto: BrowseReqFileDto = {
      statusCodeC: statusCodeC,
      illstrIdR: this.selectedIrp.illstrIdR,
      fileContentTypeC: contentType,
    }
    this.irpReviewService.browseReqFile(dto)
      .subscribe((data: any) => {
        if (data.fileName) {
          // const file = new Blob([data], { type: 'application/cgm' });
          // const fileURL = URL.createObjectURL(file);
          // let a = document.createElement("a");
          // document.body.appendChild(a);
          // a.href = fileURL;
          // a.download = this.selectedIrp.illstrIdR+".cgm";
          // a.click();
          // window.URL.revokeObjectURL(fileURL);
          this.alertPopup(data.fileName + " have been downloaded to " + data.directory);
        } else {
          this.alertPopup("This illustration does not contain a valid graphics file.");
        }
      })

  }
  onPreview(e: any) {
    console.log(e)
    let printContents = '';
    const WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes'
    );
    printContents += `<table>
    <tr style="background-color:#000080">
    <th  >Commodity</th>
    <th  >Suffix</th>
    <th >Part No</th>
    <th >CPSC(s)</th>
    <th >BluPrt(s)</th>
    <th  >Nxt Ass(s)</th>
    <th  >Commodity</th>
    <th  >Part Analyst</th>
    <th  >Done</th>
    <th style="  width:5%">Commodity Status</th 
</tr>`;
    this.gcatIllustratedList.map(data => {
      printContents += `<tr>
                       <td>${data.engpCommodityC ? data.engpCommodityC : ""}</td>
                       <td>${data.cmdtsufSuffixC ? data.cmdtsufSuffixC : ""}</td> 
                       <td>${data.engpEngnrgPartR ? data.engpEngnrgPartR : ""}</td>
                       <td>${data.cmdtsufSuffixC ? data.cmdtsufSuffixC : ""}</td>
                       <td>${data.engpBluprtPrtR ? data.engpBluprtPrtR : ""}</td>
                       <td>${data.finascEngPartR ? data.finascEngPartR : ""}</td>
                       <td>${data.lexcDescShrtX ? data.lexcDescShrtX : ""}</td>
                       <td>${data.pLastIdC ? data.pLastIdC : ""}</td>
                       <td>${data.cmdtyAvailF == 'A' ? 'ORIGINAL' : data.cmdtyAvailF == 'U' ? 'APPENDED' : data.cmdtyAvailF == 'D' ? 'DELETED' : ''}</td>
                     </tr>`;
      const htmlData = `<html><body>${printContents}</body></html>`;

      WindowObject?.document.writeln(htmlData);
      WindowObject?.document.close();
      WindowObject?.focus();
    });
  }
  reject() {
    this.confirmationService.confirm({
      message: 'Do you want to add note before rejecting the IRP? Click Cancel to abort.',
      header: 'IRP Review',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.icRejectToPa) {
          this.doIcRejectToPa();
          this.isEditorClick();
        }
        if (this.paReject) {
          this.doPaReject();
          this.isEditorClick();
        }

      },
      reject: (_type: any) => {
        if (this.icRejectToPa) {
          this.doIcRejectToPa();
        }
        if (this.paReject) {
          this.doPaReject();;
        }
      }
    });
  }
  doPaReject() {
    let region = this.utilitiesService.gRegion.value;
    let coordRole = "";
    if (region == 'N') {
      coordRole = "SGTI_GIB";
    } else if (region == 'A') {
      coordRole = "SGTI_GIP";
    } else if (region == 'S') {
      coordRole = "SGTI_GIS";
    } else if (region == 'E') {
      coordRole = "SGTI_GIE";
    } else {
      coordRole = "SGTI_GIB";
    }
    this.getIdForRole(coordRole);
    this.insertIrpDateType("REJ");
    this.tracking.retIllusCoordDate = new Date();
  }

  getIdForRole(coordRole: any) {

    this.irpReviewService.getGcatRoleCode(coordRole)
      .subscribe((data: any) => {
        if (data.length > 0) {
          let reqId = this.selectedIrp.reqIdR ? this.selectedIrp.reqIdR : 0;
          let extIll = this.selectedIrp.reqExtIllusIdC ? this.selectedIrp.reqExtIllusIdC : "";
          let intIll = this.selectedIrp.reqIntIllusIdC ? this.selectedIrp.reqIntIllusIdC : "";
          this.updateIRP("R", reqId, data[0].userIdC, extIll, intIll, "R");
          let tempOwner = this.selectedIrp.reqCurrOwnerC;
          this.filterIrp.currentOwner = data[0].userIdC;
          this.selectedIrp.reqCurrOwnerC = data[0].userIdC;
          this.selectedIrp.statusCodeC = "R";
          this.filterIrp.status = "R - Rejected/Need Rework";
          this.deleteIllusWQ(tempOwner);
          let keyData = "IRP has been Rejected by Analyst and Sent to you.";
          let notesData = "IRP has been Rejected by Analyst and Sent to you.";
          this.insertIllusWQ(this.filterIrp.currentOwner, "R", "ISP", this.selectedIrp.illstrIdR, keyData, notesData, "R", "doPaReject");

        }
      })
  }
  doIcRejectToPa() {
    this.insertIrpDateType("REJ");
    this.tracking.rejectDate = new Date();
    let reqId=this.selectedIrp.reqIdR?this.selectedIrp.reqIdR:0;
    let extIll=this.selectedIrp.reqExtIllusIdC?this.selectedIrp.reqExtIllusIdC:"";
    let intIll=this.selectedIrp.reqIntIllusIdC?this.selectedIrp.reqIntIllusIdC:"";
    let creatIdC=this.selectedIrp.reqCreateIdC?this.selectedIrp.reqCreateIdC:"";
    this.updateIRP("R", reqId,creatIdC, intIll, extIll, "I");
    this.selectedIrp.reqCurrOwnerC = this.selectedIrp.reqCreateIdC;
    this.selectedIrp.statusCodeC = "R";
    this.filterIrp.status = "R - Rejected/Need Rework";
    let keyData = "IRP has been rejected back to you !";
    let notesData = "IRP has been rejected back to you !";
    this.insertIllusWQ(this.selectedIrp.reqCreateIdC, "R", "IRJ", this.selectedIrp.illstrIdR, keyData, notesData, "I","");
    this.deleteIllusWQ(this.selectedIrp.reqCurrOwnerC);
  }
  sendIrp() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Send this IRP ?',
      header: 'IRP Review',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let isContinuew = true;

        if (this.userlogin == "NAILLCO" || this.userlogin == "EUILLCO" || this.userlogin == "LRILLCO" || this.userlogin == "APILLCO") {
          if (this.selectedIrp.illstrIdR?.substring(0, 1) == "X") {
            if (!this.tracking.extIllustrator) {
              isContinuew = false;
              this.alertPopup("Please select an External Illustrator.");

            }
          }
        }
        if (isContinuew) {
          if (this.oldIllusid != this.selectedIrp.illstrIdR) {
            //SGTI_prGCATupdateillusid
          }
          if (this.paSendNewToIc) {
            this.doPaSendNewToIc();
          }else
          if (this.paSendIcUpdateToIc) {
            this.doPaSendICUpdateToIc();
          }else
          if (this.icSendNewToInt || this.icSendNewToExt) {
            let isValid= this.checkIntOrExtIllusNew();
            if(isValid){
              if (this.icSendNewToInt) {
                this.doIcSendNewToInt();
              }else
              if (this.icSendNewToExt) {
                this.doIcSendNewToExt();
              }
            }
          }else
          if (this.icSendIntToExt) {
            this.doIcSendIntToExt();
          }
          if (this.paSendIllusUpdateToIc) {
            this.doPaSendIllusUpdateToIC();
          }else
          if (this.icSendUpdateToInt || this.icSendUpdateToExt) {
            let isValid=this.checkIntOrExtIllusUpdate();
            if(isValid){
              if (this.icSendUpdateToInt) {
                this.doICSendUpdateToInt();
              }else if(this.icSendUpdateToExt){
                this.doICSendUpdateToExt();
              }
            }
          }else
          
          if (this.icSendUpdateToExt) {

          }
        }
      },
      reject: (_type: any) => {

      }
    });

  }
  doICSendUpdateToInt(){
    if(!this.tracking.reqRetDate){
      this.alertPopup("Requested Return Date has been erased.This must be provided in order to Send the IRP.The date that was there has been restored to the field.IRP cannot be sent.");

    }else{
      const today = new Date();
      today.setHours(23, 59, 59, 998);
      if (this.tracking.reqRetDate < today) {
        this.alertPopup("Requested Return Date must be in the future.IRP cannot be sent.");
      } else {
        this.updateDate("RQC", "doICSendUpdateToInt");
      
      }
    }
  }
  doICSendUpdateToExt(){
    if(!this.tracking.reqRetDate){
      this.alertPopup("Requested Return Date has been erased.This must be provided in order to Send the IRP.The date that was there has been restored to the field.IRP cannot be sent.");

    }else{
      const today = new Date();
      today.setHours(23, 59, 59, 998);
      if (this.tracking.reqRetDate < today) {
        this.alertPopup("Requested Return Date must be in the future.IRP cannot be sent.");
      } else {
        this.updateDate("RQC", "doICSendUpdateToExt");
      
      }
    }
  }
  checkIntOrExtIllusUpdate(){
    let isValid=true;
    if(this.selectedIrp.reqIntIllusIdC&&!this.selectedIrp.reqExtIllusIdC){
      this.icSendUpdateToExt=false;
    }
    if(!this.selectedIrp.reqIntIllusIdC&&this.selectedIrp.reqExtIllusIdC){
      this.icSendUpdateToInt=false;
    }
    if(this.selectedIrp.reqIntIllusIdC&&this.selectedIrp.reqExtIllusIdC){
      this.icSendUpdateToExt=false;
      this.alertPopup("Something's gone wrong.  There's no Internal or External Illustrator.");
      this.showCenterPart2();
      isValid=false;;
    }
    return isValid;
  }
  doPaSendIllusUpdateToIC() {
    const selected = this.gcatIllustratedList.filter(val => val.illcmdtIllDoneF == "N");
    if (selected.length > 0) {
      this.confirmationService.confirm({
        message: 'Not all commodities are Done.  You may want to inspect them before sending.  Do you want to continue ?',
        header: 'IRP Review',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (!this.tracking.reqRetDate) {
            this.alertPopup("The Requested Return Date has been erased.This must be provided in order to Send the IRP.The date that was there has been restored to the field.IRP cannot be sent.");
          } else {
            const today = new Date();
            today.setHours(23, 59, 59, 998);
            if (this.tracking.reqRetDate < today) {
              this.alertPopup("Requested Return Date must be in the future.IRP cannot be sent.");
            } else {
              this.updateDate("RQC", "doPaSendIllusUpdateToIC");
            }
          }
        },
        reject: (_type: any) => {
          this.alertPopup("IRP hase not been sent.")
        }
      });
    }
  }
  doIcSendIntToExt() {
    if (!this.tracking.extIllustrator) {
      this.alertPopup("Please choose an External Illustrator.");
    } else {
      const selected = this.gcatIllustratedList.filter(val => val.illcmdtIllDoneF == "N");
      if (selected.length > 0) {
        this.confirmationService.confirm({
          message: 'Not all commodities are Done.  You may want to inspect them before sending.  Do you want to continue ?',
          header: 'IRP Review',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            if (!this.tracking.reqRetDate) {
              this.alertPopup("The Requested Return Date has been erased.This must be provided in order to Send the IRP.The date that was there has been restored to the field.IRP cannot be sent.");
            } else {
              const today = new Date();
              today.setHours(23, 59, 59, 998);
              if (this.tracking.reqRetDate < today) {
                this.alertPopup("Requested Return Date must be in the future.IRP cannot be sent.");
              } else {
                this.updateDate("RQC", "doIcSendIntToExt");
              }
            }
          },
          reject: (_type: any) => {
            this.alertPopup("IRP hase not been sent.")
          }
        });
      }
    }
  }
  doIcSendNewToExt() {
    const selected = this.gcatIllustratedList.filter(val => val.illcmdtIllDoneF == "N");
    if (selected.length > 0) {
      this.confirmationService.confirm({
        message: 'Not all commodities are Done.  You may want to inspect them before sending.  Do you want to continue ?',
        header: 'IRP Review',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (!this.tracking.reqRetDate) {
            this.alertPopup("The Requested Return Date has been erased.This must be provided in order to Send the IRP.The date that was there has been restored to the field.IRP cannot be sent.");
          } else {
            const today = new Date();
            today.setHours(23, 59, 59, 998);
            if (this.tracking.reqRetDate < today) {
              this.alertPopup("Requested Return Date must be in the future.IRP cannot be sent.");
            } else {
              this.updateDate("RQC", "doIcSendNewToExt");
            }
          }
        },
        reject: (_type: any) => {
          this.alertPopup("IRP hase not been sent.")
        }
      });
    }
  }
  doIcSendNewToInt() {
    const selected = this.gcatIllustratedList.filter(val => val.illcmdtIllDoneF == "N");
    if (selected.length > 0) {
      this.confirmationService.confirm({
        message: 'Not all commodities are Done.  You may want to inspect them before sending.  Do you want to continue ?',
        header: 'IRP Review',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (!this.tracking.reqRetDate) {
            this.alertPopup("The Requested Return Date has been erased.This must be provided in order to Send the IRP.The date that was there has been restored to the field.IRP cannot be sent.");
          } else {
            const today = new Date();
            today.setHours(23, 59, 59, 998);
            if (this.tracking.reqRetDate < today) {
              this.alertPopup("Requested Return Date must be in the future.IRP cannot be sent.");
            } else {
              this.updateDate("RQC", "doIcSendNewToInt");
            }
          }
        },
        reject: (_type: any) => {
          this.alertPopup("IRP hase not been sent.")
        }
      });
    }
  }
  checkIntOrExtIllusNew() {
    let isValid = true;
    if (this.tracking.intIllustrator && this.tracking.extIllustrator) {
      this.alertPopup("You cannot send to both an Internal Illustrator and an External Illustrator.  Please choose only one.")
      isValid = false;
    } else if (!this.tracking.intIllustrator && !this.tracking.extIllustrator) {
      if (this.rolesUserHasArray.includes("SGTI_GIB") || this.rolesUserHasArray.includes("SGTI_GIP")) {
        this.alertPopup("Please choose an Internal OR an External Illustrator.");
        isValid = false;
      } else if (this.rolesUserHasArray.includes("SGTI_GIF")) {
        isValid = false;
        this.alertPopup("Please choose an Internal OR an External Illustrator.");
      } else if (this.rolesUserHasArray.includes("SGTI_GIE") || this.rolesUserHasArray.includes("SGTI_GIP")
        || this.rolesUserHasArray.includes("SGTI_GIS")) {
        isValid = false;
        this.alertPopup("Please choose an Internal OR an External Illustrator.");
      } else if (this.rolesUserHasArray.includes("SGTI_GIL")) {
        isValid = false;
        this.alertPopup("Please choose an External Illustrator.");
      }
    }
    if (isValid) {
      if (this.tracking.intIllustrator && this.tracking.extIllustrator) {
        this.icSendNewToInt = false
      }
      if (this.tracking.intIllustrator && !this.tracking.extIllustrator) {
        this.icSendNewToExt = false;
      }
      if (!this.tracking.intIllustrator) {
        this.alertPopup("Internal Illustrator must be selected from dropdown list.");
      }
      if (!this.tracking.extIllustrator) {
        this.alertPopup("External Illustrator must be selected from dropdown list.");
      }
    }
    return isValid;
  }
  doPaSendNewToIc() {

    const selected = this.gcatIllustratedList.filter(val => val.illcmdtIllDoneF == "N");
    if (selected.length > 0) {
      this.confirmationService.confirm({
        message: 'Not all commodities are Done.  You may want to inspect them before sending.  Do you want to continue ?',
        header: 'IRP Review',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (!this.tracking.reqRetDate) {
            this.alertPopup("The Requested Return Date has been erased.This must be provided in order to Send the IRP.The date that was there has been restored to the field.IRP cannot be sent.");
          } else {
            const today = new Date();
            today.setHours(23, 59, 59, 998);
            if (this.tracking.reqRetDate < today) {
              this.alertPopup("Requested Return Date must be in the future.IRP cannot be sent.");
            } else {
              this.updateDate("RQC", "doPaSendNewToIc");
            }
          }
        },
        reject: (_type: any) => {
          this.alertPopup("IRP hase not been sent.")
        }
      });
    }
  }
  updateDate(st: any, type: any) {

    this.irpReviewService.setGcatReqDate(this.tracking.reqRetDate, this.userlogin, st, this.selectedIrp.reqIdR)
      .subscribe((data: any) => {
        if (data) {
          if (type == "doPaSendNewToIc") {
            this.doPaSendNewToIcF();
          } else if (type == "doPaSendICUpdateToIc") {
            this.doPaSendICUpdateToIcF();
          } else if (type == "doIcSendNewToInt") {
            this.doIcSendNewToIntF();
          } else if (type == "doIcSendNewToExt") {
            this.doIcSendNewToExtF();
          } else if (type == "doIcSendIntToExt") {
            this.doIcSendIntToExtF();
          } else if (type == "doPaSendIllusUpdateToIC") {
            this.doPaSendIllusUpdateToICF();
          }else if(type=="doICSendUpdateToInt"){
            this.doICSendUpdateToIntF();
          }else if(type=="doICSendUpdateToExt"){
            this.doICSendUpdateToExtF();
          }

        }
      })
  }
  doICSendUpdateToExtF(){
    this.insertIrpDateType("TEI");
    this.tracking.dateExtSent=new Date();
    let reqId=this.selectedIrp.reqIdR?this.selectedIrp.reqIdR:0;
    let extIll=this.selectedIrp.reqExtIllusIdC?this.selectedIrp.reqExtIllusIdC:"";
    let intIll=this.selectedIrp.reqIntIllusIdC?this.selectedIrp.reqIntIllusIdC:"";
           this.updateIRP("U", reqId, extIll, extIll, intIll, "R");
          let tempOwner = this.selectedIrp.reqCurrOwnerC;
          this.filterIrp.currentOwner =intIll;

          this.selectedIrp.reqCurrOwnerC = intIll;
          this.selectedIrp.statusCodeC = "U";
          this.filterIrp.status = "U - Updated";
          this.filterIrp.unitType="R - Released IRP";
          this.selectedIrp.unitTypeC="R"
          this.deleteIllusWQ(tempOwner);
          let keyData = "This IRP updated by Illustration Coordinator.";
          let notesData = "This IRP updated by Illustration Coordinator.";
          this.updateIllusWQ(this.selectedIrp.illstrIdR, this.selectedIrp.reqIdR, keyData, notesData, "U", "", "R");
  }
  doICSendUpdateToIntF(){
    this.insertIrpDateType("TII");
    this.tracking.dateIntSent=new Date();
    let reqId=this.selectedIrp.reqIdR?this.selectedIrp.reqIdR:0;
    let extIll=this.selectedIrp.reqExtIllusIdC?this.selectedIrp.reqExtIllusIdC:"";
    let intIll=this.selectedIrp.reqIntIllusIdC?this.selectedIrp.reqIntIllusIdC:"";
           this.updateIRP("U", reqId, intIll, extIll, intIll, "R");
          let tempOwner = this.selectedIrp.reqCurrOwnerC;
          this.filterIrp.currentOwner =intIll;

          this.selectedIrp.reqCurrOwnerC = intIll;
          this.selectedIrp.statusCodeC = "U";
          this.filterIrp.status = "U - Updated";
          this.filterIrp.unitType="R - Released IRP";
          this.selectedIrp.unitTypeC="R"
          this.deleteIllusWQ(tempOwner);
          let keyData = "This IRP updated by Illustration Coordinator.";
          let notesData = "This IRP updated by Illustration Coordinator.";
          this.updateIllusWQ(this.selectedIrp.illstrIdR, this.selectedIrp.reqIdR, keyData, notesData, "U", "", "R");
  }
  doPaSendIllusUpdateToICF() {
    let region = this.utilitiesService.gRegion.value;
    let coordRole = "";
    if (region == "N") {
      coordRole = "SGTI_GIB";
    } else if (region == "A") {
      coordRole = "SGTI_GIP";
    } else if (region == "S") {
      coordRole = "SGTI_GIS";
    } else if (region == "E") {
      coordRole = "SGTI_GIE";
    } else {
      coordRole = "SGTI_GIB";
    }
    this.irpReviewService.getGcatRoleCode(coordRole)
      .subscribe((data: any) => {
        if (data.length > 0) {
          let reqId=this.selectedIrp.reqIdR?this.selectedIrp.reqIdR:0;
    let extIll=this.selectedIrp.reqExtIllusIdC?this.selectedIrp.reqExtIllusIdC:"";
    let intIll=this.selectedIrp.reqIntIllusIdC?this.selectedIrp.reqIntIllusIdC:"";
           this.updateIRP("R", reqId, data[0].userIdC, extIll, intIll, "R");
          let tempOwner = this.selectedIrp.reqCurrOwnerC;
          this.filterIrp.currentOwner = data[0].userIdC;

          this.selectedIrp.reqCurrOwnerC = data[0].userIdC;
          this.selectedIrp.statusCodeC = "R";
          this.filterIrp.status = "R - - Rejected/Need Rework";
          this.deleteIllusWQ(tempOwner);
          let keyData = "IRP has been Rejected by Illustrator, updated by Analyst and re-Sent to you.";
          let notesData = "IRP has been Rejected by Illustrator, updated by Analyst and re-Sent to you.";
           this.insertIllusWQ(this.filterIrp.currentOwner, "R", "ISP", this.selectedIrp.illstrIdR, keyData, notesData, "R","");
        }
      });
    this.insertIrpDateType("CMP");
  }
  doIcSendIntToExtF() {
    this.insertIrpDateType("TEI");
    this.tracking.dateExtSent = new Date();
    let reqId=this.selectedIrp.reqIdR?this.selectedIrp.reqIdR:0;
    let extIll=this.selectedIrp.reqExtIllusIdC?this.selectedIrp.reqExtIllusIdC:"";
    let intIll=this.selectedIrp.reqIntIllusIdC?this.selectedIrp.reqIntIllusIdC:"";
    this.updateIRP("N", reqId, extIll, extIll, intIll, "R");
    let tempOwner = this.selectedIrp.reqCurrOwnerC;
    this.filterIrp.currentOwner = this.selectedIrp.reqExtIllusIdC;

    this.selectedIrp.reqCurrOwnerC = this.selectedIrp.reqExtIllusIdC;
    this.selectedIrp.statusCodeC = "N";
    this.filterIrp.status = "N - New";
    this.filterIrp.unitType = "R - Released IRP";
    this.selectedIrp.unitTypeC = "R";

    this.deleteIllusWQ(tempOwner);
    this.deleteIllusWQ(this.selectedIrp.reqIntIllusIdC);
    let keyData = "A new IRP has been Sent to you.";
    let notesData = "A new IRP has been Sent to you.";
     this.insertIllusWQ(this.filterIrp.currentOwner, "N", "", this.selectedIrp.illstrIdR, keyData, notesData, "R","");
    this.updateIllustration(this.selectedIrp.illstrIdR, "R", "N");
  }
  doIcSendNewToExtF() {
    this.insertIrpDateType("TEI");
    this.tracking.dateExtSent = new Date();
    let reqId=this.selectedIrp.reqIdR?this.selectedIrp.reqIdR:0;
    let extIll=this.selectedIrp.reqExtIllusIdC?this.selectedIrp.reqExtIllusIdC:"";
    let intIll=this.selectedIrp.reqIntIllusIdC?this.selectedIrp.reqIntIllusIdC:"";
    this.updateIRP("N",reqId, extIll, extIll, intIll, "R");
    let tempOwner = this.selectedIrp.reqCurrOwnerC;
    this.filterIrp.currentOwner = this.selectedIrp.reqExtIllusIdC;

    this.selectedIrp.reqCurrOwnerC = this.selectedIrp.reqExtIllusIdC;
    this.selectedIrp.statusCodeC = "N";
    this.filterIrp.status = "N - New";
    this.filterIrp.unitType = "R - Released IRP";
    this.selectedIrp.unitTypeC = "R";

    this.deleteIllusWQ(tempOwner);
    let keyData = "A new IRP has been Sent to you.";
    let notesData = "A new IRP has been Sent to you.";
    this.insertIllusWQ(this.filterIrp.currentOwner, "N", "", this.selectedIrp.illstrIdR, keyData, notesData, "R","");
    this.updateIllustration(this.selectedIrp.illstrIdR, "R", "N");
  }
  doIcSendNewToIntF() {
    this.insertIrpDateType("TII");
    this.tracking.dateIntSent = new Date();
    let reqId=this.selectedIrp.reqIdR?this.selectedIrp.reqIdR:0;
    let extIll=this.selectedIrp.reqExtIllusIdC?this.selectedIrp.reqExtIllusIdC:"";
    let intIll=this.selectedIrp.reqIntIllusIdC?this.selectedIrp.reqIntIllusIdC:"";
    this.updateIRP("N", reqId, intIll, extIll, intIll, "R");
    let tempOwner = this.selectedIrp.reqCurrOwnerC;
    this.filterIrp.currentOwner = this.selectedIrp.reqIntIllusIdC;

    this.selectedIrp.reqCurrOwnerC = this.selectedIrp.reqIntIllusIdC;
    this.selectedIrp.statusCodeC = "N";
    this.filterIrp.status = "N - New";
    this.filterIrp.unitType = "R - Released IRP";
    this.selectedIrp.unitTypeC = "R";

    this.deleteIllusWQ(tempOwner);
    let keyData = "A new IRP has been Sent to you.";
    let notesData = "A new IRP has been Sent to you.";
    this.insertIllusWQ(this.filterIrp.currentOwner, "N", "", this.selectedIrp.illstrIdR, keyData, notesData, "R","doIcSendNewToInt");
    this.updateIllustration(this.selectedIrp.illstrIdR, "R", "N");

  }
  doPaSendNewToIcF() {
    let region = this.utilitiesService.gRegion.value;
    let coordRole = "";
    if (region == "N") {
      coordRole = "SGTI_GIB";
    } else if (region == "A") {
      coordRole = "SGTI_GIP";
    } else if (region == "S") {
      coordRole = "SGTI_GIS";
    } else if (region == "E") {
      coordRole = "SGTI_GIE";
    } else {
      coordRole = "SGTI_GIB";
    }
    this.irpReviewService.getGcatRoleCode(coordRole)
      .subscribe((data: any) => {
        if (data.length > 0) {
          let reqId=this.selectedIrp.reqIdR?this.selectedIrp.reqIdR:0;
          let extIll=this.selectedIrp.reqExtIllusIdC?this.selectedIrp.reqExtIllusIdC:"";
          let intIll=this.selectedIrp.reqIntIllusIdC?this.selectedIrp.reqIntIllusIdC:"";
          this.updateIRP("N",reqId , data[0].userIdC,extIll,intIll , "I");

          this.filterIrp.currentOwner = data[0].userIdC;
          this.selectedIrp.reqCurrOwnerC = data[0].userIdC;

          let keyData = "A new IRP has been Sent to you.";
          let notesData = "A new IRP has been Sent to you.";
          this.insertIllusWQ(this.filterIrp.currentOwner, "N", "ISP", this.selectedIrp.illstrIdR, keyData, notesData, "I","doPaSendNewToIc");
        }
      });
    this.insertIrpDateType("CMP");
    this.tracking.completeDate=new Date();
  }
  doIcRejectToPaF() {
    let region = this.utilitiesService.gRegion.value;
    let coordRole = "";
    if (region == "N") {
      coordRole = "SGTI_GIB";
    } else if (region == "A") {
      coordRole = "SGTI_GIP";
    } else if (region == "S") {
      coordRole = "SGTI_GIS";
    } else if (region == "E") {
      coordRole = "SGTI_GIE";
    } else {
      coordRole = "SGTI_GIB";
    }
    this.irpReviewService.getGcatRoleCode(coordRole)
      .subscribe((data: any) => {
        if (data.length > 0) {
          let reqId=this.selectedIrp.reqIdR?this.selectedIrp.reqIdR:0;
    let extIll=this.selectedIrp.reqExtIllusIdC?this.selectedIrp.reqExtIllusIdC:"";
    let intIll=this.selectedIrp.reqIntIllusIdC?this.selectedIrp.reqIntIllusIdC:"";
          this.updateIRP("U", reqId, data[0].userIdC, extIll, intIll, "R");
          let tempOwner = this.selectedIrp.reqCurrOwnerC;
          this.filterIrp.currentOwner = data[0].userIdC;

          this.selectedIrp.reqCurrOwnerC = data[0].userIdC;
          this.selectedIrp.statusCodeC = "U";
          this.filterIrp.status = "U - Updated";
          this.deleteIllusWQ(tempOwner);
          let keyData = "IRP has been updated and re-Sent to you.";
          let notesData = "IRP has been updated and re-Sent to you.";
           this.insertIllusWQ(this.filterIrp.currentOwner, "U", "ISP", this.selectedIrp.illstrIdR, keyData, notesData, "I","");
        }
      });
    this.insertIrpDateType("CMP");
  }
  doPaSendICUpdateToIc() {
    const selected = this.gcatIllustratedList.filter(val => val.illcmdtIllDoneF == "N");
    if (selected.length > 0) {
      this.confirmationService.confirm({
        message: 'Not all commodities are Done.  You may want to inspect them before sending.  Do you want to continue ?',
        header: 'IRP Review',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (!this.tracking.reqRetDate) {
            this.alertPopup("The Requested Return Date has been erased.This must be provided in order to Send the IRP.The date that was there has been restored to the field.IRP cannot be sent.");
          } else {
            const today = new Date();
            today.setHours(23, 59, 59, 998);
            if (this.tracking.reqRetDate < today) {
              this.alertPopup("Requested Return Date must be in the future.IRP cannot be sent.");
            } else {
              this.updateDate("RQC", "doPaSendICUpdateToIc");//need to check
            }
          }
        },
        reject: (_type: any) => {
          this.alertPopup("IRP hase not been sent.")
        }
      });
    }else{
      if (!this.tracking.reqRetDate) {
        this.alertPopup("The Requested Return Date has been erased.This must be provided in order to Send the IRP.The date that was there has been restored to the field.IRP cannot be sent.");
      } else {
        const today = new Date();
        today.setHours(23, 59, 59, 998);
        if (this.tracking.reqRetDate < today) {
          this.alertPopup("Requested Return Date must be in the future.IRP cannot be sent.");
        } else {
          this.updateDate("RQC", "doPaSendICUpdateToIc");
        }
      }
    }
  }
  doPaSendICUpdateToIcF() {
    let region = this.utilitiesService.gRegion.value;
    let coordRole = "";
    if (region == "N") {
      coordRole = "SGTI_GIB";
    } else if (region == "A") {
      coordRole = "SGTI_GIP";
    } else if (region == "S") {
      coordRole = "SGTI_GIS";
    } else if (region == "E") {
      coordRole = "SGTI_GIE";
    } else {
      coordRole = "SGTI_GIB";
    }
    this.irpReviewService.getGcatRoleCode(coordRole)
      .subscribe((data: any) => {
        if (data.length > 0) {
          let reqId=this.selectedIrp.reqIdR?this.selectedIrp.reqIdR:0;
          let extIll=this.selectedIrp.reqExtIllusIdC?this.selectedIrp.reqExtIllusIdC:"";
          let intIll=this.selectedIrp.reqIntIllusIdC?this.selectedIrp.reqIntIllusIdC:"";
          this.updateIRP("U",reqId , data[0].userIdC, extIll,intIll , "R");
          let tempOwner = this.selectedIrp.reqCurrOwnerC;
          this.filterIrp.currentOwner = data[0].userIdC;

          this.selectedIrp.reqCurrOwnerC = data[0].userIdC;
          this.selectedIrp.statusCodeC = "U";
          this.filterIrp.status = "U - Updated";
          this.deleteIllusWQ(tempOwner);
          let keyData = "IRP has been updated and re-Sent to you.";
          let notesData = "IRP has been updated and re-Sent to you.";
          this.insertIllusWQ(this.filterIrp.currentOwner, "U", "ISP", this.selectedIrp.illstrIdR, keyData, notesData, "I","doPaSendICUpdateToIc");
        }
      });
    this.insertIrpDateType("CMP");
  }
  cancelIrp() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Cancel this IRP ?',
      header: 'IRP Review',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.paCancel) {
          this.doPACancel();
        } else if (this.icCancel) {
          this.doICCancel();
        }
      },
      reject: (_type: any) => {
        this.alertPopup("IRP has not been Canceled.");
      }
    });
  }
  doPACancel() {
    let reqId = this.selectedIrp.reqIdR ? this.selectedIrp.reqIdR : 0;
    let intIll = this.selectedIrp.reqIntIllusIdC ? this.selectedIrp.reqIntIllusIdC : "";
    let extIll = this.selectedIrp.reqExtIllusIdC ? this.selectedIrp.reqExtIllusIdC : "";
    let unitType = this.selectedIrp.unitTypeC ? this.selectedIrp.unitTypeC : "";
    let illIdR = this.selectedIrp.illstrIdR ? this.selectedIrp.illstrIdR : "";

    if ((this.selectedIrp.reqCreateIdC == this.selectedIrp.reqCurrOwnerC) &&
      this.selectedIrp.unitTypeC == 'I' && this.selectedIrp.statusCodeC == 'N') {

    } else {
      let keyData = "This IRP canceled by the Product Analyst.";
      let notesData = "This IRP canceled by the Product Analyst.";
      this.updateIllusWQ(illIdR, this.selectedIrp.reqIdR, keyData, notesData, "X", "IRC", unitType);
    }
    this.filterIrp.status = "X - Canceled";
    this.selectedIrp.statusCodeC = "X";
    this.updateIRP("X", reqId, this.userlogin, intIll, extIll, unitType);
    this.updateIllusFile("P", "X", this.selectedIrp.filePublishY);
    this.updateIllustration(illIdR, unitType, "X");
    this.insertIrpDateType("CLS");
    this.getGcatIllusStatus();
    this.delGcatUnavailIllCmdty();
  }

  updateIllusWQ(illstrIdR: any, reqIdR: any, keyData: string, notesData: string, wqStatus: string, wqRsn: string, unitTypeC: any) {
    let dto: SetGcatWQReqDto = {};
    dto.illstrIdR = illstrIdR;
    dto.reqIdR = reqIdR;
    dto.plastIdC = this.userlogin;
    dto.gtiwqKeyDataX = keyData;
    dto.statusCodeC = wqStatus;
    dto.reasonCodeC = wqRsn;
    dto.unitTypeC = unitTypeC;
    dto.gtiwqNotesX = notesData;
    dto.unitReasonTypeC = wqRsn == "" ? "" : "I";
    this.irpReviewService.setGcatWQ(dto)
      .subscribe((data: any) => {
        if (data) {
          // this.filterIrp.status = "X - Canceled";
          // this.selectedIrp.statusCodeC = "X";
        }
      })
  }
  getGcatIllusStatus() {
    this.irpReviewService.getGcatIllusStatus(this.selectedIrp.illstrIdR)
      .subscribe((data: any) => {
        if (data.statusCodeC != "C") {
          this.setGcatIllusId();
        }
      })
  }
  setGcatIllusId() {
    this.irpReviewService.setGcatIllusId(this.userlogin, "", this.selectedIrp.illstrIdR, "")
      .subscribe((data: any) => {
        if (data) {

        }
      })
  }
  extractMiddle(str: any) {
    var position = 0;
    var length = 0;

    if (str) {

      if (str.length % 2 == 1) {
        position = str.length / 2;
        length = 1;
      } else {
        position = str.length / 2 - 1;
        length = 2;
      }
    }


    return str.substring(position, position + length);
  }

  doICCancel() {
    let reqId = this.selectedIrp.reqIdR ? this.selectedIrp.reqIdR : 0;
    let intIll = this.selectedIrp.reqIntIllusIdC ? this.selectedIrp.reqIntIllusIdC : "";
    let extIll = this.selectedIrp.reqExtIllusIdC ? this.selectedIrp.reqExtIllusIdC : "";
    let unitType = this.selectedIrp.unitTypeC ? this.selectedIrp.unitTypeC : "";
    let illIdR = this.selectedIrp.illstrIdR ? this.selectedIrp.illstrIdR : "";
    let tempStatus = this.selectedIrp.statusCodeC;
    this.filterIrp.status = "X - Canceled";
    this.selectedIrp.statusCodeC = "X";
    this.updateIRP("X", reqId, this.userlogin, intIll, extIll, unitType);
    let tempCurrOwner = this.selectedIrp.reqCurrOwnerC;
    this.filterIrp.currentOwner = this.userlogin;
    this.selectedIrp.reqCurrOwnerC = this.userlogin;
    this.updateIllusFile("P", "X", this.selectedIrp.filePublishY);
    this.updateIllustration(illIdR, unitType, "X");
    this.insertIrpDateType("CLS");
    let keyData = "IRP has been canceled by the Illustration Coordinator.";
    let notesData = "IRP has been canceled by the Illustration Coordinator.";
    if (tempCurrOwner != this.tracking.requester || (tempCurrOwner == this.tracking.requester && tempStatus == "N")) {
      this.insertIllusWQ(this.selectedIrp.reqCreateIdC, "X", "IRC", this.selectedIrp.illstrIdR,
        keyData, notesData, this.selectedIrp.unitTypeC, "doICCancel");
    } else {
      this.updateIllusWQ(illIdR, reqId, keyData, notesData, "X", "IRC", unitType);
    }

    this.getGcatIllusStatus();
    this.delGcatUnavailIllCmdty();
  }
  insertIllusWQ(reqCreateIdC: any, wqStatus: string, wqRsn: string, illstrIdR: any,
    keyData: string, notesData: string, unitTypeC: any, action: string) {
    let reason = wqRsn == "" ? "" : "I";

    let dto: AddGcatWQReqDto = {
      plastIdC: this.userlogin,
      illstrIdR: this.selectedIrp.illstrIdR,
      reqIdR: this.selectedIrp.reqIdR,
      gtiwqKeyDataX: "(" + this.selectedIrp.reqIdR + ") " + keyData,
      reasonCodeC: wqRsn,
      statusCodeC: wqStatus,
      unitReasonTypeC: reason,
      unitTypeC: unitTypeC,
      userIdC: reqCreateIdC,
      gtiwqNotesX: notesData,
      gtiwqOrigUsridC: this.userlogin
    };
    this.irpReviewService.addGcatWQ(dto)
      .subscribe((data: any) => {
        if (data) {
          if (action == "doICCancel") {
            this.updateIllusWQ(this.selectedIrp.illstrIdR, this.selectedIrp.reqIdR, keyData, notesData, "X", "IRC", unitTypeC);
          } else if (action == "doPaReject") {
            this.updateIllusWQ(this.selectedIrp.illstrIdR, this.selectedIrp.reqIdR, keyData, notesData, "R", "", "R");
          }
        }
      })
  }

  isEditorClick() {
    const files = this.gcatIrpFileList.filter(val => val.reqfileNameX == this.selectedIrp.reqIdR);
    if (files.length > 0) {
      this.openFile();
    } else {
      this.isEditor = true;
      this.text1 = "=====================================================\t\n" +
        "Notes for IRP " + this.selectedIrp.reqIdR + ",  Illustration " + this.selectedIrp.illstrIdR + "\t\n" +
        "=====================================================";
    }


  }
  sectionproperty() {
    this.section = true;
  }
  sectionProperty1() {
    let reqIdR = this.filterIrp.irpNo;
    let langGtiC = this.userlangcode;
    this.irpReviewService.getSectionProperty(reqIdR, langGtiC).subscribe((res: any) => {
      this.table = res;

    });

  }
  viewCgm() {
    this.bownloadGrphics("C", "CGM");
  }
  browse() {
    this.bownloadGrphics("C", "TIF");
  }
  viewTiff() {
    this.bownloadGrphics("P", "TIF");
  }
  irpClick() {
    this.router.navigate(['/irp']);
  }
  wbsClick() {
    this.router.navigate(['/wbs']);
  }
  illClick() {
    this.router.navigate(['/illsearch']);
  }
  sectSetupClick() {
    window.open('/catalogsection');
    let sectId=this.selectedIrp.sectSectionIdR?this.selectedIrp.sectSectionIdR:"";
    localStorage.setItem('sectionId',sectId);
    localStorage.setItem('newSection', "false");
  }
  close() {
    this.router.navigate(['/irp']);
  }
  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }
  display: any = "none"
  display1: any = "none"
  display2: any = "none"
  count: any = 0;
  count1: any = 0
  counts: any = 0
  rotate: any;
  br: string = "5px"
  br2: string = "5px"
  br3: string = "5px"
  showCenterPart() {
    if (this.count == 0) {
      this.display = "block"
      this.count = 1;
      this.br = "5px 5px 0px 0px"
      this.rotate = "rotate(45deg);"
    } else {
      this.br = "5px"
      this.display = "none"
      this.count = 0;
      this.rotate = "rotate(0deg);"
    }
  }
  showCenterPart1() {
    if (this.counts == 0) {
      this.display1 = "block"
      this.counts = 1;
      this.br2 = "5px 5px 0px 0px"
      this.rotate = "rotate(45deg);"
    } else {
      this.br2 = "5px"
      this.display1 = "none"
      this.counts = 0;
      this.rotate = "rotate(0deg);"
    }
  }
  showCenterPart2() {
    if (this.count1 == 0) {
      this.display2 = "block"
      this.count1 = 1;
      this.br3 = "5px 5px 0px 0px"
      this.rotate = "rotate(45deg);"
      this.setDropdownChange();
    } else {
      this.br3 = "5px"
      this.display2 = "none"
      this.count1 = 0;
      this.rotate = "rotate(0deg);"
    }
  }
  setDropdownChange() {
    const selected = this.extIllustratorList.filter(val => val.userIdC == this.selectedIrp.reqExtIllusIdC);
    this.tracking.extIllustrator = selected.length > 0 ? selected[0] : {};
    const selected1 = this.IntIllustratorList.filter(val => val.userIdC == this.selectedIrp.reqIntIllusIdC);
    this.tracking.intIllustrator = selected1.length > 0 ? selected1[0] : {};
    const selected2 = this.requesterList.filter(val => val.userIdc == this.selectedIrp.reqCreateIdC);
    this.tracking.dropdownRequester = selected2.length > 0 ? selected2[0] : {};
  }
  setControls() {
    this.viewOnly = false;
    this.paSendNewToIc = false
    this.icRejectToPa = false
    this.paSendIcUpdateToIc = false
    this.icSendNewToInt = false
    this.icSendNewToExt = false
    this.icSendIntToExt = false
    this.paSendIllusUpdateToIc = false
    this.icSendUpdateToInt = false
    this.icSendUpdateToExt = false
    this.paApprove = false
    this.paReject = false
    this.paCancel = false
    this.icCancel = false
    this.icAble = false
    if (this.rolesUserHasArray.includes("SGTI_GPA") || this.rolesUserHasArray.includes("SGTI_GIB") ||
      this.rolesUserHasArray.includes("SGTI_GIE") || this.rolesUserHasArray.includes("SGTI_GIF") ||
      this.rolesUserHasArray.includes("SGTI_GIS") || this.rolesUserHasArray.includes("SGTI_GIP")) {
      if (this.selectedIrp.statusCodeC != "X" && this.selectedIrp.statusCodeC != "C") {
        this.isEffDtDis = false;
        this.isRequester=false;
        if (!this.tracking.effectDt) {
          this.isEffDtDis = true;
          this.isRequester=true;
        }
      }
    }
    if (this.rolesUserHasArray.includes("SGTI_GIB") || this.rolesUserHasArray.includes("SGTI_GIE") ||
      this.rolesUserHasArray.includes("SGTI_GIL") || this.rolesUserHasArray.includes("SGTI_GPA") ||
      this.rolesUserHasArray.includes("SGTI_GPB") || this.rolesUserHasArray.includes("SGTI_GPD") ||
      this.rolesUserHasArray.includes("SGTI_GPR") || this.rolesUserHasArray.includes("SGTI_GIF") ||
      this.rolesUserHasArray.includes("SGTI_GPE") || this.rolesUserHasArray.includes("SGTI_GIS") ||
      this.rolesUserHasArray.includes("SGTI_GIP")) {
      this.icAble = true;
    }
    this.viewOnly = true;
    if (this.icAble || this.filterIrp.currentOwner == this.userlogin || this.selectedIrp.reqIntIllusIdC == this.userlogin ||
      this.selectedIrp.reqExtIllusIdC == this.userlogin) {
      this.viewOnly = false;
    }
    if (this.selectedIrp.reqCurrOwnerC == this.selectedIrp.reqCreateIdC && this.selectedIrp.statusCodeC == 'N' && this.selectedIrp.unitTypeC == "I") {
      if (this.rolesUserHasArray.includes("SGTI_GPB") || this.rolesUserHasArray.includes("SGTI_GPD") ||
        this.rolesUserHasArray.includes("SGTI_GPA") || this.rolesUserHasArray.includes("SGTI_GPR") || this.rolesUserHasArray.includes("SGTI_GID")
        || this.rolesUserHasArray.includes("SGTI_GIG") || this.rolesUserHasArray.includes("SGTI_GPE")) {
        this.paSendNewToIc = true;
      }
    }
    if (this.filterIrp.currentOwner == this.userlogin && (this.selectedIrp.statusCodeC == 'N' || this.selectedIrp.statusCodeC == 'U') && this.selectedIrp.unitTypeC == "I") {
      if (this.rolesUserHasArray.includes("SGTI_GIB") || this.rolesUserHasArray.includes("SGTI_GIE") ||
        this.rolesUserHasArray.includes("SGTI_GIL") || this.rolesUserHasArray.includes("SGTI_GIF") || this.rolesUserHasArray.includes("SGTI_GIS")
        || this.rolesUserHasArray.includes("SGTI_GIP")) {
        this.icRejectToPa = true;
      }
    }
    if (this.selectedIrp.reqCurrOwnerC == this.selectedIrp.reqCreateIdC && this.selectedIrp.statusCodeC == 'R' && this.selectedIrp.unitTypeC == "I") {
      if (this.rolesUserHasArray.includes("SGTI_GPB") || this.rolesUserHasArray.includes("SGTI_GPD") ||
        this.rolesUserHasArray.includes("SGTI_GPA") || this.rolesUserHasArray.includes("SGTI_GPR") || this.rolesUserHasArray.includes("SGTI_GID")
        || this.rolesUserHasArray.includes("SGTI_GIG") || this.rolesUserHasArray.includes("SGTI_GPE")) {
        this.paSendIcUpdateToIc = true;
      }
    }
    if (this.selectedIrp.reqCurrOwnerC == this.userlogin && (this.selectedIrp.statusCodeC == 'N' || this.selectedIrp.statusCodeC == 'U') && this.selectedIrp.unitTypeC == "I") {
      if (this.rolesUserHasArray.includes("SGTI_GIB") || this.rolesUserHasArray.includes("SGTI_GIF") ||
        this.rolesUserHasArray.includes("SGTI_GIE") || this.rolesUserHasArray.includes("SGTI_GIS") || this.rolesUserHasArray.includes("SGTI_GIP")) {
        this.icSendNewToInt = true;
      }
    }
    if (this.selectedIrp.reqCurrOwnerC == this.userlogin && (this.selectedIrp.statusCodeC == 'N' || this.selectedIrp.statusCodeC == 'U') && this.selectedIrp.unitTypeC == "I") {
      if (this.rolesUserHasArray.includes("SGTI_GIB") || this.rolesUserHasArray.includes("SGTI_GIE") ||
        this.rolesUserHasArray.includes("SGTI_GIL") || this.rolesUserHasArray.includes("SGTI_GIF") ||
        this.rolesUserHasArray.includes("SGTI_GIS") ||
        this.rolesUserHasArray.includes("SGTI_GIP")) {
        this.icSendNewToExt = true;
      }
    }
    if (this.selectedIrp.reqCurrOwnerC == this.userlogin && this.selectedIrp.statusCodeC == 'I' && this.selectedIrp.unitTypeC == "R") {
      if (this.rolesUserHasArray.includes("SGTI_GIB") || this.rolesUserHasArray.includes("SGTI_GIF") ||
        this.rolesUserHasArray.includes("SGTI_GIE") || this.rolesUserHasArray.includes("SGTI_GIS") || this.rolesUserHasArray.includes("SGTI_GIP")
      ) {
        this.icSendIntToExt = true;
      }
    }
    if (this.selectedIrp.reqCurrOwnerC == this.selectedIrp.reqCreateIdC && this.selectedIrp.statusCodeC == 'R' && this.selectedIrp.unitTypeC == "R") {
      if (this.rolesUserHasArray.includes("SGTI_GPB") || this.rolesUserHasArray.includes("SGTI_GPD") ||
        this.rolesUserHasArray.includes("SGTI_GPA") || this.rolesUserHasArray.includes("SGTI_GPR") || this.rolesUserHasArray.includes("SGTI_GID") ||
        this.rolesUserHasArray.includes("SGTI_GIG") || this.rolesUserHasArray.includes("SGTI_GPE")
      ) {
        this.paSendIllusUpdateToIc = true;
      }
    }
    if (this.selectedIrp.reqCurrOwnerC == this.userlogin && this.selectedIrp.statusCodeC == 'R' && this.selectedIrp.unitTypeC == "R") {
      if (this.rolesUserHasArray.includes("SGTI_GIB") || this.rolesUserHasArray.includes("SGTI_GIF") ||
        this.rolesUserHasArray.includes("SGTI_GIE") || this.rolesUserHasArray.includes("SGTI_GIS") || this.rolesUserHasArray.includes("SGTI_GIP")
      ) {
        this.icSendUpdateToInt = true;
      }
    }
    if (this.selectedIrp.reqCurrOwnerC == this.userlogin && this.selectedIrp.statusCodeC == 'R' && this.selectedIrp.unitTypeC == "R") {
      if (this.rolesUserHasArray.includes("SGTI_GIB") || this.rolesUserHasArray.includes("SGTI_GIE") ||
        this.rolesUserHasArray.includes("SGTI_GIL") || this.rolesUserHasArray.includes("SGTI_GIF") ||
        this.rolesUserHasArray.includes("SGTI_GIS") || this.rolesUserHasArray.includes("SGTI_GIP")
      ) {
        this.icSendUpdateToExt = true;
      }
    }
    if (this.selectedIrp.reqCurrOwnerC == this.selectedIrp.reqCreateIdC && this.selectedIrp.statusCodeC == 'M' && this.selectedIrp.unitTypeC == "R") {
      if (this.rolesUserHasArray.includes("SGTI_GPB") || this.rolesUserHasArray.includes("SGTI_GPD") ||
        this.rolesUserHasArray.includes("SGTI_GPA") || this.rolesUserHasArray.includes("SGTI_GPR") || this.rolesUserHasArray.includes("SGTI_GID") ||
        this.rolesUserHasArray.includes("SGTI_GIG") || this.rolesUserHasArray.includes("SGTI_GPE")
      ) {
        this.paApprove = true;
      }
    }
    if (this.selectedIrp.reqCurrOwnerC == this.selectedIrp.reqCreateIdC && this.selectedIrp.statusCodeC == 'M' && this.selectedIrp.unitTypeC == "R") {
      if (this.rolesUserHasArray.includes("SGTI_GPB") || this.rolesUserHasArray.includes("SGTI_GPD") ||
        this.rolesUserHasArray.includes("SGTI_GPA") || this.rolesUserHasArray.includes("SGTI_GPR") || this.rolesUserHasArray.includes("SGTI_GID") ||
        this.rolesUserHasArray.includes("SGTI_GIG") || this.rolesUserHasArray.includes("SGTI_GPE")
      ) {
        this.paReject = true;
      }
    }
    if (this.selectedIrp.reqCurrOwnerC && this.selectedIrp.statusCodeC != 'C' && this.selectedIrp.statusCodeC != 'M'
      && this.selectedIrp.statusCodeC != "X") {
      if (this.rolesUserHasArray.includes("SGTI_GPB") || this.rolesUserHasArray.includes("SGTI_GPD") ||
        this.rolesUserHasArray.includes("SGTI_GPA") || this.rolesUserHasArray.includes("SGTI_GPR") || this.rolesUserHasArray.includes("SGTI_GID") ||
        this.rolesUserHasArray.includes("SGTI_GIG") || this.rolesUserHasArray.includes("SGTI_GPE")
      ) {
        this.paCancel = true;
      }
    }
    if (this.selectedIrp.reqCurrOwnerC != this.selectedIrp.reqCreateIdC && this.selectedIrp.statusCodeC != 'C' && this.selectedIrp.statusCodeC != 'M'
      && this.selectedIrp.statusCodeC != "X") {
      if (this.rolesUserHasArray.includes("SGTI_GIB") || this.rolesUserHasArray.includes("SGTI_GIE") ||
        this.rolesUserHasArray.includes("SGTI_GIL") || this.rolesUserHasArray.includes("SGTI_GIF") || this.rolesUserHasArray.includes("SGTI_GIS") ||
        this.rolesUserHasArray.includes("SGTI_GIP")
      ) {
        this.icCancel = true;
      }
    }
    this.disableBtns();
  }
  disableBtns() {
    this.isSendDis = true;
    this.isApproveDis = true;
    this.isDownDis = false;
    this.isRejectDis = true;
    this.isCancelDis = true;
    this.isIrpDis = true;
    this.isTifDis = true;
    this.isCgmDis = true;
    this.gAbleToSetDoneFlag = false;
    this.isAttachDis = false;
    this.isDelDis = false;
    this.isNotesDis = false;
    this.isIrpDis = false;
    this.extIllDis = true;
    this.intIllDis = true;
    this.isReqRetDis = true;
    if (!this.selectedIrp.illstrRevIdR) {
      this.isBrowseDis = true;
    }
    if (!this.selectedIrp.reqCurrOwnerC) {
      this.isAttachDis = true;
      this.isDelDis = true;
      this.isNotesDis = true;
      this.gAbleToSetDoneFlag = true;
      this.isReqRetDis = true;
      this.isIrpDis = false;
    }
    if (this.paSendNewToIc) {
      this.isSendDis = false;
      this.isIrpDis = false;
      this.gAbleToSetDoneFlag = true;
      this.isAttachDis = false;
      this.isDelDis = false;
      this.isNotesDis = false;
      this.isReqRetDis = false;
    }
    if (this.icRejectToPa) {
      this.isRejectDis = false;
      this.isAttachDis = false;
      this.isDelDis = false;
      this.isNotesDis = false;
      this.isIrpDis = false;
      this.isCancelDis = false;
    }
    if (this.paSendIcUpdateToIc) {
      this.isSendDis = false;
      this.isIrpDis = false;
      this.gAbleToSetDoneFlag = true;
      this.isAttachDis = false;
      this.isDelDis = false;
      this.isNotesDis = false;
      this.isReqRetDis = false;
    }
    if (this.icSendNewToInt) {
      this.isSendDis = false;
      this.isRejectDis = false;
      this.isIrpDis = false;
      this.isAttachDis = false;
      this.isDelDis = false;
      this.isNotesDis = false;
      this.isReqRetDis = false;
      this.intIllDis = false;
    }
    if (this.icSendNewToExt) {
      this.isSendDis = false;
      this.isRejectDis = false;
      this.isAttachDis = false;
      this.isDelDis = false;
      this.isNotesDis = false;
      this.isReqRetDis = false;
      this.extIllDis = false;
    }
    if (this.icSendIntToExt) {
      this.isSendDis = false;
      this.isAttachDis = false;
      this.isDelDis = false;
      this.isNotesDis = false;
      this.isReqRetDis = false;
      this.extIllDis = false;
    }
    if (this.paSendIllusUpdateToIc) {
      this.isSendDis = false;
      this.isIrpDis = false;
      this.gAbleToSetDoneFlag = true;
      this.isAttachDis = false;
      this.isDelDis = false;
      this.isNotesDis = false;
      this.isReqRetDis = false;
    }
    if (this.icSendUpdateToInt) {
      this.isSendDis = false;
      this.isAttachDis = false;
      this.isDelDis = false;
      this.isNotesDis = false;
      this.isReqRetDis = false;
    }
    if (this.icSendUpdateToExt) {
      this.isSendDis = false;
      this.isAttachDis = false;
      this.isDelDis = false;
      this.isNotesDis = false;
      this.isReqRetDis = false;
    }
    if (this.paApprove) {
      this.isApproveDis = false;
      this.isDownDis = false;
      this.isIrpDis = false;
      this.isBrowseDis = false;
      if (this.userlangcode == "B") {
        this.isCgmDis = false;
      }
      this.isTifDis = false;
    }
    if (this.paReject) {
      this.isRejectDis = false;
      this.isNotesDis = false;
    }
    if (this.paCancel) {
      this.isCancelDis = false;
      if (this.icCancel) {
        this.isCancelDis = false;
      }
    }
    if (this.selectedIrp.reqCurrOwnerC == this.userlogin && this.selectedIrp.unitTypeC == "R") {
      if (this.rolesUserHasArray.includes("SGTI_GIC") || this.rolesUserHasArray.includes("SGTI_GID") || this.rolesUserHasArray.includes("SGTI_GIG")) {
        this.isAttachDis = true;
        this.isNotesDis = true;
        this.isDelDis = true;
      }
    }
    if (this.selectedIrp.statusCodeC == "C" || this.selectedIrp.statusCodeC == "X") {
      this.isAttachDis = true;
      this.isNotesDis = true;
      this.isDelDis = true;
    }
    if (this.selectedIrp.statusCodeC == "N" || this.selectedIrp.statusCodeC == "U" && this.selectedIrp.unitTypeC == "R") {
      this.isAttachDis = true;
    }
  }
}

