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

@Component({
    selector   : 'app-charts',
    templateUrl: './charts-page.component.html',
    styleUrls  : ['./charts-page.component.scss']
})
export class ChartsPageComponent implements OnInit {
    charts: Chart[];
    chartForm: FormGroup;
    dataSources: DataSource[];
    groups: Group[];
    selectedChartId: number;

    private isIntegerPattern = /^\d+$/;
    private columnsPattern = /^\s*?(?:\d+\,\s*)*\d+?\s*$/;

    constructor(
        private chartsService: ChartsService,
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
        this.getDataSources();
        this.getGroups();
        this.initChartForm();
    }

    /**
     * Get a list of all charts and show it on the page
     */
    getCharts(): void {
        this.spinner.show();
        this.chartsService.getCharts().pipe(first())
            .subscribe(
                (data) => {
                    this.charts = data.content;
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

                    this.spinner.hide();
                }, (error) => {
                    this.spinner.hide();
                    this.notification.error('Failed to get list of charts');
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
        this.dataSourceService.getDataSources().pipe(first())
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
     * Create a chart
     */
    createChart(): void {
        this.spinner.show()
        this.chartsService.createChart(this.chartForm.value).pipe(first())
            .subscribe(response => {
                this.spinner.hide();
                this.getCharts();
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
        this.chartsService.getChartById(chartId).pipe(first())
            .subscribe(response => {
                this.chartForm.patchValue(response);
            });
    }

    /**
     * Delete a chart
     */
    deleteChart(): void {
        this.spinner.show();
        if (this.selectedChartId) {
            this.chartsService.deleteChart(this.selectedChartId).pipe(first())
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
        if (this.selectedChartId) {
            this.chartsService.editChart(this.selectedChartId, this.chartForm.value).pipe(first())
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
                )
        }
    }
}