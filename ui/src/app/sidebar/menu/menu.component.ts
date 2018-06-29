import { Component } from '@angular/core';
import { Group } from '../../common/models/group.model';
import { GroupsService } from '../../common/services/groups.service';
import { first } from 'rxjs/internal/operators/first';
import { CreateGroupComponent } from '../create-group/create-group.component';
import { SpinnersService } from '../../spinners/spinners.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditGroupComponent } from '../edit-group/edit-group.component';

@Component({
    selector   : 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls  : ['./menu.component.scss']
})

export class MenuComponent {
    groups: Group[];
    selectedGroupId: number;

    constructor(private router: Router,
                private groupsService: GroupsService,
                private modalService: NgbModal,
                private spinnersService: SpinnersService) {
    }

    ngOnInit() {
        this.getGroups();
    }

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

    deleteGroup(selectedGroupId) {
        this.showSpinners();
        this.groupsService.deleteGroup(selectedGroupId).pipe(first())
            .subscribe(
                (response) => {
                    this.hideSpinners();
                    // TODO: Show success notification
                },
                error => {
                    this.hideSpinners();
                    // TODO: Show error notification
                }
            );

    }

    openCreateModal() {
        this.modalService.open(CreateGroupComponent);
    }

    openEditModal() {
        this.modalService.open(EditGroupComponent);
    }

    showSpinners(): void {
        this.spinnersService.show();
    }

    hideSpinners(): void {
        this.spinnersService.hide();
    }

}
