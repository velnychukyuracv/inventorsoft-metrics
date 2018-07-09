import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../common/services/groups.service';
import { Group } from '../../common/models/group.model';
import { first } from 'rxjs/internal/operators/first';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnersService } from '../../spinners/spinners.service';
import { Icons } from '../../common/models/groupIcons.model';
import { Router } from '@angular/router';

@Component({
    selector   : 'app-create-group',
    templateUrl: './create-group.component.html',
    styleUrls  : ['./create-group.component.scss']
})

export class CreateGroupComponent implements OnInit {
    group: Group = new Group();
    createGroupForm: FormGroup;
    icons: Icons[];

    constructor(private router: Router,
                private groupsService: GroupsService,
                private spinner: SpinnersService) {
    }

    ngOnInit() {
        this.initCreateGroupForm();
        this.getIcons();
    }

    /**
     * Initialization Create Group Form
     */
    initCreateGroupForm() {
        this.createGroupForm = new FormGroup({
            'materialIcon': new FormControl(null, [Validators.required]),
            'name'        : new FormControl(null, [Validators.required]),
        });
    }

    /**
     * Get Icons for creating group
     */
    getIcons() {
        this.icons = this.groupsService.getIcons();
    }

    /**
     * Create group
     */
    createGroup() {
        const createdGroup = this.createGroupForm.value;
        this.spinner.show();
        this.groupsService.createGroup(createdGroup).pipe(first())
            .subscribe(
                (response) => {
                    this.spinner.hide();
                    // TODO: Show success notification
                },
                error => {
                    this.spinner.hide();
                    // TODO: Show error notification
                }
            );
    }
}

