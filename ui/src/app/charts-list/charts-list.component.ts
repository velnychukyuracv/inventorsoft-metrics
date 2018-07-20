import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';
import { ActivatedRoute } from '@angular/router';

import { ChartsService } from '../common/services/charts.service';
import { SpinnersService } from '../spinners/spinners.service';
import { NotificationService } from '../common/services/notification.service';
import { PAGE_NAVIGATION } from '../common/models/page-navigation.enum';

@Component({
    selector: 'app-charts-list',
    templateUrl: './charts-list.component.html',
    styleUrls: ['./charts-list.component.scss']
})
export class ChartsListComponent implements OnInit, OnDestroy {

    tableParams = {
        pageSize: 4,
        page: 0
    };
    totalPages: number = 1;
    chartDataList: Array<any>;
    groupId: number;

    private parametersObservable: any;
    private chartTypes: Object = {
        LINE: 'LineChart',
        BAR: 'BarChart',
        COLUMN: 'ColumnChart',
        PIE: 'PieChart',
        AREA: 'AreaChart',
        TABLE: 'Table'
    };

    constructor(private chartsService: ChartsService,
                private route: ActivatedRoute,
                private spinner: SpinnersService,
                private notification: NotificationService
    ) {
    }

    ngOnInit() {
        this.groupId = this.route.snapshot.params['id'];
        this.parametersObservable = this.route.params.subscribe(
            params => {
                this.groupId = +params['id'];
                this.buildCharts();
            }
        );
    }

    /**
     * Built charts considering groupId charts
     */
    buildCharts() {
        if (this.groupId) {
            this.getChartsByGroupId();
        } else {
            this.getCharts();
        }
    }

    /**
     * Slot for connecting to signal 'pageChanged'
     * @param {number | PAGE_NAVIGATION} $event
     */
    onPageChange($event:number | PAGE_NAVIGATION) {
        switch ($event) {
            case PAGE_NAVIGATION.PREV:
                if (this.tableParams.page > 0) {
                    --this.tableParams.page;
                }
                break;
            case PAGE_NAVIGATION.NEXT:
                if (this.tableParams.page < this.totalPages) {
                    ++this.tableParams.page;
                }
                break;
            default:
                this.tableParams.page = $event;
        }
        this.getCharts();
    }

    /**
     * Get all chart and show it on the page
     */
    getCharts():void {
        this.spinner.show();
        this.chartsService.getCharts(this.tableParams).pipe(first())
            .subscribe(data => {
                    this.chartDataList = [];
                    this.totalPages = data.totalPages;
                    this.tableParams.page = data.number;
                    data.content.forEach(
                        chart => {
                            console.log(chart.attributes);
                            this.chartsService.getDBQuery(chart).subscribe(
                                dbData => {
                                    this.chartDataList.push({
                                        name: chart.name,
                                        type: this.chartTypes[chart.type],
                                        data: dbData,
                                        options: {
                                            width:'100%'
                                        }
                                    });
                                },
                                error => {
                                    this.notification.error(`Failed data to show this chart!`)
                                }
                            );
                        }
                    );
                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`Failed chart to show this chart!`)
                }
            );
    }

    /**
     * Get all chart by group id and show it on the page
     */
    getChartsByGroupId():void {
        this.spinner.show();
        this.chartsService.getChartsByGroupId(this.groupId, this.tableParams).pipe(first())
            .subscribe(data => {
                    this.chartDataList = [];
                    this.totalPages = data.totalPages;
                    this.tableParams.page = data.number;
                     data.content.forEach(
                        chart => {
                            this.chartsService.getDBQuery(chart).subscribe(
                                dbData => {
                                    this.chartDataList.push({
                                        name: chart.name,
                                        type: this.chartTypes[chart.type],
                                        data: dbData,
                                        options: {
                                            width:'100%'
                                        }
                                    })
                                },
                                error => {
                                    this.notification.error(`Failed data to show this chart!`)
                                }
                            );
                        }
                    );
                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`Failed chart to show this chart!`)
                }
            );
    }

    ngOnDestroy() {
        this.parametersObservable.unsubscribe();
    }
}