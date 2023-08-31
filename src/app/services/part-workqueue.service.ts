import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment} from '../../environments/environment';
import { CommodityCheck, DeleteWqByReasonCode, WorkQueueFilter } from '../interfaces/part-workqueue';

@Injectable({
  providedIn: 'root'
})
export class PartWorkqueueService {
 
 
  
  private headersObject = {
    "Content-Type": "application/json",
  };
  constructor(private http:HttpClient,private apiService:ApiService) { }

  getReasonCodeList()
  { 
    return this.http.get<any>(environment.worqueue+'/workqueue/api/masterlistwq');
    
  }
  getProductTypeOriginList(productTypeCode:string){
    const params = new HttpParams({
      fromObject: {
        productTypeCode
      }
  });
    return this.apiService
    .get("/workqueue/api/producttypeoriginlist",params);
   
  }
  getFilteredList(workQueueFilter:WorkQueueFilter){
      return this.apiService.post("/workqueue/api/workqueuelist",workQueueFilter);
  }
  getTemplateIdsByUserId(userId:string){
    const params = new HttpParams({
      fromObject: {
        userId
      }
  });
    return this.apiService
    .get("/workqueue/api/templateidlist",params);
   
  }
  validRecoverPart(engPart:any){
    console.log("debugg");
    const params = new HttpParams({
      fromObject: {
        engPart
      }
  });
    return this.apiService
    .get("/workqueue/api/isvalidrecoverpart",params);
  }
  validateEngpBase(engpBaseR:string){
    const params = new HttpParams({
      fromObject: {
        engpBaseR
      }
  });
    return this.apiService
    .get("/workqueue/api/validateengbase",params);
  }
  validateCommodity(engpCommodityC: string) {
    const params = new HttpParams({
      fromObject: {
        engpCommodityC
      }
  });
    return this.apiService
    .get("/workqueue/api/validatecommodity",params);
  }

  getReasonMessage(reasonCodeC: any) {
    const params = new HttpParams({
      fromObject: {
        reasonCodeC
      }
  });
  return this.apiService
  .get("/workqueue/api/reasonmsgtype",params);
  }

  getReasonDelftForm(reasonCodeC: any,reasonUnitTypeC:any) {
    const params = new HttpParams({
      fromObject: {
        reasonCodeC,
        reasonUnitTypeC
      }
  });
  return this.apiService
  .get("/workqueue/api/getreasondelftform",params);
  }

  getAssignmentDetails(gtiwqCreateY: any,userIdC:any) {
    const params = new HttpParams({
      fromObject: {
        gtiwqCreateY,
        userIdC
      }
  });
    return this.apiService
    .get("/workqueue/api/assignmentdetails",params);
  }

  commodityCheck(commodityCheck:CommodityCheck){
    return this.apiService.post("/workqueue/api/commoditycheck",commodityCheck);
}
deleteWqBycreatey(gtiwqCreateY: any,userIdC:any,reasonCodeC:any) {
  const params = new HttpParams({
    fromObject: {
      gtiwqCreateY,
      userIdC,
      reasonCodeC
    }
});
  return this.apiService
  .delete("/workqueue/api/deletewqcreatey",params);
}

getRecoverInactivePart(engPart:any) {
  const params = new HttpParams({
    fromObject: {
      engPart
    }
});
  return this.apiService
  .get("/workqueue/api/recoverpart",params);
}

deleteWqRow(deleteWqByReasonCode:DeleteWqByReasonCode){
  return this.apiService.post("/workqueue/api/deleteWorkQueue",deleteWqByReasonCode);
}
validateUsage(nUsageC:any){
  const params = new HttpParams({
    fromObject: {
      nUsageC
    }
});
  return this.apiService
  .get("/workqueue/api/validateusage",params);
}
deleteWorkQueueIrc(gtiwqCreateY:any,userIdC:any,reasonCodeC:any,pLastupY:any){
  const params = new HttpParams({
    fromObject: {
      gtiwqCreateY,
      userIdC,
      reasonCodeC,
      pLastupY
    }
});
  return this.apiService
  .delete("/workqueue/api/deleteWorkQueueIrc",params);
}
getGcatIrp2(reqIdR:any, illstrIdR:any){
  const params = new HttpParams({
    fromObject: {
      reqIdR,
      illstrIdR,
    }
});
  return this.apiService
  .get("/workqueue/api/gcatirp",params);
}

}
