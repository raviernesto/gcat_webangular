export class Details{
  
    engpCommodityC?:string;
    cmdtyTypeC?:string;
    designationC?:string;
    statusCodeC?:string;
    lexcDescLongX?:string;

}

export class Basedetails{
engpBaseR?:string;
        
}

export class Commoditydetails{
    engpCommodity?:string;
}

export class CommodityTemplate{
    templtId?:string;
    lexcDescLongX?: string;
}

export class Vehicletype{
    name?:string;
  }

export class CommoditySection{
    templtIdR?:string;
    sectSuffixC?: string;
    sectVehicleLineC?: string;
    statusCodeC?:string;
    s4pPntIn?:string; 
    sectS4pIn?:string; 
    s4pPntOut?:string; 
    sectS4pOut?:string; 
    lexcDescLongX?:string; 
    sectVehicleDescC?:string; 
}