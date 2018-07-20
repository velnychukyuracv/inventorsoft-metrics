import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../../common/models/group.model';
import { SpinnersService } from '../../spinners/spinners.service';
import { GroupsService } from '../../common/services/groups.service';
import { first } from 'rxjs/internal/operators/first';
import { Icons } from '../../common/models/groupIcons.model';
import { NotificationService } from '../../common/services/notification.service';

@Component({
    selector   : 'app-edit-group',
    templateUrl: './edit-group.component.html',
    styleUrls  : ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
    @Input() editedGroup: Group;
    groups: Group[];
    icons: Icons [];

    constructor(private groupsService: GroupsService,
                private spinner: SpinnersService,
                private notification: NotificationService) {
    }

    ngOnInit() {
        this.getIcons();
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
        this.spinner.show();
        this.groupsService.editGroup(group, selectedGroupId).pipe(first())
            .subscribe(
                (response) => {
                    this.spinner.hide();
                    this.notification.success(`You have successfully edited group!`);
                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`Failed to edit group!`)
                }
            );
    }
}


