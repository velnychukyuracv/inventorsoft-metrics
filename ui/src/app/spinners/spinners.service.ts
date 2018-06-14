import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

import { SpinnersState } from './../common/models/spinners.model';

@Injectable({
    providedIn: 'root'
})
export class SpinnersService {

    private spinnersSubject = new Subject<SpinnersState>();

    SpinnersState = this.spinnersSubject.asObservable();

    constructor() {
    }

    show() {
        this.spinnersSubject.next(<SpinnersState>{show: true});
    }

    hide() {
        this.spinnersSubject.next(<SpinnersState>{show: false});
    }
}