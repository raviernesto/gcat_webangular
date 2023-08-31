export interface PartWorkqueueMaster {
    reasonCodeList: ReasonCode[];
    s4pCodeList: [];
    sourceInList: [];
    userList: User[];
    vehcleLineList: VehicleLine[];
    vehcleTypeCodeList: [];
}
export interface ReasonCode {
    reasonCode?: string
    reasonDescX?: string
}
export interface User {
    userIdC?: string
    userFirstNameN?: string
    userLastNameN?: string
}
export interface VehicleLine {
    evlVehicleLineC?: string;
    prtpeioDescX?: string;
}
export interface WorkQueueFilter {
    pageNumber?: number;
    pageSize?: number;
    reasonCode?: string;
    engpCommodityC?: string;
    evlVehicleLineC?: string;
    userIdC?: string;
    vehtypeCode?: string;
    pteioOriginC?: string;
    statusCodeC?: string;
    engpBaseR?: string;
    regintC?: string;
    efiosrcSourceInC?: string;
    effiopEffInC?: string;
    epntsrEffInY?: string;
    templtIdR?:string;
}

export interface WorkQueue {
    gtiwqCreateY?: string;
    userIdC?: string;
    engpEngnrgPartR?: string;
    sbaseprtNbr?: string;
    sprfxprtPrefixR?:string;
    sufxprtSuffixNbr?: string;
    engpCommodityC?: string;
    reasonCodeC?: string;
    epntsrEffInY?: Date;
    reqIdR?: number;
    gtiwqKeyDataX?: string;
    statusCodeC?: string;
    plastupY?: string;
    eioOriginC?: string;
    engpSeqR?: number;
    funcKey?: string;
    vehtypeCode?: string;
    pteioOriginC?: string;
    evlVehicleLineC?: string;
    pftrcCombinatnC?: number;
    mftrcCombinatinC?: number;
    regintC?: string;
    evaPerUsageQ?: number;
    effiopEffInC?: string;
    gtiwqNotesY?: Date;
    cmdtyTypeC?: string;
    gtiwqOrigY?: Date;
    gtiwqOrigUsridC?: string;
    unitReasonTypeC?: string;
    engpDelimitedR?: string;
    nusageC?: number;
    sbaseprt2X?: string;
    sprfxprtPrefix2X?: string;
    sufxprtSuffix2X?: string;
    templtIdR?: string;
    d20PartR?: string;
    efiosrcSourceInC?: string;
}

export interface AssignmentDetails {
    gtiwqCreateY?: string;
    userIdC?: string;
    vehtypeCode?: string;
    evlVehicleLineC?: string;
    reasonCodeC?: string;
    engpEngnrgPartR?: string;
    funcKey?: string;
    userBookR?: string;
    userPciiBookR?: string; 
    sprfxprtPrefixR?:string;
    sbaseprtNbr?:string;
    sufxprtSuffixNbr?:string; 
    d20PartR?:string;
    sprfxprtPrefix2X?:string;
    sbaseprt2X?:string;
    sufxprtSuffix2X?:string;
}

export interface CommodityCheck {
    engpEngnrgPartR?: string;
    eioOriginC?: string;
    engpSeqR?: number;
    vehtypeCode?: string;
    pteioOriginC?: string;
    evlVehicleLineC?: string;
    reasonCodeC?: string;
    plastIdC?:string;
}

export interface DeleteWqByReasonCode{
    engpEngnrgPartR?: string;
    eioOriginC?: string;
    engpSeqR?: number;
    vehtypeCode?: string;
    pteioOriginC?: string;
    evlVehicleLineC?: string;
    funcKey?:string;
    reasonCodeC?: string;
    pftrcCombinatnC?:number;
    mftrcCombinatinC?:number;
    regintC?:string;
    evaPerUsageQ?:number;
    effiopEffInC?:string;
    gtiwqCreateY?:string;
    userIdC?:string;
    pLastupY?:string;
}