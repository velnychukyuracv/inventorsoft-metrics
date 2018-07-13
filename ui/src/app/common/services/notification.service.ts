import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Message } from '../models/message';
import { of } from 'rxjs/internal/observable/of';

const TIME_TO_DESTROY_MSG_IN_MS: number = 6000;

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    notifications: Message[];
    constructor() {
        this.notifications = [];
    }

    /**
     * Get messages in reverse order
     * @returns {Observable<Message[]>}
     */
    getMessages(): Observable<Message[]> {
        return of(this.notifications.reverse());
    }


    /**
     * Create success notification
     * @param content of the message
     * @param beDisappeared If true the success message will disappear after some time
     *                                 if else it will be permanent
     */
    success(content, beDisappeared: boolean = true): void {
        this.sendMessage(content, 'success', beDisappeared);
    }

    /**
     * Create error notification
     * @param content of the message
     * @param {boolean} beDisappeared If true the error message will disappear after some time
     *                                 if else it will be permanent
     */
    error(content, beDisappeared: boolean = true): void {
        this.sendMessage(content, 'danger', beDisappeared);
    }

    /**
     * Dismiss the message
     * @param {number} id message to dissmiss
     */
    dismissMessage(id: number): void {
        let index = this.notifications.findIndex(x => x.id == id);
        this.notifications.splice(index, 1);
    }

    /**
     * Create message
     * @param {string} content of the message
     * @param {string} type of message. Can be success or error
     * @param {boolean} beDisappeared. If true the message will disappear after some time
     *                                 if else it will be permanent
     */
    private sendMessage(content: string, type: string, beDisappeared: boolean = true): void {
        let message = new Message(content, type);
        this.notifications.push(message);
        if (beDisappeared)
            setTimeout(() => this.dismissMessage(message.id), TIME_TO_DESTROY_MSG_IN_MS);
    }

}
