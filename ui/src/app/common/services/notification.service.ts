import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Message } from '../models/message';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    notifications: Message[];

    constructor() {
        this.notifications = [];
    }

    /**
     * Is Used to get messages in reverse order
     * @returns {Observable<Message[]>}
     */
    getMessages(): Observable<Message[]> {
        return of(this.notifications.reverse());
    }


    /**
     * Is used to create success notification
     * @param content
     */
    success(content): void {
        this.sendMessage(content, 'success');
    }

    /**
     * Is used to create error notification
     * @param content
     */
    error(content): void {
        this.sendMessage(content, 'danger');
    }

    /**
     * Is used to dissmis notification
     * @param {number} id
     */
    dissmissMessage(id: number): void {
        for (let i = 0; i < this.notifications.length; i++) {
            let notification = this.notifications[i];
            if (notification.id === id) {
                this.notifications.splice(i, 1);
                return;
            }
        }
    }

    /**
     * Is used to create message
     * @param {string} content
     * @param {string} type
     */
    private sendMessage(content: string, type: string): void {
        let message = new Message(content, type);
        this.notifications.push(message);
        setTimeout(() => this.dissmissMessage(message.id), 6000);
    }

}
