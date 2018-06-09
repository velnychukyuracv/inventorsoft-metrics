import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../common/services/groups.service';
import { Group } from '../../common/models/group.model';
import { first } from 'rxjs/internal/operators/first';

@Component({
    selector   : 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls  : ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

    groups: Group[]

    constructor(private groupsService: GroupsService) {
    }

    getGroups() {
        this.groupsService.getGroups().pipe(first()).subscribe((response: any) => {
            console.log('Get groups', response.content)
            this.groups = response.content
        })
    }

    ngOnInit() {
    }

}
