import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WorkQueue } from '../interfaces/part-workqueue';
import { ConfigService } from '../shared/services/config.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import { AddGcatPreTriggerReqDto, addGCATUsageFeatureDto, AppUsageReqDto, CmdtyPropsGCATReqDto, CmdtyPropsGCATResDto, DelGCATUsageDto, DelGCATUsageFeatureReqDto, EngVlAppDto, NewUsage, NewUsageforNUSReqDto, NewUsageTimingDto, PCIINewStatusReqDto, S4pDateReqDto, SetUsageStatusDto, UsageRequestDto } from '../usage-info/Usage';
@Injectable({
  providedIn: 'root'
})
export class UsageService {
  private BASE_URL = environment.usage+'/';
  constructor(
    private http: HttpClient,
    private configServie:ConfigService
  ) { }

  getSpecialProcessFlags(evlVehLine: any) {
    const params = new HttpParams({
      fromObject: {
        evlVehLine
      }
    });
    return this.get("usage/api/specialprocessflag", params);

  }

  getVehicleLine(engPart: any) {
    const params = new HttpParams({
      fromObject: {
        engPart
      }
    });
    return this.get("usage/api/vehilcelinelist", params);

  }

  getUsageListPCII(usageRequestDto: any) {
    return this.post("usage/api/pcIIusageList", usageRequestDto);
  }
  getUsageListGCAT(usageRequestDto: any) {
    return this.post("usage/api/gcatusageList", usageRequestDto);
  }
  getCmdtyPropsGCAT(dto: CmdtyPropsGCATReqDto) {
    return this.post("usage/api/cmdtypropsgcat", dto);
  }
  
  addNewUsageforNUS(dto: NewUsageforNUSReqDto) {
    return this.post("usage/api/addnewusgfornus", dto);
  }
  deleteNusWq(dto: UsageRequestDto) {
    return this.post("usage/api/deletenuswq", dto);
  }
  getPCIISummarize(dto: UsageRequestDto) {
    return this.post("usage/api/pcIIsummarize", dto);
  }
  
  getCommodityDescRemark(cmdtyTypeC: any,engpCommodityC:any,userLang:any) {
    const params = new HttpParams({
      fromObject: {
        cmdtyTypeC,
        engpCommodityC,
        userLang
      }
    });
    return this.get("usage/api/commodityDescRemark", params);

  }
  getLexiconByLexCode(lexC: any) {
    const params = new HttpParams({
      fromObject: {
        lexC,
       
      }
    });
    return this.get("usage/api/getlexdetails", params);

  }
  
  getLexCount(vehTypeCode: any,vehLine:any) {
    const params = new HttpParams({
      fromObject: {
        vehTypeCode,
        vehLine,
      }
    });
    return this.get("usage/api/getlexcount", params);

  }
  
  getGCATLexDesc(lexcC: any,langGtiC:any) {
    const params = new HttpParams({
      fromObject: {
        langGtiC,
        lexcC,
      }
    });
    return this.get("usage/api/getgcatlexdesc", params);

  }
  isD31Exist(userLang: any,lexC:any) {
    const params = new HttpParams({
      fromObject: {
        userLang,
        lexC,
      }
    });
    return this.get("usage/api/isD31Exist", params);

  }
  isL31Exist(vehTypeCode: any,vehLine:any,lexC:any) {
    const params = new HttpParams({
      fromObject: {
        vehTypeCode,
        vehLine,
        lexC
      }
    });
    return this.get("usage/api/isL31Exist", params);

  }
  isL31Valid(vehTypeCode: any,vehLine:any,lexC:any) {
    const params = new HttpParams({
      fromObject: {
        vehTypeCode,
        vehLine,
        lexC
      }
    });
    return this.get("usage/api/isL31Valid", params);

  }
  
  getEngBase(engpEngnrgPartR: any,eioOriginC:any,engpSeqR:any) {
    const params = new HttpParams({
      fromObject: {
        engpEngnrgPartR,
        eioOriginC,
        engpSeqR
      }
    });
    return this.get("usage/api/getengbase", params);

  }
  getEngpSvPart(engpEngnrgPartR: any,eioOriginC:any,engpSeqR:any,userLang:any) {
    const params = new HttpParams({
      fromObject: {
        engpEngnrgPartR,
        eioOriginC,
        engpSeqR,
        userLang
      }
    });
    return this.get("usage/api/engpservicepart", params);

  }

  setTimingChangeFlag(userId: any,nusageC:any) {
    const params = new HttpParams({
      fromObject: {
        userId,
        nusageC
      }
    });
    return this.get("usage/api/settimngchangeflag", params);

  }
  
  getMultiUserForPCII(engVlAppDto:EngVlAppDto){
    return this.post("usage/api/multiuserforpc",engVlAppDto);
}
getPrimaryForPCII(pftrcCombinatnC: any,userLang:any) {
  const params = new HttpParams({
    fromObject: {
      pftrcCombinatnC,
      userLang
    }
  });
  return this.get("usage/api/primaryforpcII", params);

}

getMinorForPCII(mnrftrC: any,userLang:any) {
  const params = new HttpParams({
    fromObject: {
      mnrftrC,
      userLang
    }
  });
  return this.get("usage/api/minorforpcII", params);

}

addNewUsageP60(newUsage:NewUsage){
  return this.post("usage/api/addnewusagep60",newUsage);
}
addNewUsageP63(appUsage:AppUsageReqDto){
  return this.post("usage/api/addnewusagep63",appUsage);
}
addGCATUsageFeature(usageFeatureDto:addGCATUsageFeatureDto){
  return this.post("usage/api/addgcatusgfeature",usageFeatureDto);
}
addNewUsageTiming(newUsageTimingDto: NewUsageTimingDto) {
  return this.post("usage/api/addnewusagetiming", newUsageTimingDto);
}
getPCIINewStatus(pCIINewStatusReqDto: PCIINewStatusReqDto) {
  return this.post("usage/api/pcnewstatus", pCIINewStatusReqDto);
}
addMessageURW(dto: UsageRequestDto) {
  return this.post("usage/api/addmessageurw", dto);
}

summarize(appUsage:AppUsageReqDto){
  return this.post("usage/api/summarize",appUsage);
}
desummarize(pCIINewStatusReqDto: PCIINewStatusReqDto) {
  return this.post("usage/api/desummarize", pCIINewStatusReqDto);
}

setUsageUpdateID(nusageC: any,userId:any) {
  const params = new HttpParams({
    fromObject: {
      nusageC,
      userId
    }
  });
  return this.get("usage/api/setusgupdateid", params);

}

delGCATTiming(nusageC: any,regionC:any) {
  const params = new HttpParams({
    fromObject: {
      nusageC,
      regionC
    }
  });
  return this.get("usage/api/delgcattiming", params);

}
checkCalibrationExistForUsage(nusageC: any) {
  const params = new HttpParams({
    fromObject: {
      nusageC
    }
  });
  return this.get("usage/api/calibrationexistforusg", params);

}
addGCATSectionTrigger(vbForm: string,deleteSection:string,userId:string,nusageC:any) {
  const params = new HttpParams({
    fromObject: {
      vbForm,
      deleteSection,
      userId,
      nusageC
    }
  });
  return this.get("usage/api/sectiontrigger", params);

}

setPCIIStatus(nusageC: any,evaCatlgStsC:any,usgSumm:any,userId:any) {
  const params = new HttpParams({
    fromObject: {
      nusageC,
      evaCatlgStsC,
      usgSumm,
      userId
    }
  });
  return this.get("usage/api/setpcIIstatus", params);

}
setQtyPerUsage(nUsageC:any,userId:any,evaPerUsageQ:any) {
  const params = new HttpParams({
    fromObject: {
      nUsageC,
      userId,
      evaPerUsageQ,
    }
  });
  return this.get("usage/api/qtyperusage", params);

}

getPCIITimingForGCAT(nusageC:any,utcFlag:any) {
  const params = new HttpParams({
    fromObject: {
      nusageC,
      utcFlag,
    }
  });
  return this.get("usage/api/pcIItimingforgcat", params);

}
getS4pDt(dto:S4pDateReqDto){
  return this.post("usage/api/gets4pdate", dto);
}
setUsageStatus(dto:SetUsageStatusDto){
  return this.post("usage/api/setusagestatus", dto);
}
delGCATUsage(dto:DelGCATUsageDto){
  return this.post("usage/api/deletegcatusg", dto);
}

addGcatPreTrigger(dto:AddGcatPreTriggerReqDto){
  return this.post("usage/api/addgcatpretrigger", dto);
}
delGCATUsageFeature(delGCATUsageFeatureReqDto: DelGCATUsageFeatureReqDto) {
  return this.post("usage/api/delgcatusgfeatr", delGCATUsageFeatureReqDto);
}
delWQForUsage(usageRequestDto: UsageRequestDto) {
  return this.post("usage/api/delwqforusage", usageRequestDto);
}
delUsageFromP63(dto: PCIINewStatusReqDto) {
  return this.post("usage/api/delUsageFromP63", dto);
}
getCountEngVlApp(dto: PCIINewStatusReqDto) {
  return this.post("usage/api/countengvlapp", dto);
}
updateD22DeadUsages(dto: PCIINewStatusReqDto) {
  return this.post("usage/api/updated22deadusages", dto);
}
getReasonCode(dto: PCIINewStatusReqDto) {
  return this.post("usage/api/getreasoncode", dto);
}
delWQForDeadUsage(dto: UsageRequestDto) {
  return this.post("usage/api/deletewqdeadusage", dto);
}

setUsageStatusUnSupress(dto: UsageRequestDto) {
  return this.post("usage/api/usagesupress", dto);
}

  public get(
    path: string,
    params: HttpParams = new HttpParams(),
  ) {
    const options = {
      params
    }
    return this.http.get(this.BASE_URL + path, options)
    .pipe(
      catchError(this.configServie.handleError)
    );;
  }

  public post(
    path: string,
    body: object = {},
  ) {
    return this.http.post<any>(this.BASE_URL + path, body)
    .pipe(
      catchError(this.configServie.handleError)
    );
  }
  
}
