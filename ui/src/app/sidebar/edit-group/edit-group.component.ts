import { Component } from '@angular/core';
import { Group } from '../../common/models/group.model';
import { SpinnersService } from '../../spinners/spinners.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupsService } from '../../common/services/groups.service';
import { first } from 'rxjs/internal/operators/first';
import { Icons } from '../../common/models/groupIcons.model';

@Component({
    selector   : 'app-edit-group',
    templateUrl: './edit-group.component.html',
    styleUrls  : ['./edit-group.component.scss']
})
export class EditGroupComponent {
    groups: Group[];
    group: Group = new Group();
    editGroupForm: FormGroup;
    icons: Icons [];

    constructor(private groupsService: GroupsService,
                private spinnersService: SpinnersService,
                public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
        this.initEditGroupForm();
        this.getIcons();
        this.getEditedGroupData();
    }

    /**
     * Get all groups
     */

    getGroups() {
        this.showSpinners();
        this.groupsService.getGroups().pipe(first()).subscribe(
            (response: any) => {
                this.hideSpinners();
                this.groups = response.content;
            },
            error => {
                this.hideSpinners();
            })
    }

    /**
     * Initialization Edit Group Form
     */

    initEditGroupForm() {
        this.editGroupForm = new FormGroup({
            'materialIcon': new FormControl(null, [Validators.required]),
            'name'        : new FormControl(null, [Validators.required, Validators.minLength(3)]),
        });
    }

    /**
     * Get Icons for editing group
     */

    getIcons() {
        this.icons = this.groupsService.getIcons();
    }

    /**
     * Get data of selected group
     */

    getEditedGroupData() {
        this.group.materialIcon = this.groupsService.editedGroupInfo.materialIcon;
        this.group.name = this.groupsService.editedGroupInfo.name;
    }

    /**
     * Edit group data
     * @param group: Data of selected group
     * @param selectedGroupId: Id of selected group
     */

    editGroup(group: Group, selectedGroupId: number) {
        this.showSpinners();
        selectedGroupId = this.groupsService.editedGroupInfo.id;
        this.groupsService.editGroup(group, selectedGroupId).pipe(first())
            .subscribe(
                (response) => {
                    this.hideSpinners();
                    this.activeModal.close();
                    // TODO: Show success notification
                },
                error => {
                    this.hideSpinners();
                    // TODO: Show error notification
                }
            );
    }

    /**
     * Show spinner
     */

    showSpinners(): void {
        this.spinnersService.show();
    }

    /**
     * Hide spinner
     */

    hideSpinners(): void {
        this.spinnersService.hide();
    }

}
