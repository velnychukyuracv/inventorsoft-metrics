import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../../common/services/groups.service';
import { Group } from '../../../common/models/group.model';
import { first } from 'rxjs/internal/operators/first';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnersService } from '../../../spinners/spinners.service';

@Component({
    selector   : 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls  : ['./groups.component.scss']
})

export class GroupsComponent {
    groups: Group[];
    group: Group = new Group();
    addGroupForm: FormGroup;
    receivedGroup: Group;
    done: boolean = false;
    icons = [
        {
            class: 'fa fa-bookmark fa-1x',
            code : '&#xf02e;',
            glyph: '',
            title: 'bookmark',
        },
        {
            class: 'fa fa-circle fa-1x',
            code : '&#xf111;',
            glyph: '',
            title: 'circle',
        },
        {
            class: 'fa fa-cloud fa-1x',
            code : '&#xf0c2;',
            glyph: '',
            title: 'cloud',
        },
        {
            class: 'fa fa-square fa-1x',
            code : '&#xf0c8;',
            glyph: '',
            title: 'square',
        },
        {
            class: 'fa fa-star fa-1x',
            code : '&#xf005;',
            glyph: '',
            title: 'star',
        },
        {
            class: 'fa fa-certificate fa-1x',
            code : '&#xf0a3;',
            glyph: '',
            title: 'certificate',
        }];

    constructor(private groupsService: GroupsService,
                private spinnersService: SpinnersService) {
    }

    createGroup(group: Group) {
        this.showSpinners();
        this.groupsService.addGroup(group).pipe(first())
            .subscribe(
                (data: Group) => {
                    this.receivedGroup = data;
                    this.done = true;
                    this.hideSpinners();
                    console.log(this.group);
                    console.log(data);
                },
                error => {
                    console.log(error);
                    this.hideSpinners();
                }
            );
    }

    getGroups() {
        this.groupsService.getGroups().pipe(first())
            .subscribe((response: any) => {
                    this.groups = response.content;
                    console.log(response);
                },
                (error) => {
                    console.log('error')
                })
    }

    ngOnInit() {
        this.initAddGroupForm();
        this.getGroups();
    }

    initAddGroupForm() {
        this.addGroupForm = new FormGroup({
            'materialIcon': new FormControl(null, [Validators.required]),
            'name'        : new FormControl(null, [Validators.required, Validators.minLength(3)]),
        });
    }

    public showSpinners(): void {
        this.spinnersService.show();
    }

    private hideSpinners(): void {
        this.spinnersService.hide();
    }

}

