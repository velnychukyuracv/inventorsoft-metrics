import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../common/services/notification.service';
import { MessageModel } from '../common/models/message.model';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector   : 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls  : ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    messages$: Observable<MessageModel[]>;

    constructor(private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.messages$ = this.notificationService.getMessages();
    }

    /**
     * Is used to close some message
     * @param {number} id message to dismiss
     */
    dismiss(id: number) {
        this.notificationService.dissmissMessage(id);
    }

}
