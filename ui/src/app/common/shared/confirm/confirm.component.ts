import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmService } from '../../services/confirm.service';
import { Subscription } from 'rxjs/index';

@Component({
    selector   : 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls  : ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy {

    private confirmSubscription: Subscription;

    constructor(public _confirm: ConfirmService) {
    }

    confirm() {
        this._confirm.confirmation();
    }

    reject() {
        this._confirm.rejection();
    }

    ngOnInit(): void {
        this.subscribeToConfirm();
    }

    /**
     * Subscribing to confirm
     */
    subscribeToConfirm() {
        this.confirmSubscription = this._confirm.confirm$.subscribe();
    }

    ngOnDestroy() {
        this.confirmSubscription.unsubscribe();
    }
}