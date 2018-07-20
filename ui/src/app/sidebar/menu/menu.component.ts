import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Group } from '../../common/models/group.model';
import { GroupsService } from '../../common/services/groups.service';
import { first } from 'rxjs/internal/operators/first';
import { SpinnersService } from '../../spinners/spinners.service';
import { AuthService } from '../../common/services/auth.service';
import { NotificationService } from '../../common/services/notification.service';


@Component({
    selector   : 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls  : ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
    @ViewChild('closeBtn') closeBtn: ElementRef;
    selectedGroup: Group;
    groups: Group[];
    groupId: number;
    editModalClicked: boolean;
    currentGroupId: number;
    sidebarIsCollapsed: boolean = false;

    constructor(private groupsService: GroupsService,
                private spinner: SpinnersService,
                private auth: AuthService,
                private notification: NotificationService) {
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
            },
            error => {
                this.spinner.hide();
                this.notification.error(`Failed to upload groups!`);
            })
    }

    /**
     * Delete group data
     * @param groupId: Id of selected group
     */
    deleteGroup() {
        this.spinner.show();
        this.groupsService.deleteGroup(this.currentGroupId).pipe(first())
            .subscribe(
                (response) => {
                    this.spinner.hide();
                    this.closeModal();
                    this.getGroups();
                    this.notification.success(`You have successfully deleted group!`);
                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`Failed to delete group!`);
                }
            );
    }

    /**
     * Show group data
     * @param groupId: Id of selected group
     */
    showCharts(groupId: number): void {
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
     * Open modal to delete group
     * @param groupId - group id
     */
    openDeleteModal(groupId: number) {
        this.currentGroupId = groupId;
    }

    /**
     * Close modal window
     */
    closeModal() {
        this.closeBtn.nativeElement.click();
    }

    /**
     *  Collapse sidebar
     */
    collapseSidebar() {
        this.sidebarIsCollapsed = !this.sidebarIsCollapsed;
    }
}