import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/index';

@Injectable()
export class ConfirmService {

    public header: string;
    public message: string;
    public btnOk: string;

    isShow: boolean = false;

    private confirmSubject = new Subject<boolean>();
    confirm$ = this.confirmSubject.asObservable();

    constructor() {
    }

    /**
     * Sends event(agree) to observable
     * and hides modal dialog
     */
    confirmation() {
        this.isShow = false;
        this.confirmSubject.next(true);
    }

    /**
     * Sends event(disagree) to observable
     * and hides modal dialog
     */
    rejection() {
        this.isShow = false;
        this.confirmSubject.next(false);
    }

    /**
     * Prepares modal dialog
     * @param {string} header
     * @param {string} message
     * @param {string} btnOk
     */
    confirm(header: string, message: string, btnOk = 'Yes'): void {
        this.header = header;
        this.message = message;
        this.btnOk = btnOk;

        this.isShow = true;
    }

}