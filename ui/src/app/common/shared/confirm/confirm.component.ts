import { Component } from '@angular/core';
import { ConfirmService } from '../../services/confirm.service';

@Component({
    selector   : 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls  : ['./confirm.component.scss']
})
export class ConfirmComponent {

    constructor(public _confirm: ConfirmService) {
    }

    confirm() {
        this._confirm.confirmation();
    }

    reject() {
        this._confirm.rejection();
    }
}