import { Component, OnInit } from '@angular/core';
import { Group, GroupsService } from '../../common/services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

    groups: Group[]

  constructor(private groupsService: GroupsService) { }

  getGroups() {
        this.groupsService.getGroups().subscribe(groups => {
            console.log('Get groups', groups)
            this.groups = groups
        })
  }

  ngOnInit() {
  }

}
