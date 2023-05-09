import { Component, Input, OnInit } from '@angular/core';
import { LineChartData } from '../Services/line-chart-data';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() timeSpendbyHours!: LineChartData[];
  @Input() chartTitle: string = '';


  public margin = { top: 80, right: 30, bottom: 40, left: 80 };
  public width = 800 - this.margin.left - this.margin.right;
  public height = 400 - this.margin.top - this.margin.bottom;
  public svg: any

  constructor() { }

  ngOnInit(): void {
    console.log('Init : ', this.timeSpendbyHours);
    this.createSvg();
    this.drawChart();
  }

  createSvg() {
    this.svg = d3.select('#linechart')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  drawChart() {
    //x-axis
    const x = d3.scaleTime()
      .domain(<[Date, Date]>d3.extent(this.timeSpendbyHours, (d: any) => { return d.date }))
      .range([0, this.width]);
    console.log(x.domain())

    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .style('font-size', '14px')
      .call(d3.axisBottom<Date>(x)
        .ticks(d3.timeDay.every(1))
        .tickFormat(d3.timeFormat('%d %b %Y'))
        .tickSizeOuter(0))
      .call((g: any) => g.select('.domain').remove())
      .selectAll('.tick line')
      .style('stroke-opacity', 0)
    this.svg.selectAll('.tick text')
      .attr('fill', '#777')
      .attr('transform', 'translate(90,0)');

    //y-axis
    const y = d3.scaleLinear()
      .domain([0, 3])
      .range([this.height, 0]);

    this.svg.append('g')
      .style('font-size', '14px')
      .call(d3.axisLeft(y).ticks(3)
        .tickSize(0)
        .tickPadding(10))
      .call((g: any) => g.select('.domain').remove())
      .selectAll('.tick line')
      .style('stroke-opacity', 0)
    this.svg.selectAll('.tick text')
      .attr('fill', '#777');


    //Horizontal Grid lines
    this.svg.selectAll('yGrid')
      .data(y.ticks(3))
      .join('line')
      .attr('x1', 0)
      .attr('x2', this.width)
      .attr('y1', (d: any) => y(d))
      .attr('y2', (d: any) => y(d))
      .attr('stroke', '#a8a8a8')
      .attr('stroke-width', 0.5);

    //scatter dots
    this.svg.append('g')
      .selectAll("dot")
      .data(this.timeSpendbyHours)
      .enter()
      .append("circle")
      .attr("cx", (d: any) => { return x(d.date) })
      .attr("cy", (d: any) => { return y(d.timespend) })
      .attr("r", 5)
      .style("fill", "#e93e27")
      .on('mouseover', (d: any) => {
        d3.select(d.currentTarget)
          .transition()
          .duration(500)
          .attr('r', 10)
      })
      .on('mouseout', (d: any) => {
        d3.select(d.currentTarget)
          .transition()
          .duration(500)
          .attr('r', 5)
      })
    .append('title')
    .text((d: any) => { return `Date : ${d.date} Time spend : ${d.timespend} Hours` });

    //Add line

    const line = d3.line()
      .x((d: any) => x(d.date))
      .y((d: any) => y(d.timespend));

    this.svg.append('path')
      .datum(this.timeSpendbyHours)
      .attr('fill', 'none')
      .attr('stroke', '#e93e27')
      .attr('stroke-width', 1)
      .attr('d', line);

    //Add Chart Title
    this.svg.append('text')
      .attr('class', 'chart-title')
      .attr('x', this.margin.left - 120)
      .attr('y', this.margin.top - 140)
      .style('font-size', '22px')
      .style('font-weight', 'bold')
      .style('font-family', 'sans-serif')
      .text(this.chartTitle);

  }
}
