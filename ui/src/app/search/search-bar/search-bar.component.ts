import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
        this.searchService.makeSearch(this.searchBox.nativeElement.value);
    }

}
