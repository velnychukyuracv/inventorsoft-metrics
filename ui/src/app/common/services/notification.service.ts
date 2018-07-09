import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MessageModel } from '../models/message.model';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    notifications: MessageModel[];
    private static const TIME_TO_DESTROY_MSG_IN_MS: number = 6000;
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
     * @param content of the message
     * @param beDisappeared If true the success message will disappear after some time
     *                                 if else it will be permanent
     */
    success(content, beDisappeared: boolean = true): void {
        this.sendMessage(content, 'success', beDisappeared);
    }

    /**
     *  Is used to create error notification
     * @param content of the message
     * @param {boolean} beDisappeared If true the error message will disappear after some time
     *                                 if else it will be permanent
     */
    error(content, beDisappeared: boolean = true): void {
        this.sendMessage(content, 'danger', beDisappeared);
    }

    /**
     * Is used to dissmis the message
     * @param {number} id message to dissmiss
     */
    dissmissMessage(id: number): void {
        let index = this.notifications.findIndex(x => x.id == id);
        this.notifications.splice(index, 1);
    }

    /**
     * Is used to create message
     * @param {string} content of the message
     * @param {string} type of message. Can be success or error
     * @param {boolean} beDisappeared. If true the message will disappear after some time
     *                                 if else it will be permanent
     */
    private sendMessage(content: string, type: string, beDisappeared: boolean = true): void {
        let message = new MessageModel(content, type);
        this.notifications.push(message);
        if (beDisappeared)
            setTimeout(() => this.dissmissMessage(message.id), NotificationService.TIME_TO_DESTROY_MSG_IN_MS);
    }

}
