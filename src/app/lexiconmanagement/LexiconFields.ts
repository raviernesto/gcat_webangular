export class LexiProperty {

    propertyCode:string="";
    type:string="";
property:string="";
discription:string="";
}
export class lexiType{
    key:string="";
    value:string="";
}
export class tableDetails{
    sNo:number=1;
    type:string='';
    flag:string='';
    discription:string='';
}

export interface FilterTable{

    sNo?:number;

    lexiCode?:string;

    lexType?:string;

    lexiFamily?:string;

    

    lexiDisc?:string;

    flag?:string;

    actionBy?:string;

    actionDate?:string;
}

export class AvsTableFields{

    property:any="";

    proValue:any="";

    source:any="";

    longDisc:any="";
    lexi:any="";
    lexiCode:any="";

}

export class inputdataAvs{

    lexiconGroupavs:any="";

    lexicode:any="";

}
