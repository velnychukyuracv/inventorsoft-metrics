import {Directive, OnChanges,  Input, Output, EventEmitter, ElementRef} from '@angular/core';

declare const google: any;

@Directive({
  selector: '[appGoogleChart]'
})

export class GoogleChart implements OnChanges {

  @Input('chartType') public chartType: string;
  @Input('chartData') public chartData: Object;
  @Input('chartOptions') public chartOptions: Object;

  @Output('itemSelect') public itemSelect: EventEmitter<{ row: number, column: number }> = new EventEmitter();
  @Output('itemDeselect') public itemDeselect = new EventEmitter();

  constructor(public element: ElementRef) {
    this.element = this.element.nativeElement;
  }

  ngOnChanges() {
    google.charts.load('current', {'packages': ['corechart', 'gauge']['orgchart']});

    setTimeout(() => this.drawGraph(this.chartOptions, this.chartType, this.chartData, this.element));
  }


  drawGraph(chartOptions, chartType, chartData, element) {
    google.charts.setOnLoadCallback(drawChart);
    const self = this;

    function drawChart() {
      const wrapper = new google.visualization.ChartWrapper({
        chartType: chartType,
        dataTable: chartData,
        options: chartOptions
      });
      wrapper.draw(element);
      google.visualization.events.addListener(wrapper, 'select', function () {
        const selectedItem = wrapper.getChart().getSelection()[0];
        if (selectedItem) {
          let msg;
          if (selectedItem !== undefined) {
            const selectedRowValues = [];
            if (selectedItem.row !== null) {
              selectedRowValues.push(wrapper.getDataTable().getValue(selectedItem.row, 0));
              selectedRowValues.push(wrapper.getDataTable().getValue(selectedItem.row, selectedItem.column));
              msg = {
                message: 'select',
                row: selectedItem.row,
                column: selectedItem.column,
                selectedRowValues: selectedRowValues
              };
            }
          }
          self.itemSelect.emit(msg);
        } else
          self.itemDeselect.emit();
      });
    }
  }
}
