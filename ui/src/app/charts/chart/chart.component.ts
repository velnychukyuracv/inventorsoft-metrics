import { Component, OnInit, Input,  OnChanges } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';

import { ChartShowService } from './../../common/services/chart-show.service';
import { ChartsService } from "../../common/services/charts.service";


@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

    @Input('id') public id: number;
    @Input('chart') public chart: any;

    private chartTypes:Object = {
        LINE: 'LineChart',
        BAR: 'BarChart',
        COLUMN: 'ColumnChart',
        PIE: 'PieChart',
        AREA: 'AreaChart',
        TABLE: 'Table'
    };

    chartList = [];

    constructor(private chartService:ChartShowService,
                private getChartService:ChartsService) {
    }

    ngOnChanges() {
          console.log(this.id);
          //TODO use this life hook to get one chart this.getChart();
    }

    ngOnInit(){
        this.getCharts()
    }


    getChartByID(id):void{
         this.getChartService.getChartById(id).pipe(first())
         .subscribe(data=>{
            console.log(data);
          })
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
