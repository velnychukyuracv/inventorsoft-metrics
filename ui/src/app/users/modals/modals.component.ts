import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Modal } from '../../common/models/modal.model';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { SpinnersService } from '../../spinners/spinners.service';
import { NotificationService } from '../../common/services/notification.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
    selector   : 'app-modals',
    templateUrl: './modals.component.html'
})
export class ModalsComponent implements OnChanges {

    @Input() currentModal: Modal;
    @Output() refresh: EventEmitter<void> = new EventEmitter();
    @ViewChild('closeBtn') closeBtn: ElementRef;

    /**
     * pattern for validation username field
     */
    usernamePattern: string = '^([a-z0-9_\\.-]+)@([a-z0-9_\\.-]+)\\.([a-z\\.]{1,6})$';
    addForm: FormGroup;
    editForm: FormGroup;
    currentUser;

    constructor(private userService: UserService,
                private spinner: SpinnersService,
                private notification: NotificationService) {
    }

    ngOnChanges() {
        if (this.currentModal) {

            switch (this.currentModal.type) {
                case 'add': {
                    this.addUserForm()
                }
                    break;
                case 'edit': {
                    this.currentUser = this.currentModal.user;
                    this.editUserForm()
                }
                    break;
                case 'delete': {
                    this.currentUser = this.currentModal.user;
                }
                    break;
            }
        }

    }

    /**
     * delete user
     */
    deleteUser() {
        this.spinner.show();
        this.userService.deleteUser(this.currentUser.id)
            .subscribe(
                () => {
                    this.closeModal();
                    this.spinner.hide();
                    this.refresh.emit();
                    this.notification.success(`You have successfully deleted user!`);
                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`Failed to delete user!`);
                }
            )
    }

    /**
     * add user
     */
    addUser() {
        const formData = this.addForm.value;
        this.spinner.show();
        this.userService.addUser(formData)
            .subscribe(res => {
                    this.closeModal();
                    this.spinner.hide();
                    this.refresh.emit();
                    this.notification.success(`You have successfully created user!`);
                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`User with this name already exists!`);
                }
            )
    }

    /**
     * edit user
     */
    editUser() {
        const formData = this.editForm.value;
        this.spinner.show();

        this.userService.editUser(formData, this.currentUser.id)
            .subscribe(
                res => {
                    this.closeModal()
                    this.spinner.hide();
                    this.refresh.emit();
                    this.notification.success(`You have successfully edited user!`);
                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`Failed to edit user!`);
                }
            )
    }

    /**
     * close modal window
     */
    closeModal() {
        this.closeBtn.nativeElement.click();
    }

    /**
     * form for adding user
     */
    addUserForm() {
        this.addForm = new FormGroup({
            'email'    : new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern(this.usernamePattern)]),
            'firstName': new FormControl(null, [Validators.required]),
            'lastName' : new FormControl(null, [Validators.required]),
            'password' : new FormControl(null, [Validators.required, Validators.minLength(8)])
        })
    }

    /**
     * form for editing user
     */
    editUserForm() {
        this.editForm = new FormGroup({
            'firstName': new FormControl(null, [Validators.required]),
            'lastName' : new FormControl(null, [Validators.required])
        });
        this.editForm.patchValue(this.currentUser);
    }
}

