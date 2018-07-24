import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../common/services/charts.service';
import { SpinnersService } from '../spinners/spinners.service';
import { Chart } from '../common/models/chart.model';
import { NotificationService } from '../common/services/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataSource } from '../common/models/data-source.model';
import { Group } from '../common/models/group.model';
import { GroupsService } from '../common/services/groups.service';

import { DataSourcesService } from '../common/services/data-sources.service';
import { first } from 'rxjs/operators';
import { TableParams } from '../common/models/table-params.model';
import { PAGE_NAVIGATION } from '../common/models/page-navigation.enum';

@Component({
    selector   : 'app-charts-management',
    templateUrl: './charts-page.component.html',
    styleUrls  : ['./charts-page.component.scss']
})
export class ChartsPageComponent implements OnInit {
    charts: Chart[];
    chartForm: FormGroup;
    dataSources: DataSource[];
    groups: Group[];
    selectedChartId: number;
    tableParams: TableParams = {
        pageSize: 2,
        page    : 0
    };
    totalPages: number = 0;

    private isIntegerPattern = /^\d+$/;
    private columnsPattern = /^\s*?(?:\d+\,\s*)*\d+?\s*$/;

    constructor(
        private chartService: ChartsService,
        private spinner: SpinnersService,
        private notification: NotificationService,
        private dataSourceService: DataSourcesService,
        private groupService: GroupsService) {
        this.charts = [];
        this.dataSources = [];
        this.groups = [];
    }

    ngOnInit() {
        this.getCharts();
        this.initChartForm();
    }

    /**
     * Slot for connecting to signal 'onSearch'
     * @param $event
     */
    onSearch($event): void {
        if ($event) {
            this.tableParams.query = $event;
        }
        else {
            delete this.tableParams.query;
        }
        this.getCharts();
    }

    /**
     * Slot for connecting to signal 'sorted'
     * @param $event
     */
    onSorted($event): void {
        this.tableParams.sortBy = $event.sortBy;
        this.tableParams.direction = $event.direction;
        this.getCharts();
    }

    /**
     * Slot for connecting to signal 'pageChanged'
     * @param {number | PAGE_NAVIGATION} $event
     */
    onPageChange($event: number | PAGE_NAVIGATION): void {
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
                this.tableParams.page = $event as number;
        }
        this.getCharts();
    }

    /**
     * Get a list of all charts-list and show it on the page
     */
    getCharts(): void {
        this.spinner.show();
        this.chartService.getCharts(this.tableParams).pipe(first())
            .subscribe(
                (data) => {
                    this.totalPages = data.totalPages;
                    this.tableParams.page = data.number;
                    data.content.map(element => {
                        element.createdAt[1] -= 1;
                        element.createdAt[6] /= 1000000;
                        let [createdYear, createdMonth, createdDay, createdHour, createdMinute, createdSecond, createdMs] = element.createdAt;
                        element.createdAt = new Date(Date.UTC(createdYear, createdMonth, createdDay, createdHour, createdMinute, createdSecond, createdMs));

                        element.updatedAt[1] -= 1;
                        element.updatedAt[6] /= 1000000;
                        let [updatedYear, updatedMonth, updatedDay, updatedHour, updatedMinute, updatedSecond, updatedMs] = element.updatedAt;
                        element.updatedAt = new Date(Date.UTC(updatedYear, updatedMonth, updatedDay, updatedHour, updatedMinute, updatedSecond, updatedMs));
                    });
                    this.charts = data.content;
                    this.spinner.hide();
                }, (error) => {
                    this.spinner.hide();
                    this.notification.error('Failed to get list of charts-list');
                }
            )
    }

    /**
     * Init the chart input form and set up validation for fields
     */
    initChartForm(): void {
        this.chartForm = new FormGroup({
            attributes       : new FormControl(null, [Validators.required, Validators.minLength(2)]),
            dataSourceDbRepId: new FormControl(null, [Validators.required]),
            filterColumns    : new FormControl(null, [Validators.required, Validators.pattern(this.columnsPattern)]),
            groupId          : new FormControl(null, [Validators.required]),
            name             : new FormControl(null, [Validators.required]),
            order            : new FormControl(null, [Validators.required, Validators.pattern(this.isIntegerPattern)]),
            query            : new FormControl(null, [Validators.required]),
            type             : new FormControl(null, [Validators.required]),
            visibleColumns   : new FormControl(null, [Validators.required, Validators.pattern(this.columnsPattern)])
        });
    }

    /**
     * Get a list of all data sources
     */
    getDataSources(): void {
        this.dataSourceService.getDataSources(null).pipe(first())
            .subscribe(data => this.dataSources = data.content);
    }

    /**
     * Get a list of all groups
     */
    getGroups(): void {
        this.groupService.getGroups().pipe(first())
            .subscribe(data => this.groups = data.content);
    }

    /**
     * Get charts attributes value and transformation at json string
     */
    toStringifyChartsOptions():void{
        Object.keys(this.chartForm.controls).forEach(key => {
            if (key === "attributes"){
                let attributes = JSON.stringify(this.chartForm.value.attributes);
            }
        });
    }

    /**
     * Create a chart
     */
    createChart(): void {
        this.spinner.show();
        this.toStringifyChartsOptions();
        this.chartService.createChart(this.chartForm.value).pipe(first())
            .subscribe(response => {
                this.spinner.hide();
                this.getCharts();
                this.chartForm.reset();
                this.notification.success('You have successfully added new chart');
            }, error => {
                this.spinner.hide();
                this.notification.error('Failed to create new chart"');
            })
    }

    /**
     * Open window that creates new chart.
     */
    openCreateModal(): void {
        this.getDataSources();
        this.getGroups();
        if (this.selectedChartId) {
            this.chartForm.reset();
            this.selectedChartId = undefined;
        }
    }

    /**
     * Open window that confirms chart deleting
     * @param {number} chartId - id chart to delete
     */
    openConfirmDeleteModal(chartId: number): void {
        this.selectedChartId = chartId;
    }

    /**
     * Open the chart input form for editing a chart and autocomplete it
     * @param {number} chartId - id chart to delete
     */
    openEditModal(chartId: number): void {
        this.selectedChartId = chartId;
        this.getDataSources();
        this.getGroups();
        this.chartService.getChartById(chartId).pipe(first())
            .subscribe(response => {
                this.chartForm.patchValue(response);
            });
    }

    /**
     * Preview the chart on modal window
     * @param {number} chartId
     */
    previewChart(chartId: number): void {
        this.selectedChartId = chartId;
    }

    /**
     * Delete a chart
     */
    deleteChart(): void {
        this.spinner.show();
        if (this.selectedChartId) {
            this.chartService.deleteChart(this.selectedChartId).pipe(first())
                .subscribe(
                    response => {
                        this.spinner.hide();
                        this.getCharts();
                        this.notification.success(
                            `You have successfully deleted chart with id ${this.selectedChartId}`
                        );
                    }, error => {
                        this.spinner.hide();
                        this.notification.error(`Failed to delete chart with id ${this.selectedChartId}`);
                    }
                )
        }
    }

    /**
     * Edit a chart
     */
    editChart(): void {
        this.spinner.show();
        this.toStringifyChartsOptions();
        this.chartService.editChart(this.selectedChartId, this.chartForm.value).pipe(first())
                .subscribe(
                    response => {
                        this.spinner.hide();
                        this.getCharts();
                        this.notification.success(
                            `You have successfully edited chart with id ${this.selectedChartId}`
                        );
                    }, error => {
                        this.spinner.hide();
                        this.notification.error(`Failed to edit chart with id ${this.selectedChartId}`);
                    }
                );
    }
}