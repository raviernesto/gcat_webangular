import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import { GcatIrp2ResDto } from 'src/app/interfaces/irp';
import { WorkQueue } from 'src/app/interfaces/part-workqueue';
import { IllusDto } from 'src/app/models/illustration-search.class';
import { GcatUsageResponseDto } from 'src/app/models/Usage';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  public loading$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public selectedWorkQueue:BehaviorSubject<WorkQueue>=new BehaviorSubject<WorkQueue>({});
  public lexCCodes = new BehaviorSubject<Array<string>>([]);
  public gFlagFromPicToUsage:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public fromNewUsg:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public isActivateInactive:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public selectedGcatUsg:BehaviorSubject<GcatUsageResponseDto>=new BehaviorSubject<GcatUsageResponseDto>({});
  public gFromfrmIRPList:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public selectedIrp:BehaviorSubject<GcatIrp2ResDto>=new BehaviorSubject<GcatIrp2ResDto>({});
  public gRegion:BehaviorSubject<String>=new BehaviorSubject<String>("");
  public illusId=new BehaviorSubject<Array<IllusDto>>([]);

  constructor() { }

  setGfromfrmIRPList(newValue:boolean){
    this.gFromfrmIRPList.next(newValue);
  }
  setLoading(newValue:boolean){
    this.loading$.next(newValue);
  }
  setWorkQueue(newValue:WorkQueue){
    newValue.engpSeqR=newValue.engpSeqR?Number(newValue.engpSeqR):0;
    newValue.nusageC=newValue.nusageC?Number(newValue.nusageC):0;
    this.selectedWorkQueue.next(newValue);
  }
  setIrp(newValue:WorkQueue){
    this.selectedIrp.next(newValue);
  }
  setGcatUsg(newValue:GcatUsageResponseDto){
    this.selectedGcatUsg.next(newValue);
  }
  setLexCodes(newValue:string[]){
    this.lexCCodes.next(newValue);
  }
  setNewUsg(newValue:boolean){
    this.fromNewUsg.next(newValue);
  }
  setActivateInactive(newValue:boolean){
    this.isActivateInactive.next(newValue);
  }
  setIllustrationId(newValue:IllusDto[]){
    this.illusId.next(newValue);
  }
}
