import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';

import { SpinnersService } from './spinners.service';
import { SpinnersState } from './../common/models/spinners.model';
import { Subscription } from 'rxjs/index';

@Component({
    selector: 'app-spinners',
    templateUrl: './spinners.component.html',
    styleUrls: ['./spinners.component.scss']
})
export class SpinnersComponent implements OnInit, OnDestroy {

    show = false;

    private subscription:Subscription;

    constructor(private SpinnersService:SpinnersService) {
    }

    ngOnInit() {
        this.subscription = this.SpinnersService.SpinnersState
            .subscribe((state:SpinnersState) => {
                this.show = state.show;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
