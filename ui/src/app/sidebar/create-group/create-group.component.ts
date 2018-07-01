import { Component } from '@angular/core';
import { GroupsService } from '../../common/services/groups.service';
import { Group } from '../../common/models/group.model';
import { first } from 'rxjs/internal/operators/first';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnersService } from '../../spinners/spinners.service';
import { Icons } from '../../common/models/groupIcons.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector   : 'app-groups',
    templateUrl: './create-group.component.html',
    styleUrls  : ['./create-group.component.scss']
})

export class CreateGroupComponent {
    groups: Group[];
    group: Group = new Group();
    addGroupForm: FormGroup;
    receivedGroup: Group;
    done: boolean = false;
    icons: Icons[];

    constructor(private groupsService: GroupsService,
                private spinnersService: SpinnersService,
                public activeModal: NgbActiveModal) {
    }

    createGroup(group: Group) {
        this.showSpinners();
        this.groupsService.createGroup(group).pipe(first())
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

    ngOnInit() {
        this.initAddGroupForm();
        this.getIcons();
    }

    initAddGroupForm() {
        this.addGroupForm = new FormGroup({
            'materialIcon': new FormControl(null, [Validators.required]),
            'name'        : new FormControl(null, [Validators.required, Validators.minLength(3)]),
        });
    }

    getIcons() {
        this.icons = this.groupsService.getIcons();
    }

    public showSpinners(): void {
        this.spinnersService.show();
    }

    private hideSpinners(): void {
        this.spinnersService.hide();
    }

}

