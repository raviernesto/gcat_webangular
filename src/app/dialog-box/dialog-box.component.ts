import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  illustrationDetails: boolean = false;
  region:boolean = false;
  lexiconCodeReplacement:boolean = false;
  lexiconSearch:boolean = false;
  lexiconReply: boolean = false;
  

  LexiconCode=[
    {LexiconCode:""},
    {LexiconCode:"Option1"},
    {LexiconCode:"Option2"}
  ];
  LexiconCodes=[
    {LexiconCodes:""},
    {LexiconCodes:"Option1"},
    {LexiconCodes:"Option2"}
  ];
  MinorFeature=[
    {MinorFeature:""},
    {MinorFeature:"Option1"},
    {MinorFeature:"Option2"}
  ];
  MinorFeatures=[
    {MinorFeatures:""},
    {MinorFeatures:"Option1"},
    {MinorFeatures:"Option2"}
  ];
  LexiconType=[
    {LexiconType:""},
    {LexiconType:"Option1"},
    {LexiconType:"Option2"}
  ];
  LexiconTypes=[
    {LexiconTypes:""},
    {LexiconTypes:"Option1"},
    {LexiconTypes:"Option2"}
  ];
  Property=[
    {Property:""},
    {Property:"Option1"},
    {Property:"Option2"}
  ];
  Footer=[
    {Footer:""},
    {Footer:"Option1"},
    {Footer:"Option2"}
  ];
  Footers=[
    {Footers:""},
    {Footer:"Option1"},
    {Footers:"Option2"}
  ];
  constructor() { }
 
  ngOnInit(): void {
    
  }
  IllustrationDetails() {
    this.illustrationDetails = true;

  }
  Region(){
    this.region = true;
  }
  LexiconCodeReplacement(){
    this.lexiconCodeReplacement = true;
  }
  LexiconSearch(){
    this.lexiconSearch = true;
  }
  LexiconReply(){
    this.lexiconReply = true;
  }
}
