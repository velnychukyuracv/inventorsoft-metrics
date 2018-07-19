import { Component, OnInit, Output } from '@angular/core';
import { Group } from '../../common/models/group.model';
import { GroupsService } from '../../common/services/groups.service';
import { first } from 'rxjs/internal/operators/first';
import { SpinnersService } from '../../spinners/spinners.service';
import { Router } from '@angular/router';

@Component({
    selector   : 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls  : ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
    selectedGroup: Group;
    groups: Group[];
    groupId: number;
    editModalClicked: boolean;
    sidebarBtnState: boolean = false;

    constructor(private router: Router,
                private groupsService: GroupsService,
                private spinner: SpinnersService) {
    }

    ngOnInit() {
        this.getGroups();
    }

    /**
     * Get all groups
     */
    getGroups() {
        this.spinner.show();
        this.groupsService.getGroups().pipe(first()).subscribe(
            (response: any) => {
                this.spinner.hide();
                this.groups = response.content;
                // TODO: Show success notification
            },
            error => {
                this.spinner.hide();
                // TODO: Show error notification
            })
    }

    /**
     * Delete group data
     * @param groupId: Id of selected group
     */
    deleteGroup(groupId: number) {
        this.spinner.show();
        this.groupsService.deleteGroup(groupId).pipe(first())
            .subscribe(
                (response) => {
                    this.spinner.hide();
                    this.getGroups();
                    // TODO: Show success notification
                },
                error => {
                    this.spinner.hide();
                    // TODO: Show error notification
                }
            );
    }

    showCharts(groupId: number): void {
        console.log('group id = ', this.groupId);
        this.groupId = groupId;
    }
    /**
     * Open edit modal
     * @param group: Data of selected group
     */
    openEditModal(group: Group) {
        this.editModalClicked = true;
        this.selectedGroup = group;
    }

    /**
     *  Collapse sidebar
     */
    collapseSidebar() {
        this.sidebarBtnState = !this.sidebarBtnState;
    }
}
