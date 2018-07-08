import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';

import { UserService } from '../../common/services/user.service';
import { TableParams } from '../../common/models/table-params.model';
import { PAGE_NAVIGATION } from '../../common/models/page-navigation.enum';

@Component({
    selector   : 'app-users',
    templateUrl: './users.component.html',
    styleUrls  : ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    message: string;
    currentUsers: any;
    tableParams: TableParams = {
        pageSize: 10,
        page    : 0
    };
    totalPages: number = 1;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.getAllUsers()
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
        this.userService.getUsers(this.tableParams)
            .pipe(first())
            .subscribe(
                (res) => {
                    this.totalPages = res.totalPages;
                    this.tableParams.page = res.number;
                    this.currentUsers = res['content'];
                },
                error => {
                    this.showMessage(error)
                }
            )
    }

    // TODO Need to change when we will have done service for notifications
    /**
     * show info block
     * @param message - info text for user
     */
    private showMessage(message) {
        this.message = message;
        setTimeout(() => {
            this.message = '';
        }, 6000)
    }

    //TODO delete user
    deleteUser() {

    }
}
