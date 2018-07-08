import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../common/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { SpinnersService } from '../../spinners/spinners.service';
import { EditUser } from '../../common/models/edit_user.model'

@Component({
    selector   : 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls  : ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    form: FormGroup;
    message: string;
    userId: any;
    currentUser: EditUser;

    constructor(public router: Router, public userService: UserService, public activatedRoute: ActivatedRoute, public spinnerService: SpinnersService) {
    }

    ngOnInit() {
        this.buildForm();
        this.getUserFromRoute();
    }

    /**
     * submit form data to  the server
     */
    onSubmit() {
        const formData = this.form.value;
        this.spinnerService.show();

        this.userService.editUser(formData, this.userId)
            .subscribe(
                res => {
                    this.spinnerService.hide();
                    return this.router.navigate(['/users']);
                    //todo success notification
                },
                error => {
                    this.spinnerService.hide();
                    this.showMessage(error);
                }
            )
    }

    /**
     * create form for editing user
     */
    private buildForm() {
        this.form = new FormGroup({
            'firstName': new FormControl(null, [Validators.required]),
            'lastName' : new FormControl(null, [Validators.required])
        })
    }

    /**
     * pre-fill user's editing form
     */
    private getUserFromRoute() {
        this.userId = this.activatedRoute.snapshot.params['id'];
        if (this.userId) {
            this.userService.getUser(this.userId)
                .subscribe(
                    (user: EditUser) => {
                        let {firstName, lastName} = user;
                        this.currentUser = user;
                        this.form.setValue({firstName, lastName})
                    },
                    error => this.showMessage(error)
                );
        }
    }

    /**
     * be able to cancel editing
     */
    cancel() {
        this.router.navigate(['/users'])
    }

    // TODO Need to change when we will have done service for notifications
    /**
     * show info block
     * @param message - info text for user
     */
    private showMessage(message) {
        this.message = message;
        setTimeout(() => {
            this.message = '';
        }, 6000)
    }

}
