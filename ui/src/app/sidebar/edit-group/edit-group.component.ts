import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../../common/models/group.model';
import { SpinnersService } from '../../spinners/spinners.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '../../common/services/groups.service';
import { first } from 'rxjs/internal/operators/first';
import { Icons } from '../../common/models/groupIcons.model';

@Component({
    selector   : 'app-edit-group',
    templateUrl: './edit-group.component.html',
    styleUrls  : ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
    @Input() editedGroup: Group;
    groups: Group[];
    editGroupForm: FormGroup;
    icons: Icons [];

    constructor(private groupsService: GroupsService,
                private spinnersService: SpinnersService) {
    }

    ngOnInit() {
        this.initEditGroupForm();
        this.getIcons();
    }

    /**
     * Initialization Edit Group Form
     */
    initEditGroupForm() {
        this.editGroupForm = new FormGroup({
            'materialIcon': new FormControl(null, [Validators.required]),
            'name'        : new FormControl(null, [Validators.required]),
        });
    }

    /**
     * Get Icons for editing group
     */
    getIcons() {
        this.icons = this.groupsService.getIcons();
    }

    /**
     * Edit group data
     * @param group: Data of selected group
     * @param selectedGroupId: Id of selected group
     */
    editGroup(group: Group, selectedGroupId: number) {
        this.spinnersService.show();
        this.groupsService.editGroup(group, selectedGroupId).pipe(first())
            .subscribe(
                (response) => {
                    this.spinnersService.hide();
                    // TODO: Show success notification
                },
                error => {
                    this.spinnersService.hide();
                    // TODO: Show error notification
                }
            );
    }
}
