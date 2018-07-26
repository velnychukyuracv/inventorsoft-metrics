import { Injectable } from '@angular/core';

@Injectable()
export class ConfirmService {

    public header: string;
    public message: string;
    public btnOk: string;

    isShow: boolean = false;

    /**
     * Detects confirmation.
     * Will be implemented every time after calling method confirm.
     * Connects with click event.
     */
    public confirmation: () => void;

    /**
     * Detects rejection
     * Will be implemented every time after calling method confirm
     */
    public rejection: () => void;

    constructor() {
    }

    /**
     * Prepares modal dialog
     * @param {string} header
     * @param {string} message
     * @param {string} btnOk
     * @return {Promise<boolean>}
     */
    confirm(header: string, message: string, btnOk = 'Yes'): Promise<boolean> {
        this.header = header;
        this.message = message;
        this.btnOk = btnOk;

        return new Promise<boolean>((resolve, reject) => {
            this.isShow = true;

            /**
             * Will be executed when user will click 'YES' button
             */
            this.confirmation = () => {
                this.isShow = false;
                resolve(true);
            };

            /**
             * Will be executed when user will click 'CANCEL' button
             */
            this.rejection = () => {
                this.isShow = false;
                resolve(false);
            };

        });
    };

}