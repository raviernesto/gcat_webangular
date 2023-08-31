export class CommodityDetails {
	commodity: string = "";
	commodityWq: any = {};
	vehicleType: string = "";
	commodityName: string = "";
	changesInPF?:boolean;
	newCommodity:boolean=false;
	
	generalEP: GeneralEP = {geRemarks: "", geStatus: "", geCalibration: "", geKit: "", geIllustrated: "", geServiced: "", geVisual: "", geColor: "", gePartList: "", geAccessory: "", geCrashRepair: "", geExchange: "", geFastMovingPart: "", geInitialStock: "", geMotorcraft: "",};
	buildCommodity: BuildCommodity = {sCommodityCode:"", sCommodityName:"", sVehicleType:"",lexc:"",existingBaseDetailList:[],deleteBaseDetailList:[]};
	primaryFeatures: PrimaryFeatures[] = [];
	qualifiers:QualfiersTab={};
	summarize: Summarization = {};

	enableSave?:boolean;
	status:Status={};
}

export class BuildCommodity {
	changes?:boolean;
	classChange?:boolean;
	baseChange?:boolean;
	nameChange?:boolean;
	classType?: string;
	sCommodityCode: string="";
	sCommodityName: string="";
	sVehicleType: string="";
	lexc: string="";
	baseCriteria?: string;
	baseView?:string;
	newBaseDetailsCount?: number;
	existingBaseDetailList: ExistingBaseDetailList[] = [];
	addedBaseDetailList?: ExistingBaseDetailList[] = [];
	deleteBaseDetailList: ExistingBaseDetailList[] = [];
}

export class CommodityCodeList {
	commodityCode?: string;
	vehicleType?: string;
	lexc?: string;
	commodityName?:string;
}

export class CommodityWq {
	commodity?: string;
	reasonCode?: string;
	vehicleType?: string;
	desc?:string;
	dropdown?: string;
}

export class LexcDesc{
	lexcType: string="";
	lexcCode: string="";
	lexcDesc: string="";
}
export class ExistingBaseDetailList {
	base?: string;
	origin?: string;
	desc?: string;
	baseDesc?: string;
	flag?:boolean;
}

export class NewBaseDetails {
	base?: string;
	engbaseNew?: string;
	baseDesc?: string;
	origin?: string;	
	lexc?: string;
	vehicleType?:string;
	commodities?:string;
	flag?:boolean;
}

export class GeneralEP {
	commodity?:string;
	vehicleType?:string;
	geChanges?:boolean;

	geRemarks?:string;
	geStatus?:string;
	geCalibration?:string;
	geKit?:string;
	geIllustrated?:string;
	geServiced?:string;
	geVisual?:string;
	geColor?:string;
	gePartList?:string;
	geAccessory?:string;
	geCrashRepair?:string;
	geExchange?:string;
	geFastMovingPart?:string;
	geInitialStock?:string;
	geMotorcraft?:string;
}

export class PrimaryFeatures {
	changes?:boolean;
	pfc?: string;
	pfcDesc?: string;
	recommended?: boolean;
	discretionary?: boolean;
}

export class QualfiersTab {
	changes?:boolean;
	qualifierA?: any = [];
	qualifierS?: any = [];
	qualifierM?: any = [];
	qualifierAdded?: Qualfiers[] = [];
	qualifierDeleted?: Qualfiers[] = [];
}

export class Qualfiers {
	type?: string;
	propCode?: string;
	propDesc?: string;
	recommended?: boolean;
}
export class Summarization {
	commodity?:string;
	vehicleType?:string;
	change?:boolean;

	simpleWhen?: string;
	simpleWhenCodes?: string = "4";
	simpleHow?: string;
	sumWhen?: string;
	sumWhenLines?: string = "6";
	sumHow?: string;
}

export class Status {
	changes?:boolean;
	status?:string;
	buildCommodity?:string;
	general?:string;
	primaryFeatures?:string;
	qualifier?:string;
	summary?:string;
}

export class ChangeCommodity{
	oldCommodity?:string;
	commodity:string="";
	oldVehicleType?="";
	vehicleType?:string;
	flag?:boolean;
	message?:string;
}

export class EngineeringBase {
    engpBaseR: string = "";
    engBaseEioOrigC: string = "";
    engBaseNewF: string = "";
    engBaseDescX: string = "";
}

export class BaseUpdate{
	flag?:boolean;
	commodity?:string;
	vehicleType?:string;
	base?:string;
	origin?:string;
	designation?:string;
}