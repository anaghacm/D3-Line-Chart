import { Component, OnInit } from '@angular/core';
import { LineChartData } from '../Services/line-chart-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public timeSpendbyHours:LineChartData[]=[
    {date:new Date('2023-1-23 12:00:00 AM'), timespend:0.1},
    {date:new Date('2023-1-23 12:00:00 PM'), timespend:1.40},
    {date:new Date('2023-1-23 10:00:00 PM'), timespend:0.5},
    {date:new Date('2023-1-24 6:00:00 AM'), timespend:2.9},
    {date:new Date('2023-1-24 6:00:00 PM'), timespend:1.9},
    {date:new Date('2023-1-25 6:00:00 AM'), timespend:0.25},
    {date:new Date('2023-1-25 6:00:00 PM'), timespend:2.9},
  ]

  public chartTitle='Time Spend by Hours';

  constructor() { }

  ngOnInit(): void {
  }

}
