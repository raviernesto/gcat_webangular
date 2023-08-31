export class Section {
    newSection?:boolean;
    sectionId: string="";
    tempId: string="";
    commodity: string="";
    group?: string;
    lexc?: string;
    lexcDesc?: string;
    tempType?: string;
    vehLine?: string;
    vehDesc?: string;
    prefix?: string;
    prefixDesc?: string;
    notes?: string;
    help?: string;
    tempTypeDesc?: string;
    identity: string="";
    errMsg?: string;
    suffix:string="";
	status?:string;
	sectFeat?:string;
	sectComm?:string;
	effIncode?:string;
	effIndate:string="";
	effOutcode?:string;
    effOutdate:string="";
    
    partner?:boolean;
	splTiming?:boolean;

    temp: Templates[] = [];
    sect:SectionPrefix[]=[];
    prefixs?:SectionPrefix[]=[];
    
    tempChange?:boolean;
    sectChange?:boolean;
    preChange?:boolean;
    tempAdded?: Templates[] = [];
    tempDeleted?: Templates[] = [];
    sectAdded?:SectionPrefix[]=[];
    sectDeleted?:SectionPrefix[]=[];
    prefixAdded?:SectionPrefix[]=[];
    prefixDeleted?:SectionPrefix[]=[];
}

export class Templates {
    commodity?: string;
    lexc?: string;
    status?: string;
    lexcDesc?: string;
    flag?:boolean;
}

export class SectionPrefix {
    exclude?:boolean;
    dBstatus?:string;
    lexc?: string;
    propCode?: string;
    lexcType?: string;
    value?: string;
    source?: string;
    lexcDesc?: string;
    lexcDescX?: string;
}

export class TempSection{
    sectId?:string;
	tempId?:string;
	sectSuffix?:string;
	lexc?:string;
	lexcDesc?:string;
	vehLine?:string;
	effIn?:string;
}
