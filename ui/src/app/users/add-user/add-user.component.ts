import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../common/services/user.service';

@Component({
    selector   : 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls  : ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    form: FormGroup;
    usernamePattern: string = '^([a-z0-9_\\.-]+)@([a-z0-9_\\.-]+)\\.([a-z\\.]{1,6})$';
    message: string;

    constructor(public router: Router, public userService: UserService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'email'    : new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern(this.usernamePattern)]),
            'firstName': new FormControl(null, [Validators.required]),
            'lastName' : new FormControl(null, [Validators.required]),
            'password' : new FormControl(null, [Validators.required, Validators.minLength(8)])
        })
    }

    /**
     * submit form data to  the server
     * @param res - response
     */
    onSubmit() {
        const formData = this.form.value;
        this.userService.addUser(formData)
            .subscribe(res => {
                    return this.router.navigate(['/users']);
                },
                error => {
                    this.showMessage(error);
                }
            )
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
