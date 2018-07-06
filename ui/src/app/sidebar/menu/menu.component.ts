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
    editModalClicked: boolean;

    constructor(private router: Router,
                private groupsService: GroupsService,
                private spinnersService: SpinnersService) {
    }

    ngOnInit() {
        this.getGroups();

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
     * Delete group data
     * @param groupId: Id of selected group
     */
    deleteGroup(groupId: number) {
        this.showSpinners();
        this.groupsService.deleteGroup(groupId).pipe(first())
            .subscribe(
                (response) => {
                    this.hideSpinners();
                    this.getGroups();
                    // TODO: Show success notification
                },
                error => {
                    this.hideSpinners();
                    // TODO: Show error notification
                }
            );

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
