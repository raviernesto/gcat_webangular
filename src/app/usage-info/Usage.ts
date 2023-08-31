export interface UsageFilter {
    engpEngnrgPartR?: string;
    eioOriginC?: string;
    engpSeqR?: number;
    vehtypeCode?: string;
    pteioOriginC?: string;
    evlVehicleLineC?: string;
    desc?: string;
    commodityDesc?: string;
    cmdtyRemarks?:string;
}

export interface VehicleLineDto {
    vehtypeCode?: string;
    pteioOriginC?: string;
    evlVehicleLineC?: string;
}

export interface UsageRequestDto {
    engpEngnrgPartR?: string;
    eioOriginC?: string;
    engpSeqR?: number;
    vehtypeCode?: string;
    pteioOriginC?: string;
    evlVehicleLineC?: string;
    statusString?: string;
    flagUtc?: string;
    nusageC?: number;
    region?:string;
    cmdtyTypeC?:string;
    engpCommodityC?:string;
    evaCatlgStsC?:string;
    unitTypeC?:string;
    userId?:string;
    vehicleLines?:VehicleLineDto[];
}

export interface NewUsageforNUSReqDto{
    engpEngnrgPartR?: string;
    eioOriginC?: string;
    engpSeqR?: number;
    vehtypeCode?: string;
    pteioOriginC?: string;
    evlVehicleLineC?: string;
    evaCtlg?: string;
    usageSummarizationInd?: string;
    nusageC?: number;
    userId?:string;
}

export interface UsageResponseDto {
    id?:number;
    funcKey?: string;
    pftrcCombinatnC?: number;
    mftrcCombinatinC?: number;
    regintC?: string;
    evaPerUsageQ?: number;
    effiopEffInC?: string;
    unitmsrCode?: string;
    epntsrEffInY?: Date;
    efiosrcSourcInC?: string;
    epntsrEffOutY?: string;
    effiopEffOutC?: string;
    efiosrcSouroutC?: string;
    evaCatlgStsC?: string;
    actionByIdC?: string;
    userTsoIdC?: string;
    pcLastupY?: Date;
    plastupY?: Date;
    plastIdC?: string;
    engpCommodityC?: string;
    cmdtyTypeC?: string;
    actionDtY?: Date;
    usageSummarizationInd?: string;
    reasonCodeC?: string;
    origVehtypeC?: string;
    statusCodeDescX?: string;
    primaryFtr?: string;
    minorFtr?: string;
    evlVehicleLineC?:string;
}
export interface GcatUsageResponseDto {
    id?:number;
    nusageC?: number;
    funcKey?: string;
    evaPerUsageQ?: string;
    createByIdC?: string;
    unitmsrCode?: string;
    evaCatlgStsC?: string;
    evaCatlgUseridC?: string;
    createDtY?: Date;
    plastIdC?: string;
    engpCommodityC?: string;
    evlVehiclLineC?: string;
    cmdtyTypeC?: string;
    evaCatlgY?: Date;
    plastupY?: Date;
    vehtypeCode?: string;
    pteioOriginC?: string;
    statusCodeDescX?: string;
    timingChgF?: string;
    pfirstCatlgY?: Date;
    firstCatlgIdC?: string;
    specification?: string;
    application?: string;
    primary?: string;
    minor?: string;
    effiopEffInCE?: string;
    epntsrEffInYE?: Date;
    efiosrcSourcInCE?: string;
    epntsrEffOutYE?: Date;
    efiopEffOutCE?: string;
    efiosrcSourcoutCE?: string;
    effiopEffInCN?: string;
    epntsrEffInYN?: Date;
    efiosrcSourcInCN?: string;
    epntsrEffOutYN?: Date;
    efiopEffOutCN?: string;
    efiosrcSourcoutCN?: string;
    effiopEffInCA?: string;
    epntsrEffInYA?: Date;
    efiosrcSourcInCA?: string;
    epntsrEffOutYA?: Date;
    efiopEffOutCA?: string;
    efiosrcSourcoutCA?:string;
    effiopEffInCS?: string;
    epntsrEffInYS?: Date;
    efiosrcSourcInCS?: string;
    epntsrEffOutYS?: Date;
    efiopEffOutCS?: string;
    efiosrcSourcoutCS?: string;
}

export interface EngpServicepartDto{

    sbaseprtNbr?: string;
    sprfxprtPrefixR?: string;
    sufxprtSuffixNbr?: string;
    sparRegC?: string;
    lexcDescLongX?: string;
}

export interface EngVlAppDto{
    engpEngnrgPartR?: string;
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
    usageSummarizationInd?: string;
    origVehtypeC?: string;
}
export interface NewUsage{
    nusageC?:number;
    funcKey?: string;
	evaPerUsageQ?: string;
	pcLastupIdC?: string;
	unitmsrCode?: string;
	evaCatlgStsC?: string;
	evaCatlgUseridC?: string;
    pcLastupY?:Date;
	plastIdC?: string;
    engpCommodityC?: string;
	evlVehiclLineC?: string;
	cmdtyTypeC?: string;
	evaCatlgY?:Date;
	pLastupY?:Date;
	pteioOriginC?: string;
    vehtypeCode?: string;
    pFirstIllY?:Date;
    pFirstCatlgY?:Date;
    timingChgF?: string;
    createDtY?:Date;
    createByIdC?: string;
    firstCatlgIdC?: string;
}
export interface AppUsageReqDto{
    engpEngnrgPartR?: string;
    engpSeqR?: number;
    eioOriginC?: string;
    funcKey?: string;
    vehtypeCode?: string;
    pteioOriginC?: string;
    evlVehicleLineC?: string;
    pftrcCombinatnC?: number;
    mftrcCombinatinC?: number;
    regintC?: string;
    evaPerUsageQ?: number;
    effiopEffInC?: string;
    nusageC?:number;
    engpBaseR?:string;
    origVehtypeC?:string;
    cmdtyTypeC?:string;
    engpCommodityC?:string;
    userIdC?:string;
}
export interface addGCATUsageFeatureDto{
    lexcC?: string;
	nusageC?:number;
	lextypTypeC?: string;
	lexcCBefore?: string;
	engpCommodityC?: string;
	cmdtyTypeC?: string;
	engpEngnrgPartR?: string;
	engpSeqR?:number;
	eioOriginC?: string;
	approvedFlag?: string;
	userId?: string;
}

export interface PrimaryForPCIIDto{
    lexcC?: string;
    lexcDescLongX?: string;
    approvedFlag?: string;
}

export interface MinorForPCIIDto{
    mnrftrC?: string;
	sourcSourceC?: string;
	lexcC?: string;
	mnrftrDescX?: string;
}

export interface NewUsageTimingDto{
    regionCodeC?: string;
	nusageC?:number;
	effiopEffInC?: string;
	epntsrEffInY?: string;
	efiosrcSourcInC?: string;
	effiopEffOutC?: string;
	epntsrEffOutY?: string;
	efiosrcSourcoutC?: string;
	userId?: string;
}
export interface PCIINewStatusReqDto{
    engpEngnrgPartR?: string;
	funcKey?: string;
	eioOriginC?: string;
	engpSeqR?:number;
	vehtypeCode?: string;
	pteioOriginC?: string;
	evlVehicleLineC?: string;
	pftrcCombinatnC?:number;
	mftrcCombinatinC?:number;
	regintC?: string;
	evaPerUsageQ?:number;
	effiopEffInC?: string;
	origVehtypeC?: string;
	usageSummarizationInd?: string;
	actionByIdC?: string;
    actionDtY?:Date;
	deleteOneToMany?: string;
	reasonCodeC?: string;
	userId?: string;
    evaCatlgStsC?: string;
    nusageC?:number;
    flagUtc?:string;
}


export interface CmdtyPropsGCATResDto{
    qualifier?:string;
	cmdtpropReqdF?:string;
	propCodeC?:string;
	propCodeValueC?:string;
	lexcDescLongX?:string;
	lexcC?:string;
	approvedFlag?:string;
	propDescX?:string;
	lextypTypeC?:string;
}
export interface LexiconByLexcResDto{
    lexcC?:string;
    propCodeC?:string;
    lextypTypeC?:string;
    lexcDescLongX?:string;
    propCodeValueC?:string;
    approvedFlag?:string;
    propDescX?:string;
    lextypTypeX?:string;
}
export interface CmdtyPropsGCATReqDto{
    engpCommodityC?:string;
	cmdtyTypeC?:string;
	langGtiC?:string;
	featProp?:string;
	engpEngnrgPartR?:string;
	engpSeqR?:number;
	eioOriginC?:string;
	nusageC?:number;
}
export interface GCATLexDescRes{
    lexcC?:string;
	lextypTypeC?:string;
	propCodeC?:string;
	lexcDescShrtX?:string;
	lexcDescLongX?:string;
	lexcDescM1X?:string;
	lexcDescXlongX?:string;
	propCodeValueC?:string;
	lexcCommentX?:string;
	approvedFlag?:string;
	propDescX?:string;
	lextypTypeX?:string;
}
export interface DelGCATUsageFeatureReqDto{
    nusageC?:number;
	engpEngnrgPartR?:string;
	eioOriginC?:string;
	engpSeqR?:number;
	lexcC?:string;
	lextypTypeC?:string;
	engpCommodityC?:string;
	cmdtyTypeC?:string;
}
export interface AddGcatPreTriggerReqDto{
    engpEngnrgPartR?:string;
	eioOriginC?:string;
	engpSeqR?:number;
	nusageC?:number;
	vbForm?:string;
	prefix?:string;
	sectSectionId?:string;
	userId?:string;
}
export interface SetUsageStatusDto{
    engpEngnrgPartR?:string;
	eioOriginC?:string;
	engpSeqR?:number;
	vehtypeCode?:string;
	pteioOriginC?:string;
	evlVehicleLineC?:string;
	engpDelimitedR?:string;
	engpBaseR?:string;
	sbaseprtNbr?:string;
	sprfxprtPrefixR?:string;
	sufxprtSuffixNbr?:string;
	engpCommodityC?:string;
	cmdtyTypeC?:string;
	evaCatlgStsC?:string;
	createByIdC?:string;
	nusageC?:number;
}
export interface DelGCATUsageDto{
    engpEngnrgPartR?:string;
	engpSeqR?:number;
	eioOriginC?:string;
	nusageC?:number;
	engpCommodityC?:string;
	cmdtyTypeC?:string;
	evlVehicleLineC?:string;
	vehtypeCode?:string;
	pteioOriginC?:string;
	evaCatlgStsC?:string;
	userId?:string;

}
export interface PCIITimingResponseDto{
    regintC?:string;
    effiopEffInC?:string;
    epntsrEffInY?:Date;
    efiosrcSourcInC?:string;
    epntsrEffOutY?:Date;
    effiopEffOutC?:string;
    efiosrcSouroutC?:string;
    reasonCodeC?:string;
}

export interface PCIITimingResponseDto1{
    region?:string;
    regintC?:string;
    effiopEffInC?:string;
    epntsrEffInY?:Date;
    efiosrcSourcInC?:string;
    epntsrEffOutY?:Date;
    effiopEffOutC?:string;
    efiosrcSouroutC?:string;
    reasonCodeC?:string;
}

export interface S4pDateReqDto{
    effPtC?:string;
	vehCode?:string;
	pteioOrig?:string;
	vl?:string;
	regint?:string;
	engPart?:string;
	effInC?:string;
}