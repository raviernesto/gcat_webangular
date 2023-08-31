export class Job1TransCurDateInput{
    region!:string;
     vehicleType!:string;
     origin!:string;
     vehicleLine!:string;
 s4pCode!:string;
}

export class Job1TransDeleteInput {
    reasonCode!: string;
    vehtypeCode!: string;
    pteioOriginC!: string;
    evlVehicleLineC!: string;
    regintC!: string;
    effiopEffInC!: string;
}

export class Job1TransVehicleLineInput{
    region!: string;
   productType!:string;
   origin:string='WERS';
   }

   export class Job1TransRegion{
    regintC!:string;
}

export class Job1TransNewDateInput{
    region!:string;
    vehicleType!:string;
    origin!:string;
    vehicleLine!:string;
    s4pCode!:string;
    newDate!:string;
}