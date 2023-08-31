import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-educationusageinformation',
  templateUrl: './educationusageinformation.component.html',
  styleUrls: ['./educationusageinformation.component.css']
})
export class EducationusageinformationComponent implements OnInit {

  constructor() { }

  PciiTiming : any =[
    {region : "A Pacific",codeIn:"AX",dateIn:"12-Jan-2022", sourceIn:"RR",codeOut:"EE",dateOut:"18-Jan-2022", sourceOut :"6"},
    {region : "A Pacific",codeIn:"AX",dateIn:"12-Mar-2022", sourceIn:"FF",codeOut:"TH",dateOut:"18-Mar-2022", sourceOut :"6"}
  ]

  data = [
    { value: 'Row1'},
    { value: 'Row2' },
    { value: 'Row3' },
    { value: 'Row4' },
    { value: 'Row5' },
    { value: 'Row6' },
    { value: 'Row7' },
];

  ngOnInit(): void {
  }

}
