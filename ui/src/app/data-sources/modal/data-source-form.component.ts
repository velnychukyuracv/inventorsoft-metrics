import { Component, ElementRef, ViewChild, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/index';
import { first } from 'rxjs/internal/operators/first';
import { DataSourcesService } from '../../common/services/data-sources.service';
import { SpinnersService } from '../../spinners/spinners.service';
import { NotificationService } from '../../common/services/notification.service';

@Component({
    selector   : 'app-data-source-form',
    templateUrl: './data-source-form.component.html',
})
export class DataSourceFormComponent implements OnInit, OnDestroy {

    @ViewChild('btnCloseDataSource') btnCloseDataSource: ElementRef;

    @Input() parentSubject: Subject<number>;
    selectedDataSourceId: number;

    dataSourceForm: FormGroup;

    @Output() contentChanged: EventEmitter<void> = new EventEmitter();

    constructor(
        private dataSourcesService: DataSourcesService,
        private spinner: SpinnersService,
        private notification: NotificationService
    ) {
    }

    ngOnInit(): void {
        this.initDataSourceForm();
        this.parentSubject.subscribe(id => {
            this.dataSourceForm.reset();
            this.selectedDataSourceId = id;
            if (id) {
                this.prepareForm(id);
            }
        });
    }

    /**
     * Prepares form
     * @param {number} id - Data Source Id
     */
    prepareForm(id: number): void {
        this.spinner.show();

        this.dataSourcesService.getDataSourceById(id)
            .pipe(first())
            .subscribe(
                response => {
                    this.spinner.hide();
                    this.dataSourceForm.patchValue(response);
                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`Failed to get data source!`);
                }
            );
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
     * Create Data Source
     */
    createDataSource() {
        this.spinner.show();

        this.dataSourcesService.createDataSource(this.dataSourceForm.value).pipe(first())
            .subscribe(
                response => {
                    this.spinner.hide();
                    this.closeModal();
                    this.contentChanged.emit();
                    this.notification.success(`You have successfully created data source!`);
                },
                error => {
                    this.spinner.hide();
                    this.closeModal();
                    this.notification.error(`Failed to create data source!`);
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
                        this.closeModal();
                        this.contentChanged.emit();
                        this.notification.success(`You have successfully edited data source!`);
                    },
                    error => {
                        this.spinner.hide();
                        this.closeModal();
                        this.notification.error(`Failed to edit data source!`);
                    }
                );
        }
    }

    /**
     * Close modal window
     */
    closeModal() {
        this.btnCloseDataSource.nativeElement.click();
    }

    ngOnDestroy(): void {
        this.parentSubject.unsubscribe();
    }
}