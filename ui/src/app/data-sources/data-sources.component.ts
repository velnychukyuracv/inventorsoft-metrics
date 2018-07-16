import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataSourcesService } from '../common/services/data-sources.service';
import { SpinnersService } from '../spinners/spinners.service';
import { DataSource } from '../common/models/data-source.model';
import { PAGE_NAVIGATION } from '../common/models/page-navigation.enum';
import { TableParams } from '../common/models/table-params.model';
import { NotificationService } from '../common/services/notification.service';

@Component({
    selector   : 'app-data-sources',
    templateUrl: './data-sources.component.html',
    styleUrls  : ['./data-sources.component.scss']
})
export class DataSourcesComponent implements OnInit {

    @ViewChild('btnCloseDataSource') btnCloseDataSource: ElementRef;
    @ViewChild('btnCloseConfirmDelete') btnCloseConfirmDelete: ElementRef;

    dataSources: DataSource[];
    tableParams: TableParams = {
        pageSize: 2,
        page    : 0
    };
    totalPages: number = 1;
    dataSourceForm: FormGroup;
    selectedDataSourceId: number;

    constructor(
        private dataSourcesService: DataSourcesService,
        private spinner: SpinnersService,
        private notification: NotificationService
    ) {
    }

    ngOnInit() {
        this.buildDataSources();
        this.initDataSourceForm();
    }

    /**
     * Slot for connecting to signal 'sorted'
     * @param $event
     */
    onSorted($event) {
        this.tableParams.sortBy = $event.sortBy;
        this.tableParams.direction = $event.direction;
        this.buildDataSources();
    }

    /**
     * Slot for connecting to signal 'pageChanged'
     * @param {number | PAGE_NAVIGATION} $event
     */
    onPageChange($event: number | PAGE_NAVIGATION) {
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

        this.buildDataSources();
    }

    /**
     * Initialisation Data Source Form
     */
    initDataSourceForm() {
        this.dataSourceForm = new FormGroup({
            dataSourceName : new FormControl(null, [Validators.required]),
            dataSourceType : new FormControl(null, [Validators.required, Validators.minLength(3)]),
            driverClassName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            url            : new FormControl(null, [Validators.required, Validators.minLength(8)]),
            password       : new FormControl(null, [Validators.required, Validators.minLength(8)]),
            userName       : new FormControl(null, [Validators.required, Validators.minLength(3)]),
        });
    }

    /**
     * Open modal window for adding instance of Data Source
     */
    openAddModal() {
        this.dataSourceForm.get('password').enable();
        this.dataSourceForm.get('userName').enable();

        this.dataSourceForm.reset();
        this.selectedDataSourceId = undefined;
    }

    /**
     * Open modal window for editing instance of Data Source
     * @param dataSourceId: Data Source id
     */
    openEditModal(dataSourceId: number) {
        this.dataSourceForm.get('password').disable();
        this.dataSourceForm.get('userName').disable();

        this.dataSourceForm.reset();

        this.dataSourcesService.getDataSourceById(dataSourceId)
            .pipe(first())
            .subscribe(
                response => {
                    this.selectedDataSourceId = response.id;
                    this.dataSourceForm.patchValue(response);
                });
    }

    /**
     * Open modal window for deleting instance of Data Source
     * @param {number} dataSourceId: Data Source id
     */
    openDeleteModal(dataSourceId: number) {
        this.selectedDataSourceId = dataSourceId;
    }

    /**
     * Build Data Sources
     */
    buildDataSources() {
        this.spinner.show();

        this.dataSourcesService.getDataSources(this.tableParams)
            .pipe(first())
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
                    this.dataSources = data.content;

                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`Failed to upload data sources!`);
                }
            );
    }

    /**
     * Create Data Source
     */
    createDataSource() {
        this.spinner.show();

        this.dataSourcesService.createDataSource(this.dataSourceForm.value).pipe(first())
            .subscribe(
                response => {
                    this.spinner.hide();
                    this.closeModalDataSource();
                    this.buildDataSources();
                    this.notification.success(`You have successfully created data source!`);
                },
                error => {
                    this.spinner.hide();
                    this.closeModalDataSource();
                    this.notification.error(`Failed to create data source!`)
                }
            );
    }

    /**
     * Edit Data Source
     */
    editDataSource() {
        this.spinner.show();

        if (this.selectedDataSourceId) {
            this.dataSourcesService.editDataSource(this.selectedDataSourceId, this.dataSourceForm.value).pipe(first())
                .subscribe(
                    response => {
                        this.spinner.hide();
                        this.buildDataSources();
                        this.closeModalDataSource();
                        this.notification.success(`You have successfully edited data source!`);
                    },
                    error => {
                        this.spinner.hide();
                        this.closeModalDataSource();
                        this.notification.error(`Failed to edit data source!`)
                    }
                );
        }
    }

    /**
     * Delete Data Source
     */
    deleteDataSource() {
        this.spinner.show();

        if (this.selectedDataSourceId) {
            this.dataSourcesService.deleteDataSource(this.selectedDataSourceId).pipe(first())
                .subscribe(
                    response => {
                        this.spinner.hide();
                        this.closeConfirmDeleteModal();
                        this.buildDataSources();
                        this.notification.success(`You have successfully deleted data source!`);
                    },
                    error => {
                        this.spinner.hide();
                        this.closeConfirmDeleteModal();
                        this.notification.error(`Failed to delete data source!`)
                    }
                );
        }
    }

    /**
     * close modal window for creating and editing Data Source
     */
    closeModalDataSource() {
        this.btnCloseDataSource.nativeElement.click();
    }

    /**
     * close modal window for deleting Data Source
     */
    closeConfirmDeleteModal() {
        this.btnCloseConfirmDelete.nativeElement.click();
    }

}
