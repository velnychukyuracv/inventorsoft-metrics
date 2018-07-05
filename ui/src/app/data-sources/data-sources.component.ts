import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataSourcesService } from '../common/services/data-sources.service';
import { SpinnersService } from '../spinners/spinners.service';
import { DataSource } from '../common/models/data-source.model';
import { DataSourcesParams } from '../common/models/data-sources-params.model';

@Component({
    selector   : 'app-data-sources',
    templateUrl: './data-sources.component.html',
    styleUrls  : ['./data-sources.component.scss']
})
export class DataSourcesComponent implements OnInit {

    @ViewChild('btnCloseDataSource') btnCloseDataSource: ElementRef;
    @ViewChild('btnCloseConfirmDelete') btnCloseConfirmDelete: ElementRef;

    dataSources: DataSource[];
    dataSourcesParams: DataSourcesParams = {};
    dataSourceForm: FormGroup;
    selectedDataSourceId: number;

    constructor(
        private dataSourcesService: DataSourcesService,
        private spinnersService: SpinnersService
    ) {
    }

    /** Show spinners
     */
    private showSpinners(): void {
        this.spinnersService.show();
    }

    /** Hide spinners
     */
    private hideSpinners(): void {
        this.spinnersService.hide();
    }

    ngOnInit() {
        this.buildDataSources();
        this.initDataSourceForm();
    }

    /** Slot for connecting to signal 'sorted'
     * @param $event
     */
    onSorted($event) {
        this.dataSourcesParams.sortBy = $event.sortBy;
        this.dataSourcesParams.direction = $event.direction;
        this.buildDataSources();
    }

    /** Initialisation Data Source Form
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

    /** Open modal window for adding instance of Data Source
     */
    openAddModal() {
        this.dataSourceForm.get('password').enable();
        this.dataSourceForm.get('userName').enable();

        this.dataSourceForm.reset();
        this.selectedDataSourceId = undefined;
    }

    /** Open modal window for editing instance of Data Source
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

    /** Open modal window for deleting instance of Data Source
     * @param dataSourceId: Data Source id
     */
    openDeleteModal(dataSourceId: number) {
        this.selectedDataSourceId = dataSourceId;
    }

    /** Build Data Sources
     */
    buildDataSources() {
        this.showSpinners();

        this.dataSourcesService.getDataSources(this.dataSourcesParams)
            .pipe(first())
            .subscribe(
                (data) => {
                    this.dataSources = data.content;

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

                    this.hideSpinners();
                    // TODO: Show success notification
                },
                error => {
                    this.hideSpinners();
                    // TODO: Show error notification
                }
            );
    }

    /** Create Data Source
     */
    createDataSource() {
        this.showSpinners();

        this.dataSourcesService.createDataSource(this.dataSourceForm.value).pipe(first())
            .subscribe(
                response => {
                    this.hideSpinners();
                    this.closeModalDataSource();
                    this.buildDataSources();
                    // TODO: Show success notification
                },
                error => {
                    this.hideSpinners();
                    this.closeModalDataSource();
                    // TODO: Show error notification
                }
            );
    }

    /** Edit Data Source
     */
    editDataSource() {
        this.showSpinners();

        if (this.selectedDataSourceId) {
            this.dataSourcesService.editDataSource(this.selectedDataSourceId, this.dataSourceForm.value).pipe(first())
                .subscribe(
                    response => {
                        this.hideSpinners();
                        this.buildDataSources();
                        this.closeModalDataSource();
                        // TODO: Show success notification
                    },
                    error => {
                        this.hideSpinners();
                        this.closeModalDataSource();
                        // TODO: Show error notification
                    }
                );
        }
    }

    /** Delete Data Source
     */
    deleteDataSource() {
        this.showSpinners();

        if (this.selectedDataSourceId) {
            this.dataSourcesService.deleteDataSource(this.selectedDataSourceId).pipe(first())
                .subscribe(
                    response => {
                        this.hideSpinners();
                        this.closeConfirmDeleteModal();
                        this.buildDataSources();
                        // TODO: Show success notification
                    },
                    error => {
                        this.hideSpinners();
                        this.closeConfirmDeleteModal();
                        // TODO: Show error notification
                    }
                );
        }
    }

    /** close modal window for creating and editing Data Source
     */
    closeModalDataSource() {
        this.btnCloseDataSource.nativeElement.click();
    }

    /** close modal window for deleting Data Source
     */
    closeConfirmDeleteModal() {
        this.btnCloseConfirmDelete.nativeElement.click();
    }

}
