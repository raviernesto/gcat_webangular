export class SectionCopy {
    cmdty?: string;
    errMsg?: string;
    group?: string;
    sectId?: string;
    suffix?: string;
    tempId?: string;
    tempValue?: string;
    vehLine?: string;
    suffixList:SuffixList[]=[];
    table: TableDetails[] = [];
}

export class TableDetails {
    nUsageC?: string;
    engpEngnrgPartR?: string;
    eioOriginC?: string;
    engpSeqR?: string;
    evlVehicleLineC?: string;
    engpCommodityC?: string;
    cmdtytypec?: string;
    partner?: string;
    splTiming?: string;
    effIn?: string;
    effOut?: string;
    effDate?: string;
    property?: string;
    base?: string;
    errMsg?: string;
}

export class SuffixList{
    sectionId:string="";
	tempId?:string;
	suffix?:string;
	tempValue?:string;
}