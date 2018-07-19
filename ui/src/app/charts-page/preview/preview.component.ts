import { Component, OnChanges, Input} from '@angular/core';
import {first} from "rxjs/internal/operators/first";
import {ChartShowService} from "../../common/services/chart-show.service";
import {ChartsService} from "../../common/services/charts.service";

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})

export class PreviewComponent implements OnChanges {


    @Input() id:number;

    private chartTypes:Object = {
        LINE: 'LineChart',
        BAR: 'BarChart',
        COLUMN: 'ColumnChart',
        PIE: 'PieChart',
        AREA: 'AreaChart',
        TABLE: 'Table'
    };



    chart;


    constructor(private getChartService:ChartsService,
                private chartService:ChartShowService) {
    }

    ngOnChanges() {
        console.log('chart id test 2=', this.id);
        this.getChartByID(this.id);
    }


    getChartByID(id):void {
        this.getChartService.getChartById(id).pipe(first())
            .subscribe(chart => {
                    this.chartService.getDBQuery(chart).subscribe(
                        dbData => {
                            this.chart = {
                                name: chart.name,
                                type: this.chartTypes[chart.type],
                                data: dbData,
                                options: {
                                    width: '100%'
                                }
                            }
                        },
                        error => {

                        }
                    );
                },
                error => {
                });
    }


}
