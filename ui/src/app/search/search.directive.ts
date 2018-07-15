import { Directive, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SearchService } from '../common/services/search.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Directive({
    selector: '[search]'
})
export class SearchDirective implements OnInit, OnDestroy {

    @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
    private searchSubscription: Subscription;

    constructor(private searchService: SearchService) {
    }

    ngOnInit(): void {
        this.emitSearch();
    }

    /**
     * Emit search query
     */
    emitSearch(): void {
        this.searchSubscription = this.searchService.search$.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(event => {
            this.onSearch.emit(event);
        });
    }

    ngOnDestroy(): void {
        this.onSearch.unsubscribe();
    }
}
