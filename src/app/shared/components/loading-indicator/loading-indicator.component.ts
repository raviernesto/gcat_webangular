import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit {

@Input() loading=false;
  constructor() { }

  ngOnInit(): void {
  }

}
