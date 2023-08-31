export class Node{
    label:string="";
	type:string="";
	tempId:string="";
	sectId:string="";
	group:string="";
	commodity:string="";
	prefix:string="";
	suffix?:string;
	vehLine:string="";
	desc:string="";
	leaf?:boolean;
	illId:string="";
}

export class Wbs {
    vehLine?:string;
    prtDesc?:string;

}

export class WbsCopy{
	sectId:string="";
	cmdtyType:string="";
	vehLine:string="";
	vehDesc:string="";
	prefix:string="";
	prefDesc:string="";
	isComm:string="";
	isPref:string="";
	secCount?:number;
	group?:string;
	msg:string="";
}