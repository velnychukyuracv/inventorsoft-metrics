import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../../common/services/groups.service';
import { Group } from '../../../common/models/group.model';
import { first } from 'rxjs/internal/operators/first';

@Component({
    selector   : 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls  : ['./groups.component.scss']
})

export class GroupsComponent {
    groups: Group[];
    group: Group = new Group();
    receivedGroup: Group;
    done: boolean = false;

    constructor(private groupsService: GroupsService) {
    }

    submit(group: Group) {
        this.groupsService.addGroup(group).pipe(first())
            .subscribe(
                (data: Group) => {
                    this.receivedGroup = data;
                    this.done = true;
                    console.log(this.group);
                },
                error => console.log(error)
            );
    }

    getGroups() {
        this.groupsService.getGroups().pipe(first()).subscribe((response: any) => {
            this.groups = response.content
        })
    }
}

/*export class GroupsComponent implements OnInit {
    //groups: Group[];
    groups: Group = new Group();

    constructor(private groupsService: GroupsService) {
    }

    getGroups() {
        this.groupsService.getGroups().pipe(first()).subscribe((response: any) => {
            this.groups = response.content
        })
    }

        addGroup(icon: string, group_name: string) {
            this.groupsService.addGroup().pipe(first()).subscribe((response: any) => {
                this.groups = response.content
            })
        }

    ngOnInit() {
    }

    onSubmit() {
        const formData = this.form.value;
        this.groupsService.addGroup(formData).pipe(first()).subscribe((response: any) => {
            this.groups = response.content;
            console.log(response.content)
        }
    }
}*/


