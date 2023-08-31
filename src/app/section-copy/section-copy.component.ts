import { Component, OnInit } from '@angular/core';
import { SectionCopy } from '../models/section.class';
import { SectionCopyService } from '../services/section.service';
import { WorkBreakdownStructureComponent } from '../work-breakdown-structure/work-breakdown-structure.component';

@Component({
  selector: 'app-section-copy',
  templateUrl: './section-copy.component.html',
  styleUrls: ['./section-copy.component.css']
  
})

export class SectionCopyComponent implements OnInit {
  display: boolean = true;
  data: any[] = [];
  sectionCopy: SectionCopy = { table: [], suffixList: [] };
  sectionCopySelect: SectionCopy = { table: [], suffixList: [] };
  suffix: any={};
  alert: any = { flag: false, msg: "" };
  tempTable1: any = [];
  tempTable: any = [];
  clickAll: boolean = false;
  ddDisable=false;
  section1=true;
  section2=false;
  buttonEnable:boolean=true;
  startsWith="startsWith";
  
  constructor(private copy: SectionCopyService, private wbs:WorkBreakdownStructureComponent) { }

  ngOnInit(): void {
    let sectionId =localStorage.getItem('sectionId') || "";
    console.log(sectionId);
    if(sectionId!=""){
    this.copy.onCopyLoad(sectionId).subscribe((data: any) => {
      console.log(data);//2641,28954
      this.section1=false;
      this.sectionCopy = data;
      this.tempTable = this.sectionCopy.table;
      if(this.sectionCopy.table.length==0){
        console.log("No parts in the section. Cannot perform copy function");
        this.closeSection();
        this.wbs.alertPopup("No Parts available in this Section, so Cannot perform Copy Function");
        
      } else if(this.sectionCopy.suffixList.length==0){
        console.log("No Additional Completed Sections Available for copying");
        this.closeSection();
        this.wbs.alertPopup("No Additional Completed Sections Available for Copying");
        
      }else 
      if(this.sectionCopy.suffixList.length==1){
        this.display = true;
        this.section2=true;
        this.copy.onCopyLoad(this.sectionCopy.suffixList[0].sectionId).subscribe((data1: any) => {
          console.log(data1);
          this.section2=false;
          this.sectionCopySelect = data1;
          this.suffix=this.sectionCopy.suffixList[0];
          this.ddDisable=true;
          console.log(this.sectionCopySelect.table.length);
          
        });
      }
      
    });
  }
  }

  changeSuffix() {
    console.log(this.suffix.sectionId);
    this.section2=true;
    this.copy.onCopyLoad(this.suffix.sectionId).subscribe((data: any) => {
      console.log(data);
      this.section2=false;
      this.sectionCopySelect = data;
    });
    this.ddDisable=true;
  }

  clickedCopy(event:any) {
    let selectedRow: number=event.index;
    console.log(this.suffix);
    if(this.suffix==null){
      this.alertPopup("Please select a Section from the Dropdown");
    }else{
    console.log(this.tempTable[selectedRow]);
      console.log("Else");
      let count = 0;
      for (const element of this.sectionCopySelect.table) {
        if (element.engpEngnrgPartR == this.tempTable[selectedRow].engpEngnrgPartR &&
          element.eioOriginC == this.tempTable[selectedRow].eioOriginC &&
          element.engpSeqR == this.tempTable[selectedRow].engpSeqR &&
          element.engpCommodityC == this.tempTable[selectedRow].engpCommodityC &&
          element.cmdtytypec == this.tempTable[selectedRow].cmdtytypec)
          count++;
      }
      if (count > 0){
        this.alertPopup("Usage already exists");
        this.tempTable1.splice(this.tempTable1.length-1,1);
      }
    
    console.log(this.tempTable1);
  }
  }

  copySection() {
    console.log(this.tempTable);
    if (this.suffix==null) {
      this.alertPopup("Please select a section to proceed");
    } else {
      const input = { table: this.tempTable1, sectId: this.suffix.sectionId, oldSectId: this.sectionCopy.sectId };
      console.log(input);
      this.copy.copySection(input).subscribe((data: any) => {
        if (data){
          this.clickAll=false;
          this.alertPopup("Usage copied successfully");
          for(const element of this.tempTable1)
           this.sectionCopySelect.table.push(element);
          console.log(this.sectionCopySelect.table);
          this.tempTable1=[];
          
        }
        else
          this.alertPopup("Usage copy not successful");
      });
    }
  }

  copyAll() {
    console.log("Inside Click All");
    console.log(this.clickAll);
    if(this.suffix==null){
      this.alertPopup("Please select a Section from the Dropdown");
      this.tempTable1 = [];
    }else{
    if (!this.clickAll) {
      console.log("If");
      this.tempTable1 = [];
      this.clickAll = true;
      this.buttonEnable=false;
      let count1 = 0;
      let count = 0;
      for (const element of this.tempTable) {
        count1=0;
        const filterdObj =this.sectionCopySelect.table.filter(element1=>{
          if(element.engpEngnrgPartR == element1.engpEngnrgPartR &&
            element.eioOriginC == element1.eioOriginC &&
            element.engpSeqR == element1.engpSeqR &&
            element.engpCommodityC == element1.engpCommodityC &&
            element.cmdtytypec == element1.cmdtytypec){
      console.log("Include");
      count++;
      count1++;
    }
        });
     
      if(count1==0)
        this.tempTable1.push(element);        
     }
     if (count > 0)
        this.alertPopup("Usage already exists");
     } else {
      console.log("Else");
      this.clickAll = false;
      this.buttonEnable=true;
      this.tempTable1 = [];
    }
  }
    console.log(this.tempTable1);

  }

  alertPopup(data: string) {
    this.alert.flag = true;
    this.alert.msg = data;
  }


  closeOk() {
    this.alert.flag = false;
  }

  closeSection(){
    this.display=false;
    this.wbs.copyClose();
  }

  copyClicked1(event:any){
    console.log(this.tempTable1);
    if(this.suffix==null){
      this.alertPopup("Please select a Section from the Dropdown");
      this.tempTable1.splice(this.tempTable1.length-1,1);
    }else{
    let count = 0;
      for (const element of this.sectionCopySelect.table) {
        if (element.engpEngnrgPartR == event.data.engpEngnrgPartR &&
          element.eioOriginC == event.data.eioOriginC &&
          element.engpSeqR == event.data.engpSeqR &&
          element.engpCommodityC == event.data.engpCommodityC &&
          element.cmdtytypec == event.data.cmdtytypec)
          count++;
      }
      if (count > 0){
        this.alertPopup("Usage already exists");
        this.tempTable1.splice(this.tempTable1.length-1,1);
      }
    }
    console.log(this.tempTable1);
    this.buttonEnable=false;
  }

  copyClicked2(rowIndex:number){
    console.log(rowIndex);
    let count=-1;
    let count1=0;
    console.log(this.tempTable1);
    console.log(this.sectionCopy.table[rowIndex]);
    const filterdObj =this.tempTable1.filter((element1:any)=>{
      count++;
      if(this.sectionCopy.table[rowIndex].engpEngnrgPartR == element1.engpEngnrgPartR &&
        this.sectionCopy.table[rowIndex].eioOriginC == element1.eioOriginC &&
        this.sectionCopy.table[rowIndex].engpSeqR == element1.engpSeqR &&
        this.sectionCopy.table[rowIndex].engpCommodityC == element1.engpCommodityC &&
        this.sectionCopy.table[rowIndex].cmdtytypec == element1.cmdtytypec){
          console.log("Alreadly selected");
          count1++;
      }
    });
    if(count1>0){
      console.log(this.sectionCopy.table[count]);
      this.tempTable1.splice(count,1);
    }else{
      this.tempTable1.push(this.sectionCopy.table[rowIndex]);
    }
    // console.log(this.tempTable1);
  }
}

