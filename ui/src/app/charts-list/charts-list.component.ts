import { Component, OnInit, OnDestroy } from '@angular/core';
import {first} from 'rxjs/internal/operators/first';
import { ActivatedRoute } from '@angular/router';

import { ChartShowService } from '../common/services/chart-show.service';
import { PAGE_NAVIGATION } from '../common/models/page-navigation.enum';
import { SpinnersService } from '../spinners/spinners.service';

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
    totalPages:number = 1;

    private chartTypes:Object = {
        LINE: 'LineChart',
        BAR: 'BarChart',
        COLUMN: 'ColumnChart',
        PIE: 'PieChart',
        AREA: 'AreaChart',
        TABLE: 'Table'
    };

    chartDataList = [];

    groupId:number;

    private parametersObservable: any;

    constructor(private chartService:ChartShowService,
                private route:ActivatedRoute,
                private spinner: SpinnersService
    ) {
    }

    ngOnInit() {
        this.groupId = this.route.snapshot.params['id'];

        this.parametersObservable = this.route.params.subscribe(
            params => {
                this.groupId = +params['id'];
                this.initializeComponent();
            }
        );
    }



    private initializeComponent() {
        this.buildCharts();
    }

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


    getCharts():void {
        this.spinner.show();
        this.chartService.getCharts(this.tableParams).pipe(first())
            .subscribe(data => {
                    this.chartDataList = [];
                    this.totalPages = data.totalPages;
                    this.tableParams.page = data.number;
                    data.content.forEach(
                        chart => {
                            this.chartService.getDBQuery(chart).subscribe(
                                dbData => {
                                    this.chartDataList.push({
                                        name: chart.name,
                                        type: this.chartTypes[chart.type],
                                        data: dbData,
                                        options: {
                                            width: '100%'
                                        }
                                    })
                                },
                                error => {
                                    // TODO: Show error notification
                                }
                            );
                        }
                    );
                    this.spinner.hide();
                    // TODO: Show success notification
                },
                error => {
                    this.spinner.hide();
                    // TODO: Show error notification
                });
    }

    getChartsByGroupId():void {
        this.spinner.show();
        this.chartService.getChartsByGroupId(this.groupId, this.tableParams).pipe(first())
            .subscribe(data => {
                    this.chartDataList = [];
                    this.totalPages = data.totalPages;
                    this.tableParams.page = data.number;
                     data.content.forEach(
                        chart => {
                            this.chartService.getDBQuery(chart).subscribe(
                                dbData => {
                                    this.chartDataList.push({
                                        name: chart.name,
                                        type: this.chartTypes[chart.type],
                                        data: dbData,
                                        options: {
                                            width: '100%'
                                        }
                                    })
                                },
                                error => {
                                    // TODO: Show error notification
                                }
                            );
                        }
                    );
                    this.spinner.hide();
                    // TODO: Show success notification
                },
                error => {
                    this.spinner.hide();
                    // TODO: Show error notification
                });
    }

    ngOnDestroy() {
        this.parametersObservable.unsubscribe();
    }
}
