export interface Irp {
}

export interface RequesterResDto {
    userIdC?:string;
    utitleTitleC?:string;
}

export interface PrefixResDto{
    famprfxPrefixC?:string;
    famprfxDescX?:string;
}

export interface VehicleLineResDto{
    sectVehicleLineC?:string;
    sectVehicleDescX?:string;
}

export interface IrpListResDto{
    reqCreateIdC?:string;
	statusCodeC?:string;
	reqdateY?:Date;
	reqCurrOwnerC?:string;
	reqIdR?:number;
	illstrIdR?:string;
	illstrCreateIdC?:string;
	illstrTypeC?:string;
	unitTypeC?:string;
	sectSectionIdR?:string;
	illstrCreatorN?:string;
	illstrRevIdR?:number;
	sectVehicleLineC?:string;
	famprfxPrefixC?:string;
	sectSuffixC?:string;
	templtIdR?:string;
	effectDateY?:Date;
	irpRegionC?:string;
	cmdtyPercentage?:number;
	refComplete?:number;
	ownerY?:Date;
	requestY?:Date;
	returnY?:Date;
	closeY?:Date;
}

export interface IrpListReqDto{
    sectVehicleLineC?:string;
	templtIdR?:string;
	unitTypeC?:string;
	pageNumber?:number;
	pageSize ?:number;
	reqCreateIdC?:string;
	statusCodeC?:string;
	reqCurrOwnerC?:string;
	reqIdR?:number;
	famprfxPrefixC?:string;
	irpRegionC?:string;
}

export interface GcatIrp2ResDto{
	illstrIdR?:string;
	reqIdR?:number;
	statusCodeC?:string;
	reqCreateIdC?:string;
	reqExtIllusIdC?:string;
	reqIntIllusIdC?:string;
	filePublishY?:Date;
	temtypTypeC?:string;
	reqCurrOwnerC?:string;
	unitTypeC?:string;
	reqType?:string;
	illstrRevIdR?:number;
	sectSectionIdR?:string;
}

export interface GcatSectionResDto{
	templtIdR?:string;
	sectSuffixC?:string;
	sectVehicleLineC?:string;
	famprfxPrefixC?:string;
	sectS4pEffInY?:Date;
	sectS4pEffOutY?:Date;
	s4pEffPntInC?:string;
	s4PEffPntOutC?:string;
	sectSectionIdR?:string;
}

export interface GcatIllustratedResDto{
	engpCommodityC?:string;
	cmdtyTypeC?:string;
	cmdtyAvailF?:string;
	illcmdtIllDoneF?:string;
	cmdtyCompleteF?:string;
	lexcDescShrtX?:string;
	reqCreateIdC?:string;
	engpEngnrgPartR?:string;
	engpSeqR?:number;
	eioOriginC?:string;
	funcKey?:string;
	engpBluprtPrtR?:string;
	cmdtsufSuffixC?:string;
	finascEngPartR?:string;
	pLastIdC?:string;
}
export interface GcatIrpFileResDto{
	reqfileNameX?:string;
	reqfileMarkedF?:string;
	reqfileTypeC?:string;
	reqfileSizeR?:number;
}

export interface GcatIrpDateResDto{
	reqdateY?:Date;
	dttypeC?:string;
}

export interface Tracking{
	intIllustrator?:string;
	dateIntSent?:Date;
	extIllustrator?:any;
	dateExtSent?:Date;
	retIllusCoordDate?:Date;
	reqRetDate?:Date;
	actRetDate?:Date;
	effectDt?:Date;
	completeDate?:Date;
	reqDate?:Date;
	closeDate?:Date;
	rejectDate?:Date;
	artHouse?:string;
}
export interface ArtHouseResDto{
	arthouseC?:string;
	arthouseN?:string;
}

export interface EffectiveDtResDto{
	effectDateY?:Date;
	irpRegionC?:string;
}
export interface FilterIrp{
	irpNo?:number;
    illusId?:string;
    oldillusid?:string;
    myillstrid?:string;
    status?:string;
    unitType?:string;
    requester?:any;
    currentOwner?:string;
    intIllustrator?:string;
    extIllustrator?:string;
    publicationDate?:Date;
    section?:string;
    prefix?:string;
    effIn?:Date;
    effOut?:Date;
}