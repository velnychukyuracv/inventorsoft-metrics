import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GroupsService } from '../../common/services/groups.service';
import { Group } from '../../common/models/group.model';
import { first } from 'rxjs/internal/operators/first';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnersService } from '../../spinners/spinners.service';
import { Icons } from '../../common/models/groupIcons.model';
import { Router } from '@angular/router';
import { NotificationService } from '../../common/services/notification.service';
import { Subject } from 'rxjs/index';

@Component({
    selector   : 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls  : ['./groups.component.scss']
})

export class GroupsComponent implements OnInit, OnDestroy {
    @Input() groupData: Subject<number>;
    @Output() needUpdateGroups: EventEmitter<any> = new EventEmitter();
    group: Group = new Group();
    groupForm: FormGroup;
    icons: Icons[];
    selectedGroupId: number;

    constructor(private groupsService: GroupsService,
                private spinner: SpinnersService,
                private notification: NotificationService) {
    }

    ngOnInit() {
        this.initCreateGroupForm();
        this.getIcons();
        this.groupData.subscribe(idGroup => {
            this.groupForm.reset();
            this.selectedGroupId = idGroup;
            if (idGroup) {
                this.fillGroupForm(idGroup);
            }
        });
    }

    /**
     * Fill group form
     * @param idGroup: edited group id
     */
    fillGroupForm(idGroup: number): void {
        this.spinner.show();
        this.groupsService.getGroupById(idGroup)
            .pipe(first())
            .subscribe(
                response => {
                    this.spinner.hide();
                    this.groupForm.patchValue(response);
                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`Failed to get group data!`);
                }
            );
    }

    /**
     * Initialization Create Group Form
     */
    initCreateGroupForm() {
        this.groupForm = new FormGroup({
            'materialIcon': new FormControl(null, [Validators.required]),
            'name'        : new FormControl(null, [Validators.required]),
        });
    }

    /**
     * Get Icons for creating group
     */
    getIcons() {
        this.icons = this.groupsService.getIcons();
    }

    /**
     * Create group
     */
    createGroup() {
        const createdGroup = this.groupForm.value;
        this.spinner.show();
        this.groupsService.createGroup(createdGroup).pipe(first())
            .subscribe(
                (response) => {
                    this.spinner.hide();
                    this.needUpdateGroups.emit(null);
                    this.notification.success(`You have successfully created group!`);
                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`Failed to create group!`)
                }
            );
    }

    /**
     * Edit group data
     */
    editGroup() {
        this.spinner.show();
        if (this.selectedGroupId) {
            this.groupsService.editGroup(this.groupForm.value, this.selectedGroupId).pipe(first())
                .subscribe(
                    (response) => {
                        this.spinner.hide();
                        this.needUpdateGroups.emit(null);
                        this.notification.success(`You have successfully edited group!`);
                    },
                    error => {
                        this.spinner.hide();
                        this.notification.error(`Failed to edit group!`)
                    }
                );
        }
    }

    ngOnDestroy(): void {
        this.groupData.unsubscribe();
    }
}

