import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';

import { UserService } from '../../common/services/user.service';
import { SpinnersService } from '../../spinners/spinners.service';
import { TableParams } from '../../common/models/table-params.model';
import { PAGE_NAVIGATION } from '../../common/models/page-navigation.enum';
import { NotificationService } from '../../common/services/notification.service';

@Component({
    selector   : 'app-users',
    templateUrl: './users.component.html',
    styleUrls  : ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    currentUserId: number;
    currentUsers: any;
    tableParams: TableParams = {
        pageSize: 10,
        page    : 0
    };
    totalPages: number = 1;

    @ViewChild('closeBtn') closeBtn: ElementRef;

    constructor(private userService: UserService,
                private spinner: SpinnersService,
                private notification: NotificationService) {
    }

    ngOnInit() {
        this.getAllUsers()
    }

    /**
     * Slot for connecting to signal 'onSearch'
     * @param $event
     */
    onSearch($event): void {
        if ($event) {
            this.tableParams.query = $event;
        }
        else {
            delete this.tableParams.query;
        }
        this.getAllUsers();
    }

    /**
     * Slot for connecting to signal 'sorted'
     * @param $event
     */
    onSorted($event) {
        this.tableParams.sortBy = $event.sortBy;
        this.tableParams.direction = $event.direction;
        this.getAllUsers();
    }

    /**
     * Slot for connecting to signal 'pageChanged'
     * @param {number | PAGE_NAVIGATION} $event
     */
    onPageChange($event: number | PAGE_NAVIGATION) {
        switch ($event) {
            case PAGE_NAVIGATION.PREV:
                if (this.tableParams.page > 0) {
                    --this.tableParams.page;
                }
                break;
            case PAGE_NAVIGATION.NEXT:
                if (this.tableParams.page < this.totalPages) {
                    ++this.tableParams.page;
                }
                break;
            default:
                this.tableParams.page = $event;
        }

        this.getAllUsers();
    }

    /**
     * show all users received from the server
     */
    getAllUsers() {
        this.spinner.show();

        this.userService.getUsers(this.tableParams)
            .pipe(first())
            .subscribe(
                (res) => {
                    this.totalPages = res.totalPages;
                    this.tableParams.page = res.number;
                    this.currentUsers = res['content'];
                    this.spinner.hide();

                    res['content'].map(element => {
                        element.createdAt[1] -= 1;
                        element.createdAt[6] = (element.createdAt[6] / 1000000) | 0;
                        let [createdYear, createdMonth, createdDay, createdHour, createdMinute, createdSecond, createdMs] = element.createdAt;
                        element.createdAt = new Date(Date.UTC(createdYear, createdMonth, createdDay, createdHour, createdMinute, createdSecond, createdMs));

                        element.updatedAt[1] -= 1;
                        element.updatedAt[6] /= 1000000;
                        let [updatedYear, updatedMonth, updatedDay, updatedHour, updatedMinute, updatedSecond, updatedMs] = element.updatedAt;
                        element.updatedAt = new Date(Date.UTC(updatedYear, updatedMonth, updatedDay, updatedHour, updatedMinute, updatedSecond, updatedMs));
                    });

                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`Failed to upload users!`);
                }
            )
    }

    /**
     * delete user
     */
    deleteUser() {
        this.spinner.show();

        this.userService.deleteUser(this.currentUserId)
            .subscribe(
                () => {
                    this.closeModal();
                    this.spinner.hide();
                    this.currentUsers = this.currentUsers.filter((user) => user.id != this.currentUserId);
                    this.notification.success(`You have successfully deleted user!`);
                },
                error => {
                    this.spinner.hide();
                    this.notification.error(`Failed to delete user!`);
                }
            )
    }

    /**
     * open modal window to delete user
     * @param userId - user id
     */
    openModal(userId: number) {
        this.currentUserId = userId;
    }

    /**
     * close modal window
     */
    closeModal() {
        this.closeBtn.nativeElement.click();
    }
}
