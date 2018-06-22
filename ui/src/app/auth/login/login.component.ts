import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth.service';
import { SpinnersService } from '../../spinners/spinners.service';

@Component({
    selector   : 'app-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    message: string;
    usernamePattern: string = '^([a-z0-9_\\.-]+)@([a-z0-9_\\.-]+)\\.([a-z\\.]{1,6})$';

    constructor(
        private authService: AuthService,
        private SpinnersService: SpinnersService
    ) {
    }

    public showSpinners(): void {
        this.SpinnersService.show();
    }

    private hideSpinners(): void {
        this.SpinnersService.hide();
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
                    this.saveToLocalStorage(res);
                    this.hideSpinners();
                },
                error => {
                    this.showMessage(error);
                    this.hideSpinners();
                })
    }

    // TODO should move this function to some token service
    /**
     * store authentication data to local storage
     * @param token - token data
     */
    saveToLocalStorage(token) {
        let data = JSON.stringify(token);
        localStorage.setItem('jwt.token', data);
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
