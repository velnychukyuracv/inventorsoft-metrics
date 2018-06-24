import { Component, OnInit, EventEmitter, ViewChild, Directive } from '@angular/core';
import { Group } from '../../common/models/group.model';
import { GroupsService } from '../../common/services/groups.service';
import { first } from 'rxjs/internal/operators/first';
import { Output } from '@angular/compiler/src/core';
import { AuthService } from '../../common/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { GroupsComponent } from './groups/groups.component';

@Component({
    selector   : 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls  : ['./menu.component.scss']
})

export class MenuComponent {

/*
    @ViewChild(GroupsComponent)
    private groupsComponent: GroupsComponent

    getGroup() {
        this.groupsComponent.getGroups();
    }
*/

    /*    constructor(private groupsComponent: GroupsComponent) {
        }*/


        groups: Group[];

        constructor(private groupsService: GroupsService) {
        }


    getGroups() {
        this.groupsService.getGroups().pipe(first()).subscribe((response: any) => {
            this.groups = response.content
        })
    }
}
