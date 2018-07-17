import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth.service';
import { SpinnersService } from '../../spinners/spinners.service';
import { TokenService } from '../../common/services/token.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../common/services/notification.service';

@Component({
    selector   : 'app-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    usernamePattern: string = '^([a-z0-9_\\.-]+)@([a-z0-9_\\.-]+)\\.([a-z\\.]{1,6})$';

    constructor(
        private authService: AuthService,
        private spinnersService: SpinnersService,
        private tokenService: TokenService,
        public router: Router,
        public notification: NotificationService
    ) {
    }

    public showSpinners(): void {
        this.spinnersService.show();
    }

    private hideSpinners(): void {
        this.spinnersService.hide();
    }

    ngOnInit() {
        this.form = new FormGroup({
            'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
            'userName': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern(this.usernamePattern)])
        })
    }

    /**
     * submit form data to  the server
     * @param res - response
     */
    onSubmit() {
        this.showSpinners();
        const formData = this.form.value;
        this.authService.login(formData)
            .subscribe(res => {
                    this.tokenService.saveToLocalStorage(res);
                    this.hideSpinners();
                    this.notification.success(`Logged in`);
                    return this.router.navigate(['/users']);
                },
                error => {
                    console.log(error);
                    this.hideSpinners();
                    this.notification.error(`Failed to log in!`);
                })
    }

}