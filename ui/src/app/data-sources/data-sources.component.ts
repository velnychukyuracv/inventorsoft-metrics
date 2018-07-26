import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';
import { Subject, Subscription } from 'rxjs/index';

import { DataSourcesService } from '../common/services/data-sources.service';
import { SpinnersService } from '../spinners/spinners.service';
import { DataSource } from '../common/models/data-source.model';
import { PAGE_NAVIGATION } from '../common/models/page-navigation.enum';
import { TableParams } from '../common/models/table-params.model';
import { NotificationService } from '../common/services/notification.service';
import { ConfirmService } from '../common/services/confirm.service';

@Component({
    selector   : 'app-data-sources',
    templateUrl: './data-sources.component.html',
    styleUrls  : ['./data-sources.component.scss']
})
export class DataSourcesComponent implements OnInit {

    @ViewChild('btnCloseDataSource') btnCloseDataSource: ElementRef;
    @ViewChild('btnCloseConfirmDelete') btnCloseConfirmDelete: ElementRef;

    parentSubject: Subject<number> = new Subject();

    dataSources: DataSource[];
    tableParams: TableParams = {
        pageSize: 2,
        page    : 0
    };
    totalPages: number = 1;
    selectedDataSourceId: number;

    private confirmSubscription: Subscription;

    constructor(
        private dataSourcesService: DataSourcesService,
        private spinner: SpinnersService,
        private notification: NotificationService,
        private confirm: ConfirmService,
    ) {
    }

    ngOnInit() {
        this.buildDataSources();
        this.subscribeToConfirm();
    }

    subscribeToConfirm() {
        this.confirmSubscription = this.confirm.confirm$.subscribe(isConfirm => {
            if (isConfirm) {
                this.deleteDataSource();
            }
        })
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
        this.buildDataSources();
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
     * Sends event for opening modal window
     * @param {number} id: Data Source id
     */
    openDataSourceModal(id: number) {
        this.parentSubject.next(id);
    }

    /**
     * Open modal window for deleting instance of Data Source
     * @param {number} dataSourceId: Data Source id
     */
    openDeleteModal(dataSourceId: number) {
        this.selectedDataSourceId = dataSourceId;

        this.confirm.confirm(
            'Deleting...',
            'Are you sure to delete data source?'
        );
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
     * Delete Data Source
     */
    deleteDataSource() {
        if (this.selectedDataSourceId) {
            this.spinner.show();

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
     * close modal window for deleting Data Source
     */
    closeConfirmDeleteModal() {
        this.btnCloseConfirmDelete.nativeElement.click();
    }

}
