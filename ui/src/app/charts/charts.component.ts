import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/internal/operators/first";

import {ChartShowService} from "../common/services/chart-show.service";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  private chartTypes:Object = {
    LINE: 'LineChart',
    BAR: 'BarChart',
    COLUMN: 'ColumnChart',
    PIE: 'PieChart',
    AREA: 'AreaChart',
    TABLE: 'Table'
  };

  chartList = [];

  constructor(private chartService:ChartShowService) {
  }

  ngOnInit() {
    this.getCharts()
  }


  getCharts():void {
    this.chartService.getCharts().pipe(first())
        .subscribe(data => {
              data.content.forEach(
                  chart => {
                    this.chartService.getDBQuery(chart).subscribe(
                        dbData => {
                          this.chartList.push({
                            type: this.chartTypes[chart.type],
                            data: dbData,
                            options: {
                              width:'100%'
                            }
                          })
                        },
                        error => {

                        }
                    );
                  }
              );
            },
            error => {

            });
  }




}
