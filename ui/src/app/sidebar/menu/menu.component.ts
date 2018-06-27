import { Component } from '@angular/core';
import { Group } from '../../common/models/group.model';
import { GroupsService } from '../../common/services/groups.service';
import { first } from 'rxjs/internal/operators/first';
import { Output } from '@angular/compiler/src/core';
import { AuthService } from '../../common/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { GroupsComponent } from './groups/groups.component';
import { SpinnersService } from '../../spinners/spinners.service';
import { Router } from '@angular/router';

@Component({
    selector   : 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls  : ['./menu.component.scss']
})

export class MenuComponent {
    groups: Group[];

    constructor(private router: Router,
                private groupsService: GroupsService) {
    }

    ngOnInit(){
        this.getGroups();
    }

    addGroup() {
        this.router.navigate(['add-group'])
    }

    getGroups() {
        this.groupsService.getGroups().pipe(first()).subscribe((response: any) => {
            this.groups = response.content
        })
    }

    deleteGroup(id: number) {
        this.groupsService.deleteGroup(id).pipe(first()).subscribe()
    }

}
