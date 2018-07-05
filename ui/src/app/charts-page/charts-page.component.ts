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

    constructor(
        private chartsService: ChartsService,
        private spinnersService: SpinnersService,
        private notificationService: NotificationService,
        private dataSourceService: DataSourcesService,
        private groupService: GroupsService) {
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
                    this.notificationService.success("Success");
                }, (error) => {
                    this.spinnersService.hide();
                    this.notificationService.error("Error");
                }
            )
    }

    initChartForm(): void {
        this.chartForm = new FormGroup({
            attributes       : new FormControl(null, [Validators.required, Validators.minLength(2)]),
            dataSourceDbRepId: new FormControl(null, [Validators.required]),
            filterColumns    : new FormControl(null, [Validators.required]),
            groupId          : new FormControl(null, [Validators.required]),
            name             : new FormControl(null, [Validators.required]),
            order            : new FormControl(null, [Validators.required, Validators.pattern(this.isIntegerPattern)]),
            query            : new FormControl(null, [Validators.required]),
            type             : new FormControl(null, [Validators.required]),
            visibleColumns   : new FormControl(null, [Validators.required])
        });
    }

    getDataSources(): void {
        this.dataSourceService.getDataSources().subscribe(data => this.dataSources = data.content);
    }

    getGroups(): void {
        this.groupService.getGroups().subscribe(data => this.dataSources = data.content);
    }

    createChart(): void {
        this.showSpinners();
        this.chartsService.createChart(this.chartForm.value)
            .subscribe(response => {
                this.hideSpinners();
                this.getCharts();
            })
    }

    openDeleteModal(chartId: number): void {
        this.selectedChartId = chartId;
    }

    deleteChart(): void {
        if (this.selectedChartId) {
            this.chartsService.deleteChart(this.selectedChartId)
                .subscribe(
                    response => {
                        this.hideSpinners();
                        this.getCharts();
                        //TODO: Show success notification
                    }, error => {
                        this.hideSpinners();
                        //TODO: show error notification
                    }
                )
        }
    }

    showSpinners(): void {
        this.spinnersService.show();
    }

    hideSpinners(): void {
        this.spinnersService.hide();
    }
}