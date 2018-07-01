import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../../common/models/group.model';
import { SpinnersService } from '../../spinners/spinners.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupsService } from '../../common/services/groups.service';
import { first } from 'rxjs/internal/operators/first';
import { Icons } from '../../common/models/groupIcons.model';

@Component({
    selector   : 'app-edit-group',
    templateUrl: './edit-group.component.html',
    styleUrls  : ['./edit-group.component.scss']
})
export class EditGroupComponent {
    groups: Group[];
    group: Group = new Group();
    editGroupForm: FormGroup;
    done: boolean = false;
    icons: Icons [];

    constructor(private groupsService: GroupsService,
                private spinnersService: SpinnersService,
                public activeModal: NgbActiveModal,
                private modalService: NgbModal) {
    }


    editGroup(group: Group, selectedGroupId: number) {
        this.showSpinners();
        selectedGroupId = this.groupsService.editedGroupInfo.id;
        console.log(selectedGroupId);
        this.groupsService.editGroup(group, selectedGroupId).pipe(first())
            .subscribe(
                (response) => {
                    this.hideSpinners();
                    console.log(response);
                },
                error => {
                    console.log(error);
                    this.hideSpinners();
                }
            );
    }

    ngOnInit() {
        this.initEditGroupForm();
        this.getIcons();
        this.getEditedUserData();
    }

    initEditGroupForm() {
        this.editGroupForm = new FormGroup({
            'materialIcon': new FormControl(null, [Validators.required]),
            'name'        : new FormControl(null, [Validators.required, Validators.minLength(3)]),
        });
    }

    getIcons() {
        this.icons = this.groupsService.getIcons();
    }

    getEditedUserData() {
        this.group.materialIcon = this.groupsService.editedGroupInfo.materialIcon;
        this.group.name = this.groupsService.editedGroupInfo.name;
    }

    public showSpinners(): void {
        this.spinnersService.show();
    }

    private hideSpinners(): void {
        this.spinnersService.hide();
    }

}
