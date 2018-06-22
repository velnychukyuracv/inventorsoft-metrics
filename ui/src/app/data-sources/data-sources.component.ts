import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataSourcesService } from '../common/services/data-sources.service';
import { DataSource } from '../common/models/data-source.model';

@Component({
    selector   : 'app-data-sources',
    templateUrl: './data-sources.component.html',
    styleUrls  : ['./data-sources.component.scss']
})
export class DataSourcesComponent implements OnInit {

    @ViewChild('btnCloseDataSource') btnCloseDataSource: ElementRef;

    dataSources: DataSource[];
    dataSourceForm: FormGroup;
    editedDataSourceId: number;

    constructor(private dataSourcesService: DataSourcesService) {
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
        this.editedDataSourceId = undefined;
    }

    openEditModal(dataSourceId: number) {
        this.dataSourceForm.get('password').disable();
        this.dataSourceForm.get('userName').disable();

        this.dataSourceForm.reset();

        this.dataSourcesService.getDataSourceById(dataSourceId)
            .pipe(first())
            .subscribe(
                response => {
                    this.editedDataSourceId = response.id;
                    this.dataSourceForm.patchValue(response);
                });
    }

    getDataSources() {
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
        if (this.editedDataSourceId) {
            this.dataSourcesService.editDataSource(this.editedDataSourceId, this.dataSourceForm.value).pipe(first())
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
    }

    closeModal() {
        this.btnCloseDataSource.nativeElement.click();
    }

}
