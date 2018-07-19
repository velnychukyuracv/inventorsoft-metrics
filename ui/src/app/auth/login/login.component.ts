import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth.service';
import { SpinnersService } from '../../spinners/spinners.service';
import { TokenService } from '../../common/services/token.service';
import { Router } from '@angular/router';

@Component({
    selector   : 'app-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    message: string;
    usernamePattern: string = '^([a-z0-9_\\.-]+)@([a-z0-9_\\.-]+)\\.([a-z\\.]{1,6})$';
    imageUrl: string = '/assets/img/default-logo.png';

    constructor(
        private authService: AuthService,
        private spinnersService: SpinnersService,
        private tokenService: TokenService,
        public router: Router
    ) {
    }

    public showSpinners(): void {
        this.spinnersService.show();
    }

    private hideSpinners(): void {
        this.spinnersService.hide();
    }

    ngOnInit() {
        localStorage.setItem('image-url', this.imageUrl);
        this.form = new FormGroup({
            'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
            'userName': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern(this.usernamePattern)])
        });
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
                    this.showMessage('Logged in', 1000,
                        () => {
                            return this.router.navigate(['/users']);
                        }
                    );
                    this.hideSpinners();
                },
                error => {
                    this.showMessage(error);
                    this.hideSpinners();
                })
    }

    // TODO Need to change when we will have done service for notifications
    /**
     * show info block
     * @param message - info text for user
     */
    private showMessage(message, time = 6000, actionCb = null) {
        this.message = message;
        setTimeout(() => {
            if (actionCb) {
                actionCb()
            }
            this.message = '';
        }, time)
    }
}
