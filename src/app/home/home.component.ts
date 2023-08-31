import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any[]=[];
  displayKey:boolean=false;

  constructor() { }

  ngOnInit(): void {

    this.data = [
      { value: 'Row1'},
      { value: 'Row2' },
      { value: 'Row3' },
      { value: 'Row4' },
      { value: 'Row5' },
      { value: 'Row6' },
      { value: 'Row7' },
      { value: 'Row8' },
      { value: 'Row9' },
      { value: 'Row10' },
      { value: 'Row11' },
      { value: 'Row12' },
      { value: 'Row13' },
  ];

  }

  keyData(){
    this.displayKey=true;
  }



}
