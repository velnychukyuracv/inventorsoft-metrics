import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../common/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector   : 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls  : ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    form: FormGroup;
    message: string;
    userId: any;

    constructor(public router: Router, public userService: UserService, public activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.userId = this.activatedRoute.snapshot.params['id'];
        this.form = new FormGroup({
            'firstName': new FormControl(null, [Validators.required]),
            'lastName' : new FormControl(null, [Validators.required])
        })
    }

    /**
     * submit form data to  the server
     */
    onSubmit() {
        const formData = this.form.value;
        this.userService.editUser(formData, this.userId)
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
