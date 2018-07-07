import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MessageModel } from '../models/message.model';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    notifications: MessageModel[];
    private static TIME_TO_DESTROY_MSG_IN_MS: number = 6000;
    constructor() {
        this.notifications = [];
    }

    /**
     * Is Used to get messages in reverse order
     * @returns {Observable<MessageModel[]>}
     */
    getMessages(): Observable<MessageModel[]> {
        return of(this.notifications.reverse());
    }


    /**
     * Is used to create success notification
     * @param content
     * @param beDisappeared
     */
    success(content, beDisappeared: boolean = true): void {
        this.sendMessage(content, 'success', beDisappeared);
    }

    /**
     *
     * @param content
     * @param {boolean} beDisappeared
     */
    error(content, beDisappeared: boolean = true): void {
        this.sendMessage(content, 'danger', beDisappeared);
    }

    /**
     * Is used to dissmis notification
     * @param {number} id
     * @param {boolean} beDisappeared
     */
    dissmissMessage(id: number): void {
        let index = this.notifications.findIndex(x => x.id == id);
        this.notifications.splice(index, 1);
    }

    /**
     * Is used to create message
     * @param {string} content
     * @param {string} type
     * @param {boolean} beDisappeared
     */
    private sendMessage(content: string, type: string, beDisappeared: boolean = true): void {
        let message = new MessageModel(content, type);
        this.notifications.push(message);
        if (beDisappeared)
            setTimeout(() => this.dissmissMessage(message.id), NotificationService.TIME_TO_DESTROY_MSG_IN_MS);
    }

}
