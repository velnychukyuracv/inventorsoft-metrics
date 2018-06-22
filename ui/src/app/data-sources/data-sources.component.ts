import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataSourcesService } from '../common/services/data-sources.service';
import { SpinnersService } from '../spinners/spinners.service';
import { DataSource } from '../common/models/data-source.model';

@Component({
    selector   : 'app-data-sources',
    templateUrl: './data-sources.component.html',
    styleUrls  : ['./data-sources.component.scss']
})
export class DataSourcesComponent implements OnInit {

    @ViewChild('btnCloseDataSource') btnCloseDataSource: ElementRef;
    @ViewChild('btnCloseConfirmDelete') btnCloseConfirmDelete: ElementRef;

    dataSources: DataSource[];
    dataSourceForm: FormGroup;
    selectedDataSourceId: number;

    constructor(
        private dataSourcesService: DataSourcesService,
        private SpinnersService: SpinnersService,
    ) {
    }

    private showSpinners(): void {
        this.SpinnersService.show();
    }

    private hideSpinners(): void {
        this.SpinnersService.hide();
    }

    ngOnInit() {
        this.getDataSources();

        this.dataSourceForm = new FormGroup({
            dataSourceName : new FormControl(null, [Validators.required]),
            dataSourceType : new FormControl(null, [Validators.required, Validators.minLength(3)]),
            driverClassName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            url            : new FormControl(null, [Validators.required, Validators.minLength(8)]),
            password       : new FormControl(null, [Validators.required, Validators.minLength(8)]),
            userName       : new FormControl(null, [Validators.required, Validators.minLength(3)]),
        });
    }

    openAddModal() {
        this.dataSourceForm.get('password').enable();
        this.dataSourceForm.get('userName').enable();

        this.dataSourceForm.reset();
        this.selectedDataSourceId = undefined;
    }

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

    openDeleteModal(dataSourceId: number) {
        this.selectedDataSourceId = dataSourceId;
    }

    getDataSources() {
        this.showSpinners();

        this.dataSourcesService.getDataSources()
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
            )
    }

    /** Create Data Source
     */
    createDataSource() {
        this.dataSourcesService.createDataSource(this.dataSourceForm.value).pipe(first())
            .subscribe(
                response => {
                    this.closeModal();
                    this.getDataSources();
                    // TODO: Show success notification
                },
                error => {
                    this.closeModal();
                    // TODO: Show error notification
                }
            );
    }

    /** Edit Data Source
     */
    editDataSource() {
        if (this.selectedDataSourceId) {
            this.dataSourcesService.editDataSource(this.selectedDataSourceId, this.dataSourceForm.value).pipe(first())
                .subscribe(
                    response => {
                        this.getDataSources();

                        this.closeModal();
                        // TODO: Show success notification
                    },
                    error => {
                        this.closeModal();
                        // TODO: Show error notification
                    }
                );
        }
    }

    /** Delete Data Source
     */
    deleteDataSource() {
        if (this.selectedDataSourceId) {
            this.dataSourcesService.deleteDataSource(this.selectedDataSourceId).pipe(first())
                .subscribe(
                    response => {
                        this.getDataSources();

                        this.closeConfirmDeleteModal();
                        // TODO: Show success notification
                    },
                    error => {
                        this.closeConfirmDeleteModal();
                        // TODO: Show error notification
                    }
                )
        }

        this.closeConfirmDeleteModal();
    }

    closeModal() {
        this.btnCloseDataSource.nativeElement.click();
    }

    closeConfirmDeleteModal() {
        this.btnCloseConfirmDelete.nativeElement.click();
    }

}
