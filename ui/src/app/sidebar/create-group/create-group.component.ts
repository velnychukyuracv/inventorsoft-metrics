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
    group: Group = new Group();
    addGroupForm: FormGroup;
    receivedGroup: Group;
    icons: Icons[];

    constructor(private groupsService: GroupsService,
                private spinnersService: SpinnersService,
                public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
        this.initCreateGroupForm();
        this.getIcons();
    }

    /**
     * Initialization Create Group Form
     */

    initCreateGroupForm() {
        this.addGroupForm = new FormGroup({
            'materialIcon': new FormControl(null, [Validators.required]),
            'name'        : new FormControl(null, [Validators.required, Validators.minLength(3)]),
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
     * @param group: Data of created group
     */

    createGroup(group: Group) {
        this.showSpinners();
        this.groupsService.createGroup(group).pipe(first())
            .subscribe(
                (data: Group) => {
                    this.receivedGroup = data;
                    this.hideSpinners();
                    this.activeModal.close();
                    // TODO: Show success notification
                },
                error => {
                    this.hideSpinners();
                    // TODO: Show error notification
                }
            );
    }

    /**
     * Show spinner
     */

    public showSpinners(): void {
        this.spinnersService.show();
    }

    /**
     * Hide spinner
     */

    private hideSpinners(): void {
        this.spinnersService.hide();
    }

}

