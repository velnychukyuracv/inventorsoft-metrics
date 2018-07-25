import { Directive, OnChanges, HostListener, Input, ElementRef } from '@angular/core';

declare const google: any;

@Directive({
  selector: '[appGoogleChart]'
})

export class GoogleChart implements OnChanges {

  @Input('chartType') public chartType: string;
  @Input('chartData') public chartData: Object;
  @Input('chartOptions') public chartOptions: Object;


  /**
   * redraw chart of responsive display
   */
  @HostListener('window:resize', ['$event']) onResize() {
      this.drawGraph(this.chartOptions, this.chartType, this.chartData, this.element);
  }

  constructor(public element: ElementRef) {
    this.element = this.element.nativeElement;
  }

  ngOnChanges() {
    google.charts.load('current', {'packages': ['corechart', 'gauge']['orgchart']});

    setTimeout(() => this.drawGraph(this.chartOptions, this.chartType, this.chartData, this.element));
  }

  /**
   * draw chart
   * @param {Object} chartOptions - options for chart
   * @param {string} chartType - type chart
   * @param {Array} chartData - data for chart
   */
  drawGraph(chartOptions, chartType, chartData, element) {
    google.charts.setOnLoadCallback(()=> {
      const wrapper = new google.visualization.ChartWrapper({
        chartType: chartType,
        dataTable: chartData,
        options: chartOptions
      });
      wrapper.draw(element);
    });
  }
}