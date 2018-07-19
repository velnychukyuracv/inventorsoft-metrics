import { Component, OnChanges, Input } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';

import { ChartsService } from '../../common/services/charts.service';
import { SpinnersService } from '../../spinners/spinners.service';
import { NotificationService } from '../../common/services/notification.service';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})

export class PreviewComponent implements OnChanges {
    @Input() id: number;
    chart: Object;
    name: string;

    private chartTypes: Object = {
        LINE: 'LineChart',
        BAR: 'BarChart',
        COLUMN: 'ColumnChart',
        PIE: 'PieChart',
        AREA: 'AreaChart',
        TABLE: 'Table'
    };

    constructor(private chartService:ChartsService,
                private spinner: SpinnersService,
                private notification: NotificationService) {
    }

    ngOnChanges() {
        this.getChartByID(this.id);
    }

    /**
     * Get chart by id and show it on the page
     * @param {id} id chart to show
     */
    getChartByID(id):void {
        this.spinner.show();
        this.chartService.getChartById(id).pipe(first())
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
                            this.notification.error(`Failed data to show this chart!`)
                        }
                    );
                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                }
            );
    }
}