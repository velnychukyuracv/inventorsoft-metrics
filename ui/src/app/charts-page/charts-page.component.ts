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
        private spinnersService: SpinnersService,
        private notificationService: NotificationService,
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

    getCharts(): void {
        this.spinnersService.show();
        this.chartsService.getCharts()
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

                    this.spinnersService.hide();
                }, (error) => {
                    this.spinnersService.hide();
                    this.notificationService.error('Failed to get list of charts');
                }
            )
    }

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

    getDataSources(): void {
        this.dataSourceService.getDataSources().subscribe(data => this.dataSources = data.content);
    }

    getGroups(): void {
        this.groupService.getGroups().subscribe(data => this.groups = data.content);
    }

    createChart(): void {
        this.spinnersService.show()
        this.chartsService.createChart(this.chartForm.value)
            .subscribe(response => {
                this.spinnersService.hide();
                this.getCharts();
                this.notificationService.success('You have successfully added new chart');
            }, error => {
                this.spinnersService.hide();
                this.notificationService.error('Failed to create new chart"');
            })
    }

    openConfirmDeleteModal(chartId: number): void {
        this.selectedChartId = chartId;
    }

    openEditModal(chartId: number): void {
        this.selectedChartId = chartId;
        this.chartsService.getChartById(chartId).pipe(first())
            .subscribe(response => {
                this.chartForm.patchValue(response);
            });
    }

    deleteChart(): void {
        this.spinnersService.show();
        if (this.selectedChartId) {
            this.chartsService.deleteChart(this.selectedChartId)
                .subscribe(
                    response => {
                        this.spinnersService.hide();
                        this.getCharts();
                        this.notificationService.success(
                            `You have successfully deleted chart with id ${this.selectedChartId}`
                        );
                    }, error => {
                        this.spinnersService.hide();
                        this.notificationService.error(`Failed to delete chart with id ${this.selectedChartId}`);
                    }
                )
        }
    }

    editChart(): void {
        this.spinnersService.show();
        if (this.selectedChartId) {
            this.chartsService.editChart(this.selectedChartId, this.chartForm.value)
                .subscribe(
                    response => {
                        this.spinnersService.hide();
                        this.getCharts();
                        this.notificationService.success(
                            `You have successfully edited chart with id ${this.selectedChartId}`
                        );
                    }, error => {
                        this.spinnersService.hide();
                        this.notificationService.error(`Failed to edit chart with id ${this.selectedChartId}`);
                    }
                )
        }
    }
}