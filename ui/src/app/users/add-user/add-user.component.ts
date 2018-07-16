import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../common/services/user.service';
import { SpinnersService } from '../../spinners/spinners.service';
import { NotificationService } from '../../common/services/notification.service';

@Component({
    selector   : 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls  : ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    form: FormGroup;
    message: string;
    /**
     * validation pattern for username
     */
    usernamePattern: string = '^([a-z0-9_\\.-]+)@([a-z0-9_\\.-]+)\\.([a-z\\.]{1,6})$';

    constructor(public router: Router, public userService: UserService, public spinner: SpinnersService, private notification: NotificationService) {
    }

    ngOnInit() {
        this.addUserForm();
    }

    /**
     * create form for adding user
     */
    addUserForm() {
        this.form = new FormGroup({
            'email'    : new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern(this.usernamePattern)]),
            'firstName': new FormControl(null, [Validators.required]),
            'lastName' : new FormControl(null, [Validators.required]),
            'password' : new FormControl(null, [Validators.required, Validators.minLength(8)])
        })
    }

    /**
     * submit form data to  the server
     */
    onSubmit() {
        const formData = this.form.value;
        this.spinner.show();
        this.userService.addUser(formData)
            .subscribe(res => {
                    this.spinner.hide();
                    this.notification.success(`You have successfully created user!`);
                    return this.router.navigate(['/users']);
                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`User with this name already exists!`);
                }
            )
    }

    /**
     * be able to cancel adding
     */
    cancel() {
        this.router.navigate(['/users'])
    }
}
