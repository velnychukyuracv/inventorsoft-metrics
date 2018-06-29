import { Component, OnInit } from '@angular/core';
import { Group } from '../../common/models/group.model';
import { SpinnersService } from '../../spinners/spinners.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupsService } from '../../common/services/groups.service';
import { first } from 'rxjs/internal/operators/first';
import { group } from '@angular/animations';

@Component({
    selector   : 'app-edit-group',
    templateUrl: './edit-group.component.html',
    styleUrls  : ['./edit-group.component.scss']
})
export class EditGroupComponent {
    groups: Group[];
    group: Group = new Group();
    editGroupForm: FormGroup;
    selectedGroupId: number;
    receivedGroup: Group;
    done: boolean = false;
    icons = [
        {
            class: 'fa fa-bookmark fa-1x',
            glyph: '',
            title: 'bookmark',
        },
        {
            class: 'fa fa-circle fa-1x',
            glyph: '',
            title: 'circle',
        },
        {
            class: 'fa fa-cloud fa-1x',
            glyph: '',
            title: 'cloud',
        },
        {
            class: 'fa fa-square fa-1x',
            glyph: '',
            title: 'square',
        },
        {
            class: 'fa fa-star fa-1x',
            glyph: '',
            title: 'star',
        },
        {
            class: 'fa fa-certificate fa-1x',
            glyph: '',
            title: 'certificate',
        }];

    constructor(private groupsService: GroupsService,
                private spinnersService: SpinnersService,
                private modalService: NgbModal) {
    }

    editGroup(group: Group, selectedGroupId: number) {
        this.showSpinners();
        console.log(selectedGroupId);
        this.groupsService.editGroup(group, selectedGroupId).pipe(first())
            .subscribe(
                (response) => {
                   /* this.receivedGroup = data;
                    this.done = true;*/
                    this.hideSpinners();
                    console.log(response);
                    /*                    console.log(this.group);
                                        console.log(data);*/
                },
                error => {
                    console.log(error);
                    this.hideSpinners();
                }
            );
    }

    ngOnInit() {
        this.initEditGroupForm();
    }

    initEditGroupForm() {
        this.editGroupForm = new FormGroup({
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
