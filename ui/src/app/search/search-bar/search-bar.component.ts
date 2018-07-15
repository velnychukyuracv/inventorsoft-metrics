import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { SearchService } from '../../common/services/search.service';

@Component({
    selector   : 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls  : ['./search-bar.component.scss']
})
export class SearchBarComponent {
    @ViewChild("searchBox") searchBox: ElementRef;

    constructor(private searchService: SearchService) {
    }

    @HostListener('keyup') keyUp() {
        console.log(this.searchBox);
        this.searchService.makeSearch(this.searchBox.nativeElement.value);
    }

}
