import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../common/services/auth.service";
import { Router } from '@angular/router';

@Component({
    selector   : 'app-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    message: string;

    constructor(
        private authService: AuthService,
        // private router: Router
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
            'userName': new FormControl(null, [Validators.email, Validators.required, Validators.minLength(5),Validators.pattern('^([a-z0-9_\\.-]+)@([a-z0-9_\\.-]+)\\.([a-z\\.]{1,6})$')])
        })
    }

    onSubmit() {
        const formData = this.form.value;
        this.authService.login(formData)
            .subscribe(res => {
                    if (res) {
                        this.saveToLocalStorage(res)
                    }
                },
                error => {
                    if (error) {
                        this.showMessage('User Name or Password incorrect')
                    }
                })
    }

    saveToLocalStorage(res) {
        localStorage.setItem('jwtToken', res.jwtToken); //for auth requests
        localStorage.setItem('expirationToken', res.expirationToken);// for refreshing token
    }

    private showMessage(message) {
        this.message = message;
        setTimeout(() => {
            this.message = '';
        }, 6000)
    }
}
