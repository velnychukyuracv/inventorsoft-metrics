import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
import { SpinnersService } from '../../spinners/spinners.service';

@Component({
    selector   : 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls  : ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    form: FormGroup;
    /**
     * pattern for user's email
     */
    emailPattern: string = '^([a-z0-9_\\.-]+)@([a-z0-9_\\.-]+)\\.([a-z\\.]{1,6})$';

    constructor(private auth: AuthService, private router: Router, public spinner: SpinnersService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)])
        })
    }

    /**
     *inform server about forgetting the password
     */
    forgotPass() {
        this.spinner.show();
        let email = this.form.value.email;
        this.auth.forgotPassword(email)
            .subscribe(
                (res) => {
                    this.spinner.hide();
                    this.router.navigate(['/reset-password'])
                },
                (err) => {
                    this.spinner.hide();
                    //TODO notification message
                }
            )
    }

}
