import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
import { SpinnersService } from '../../spinners/spinners.service';
import { NotificationService } from '../../common/services/notification.service';

@Component({
    selector   : 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls  : ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    form: FormGroup;

    constructor(private auth: AuthService, private router: Router, public spinner: SpinnersService, public notification: NotificationService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
            'token'   : new FormControl(null, [Validators.required])
        })
    }

    /**
     *inform server about new password
     */
    resetPass() {
        let formData = this.form.value;
        this.spinner.show();
        this.auth.resetPassword(formData['password'], formData['token'])
            .subscribe((res) => {
                    this.spinner.hide();
                    this.router.navigate(['/login']);
                    this.notification.success(`You have successfully reset your password!`)
                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`Failed to reset password!`);
                }
            )
    }

}
