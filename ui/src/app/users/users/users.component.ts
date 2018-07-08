import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { Router } from '@angular/router';
import { TableParams } from '../../common/models/table-params.model';

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

    constructor(private userService: UserService, private router: Router) {
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
     * show all users received from the server
     */
    getAllUsers() {
        this.userService.getUsers(this.tableParams)
            .subscribe(
                (res) => {
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
