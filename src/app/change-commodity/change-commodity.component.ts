import { Component, OnInit } from '@angular/core';
import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-change-commodity',
  templateUrl: './change-commodity.component.html',
  styleUrls: ['./change-commodity.component.css']
})
export class ChangeCommodityComponent implements OnInit {
  display: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
