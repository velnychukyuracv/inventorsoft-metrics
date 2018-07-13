import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../common/services/notification.service';
import { Message } from '../common/models/message';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector   : 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls  : ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    messages$: Observable<Message[]>;

    constructor(private notification: NotificationService) {
    }

    ngOnInit() {
        this.messages$ = this.notification.getMessages();
    }

    /**
     * Close some message
     * @param {number} id message to dismiss
     */
    dismiss(id: number) {
        this.notification.dismissMessage(id);
    }

}
